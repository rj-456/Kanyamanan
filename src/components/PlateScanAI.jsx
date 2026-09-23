import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  X,
  CheckCircle2,
  Flame,
  Award,
  Plus,
  Loader2,
  Key,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import { scanPlateWithAi } from '../djangoApi';

/**
 * PlateScan AI™
 * Real-time food nutrition scanner with two-phase verification:
 * Phase 1: Verification & Gatekeeping (Food vs Non-Food)
 * Phase 2: Nutritional Deconstruction (Calories, Macros, Sodium, Heritage status)
 */
export default function PlateScanAI({
  onAddMeal = null,
  geminiApiKey = '',
  className = ''
}) {
  // Resolved API Key state
  const [apiKey, setApiKey] = useState(() => {
    return geminiApiKey ||
      (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_gemini_api_key')) ||
      '';
  });

  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [inlineKeyInput, setInlineKeyInput] = useState('');
  const [showKeyText, setShowKeyText] = useState(false);

  // Synchronize when prop changes
  useEffect(() => {
    if (geminiApiKey && geminiApiKey !== apiKey) {
      setApiKey(geminiApiKey);
    }
  }, [geminiApiKey]);

  // Camera & Mode states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // 'environment' | 'user'
  const [cameraError, setCameraError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  // Scanning states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null); // { is_food, requires_api_key, rejection_reason, dish_name, ... }
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const [addedToLogSuccess, setAddedToLogSuccess] = useState(false);

  // DOM Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);
  const abortControllerRef = useRef(null);
  const livePollTimerRef = useRef(null);
  const isAnalyzingRef = useRef(false);

  // Keep ref synchronized with state to prevent overlapping calls in timer
  useEffect(() => {
    isAnalyzingRef.current = isAnalyzing;
  }, [isAnalyzing]);

  // Clean stop for camera stream tracks
  const stopCameraStream = useCallback(() => {
    if (livePollTimerRef.current) {
      clearInterval(livePollTimerRef.current);
      livePollTimerRef.current = null;
    }
    if (abortControllerRef.current) {
      try { abortControllerRef.current.abort(); } catch (_) { }
      abortControllerRef.current = null;
    }
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      } catch (err) {
        console.warn("Track stop warning:", err);
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsAnalyzing(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  // Off-screen canvas frame downscaler (< 100 KB JPEG at max 720p, 0.70 quality)
  const captureFrameFromVideo = useCallback(() => {
    if (!videoRef.current || videoRef.current.readyState < 2) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');

    const srcW = video.videoWidth || 640;
    const srcH = video.videoHeight || 480;

    const maxDim = 720;
    let targetW = srcW;
    let targetH = srcH;

    if (srcW > maxDim || srcH > maxDim) {
      if (srcW >= srcH) {
        targetW = maxDim;
        targetH = Math.round((srcH / srcW) * maxDim);
      } else {
        targetH = maxDim;
        targetW = Math.round((srcW / srcH) * maxDim);
      }
    }

    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, targetW, targetH);
    return canvas.toDataURL('image/jpeg', 0.70);
  }, []);

  // Send frame to PlateScan AI with AbortController
  const performFrameAnalysis = useCallback(async (imageDataUrl, isLiveStream = false, keyOverride = null) => {
    if (!imageDataUrl) return;

    const effectiveKey = keyOverride !== null ? keyOverride : (apiKey || (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_gemini_api_key')) || '');

    // If no key is set anywhere, alert user with the setup card
    if (!effectiveKey) {
      setScanResult({
        is_food: false,
        requires_api_key: true,
        rejection_reason: "A Gemini API Key is required for live visual food deconstruction. Enter your free Google AI Studio key below or try Demo Mode."
      });
      setIsAnalyzing(false);
      return;
    }

    // Abort previous in-flight request to avoid network queue lag
    if (abortControllerRef.current) {
      try { abortControllerRef.current.abort(); } catch (_) { }
      abortControllerRef.current = null;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsAnalyzing(true);
    if (!isLiveStream) {
      setScanResult(null);
    }

    try {
      const data = await scanPlateWithAi(imageDataUrl, {
        apiKey: effectiveKey,
        signal: controller.signal
      });

      if (data && typeof data.is_food === 'boolean') {
        setScanResult(data);
        setPortionMultiplier(1);
        setAddedToLogSuccess(false);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      }
      console.warn("PlateScan AI processing error:", err);
      if (!isLiveStream) {
        setScanResult({
          is_food: false,
          rejection_reason: "Network or processing timeout. Please ensure clear lighting and try again."
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  }, [apiKey]);

  // Save new API key & immediately re-scan if preview image is ready
  const handleSaveApiKey = (newKey) => {
    const clean = (newKey || '').trim();
    if (!clean) return;
    setApiKey(clean);
    try {
      localStorage.setItem('kanyamanan_gemini_api_key', clean);
    } catch (_) { }
    setIsKeyModalOpen(false);

    if (previewImage) {
      performFrameAnalysis(previewImage, false, clean);
    }
  };

  // Instant Demo simulation (e.g. Sizzling Sisig)
  const handleRunDemoSisig = () => {
    setScanResult({
      is_food: true,
      dish_name: "Authentic Sizzling Pork Sisig",
      is_kapampangan: true,
      portion_estimate: "1 sizzling platter (~250g)",
      calories: 840,
      sodium_mg: 980,
      macros: {
        protein_g: 48,
        carbs_g: 4,
        fat_g: 72
      },
      confidence_score: 0.99
    });
    setPortionMultiplier(1);
    setAddedToLogSuccess(false);
  };

  // Start Device Camera
  const startCamera = async (facing = cameraFacingMode) => {
    stopCameraStream();
    setCameraError('');
    setPreviewImage(null);
    setScanResult(null);
    setAddedToLogSuccess(false);

    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facing },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch (e1) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
      setCameraFacingMode(facing);

      // Setup live polling every 1.9 seconds
      livePollTimerRef.current = setInterval(() => {
        if (!isAnalyzingRef.current && streamRef.current && videoRef.current) {
          const frame = captureFrameFromVideo();
          if (frame) {
            performFrameAnalysis(frame, true);
          }
        }
      }, 1900);

    } catch (err) {
      console.error("Camera access failed:", err);
      let msg = "Camera access was denied or not supported by your browser.";
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = "Camera permission was denied. Please allow camera access in your browser settings.";
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = "No camera hardware detected on this device.";
      }
      setCameraError(msg);
      setIsCameraActive(false);
    }
  };

  // Toggle front/rear camera
  const toggleCameraFacing = () => {
    const nextFacing = cameraFacingMode === 'environment' ? 'user' : 'environment';
    startCamera(nextFacing);
  };

  // Handle Photo File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopCameraStream();
    setCameraError('');
    setScanResult(null);
    setAddedToLogSuccess(false);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const rawDataUrl = evt.target?.result;
      if (rawDataUrl) {
        setPreviewImage(rawDataUrl);
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current || document.createElement('canvas');
          const maxDim = 960;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w >= h) {
              h = Math.round((h / w) * maxDim);
              w = maxDim;
            } else {
              w = Math.round((w / h) * maxDim);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            const compressed = canvas.toDataURL('image/jpeg', 0.72);
            performFrameAnalysis(compressed, false);
          } else {
            performFrameAnalysis(rawDataUrl, false);
          }
        };
        img.src = rawDataUrl;
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Manual Snapshot capture while in Live Camera mode
  const handleManualCapture = () => {
    const frame = captureFrameFromVideo();
    if (frame) {
      stopCameraStream();
      setPreviewImage(frame);
      performFrameAnalysis(frame, false);
    }
  };

  // Reset to default empty placeholder state
  const handleReset = () => {
    stopCameraStream();
    setPreviewImage(null);
    setScanResult(null);
    setCameraError('');
    setAddedToLogSuccess(false);
  };

  // Calculate adjusted values based on portionMultiplier
  const mult = portionMultiplier || 1;
  const currentCalories = scanResult?.calories ? Math.round(scanResult.calories * mult) : 0;
  const currentProtein = scanResult?.macros?.protein_g ? Math.round(scanResult.macros.protein_g * mult) : 0;
  const currentCarbs = scanResult?.macros?.carbs_g ? Math.round(scanResult.macros.carbs_g * mult) : 0;
  const currentFat = scanResult?.macros?.fat_g ? Math.round(scanResult.macros.fat_g * mult) : 0;
  const currentSodium = scanResult?.sodium_mg ? Math.round(scanResult.sodium_mg * mult) : 0;

  // Add analyzed dish to meal log / itinerary
  const handleAddToMealLog = () => {
    if (!scanResult || !scanResult.is_food || !scanResult.dish_name) return;

    if (onAddMeal) {
      onAddMeal({
        id: `platescan-${Date.now()}`,
        name: scanResult.dish_name,
        portion: mult !== 1 ? `${scanResult.portion_estimate || '1 serving'} (${mult}x)` : (scanResult.portion_estimate || '1 serving'),
        image: previewImage || null,
        is_kapampangan: Boolean(scanResult.is_kapampangan),
        nutrition: {
          calories: currentCalories,
          protein: currentProtein,
          carbs: currentCarbs,
          fat: currentFat,
          sodium: currentSodium
        },
        allergens: scanResult.is_kapampangan ? 'Authentic Kapampangan Heritage Dish' : 'Standard Culinary Dish',
        description: `Verified by PlateScan AI™ (${scanResult.portion_estimate || '1 serving'})`
      });
      setAddedToLogSuccess(true);
      setTimeout(() => setAddedToLogSuccess(false), 3000);
    }
  };

  return (
    <div className={`bg-[#12100E] border border-[#2E2A24] rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl text-white ${className}`}>
      {/* Hidden Off-Screen Canvas for Frame Downscaling */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* ============================================================
          1. HEADER & ACTION BUTTONS
          ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2E2A24]">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-black tracking-wider uppercase text-white m-0 flex items-center gap-2">
              <Camera className="h-5 w-5 text-terracotta" />
              <span>PLATESCAN AI™</span>
            </h3>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-terracotta/20 text-orange-400 px-2.5 py-0.5 rounded-full border border-terracotta/30 flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Instant Plate &amp; Macro Scanner
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 m-0 leading-relaxed">
            Snap a photo or launch the live camera to deconstruct calories, macros, and nutrients in real time.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">

          <button
            type="button"
            onClick={() => {
              if (isCameraActive) {
                stopCameraStream();
              } else {
                startCamera('environment');
              }
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95 ${
              isCameraActive
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gradient-to-r from-terracotta to-[#E25C38] hover:opacity-95 text-white'
            }`}
            title={isCameraActive ? "Stop live camera" : "Launch live camera"}
          >
            <Camera className="h-4 w-4" />
            <span>{isCameraActive ? "Stop Camera" : "Live Camera"}</span>
            {isCameraActive && (
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            )}
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 bg-[#1E1B18] hover:bg-[#25221E] text-gray-200 border border-[#2E2A24] rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:border-gray-600 active:scale-95"
            title="Upload photo from device"
          >
            <Upload className="h-4 w-4 text-terracotta" />
            <span>Upload Photo</span>
          </button>

          {(isCameraActive || previewImage || scanResult) && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              title="Reset Viewfinder"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* ============================================================
          2. VIEWFINDER / VIEWPORT AREA
          ============================================================ */}
      <div className="relative aspect-16/9 sm:aspect-16/9 w-full bg-[#181614] rounded-2xl overflow-hidden border border-[#2E2A24] flex items-center justify-center group shadow-inner">
        {/* Animated Scanning Laser Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_#f97316] animate-pulse absolute top-0 left-0 transition-all transform animate-[scan_2s_ease-in-out_infinite]" />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-orange-500/40 text-[10px] font-bold text-orange-300 flex items-center gap-1.5 shadow-lg">
              <Loader2 className="h-3 w-3 animate-spin text-terracotta" />
              <span>PlateScan AI™ Deconstructing Plate...</span>
            </div>
          </div>
        )}

        {/* Dashed Bounding Guides Overlay */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-20 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-6 h-6 border-t-2 border-l-2 border-dashed border-terracotta/80 rounded-tl-lg" />
            <div className="w-6 h-6 border-t-2 border-r-2 border-dashed border-terracotta/80 rounded-tr-lg" />
          </div>
          <div className="flex justify-between">
            <div className="w-6 h-6 border-b-2 border-l-2 border-dashed border-terracotta/80 rounded-bl-lg" />
            <div className="w-6 h-6 border-b-2 border-r-2 border-dashed border-terracotta/80 rounded-br-lg" />
          </div>
        </div>

        {/* State A: Camera Active */}
        {isCameraActive ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Camera Floating HUD Controls */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={toggleCameraFacing}
                className="px-2.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                title="Flip Camera (Front/Rear)"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Flip ({cameraFacingMode === 'environment' ? 'Rear' : 'Front'})</span>
              </button>

              <button
                type="button"
                onClick={handleManualCapture}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-terracotta to-[#E25C38] hover:opacity-95 text-white text-[11px] font-black flex items-center gap-1.5 shadow-lg cursor-pointer active:scale-95"
                title="Freeze and analyze current frame"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>Analyze Frame</span>
              </button>
            </div>
          </>
        ) : previewImage ? (
          /* State B: Uploaded or Captured Photo Preview */
          <div className="relative w-full h-full">
            <img
              src={previewImage}
              alt="Plate preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 z-20">
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 bg-black/70 hover:bg-black rounded-full text-gray-300 hover:text-white border border-white/20 backdrop-blur-md cursor-pointer"
                title="Clear photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : cameraError ? (
          /* State C: Camera Hardware Error */
          <div className="p-6 text-center space-y-3 z-10 max-w-md">
            <AlertTriangle className="h-10 w-10 text-amber-400 mx-auto" />
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {cameraError}
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => startCamera('environment')}
                className="px-3 py-1.5 bg-terracotta hover:bg-[#B84228] text-white rounded-xl text-xs font-black cursor-pointer shadow-md"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-[#25221E] hover:bg-[#302B25] text-gray-200 border border-[#2E2A24] rounded-xl text-xs font-bold cursor-pointer"
              >
                Upload Photo Instead
              </button>
            </div>
          </div>
        ) : (
          /* State D: Viewfinder Placeholder State */
          <div className="p-6 text-center space-y-3 z-10 max-w-md">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-terracotta/10 border border-terracotta/20 text-terracotta flex items-center justify-center mx-auto text-2xl shadow-inner">
              <Camera className="h-7 w-7 text-terracotta" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight m-0">
                Snap a photo or launch PlateScan AI™ Live Camera
              </h4>
              <p className="text-xs text-gray-400 font-medium m-0 leading-relaxed">
                Recognizes authentic Kapampangan dishes, portions, calories, macros, and sodium in real time.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => startCamera('environment')}
                className="px-4 py-2 bg-gradient-to-r from-terracotta to-[#E25C38] hover:opacity-95 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>Start Live Camera</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#25221E] hover:bg-[#302B25] text-gray-200 border border-[#2E2A24] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <Upload className="h-3.5 w-3.5 text-terracotta" />
                <span>Browse Photo</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================
          3. TWO-PHASE HUD & RESULTS CARD DISPLAY
          ============================================================ */}
      {scanResult && (
        <div className="animate-fade-in">
          {/* CASE A: Food is Detected (is_food === true) */}
          {scanResult.is_food ? (
            <div className="border border-emerald-500/40 bg-gradient-to-br from-[#1A2E20] via-[#1E1B18] to-[#251E17] rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
              {/* Header: Dish Name & Regional Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#2E2A24]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Food Verified
                    </span>
                    {scanResult.is_kapampangan ? (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Award className="h-3 w-3 text-amber-400" /> Authentic Kapampangan Heritage
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                        Culinary Standard
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white mt-1.5 tracking-tight m-0">
                    {scanResult.dish_name || "Recognized Meal"}
                  </h4>
                  <p className="text-xs text-gray-300 font-medium m-0 mt-0.5">
                    Estimated Serving: <strong className="text-amber-300">{scanResult.portion_estimate || "1 plate (~250g)"}</strong>
                  </p>
                </div>

                {/* Portion Multiplier Adjuster */}
                <div className="flex items-center gap-1 bg-[#12100E] p-1 rounded-xl border border-[#2E2A24] shrink-0">
                  <span className="text-[10px] font-bold text-gray-400 px-2">Portion:</span>
                  {[0.5, 1, 1.5, 2].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPortionMultiplier(val)}
                      className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        portionMultiplier === val
                          ? 'bg-terracotta text-white shadow-xs'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {val}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Grid: Large Calories + Macro Pills + Sodium Alert */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {/* Calories (Large Metric) */}
                <div className="col-span-2 sm:col-span-1 bg-[#12100E] p-3 rounded-xl border border-orange-500/30 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 flex items-center gap-1">
                    <Flame className="h-3 w-3" /> Calories
                  </span>
                  <span className="text-2xl font-black text-white mt-0.5">
                    {currentCalories}
                  </span>
                  <span className="text-[9px] text-gray-400 font-semibold">kcal</span>
                </div>

                {/* Protein Pill */}
                <div className="bg-[#12100E] p-3 rounded-xl border border-[#2E2A24] text-center flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-emerald-400">Protein</span>
                  <span className="text-lg font-black text-white mt-0.5">{currentProtein}g</span>
                  <span className="text-[9px] text-gray-400">Muscle Build</span>
                </div>

                {/* Carbs Pill */}
                <div className="bg-[#12100E] p-3 rounded-xl border border-[#2E2A24] text-center flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-amber-400">Carbs</span>
                  <span className="text-lg font-black text-white mt-0.5">{currentCarbs}g</span>
                  <span className="text-[9px] text-gray-400">Energy</span>
                </div>

                {/* Fat Pill */}
                <div className="bg-[#12100E] p-3 rounded-xl border border-[#2E2A24] text-center flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-rose-400">Fat</span>
                  <span className="text-lg font-black text-white mt-0.5">{currentFat}g</span>
                  <span className="text-[9px] text-gray-400">Lipids</span>
                </div>

                {/* Sodium Micronutrient Alert */}
                <div className="col-span-2 sm:col-span-1 bg-[#12100E] p-3 rounded-xl border border-sky-500/30 text-center flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-sky-400">Sodium</span>
                  <span className="text-lg font-black text-white mt-0.5">{currentSodium}mg</span>
                  <span className="text-[9px] text-gray-400">Electrolyte</span>
                </div>
              </div>

              {/* Action Button: Add to Itinerary / Meal Log */}
              {onAddMeal && (
                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleAddToMealLog}
                    disabled={addedToLogSuccess}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95 ${
                      addedToLogSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-terracotta to-[#E25C38] hover:opacity-95 text-white'
                    }`}
                  >
                    {addedToLogSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Logged to Meal Tracker!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Log to Itinerary &amp; Meal Tracker</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : scanResult.requires_api_key ? (
            /* CASE B: API Key Required Setup Card */
            <div className="border border-amber-500/50 bg-gradient-to-br from-[#221810] via-[#1E1B18] to-[#251A14] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl animate-scale-in">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl shrink-0">
                  🔑
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 m-0">
                    Gemini Vision API Key Required
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium m-0">
                    PlateScan AI™ requires a Google Gemini API key to run multimodal computer vision on your plate. Enter your free key below to activate live food recognition:
                  </p>
                </div>
              </div>

              {/* Inline Key Entry Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showKeyText ? "text" : "password"}
                      placeholder="Paste your free AIzaSy... key here"
                      value={inlineKeyInput}
                      onChange={(e) => setInlineKeyInput(e.target.value.trim())}
                      className="w-full px-3.5 py-2.5 pr-10 bg-[#12100E] border border-amber-500/40 rounded-xl text-xs font-mono text-white placeholder-gray-500 focus:outline-hidden focus:border-terracotta"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKeyText(!showKeyText)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                      title={showKeyText ? "Hide key" : "Show key"}
                    >
                      {showKeyText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!inlineKeyInput.trim()) {
                        alert("Please paste your Gemini API key (starts with AIzaSy...).");
                        return;
                      }
                      handleSaveApiKey(inlineKeyInput.trim());
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-terracotta to-[#E25C38] hover:opacity-95 text-white rounded-xl text-xs font-black shadow-md cursor-pointer shrink-0 transition-all active:scale-95"
                  >
                    Save &amp; Scan Dish
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] pt-1 border-t border-white/10">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:underline font-bold flex items-center gap-1"
                  >
                    <span>🔗 Get a Free API Key from Google AI Studio</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    type="button"
                    onClick={handleRunDemoSisig}
                    className="text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer text-left sm:text-right"
                  >
                    ⚡ Or Run Demo Simulation (Sizzling Sisig)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CASE C: Genuine Non-Food Detected (is_food === false) */
            <div className="border border-amber-500/50 bg-gradient-to-br from-amber-950/30 via-[#1E1B18] to-red-950/20 rounded-2xl p-4 sm:p-5 space-y-3 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl shrink-0">
                  ⚠️
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 m-0">
                    No Food Detected
                  </h4>
                  <p className="text-xs text-gray-200 font-medium m-0 leading-relaxed">
                    {scanResult.rejection_reason || "The camera frame does not appear to contain edible food or a beverage."}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium m-0 pt-1">
                    👉 <em>Please center an edible meal, dish, or beverage inside the viewfinder.</em>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* API Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1E1B18] border border-[#2E2A24] rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl text-white relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-terracotta" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white m-0">
                  Configure Gemini API Key
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed m-0 font-medium">
              PlateScan AI uses Google Gemini Multimodal Vision for continuous camera recognition. Your key is stored locally in your browser.
            </p>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                Google Gemini API Key:
              </label>
              <div className="relative">
                <input
                  type={showKeyText ? "text" : "password"}
                  placeholder="Paste AIzaSy... key here"
                  value={inlineKeyInput}
                  onChange={(e) => setInlineKeyInput(e.target.value.trim())}
                  className="w-full px-3.5 py-2.5 pr-10 bg-[#12100E] border border-[#2E2A24] rounded-xl text-xs font-mono text-white placeholder-gray-500 focus:outline-hidden focus:border-terracotta"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyText(!showKeyText)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showKeyText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta hover:underline text-[11px] font-bold flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <div className="flex items-center gap-2">
                {apiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setApiKey('');
                      setInlineKeyInput('');
                      try { localStorage.removeItem('kanyamanan_gemini_api_key'); } catch (_) { }
                      setIsKeyModalOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs text-red-400 hover:text-red-300 font-bold cursor-pointer"
                  >
                    Clear Key
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleSaveApiKey(inlineKeyInput)}
                  className="px-4 py-2 bg-gradient-to-r from-terracotta to-[#E25C38] hover:opacity-95 text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
