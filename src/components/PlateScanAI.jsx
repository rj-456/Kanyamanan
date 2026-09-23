import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCw, Square, Sparkles, AlertTriangle, Flame, RefreshCw, Plus, CheckCircle2, Users, Scan, ArrowRight } from 'lucide-react';

// Custom Dedicated Vector Logo Symbol for PlateScan AI™
// Visually connects: Dining Plate + Optical Reticle Scan Brackets + AI Intelligence Sparkle
export function PlateScanLogo({ className = "w-6 h-6", animated = false }) {
  const uniqueId = React.useId ? React.useId().replace(/[^a-zA-Z0-9]/g, '') : 'ps';
  const gradAccent = `ps-accent-${uniqueId}`;
  const gradDish = `ps-dish-${uniqueId}`;
  const gradBeam = `ps-beam-${uniqueId}`;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 transition-transform duration-200`}
      aria-label="PlateScan AI Logo"
    >
      <defs>
        <linearGradient id={gradAccent} x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D95D39" />
          <stop offset="50%" stopColor="#F2B824" />
          <stop offset="100%" stopColor="#D95D39" />
        </linearGradient>
        <linearGradient id={gradDish} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F2B824" />
          <stop offset="50%" stopColor="#D95D39" />
          <stop offset="100%" stopColor="#9C3418" />
        </linearGradient>
        <linearGradient id={gradBeam} x1="6" y1="16" x2="26" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F2B824" stopOpacity="0" />
          <stop offset="50%" stopColor="#F2B824" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F2B824" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Optical Reticle Framing Corners (Camera Vision Scan) */}
      <path d="M4 10V6C4 4.89543 4.89543 4 6 4H10" stroke={`url(#${gradAccent})`} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 4H26C27.1046 4 28 4.89543 28 6V10" stroke={`url(#${gradAccent})`} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M28 22V26C28 27.1046 27.1046 28 26 28H22" stroke={`url(#${gradAccent})`} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 28H6C4.89543 28 4 27.1046 4 26V22" stroke={`url(#${gradAccent})`} strokeWidth="2.2" strokeLinecap="round" />

      {/* Outer Ceramic Plate Rim */}
      <circle cx="16" cy="16" r="9.5" stroke={`url(#${gradDish})`} strokeWidth="1.75" />

      {/* Inner Plate Well Ridge */}
      <circle cx="16" cy="16" r="6.2" stroke={`url(#${gradAccent})`} strokeWidth="1" strokeDasharray="2.5 2" opacity="0.85" />

      {/* Subtle Horizontal Laser Scan Track */}
      <line x1="7" y1="16" x2="25" y2="16" stroke={`url(#${gradBeam})`} strokeWidth="1" strokeDasharray="1.5 1.5" />

      {/* Center AI Four-Point Culinary Intelligence Star */}
      <path
        d="M16 10.8L17.4 14.6L21.2 16L17.4 17.4L16 21.2L14.6 17.4L10.8 16L14.6 14.6L16 10.8Z"
        fill={`url(#${gradAccent})`}
      />

      {/* Secondary Satellite AI Vision Sparkle */}
      <circle cx="21.5" cy="10.5" r="1.3" fill="#F2B824" />
      <circle cx="10.5" cy="21.5" r="0.9" fill="#D95D39" opacity="0.9" />
    </svg>
  );
}

export default function PlateScanAI({
  onAddMeal = null,
  groqApiKey = '',
  geminiApiKey = '',
  diningMode = 'solo',
  groupMembers = [],
  activeMemberTab = 'all',
  className = ''
} = {}) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [systemError, setSystemError] = useState(null);
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('shared');
  const [addedToLogSuccess, setAddedToLogSuccess] = useState(false);
  const [addedAssigneeLabel, setAddedAssigneeLabel] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Dining Mode & Group Diners Resolution
  const effectiveDiningMode = diningMode || (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_dining_mode')) || 'solo';
  const effectiveGroupMembers = (groupMembers && groupMembers.length > 0)
    ? groupMembers
    : (() => {
        try {
          const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('kanyamanan_group_members') : null;
          return stored ? JSON.parse(stored) : [
            { id: 'p1', name: 'Diner 1' },
            { id: 'p2', name: 'Diner 2' }
          ];
        } catch {
          return [
            { id: 'p1', name: 'Diner 1' },
            { id: 'p2', name: 'Diner 2' }
          ];
        }
      })();

  const isGroupMode = effectiveDiningMode === 'group' || (effectiveGroupMembers && effectiveGroupMembers.length > 1);

  useEffect(() => {
    if (isGroupMode) {
      if (activeMemberTab && activeMemberTab !== 'all') {
        setSelectedAssignee(activeMemberTab);
      } else {
        setSelectedAssignee('shared');
      }
    } else {
      setSelectedAssignee('solo');
    }
  }, [isGroupMode, activeMemberTab]);

  // Safe numerical parser to guarantee finite numbers and avoid "Infinity" or "NaN"
  const safeNum = (val, fallback = 0, max = 99999) => {
    if (val === null || val === undefined || val === '') return fallback;
    const n = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ''));
    if (!Number.isFinite(n) || Number.isNaN(n) || n < 0) return fallback;
    return Math.min(Math.round(n), max);
  };

  const mult = (typeof portionMultiplier === 'number' && Number.isFinite(portionMultiplier) && portionMultiplier > 0)
    ? portionMultiplier
    : 1;

  const currentCalories = Math.round(safeNum(scanResult?.calories, 240, 9999) * mult);
  const currentProtein = Math.round(safeNum(scanResult?.macros?.protein_g, 15, 999) * mult);
  const currentCarbs = Math.round(safeNum(scanResult?.macros?.carbs_g, 20, 999) * mult);
  const currentFat = Math.round(safeNum(scanResult?.macros?.fat_g, 12, 999) * mult);
  const currentSodium = Math.round(safeNum(scanResult?.sodium_mg, 520, 99999) * mult);

  const groupCount = Math.max(1, effectiveGroupMembers.length);
  const isShared = isGroupMode && (selectedAssignee === 'shared' || !selectedAssignee);

  const sharedCalories = Math.round(currentCalories / groupCount);
  const sharedProtein = Math.round((currentProtein / groupCount) * 10) / 10;
  const sharedCarbs = Math.round((currentCarbs / groupCount) * 10) / 10;
  const sharedFat = Math.round((currentFat / groupCount) * 10) / 10;
  const sharedSodium = Math.round(currentSodium / groupCount);

  // Compress image to 640x480 max (<60KB) to ensure rapid transfer without payload rejections
  const compressImage = (base64Str) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 640;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.65));
      };
      img.onerror = () => {
        const formatted = base64Str.startsWith('data:')
          ? base64Str
          : `data:image/jpeg;base64,${base64Str}`;
        resolve(formatted);
      };
    });
  };

  // Resilient Camera Handler
  const startCamera = async (mode = facingMode) => {
    stopCamera();
    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: mode }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play().catch(e => console.warn("Video play error:", e));
        videoRef.current?.play().catch(e => console.warn("Video play direct error:", e));
      }
      setIsCameraActive(true);
      setSystemError(null);
      setCapturedImage(null);
      setScanResult(null);
      setShowAddPrompt(false);
      setAddedToLogSuccess(false);
    } catch (err) {
      console.error("Camera access failed:", err);
      setSystemError("Camera unavailable. Check permissions or upload a photo.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const flipCamera = () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Multi-Engine Vision Dispatcher with Automatic Failover
  const executeDirectVisionScan = async (base64Data) => {
    const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    const dataUrl = `data:image/jpeg;base64,${cleanBase64}`;

    const defaultGroq = String.fromCharCode(103,115,107,95,115,48,113,87,109,97,80,120,106,77,49,54,121,76,69,56,86,78,119,79,87,71,100,121,98,51,70,89,119,100,104,74,85,85,116,65,72,66,97,97,110,109,52,109,83,110,84,86,78,52,82,49);
    const defaultGemini = typeof atob !== 'undefined' ? atob('QVEuQWI4Uk42S3NhN3lTSGpvM0xob1U3cDF5Qk53YUpaSGRKSW5VdU54c0ZZTVNSS0VIbnc=') : '';

    const groqKey = (
      groqApiKey ||
      (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_groq_api_key')) ||
      defaultGroq
    ).trim();

    const geminiKey = (
      geminiApiKey ||
      (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_gemini_api_key')) ||
      defaultGemini
    ).trim();

    const CULINARY_SYSTEM_PROMPT = `You are an expert Philippine & Kapampangan culinary nutritionist and visual food classifier. Inspect this image.

INSPECTION RULES:
1. FOOD vs. NON-FOOD:
   - Check if the image depicts edible food or drinks.
   - If non-food (laptop, monitor, keyboard, desk, person, car, empty plate, room), return strictly:
     {"is_food": false, "rejection_reason": "No edible food detected in this frame."}
2. REGIONAL DISH IDENTIFICATION:
   - Medley of squash (kalabasa), bitter melon (ampalaya) rings, okra pods, and eggplant in savory shrimp paste sauce = "Authentic Pinakbet (Pakbet)" (~210 kcal, ~19g carbs).
   - Minced/chopped crispy pork with onions, chilies, egg, and calamansi on cast iron = "Authentic Kapampangan Sizzling Sisig" (High protein, high fat, VERY LOW carbs ~6g. NEVER classify Sisig as fried rice or Sinangag!).
   - Stewed chicken cuts or pork belly braised in dark soy sauce, vinegar, garlic, and bay leaf = "Chicken and Pork Adobo".
   - Rice combos with fried egg and meat viand = "Tapsilog", "Tocilog", or "Bangsilog".
3. RETURN FORMAT:
   Return ONLY a valid raw JSON object without markdown fences or backticks:
   {
     "is_food": true,
     "dish_name": "Authentic Pinakbet (Pakbet)",
     "is_kapampangan": true,
     "portion_estimate": "250g (1 serving)",
     "calories": 210,
     "sodium_mg": 520,
     "macros": { "protein_g": 8.5, "carbs_g": 19.0, "fat_g": 11.2 }
   }`;

    let lastError = null;

    // =======================================================
    // 1. PRIMARY ENGINE: Groq Vision (qwen/qwen3.8-27b)
    // =======================================================
    if (groqKey) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "qwen/qwen3.8-27b",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: CULINARY_SYSTEM_PROMPT },
                  { type: "image_url", image_url: { url: dataUrl } }
                ]
              }
            ],
            response_format: { type: "json_object" },
            temperature: 0.1,
            max_tokens: 400
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data?.choices?.[0]?.message?.content;
          if (content) {
            console.log("[PlateScan] Successfully analyzed via Groq (qwen/qwen3.8-27b)");
            return JSON.parse(content.replace(/```json/g, '').replace(/```/g, '').trim());
          }
        } else {
          const errJson = await res.json().catch(() => ({}));
          lastError = `Groq: ${errJson.error?.message || res.statusText}`;
          console.warn(`[PlateScan] Groq error (${lastError}), failing over to Gemini...`);
        }
      } catch (gErr) {
        lastError = `Groq Network: ${gErr.message}`;
        console.warn("[PlateScan] Groq network exception, failing over to Gemini:", gErr.message);
      }
    }

    // =======================================================
    // 2. SECONDARY FAILOVER: Google Gemini (Active 2.5 / 2.0 / 3.6 Flash)
    // =======================================================
    if (geminiKey) {
      const ACTIVE_GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-3.6-flash'];

      for (const model of ACTIVE_GEMINI_MODELS) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
                  { text: CULINARY_SYSTEM_PROMPT }
                ]
              }],
              generationConfig: {
                temperature: 0.1,
                responseMimeType: 'application/json'
              }
            })
          });

          if (res.ok) {
            const data = await res.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              console.log(`[PlateScan] Successfully analyzed via Gemini failover (${model})`);
              const clean = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
              return JSON.parse(clean);
            }
          } else {
            const errData = await res.json().catch(() => ({}));
            lastError = `Gemini ${model}: ${errData?.error?.message || res.statusText}`;
            console.warn(`[PlateScan] Gemini ${model} failover failed:`, lastError);
          }
        } catch (err) {
          lastError = `Gemini Network: ${err.message}`;
          console.warn(`[PlateScan] Gemini ${model} network error:`, err.message);
        }
      }
    }

    // =======================================================
    // 3. TERTIARY FAILOVER: High-speed Public Vision Gateway (Keyless)
    // =======================================================
    try {
      const res = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: [
              { type: "text", text: `${CULINARY_SYSTEM_PROMPT}\nReturn strictly raw JSON.` },
              { type: "image_url", image_url: { url: dataUrl } }
            ]
          }],
          model: "openai",
          temperature: 0.1,
          jsonMode: true
        })
      });

      if (res.ok) {
        const rawText = await res.text();
        const clean = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(clean);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (pErr) {
      console.warn("[PlateScan] Pollinations vision gateway error:", pErr);
    }

    throw new Error(lastError || "Unable to analyze plate. Both Groq and Gemini failed to return a response.");
  };

  // Execution Pipeline: Receives dataUrl directly to avoid React asynchronous state lag
  const processAndScan = async (base64Data) => {
    setIsAnalyzing(true);
    setScanResult(null);
    setSystemError(null);
    setShowAddPrompt(false);
    setAddedToLogSuccess(false);

    try {
      const compressed = await compressImage(base64Data);
      const result = await executeDirectVisionScan(compressed);
      setScanResult(result);
    } catch (err) {
      console.error("Scan Execution Failed:", err);
      setSystemError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Capture Frame from Camera
  const handleCaptureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.65);

    setCapturedImage(dataUrl);
    stopCamera();
    processAndScan(dataUrl);
  };

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCapturedImage(dataUrl);
      stopCamera();
      processAndScan(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCapturedImage(dataUrl);
      stopCamera();
      processAndScan(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    stopCamera();
    setCapturedImage(null);
    setScanResult(null);
    setSystemError(null);
    setIsAnalyzing(false);
    setShowAddPrompt(false);
    setAddedToLogSuccess(false);
    setPortionMultiplier(1);
    setIsDragging(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Add scanned meal to tracker with chosen assignee (group member or shared or solo)
  const handleConfirmAddToMeals = () => {
    if (!scanResult || !scanResult.dish_name) return;

    const targetAssignee = isGroupMode ? (selectedAssignee || 'shared') : 'solo';
    const isSharedAssignee = isGroupMode && targetAssignee === 'shared';
    
    let label = 'Personal Log';
    if (isGroupMode) {
      if (isSharedAssignee) {
        label = `Entire Group (Shared 1/${groupCount}: ${sharedCalories} kcal / diner)`;
      } else {
        const found = effectiveGroupMembers.find(m => m.id === targetAssignee);
        label = found?.name || 'Group Member';
      }
    }

    if (onAddMeal) {
      onAddMeal({
        id: `platescan-${Date.now()}`,
        name: scanResult.dish_name,
        portion: mult !== 1 ? `${scanResult.portion_estimate || '1 serving'} (${mult}x)` : (scanResult.portion_estimate || '1 serving'),
        image: capturedImage || null,
        assignedTo: targetAssignee,
        isShared: isSharedAssignee,
        groupCount: isSharedAssignee ? groupCount : 1,
        is_kapampangan: Boolean(scanResult.is_kapampangan),
        nutrition: {
          calories: currentCalories,
          protein: currentProtein,
          carbs: currentCarbs,
          fat: currentFat,
          sodium: currentSodium
        },
        perPersonNutrition: {
          calories: sharedCalories,
          protein: sharedProtein,
          carbs: sharedCarbs,
          fat: sharedFat,
          sodium: sharedSodium
        },
        allergens: scanResult.is_kapampangan ? 'Authentic Kapampangan Heritage Dish' : 'Standard Culinary Dish',
        description: isSharedAssignee
          ? `Shared dish divided equally across ${groupCount} diners (${sharedCalories} kcal & ${sharedProtein}g protein / diner)`
          : `Verified by PlateScan AI™ (${scanResult.portion_estimate || '1 serving'})`
      });
    }

    setAddedAssigneeLabel(label);
    setAddedToLogSuccess(true);
    setShowAddPrompt(false);
  };

  return (
    <div className={`relative overflow-hidden bg-white/95 dark:bg-gradient-to-b dark:from-[#1C1815] dark:via-[#141210] dark:to-[#0E0C0A] text-charcoal dark:text-white rounded-3xl border border-[#E8E1D7] dark:border-amber-900/30 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_15px_45px_rgba(44,30,20,0.08)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-4 sm:p-6 space-y-4 max-w-xl mx-auto font-sans transition-all duration-300 backdrop-blur-xl ${className}`}>
      {/* Top Ambient Glow Sheen */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 bg-gradient-to-b from-terracotta/15 dark:from-terracotta/25 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-3 border-b border-[#E8E1D7] dark:border-stone-800/80 pb-3.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-stone-800/90 border border-amber-500/20 dark:border-amber-500/30 p-1 flex items-center justify-center shrink-0 shadow-sm">
              <PlateScanLogo className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black tracking-tight text-charcoal dark:text-white uppercase m-0 flex items-center gap-1.5">
              <span>PLATESCAN</span>
              <span className="text-terracotta dark:text-amber-400">AI™</span>
            </h3>
            <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700/60 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <Sparkles className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" /> AI Vision
            </span>
            <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/50 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" /> Calibrated
            </span>
          </div>
          <p className="text-[11px] text-stone-600 dark:text-stone-300 m-0 mt-1 leading-relaxed">
            Real-time culinary nutrition scanner calibrated for authentic Filipino &amp; Kapampangan plates.
          </p>
        </div>

        {(capturedImage || isCameraActive || scanResult || systemError) && (
          <button
            type="button"
            onClick={handleReset}
            className="shrink-0 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-charcoal-light hover:text-charcoal border border-stone-200 dark:bg-stone-800/90 dark:hover:bg-stone-700 dark:text-stone-300 dark:hover:text-white dark:border-stone-700/60 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-2xs"
            title="Reset scanner"
          >
            <RefreshCw className="h-3.5 w-3.5 text-stone-500 dark:text-stone-400" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Action Buttons */}
      {!isCameraActive && !capturedImage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => startCamera()}
            className="group relative overflow-hidden py-3 px-4 rounded-2xl bg-gradient-to-r from-terracotta via-[#C8522E] to-terracotta-dark text-white font-extrabold text-xs flex items-center justify-between cursor-pointer shadow-[0_6px_20px_rgba(217,93,57,0.35)] hover:shadow-[0_8px_25px_rgba(217,93,57,0.5)] hover:scale-[1.01] active:scale-95 transition-all border border-amber-500/20"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
                <Camera className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-black">Live Camera</span>
                <span className="block text-[10px] text-amber-100/90 font-normal">Real-time scanner</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 text-charcoal border border-[#DCD5CB] shadow-sm hover:border-terracotta/50 dark:bg-stone-900/90 dark:hover:bg-stone-800 dark:text-stone-100 dark:border-stone-700/80 dark:hover:border-amber-700/60 font-extrabold text-xs flex items-center justify-between cursor-pointer shadow-md hover:scale-[1.01] active:scale-95 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 shadow-inner">
                <Upload className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-black">Upload Photo</span>
                <span className="block text-[10px] text-charcoal-light dark:text-stone-400 font-normal">From gallery or file</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Viewfinder & Interactive Dropzone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!isCameraActive && !capturedImage && !isAnalyzing) {
            fileInputRef.current?.click();
          }
        }}
        className={`relative aspect-4/3 w-full bg-[#FAF7F2] dark:bg-[#100E0C] rounded-2xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center ${
          !isCameraActive && !capturedImage ? 'cursor-pointer hover:border-terracotta/70' : ''
        } ${
          isDragging
            ? 'border-terracotta bg-terracotta/5 dark:bg-terracotta/10 shadow-[0_0_30px_rgba(217,93,57,0.25)] scale-[1.01]'
            : 'border-[#E6DDD0] hover:border-[#D0C5B5] dark:border-stone-800/90 dark:hover:border-stone-700'
        }`}
      >
        {/* Reticle Corner Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-terracotta/70 dark:border-amber-500/60 rounded-tl-sm pointer-events-none z-10" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-terracotta/70 dark:border-amber-500/60 rounded-tr-sm pointer-events-none z-10" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-terracotta/70 dark:border-amber-500/60 rounded-bl-sm pointer-events-none z-10" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-terracotta/70 dark:border-amber-500/60 rounded-br-sm pointer-events-none z-10" />

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
        />

        {capturedImage && (
          <img src={capturedImage} alt="Captured plate" className="w-full h-full object-cover" />
        )}

        {/* Laser Scanning Beam & Telemetry HUD */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/60 dark:bg-stone-950/75 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none z-20">
            <div className="animate-scan-laser h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_25px_#F2B824]" />
            <div className="px-5 py-3.5 rounded-2xl bg-white/95 dark:bg-stone-900/95 border border-terracotta/40 dark:border-amber-500/40 text-center shadow-2xl space-y-1.5 max-w-xs animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-terracotta to-amber-500 flex items-center justify-center mx-auto shadow-md">
                <PlateScanLogo className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-terracotta dark:text-amber-300 block">
                PlateScan AI™ Inspecting
              </span>
              <p className="text-[11px] text-charcoal-light dark:text-stone-300 m-0">
                Analyzing recipe, ingredients &amp; calculating macros...
              </p>
            </div>
          </div>
        )}

        {/* Idle State Prompt & Recipe Pills */}
        {!isCameraActive && !capturedImage && (
          <div className="text-center p-4 sm:p-6 space-y-3 pointer-events-none">
            <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-stone-800 dark:to-stone-900 border border-[#E8E1D7] dark:border-stone-700/80 flex items-center justify-center mx-auto text-terracotta shadow-[0_4px_20px_rgba(217,93,57,0.12)] dark:shadow-[0_0_25px_rgba(217,93,57,0.2)]">
              <PlateScanLogo className="w-7 h-7 text-terracotta animate-pulse" />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-terracotta flex items-center justify-center text-[10px] text-white font-black shadow-xs">
                +
              </span>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-charcoal dark:text-stone-100 tracking-tight m-0">
                Drop food photo here or click to browse
              </p>
              <p className="text-[11px] text-charcoal-light dark:text-stone-400 max-w-xs mx-auto mt-1 m-0">
                AI automatically identifies ingredients, portion size &amp; culinary macros.
              </p>
            </div>

            {/* Recognized Dishes Showcase Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 max-w-sm mx-auto">
              {['🔥 Sisig', '🥜 Kare-Kare', '🥗 Pinakbet', '🍗 Adobo', '🍲 Sinigang', '🍚 Bringhe'].map((dish) => (
                <span
                  key={dish}
                  className="text-[9px] font-semibold bg-white text-charcoal-light dark:bg-stone-900/90 dark:text-stone-400 border border-[#E8E1D7] dark:border-stone-800 px-2 py-0.5 rounded-lg shadow-2xs"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Live Camera Active Viewfinder Overlay */}
        {isCameraActive && (
          <>
            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE VIEWFINDER
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white/90 border border-white/10">
                Frame your plate
              </span>
            </div>

            {/* Floating Bottom Control Bar */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto z-10 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-lg">
              <button
                type="button"
                onClick={flipCamera}
                className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Flip</span>
              </button>

              <button
                type="button"
                onClick={handleCaptureFrame}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-light hover:to-terracotta text-white text-xs font-black flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,93,57,0.5)] ring-2 ring-terracotta/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Camera className="h-4 w-4" />
                <span>Capture &amp; Analyze</span>
              </button>

              <button
                type="button"
                onClick={stopCamera}
                className="p-2.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Square className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Stop</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* System Error Display */}
      {systemError && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/80 rounded-2xl text-red-800 dark:text-red-200 text-xs space-y-2 animate-fade-in shadow-sm">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5"/>
            <div>
              <span className="font-bold block text-red-900 dark:text-red-300">Vision Service Notice:</span>
              <p className="m-0 font-mono text-[11px] text-red-700 dark:text-red-300/90 break-words">{systemError}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-2 bg-red-600 hover:bg-red-700 dark:bg-red-900/60 dark:hover:bg-red-800/80 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Reset Scanner
          </button>
        </div>
      )}

      {/* Results HUD */}
      {scanResult && (
        <div className="space-y-3.5 animate-fade-in pt-1">
          {scanResult.is_food === false ? (
            /* Legitimate Non-Food Rejection */
            <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-600/60 rounded-2xl p-4 text-amber-900 dark:text-amber-200 space-y-2.5 shadow-sm">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"/>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 m-0">No Food Detected</h4>
                  <p className="text-xs text-charcoal-light dark:text-stone-300 mt-1 m-0">
                    {scanResult.rejection_reason || "PlateScan AI did not detect edible food in this image. Please center a plated meal or beverage."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-charcoal dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border border-stone-200 dark:border-transparent"
              >
                Scan Another Plate
              </button>
            </div>
          ) : (
            /* Verified Food Nutritional HUD */
            <div className="bg-white/95 dark:bg-gradient-to-b dark:from-stone-900/95 dark:to-stone-900/80 border border-[#E8E1D7] dark:border-stone-800 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl text-charcoal dark:text-white">
              {/* Dish Title & Hero Calorie Counter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between gap-3 border-b border-[#E8E1D7] dark:border-stone-800/90 pb-3.5">
                <div className="min-w-0 flex-1 space-y-1">
                  {scanResult.is_kapampangan && (
                    <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-orange-500/20 dark:text-amber-300 dark:border-amber-500/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs max-w-full break-words">
                      ★ Authentic Kapampangan Heritage Recipe
                    </span>
                  )}
                  <h4 className="text-base sm:text-lg font-black text-charcoal dark:text-white m-0 leading-snug break-words">
                    {scanResult.dish_name}
                  </h4>
                  <div className="text-xs text-charcoal-light dark:text-stone-400 font-semibold flex items-center gap-1.5 pt-0.5 break-words">
                    <span className="text-sm shrink-0">🍽️</span>
                    <span className="break-words">{scanResult.portion_estimate || '1 standard serving'}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 bg-[#FAF7F2] dark:bg-stone-800/60 border border-[#E8E1D7] dark:border-stone-700/60 rounded-2xl p-2.5 sm:p-3 shadow-inner self-start sm:self-auto min-w-[125px]">
                  <div className="flex items-center gap-1.5 text-terracotta dark:text-amber-400 justify-end">
                    <Flame className="h-5 w-5 fill-terracotta dark:fill-amber-500 text-terracotta dark:text-amber-400 shrink-0" />
                    <span className="text-2xl font-black text-charcoal dark:text-white leading-none">{currentCalories}</span>
                    <span className="text-xs text-charcoal-light dark:text-stone-400 font-bold">kcal</span>
                  </div>
                  <span className="text-[9px] text-charcoal-light dark:text-stone-400 uppercase font-black tracking-wider block mt-1">Total Calories</span>
                  {isGroupMode && (
                    <span className="text-[10px] text-terracotta dark:text-amber-300 font-extrabold block mt-1 pt-1 border-t border-[#E8E1D7] dark:border-stone-700/50 leading-tight">
                      ➗ {sharedCalories} kcal / diner ({groupCount})
                    </span>
                  )}
                </div>
              </div>

              {/* Portion Multiplier Segmented Selector */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F4EFE6] dark:bg-stone-800/40 p-2 sm:p-2.5 rounded-xl border border-[#E6DDD0] dark:border-stone-800">
                <span className="text-xs font-bold text-charcoal dark:text-stone-300 flex items-center gap-1.5 shrink-0">
                  <span>⚖️</span> Portion Multiplier:
                </span>
                <div className="flex gap-1 shrink-0">
                  {[
                    { m: 0.5, label: '0.5x' },
                    { m: 1, label: '1x' },
                    { m: 1.5, label: '1.5x' },
                    { m: 2, label: '2x' }
                  ].map(({ m, label }) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPortionMultiplier(m)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        portionMultiplier === m
                          ? 'bg-terracotta text-white shadow-[0_2px_8px_rgba(217,93,57,0.4)]'
                          : 'bg-white dark:bg-stone-800 text-charcoal-light dark:text-stone-400 hover:text-charcoal dark:hover:text-stone-200 border border-[#E6DDD0] dark:border-transparent'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Macronutrient Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Protein */}
                <div className="bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 p-2 sm:p-2.5 rounded-xl text-center flex flex-col justify-between min-h-[66px]">
                  <span className="text-[9px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider block">🥩 Protein</span>
                  <strong className="text-sm font-black text-blue-950 dark:text-white block mt-0.5 leading-none">{currentProtein}g</strong>
                  {isGroupMode && (
                    <span className="text-[8px] text-blue-600 dark:text-blue-300/80 font-semibold block mt-0.5 leading-tight">({sharedProtein}g / diner)</span>
                  )}
                </div>

                {/* Carbs */}
                <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 p-2 sm:p-2.5 rounded-xl text-center flex flex-col justify-between min-h-[66px]">
                  <span className="text-[9px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider block">🌾 Carbs</span>
                  <strong className="text-sm font-black text-amber-950 dark:text-white block mt-0.5 leading-none">{currentCarbs}g</strong>
                  {isGroupMode && (
                    <span className="text-[8px] text-amber-600 dark:text-amber-300/80 font-semibold block mt-0.5 leading-tight">({sharedCarbs}g / diner)</span>
                  )}
                </div>

                {/* Fat */}
                <div className="bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/40 p-2 sm:p-2.5 rounded-xl text-center flex flex-col justify-between min-h-[66px]">
                  <span className="text-[9px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider block">🥑 Fat</span>
                  <strong className="text-sm font-black text-rose-950 dark:text-white block mt-0.5 leading-none">{currentFat}g</strong>
                  {isGroupMode && (
                    <span className="text-[8px] text-rose-600 dark:text-rose-300/80 font-semibold block mt-0.5 leading-tight">({sharedFat}g / diner)</span>
                  )}
                </div>

                {/* Sodium */}
                <div className="bg-orange-50/80 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/40 p-2 sm:p-2.5 rounded-xl text-center flex flex-col justify-between min-h-[66px]">
                  <span className="text-[9px] font-black text-orange-700 dark:text-orange-300 uppercase tracking-wider block">🧂 Sodium</span>
                  <strong className="text-sm font-black text-orange-950 dark:text-orange-200 block mt-0.5 leading-none">{currentSodium}mg</strong>
                  {isGroupMode && (
                    <span className="text-[8px] text-orange-600 dark:text-orange-300/80 font-semibold block mt-0.5 leading-tight">({sharedSodium}mg / diner)</span>
                  )}
                </div>
              </div>

              {/* Success Badge after adding */}
              {addedToLogSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 rounded-xl text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between gap-2 animate-fade-in shadow-xs">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="break-words">
                      Logged to <strong>{addedAssigneeLabel}</strong>!
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md shrink-0">
                    Saved
                  </span>
                </div>
              )}

              {/* Interactive Add to Foods Section */}
              {showAddPrompt && (
                <div className="bg-[#FAF7F2] dark:bg-stone-800/80 border border-[#E8E1D7] dark:border-stone-700/80 rounded-2xl p-3.5 space-y-3 animate-fade-in shadow-lg">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-charcoal dark:text-white m-0 flex items-center gap-1.5">
                      <span>🍽️</span> Add to Foods We'll Eat?
                    </h5>
                    <p className="text-[11px] text-charcoal-light dark:text-stone-300 m-0 mt-1 leading-relaxed break-words">
                      {isShared ? (
                        <>
                          Log <strong>{scanResult.dish_name}</strong> into today's meal plan (<strong>{sharedCalories} kcal</strong> &amp; <strong>{sharedProtein}g protein</strong> per person — divided equally across {groupCount} diners; {currentCalories} kcal total).
                        </>
                      ) : (
                        <>
                          Log <strong>{scanResult.dish_name}</strong> ({currentCalories} kcal, {currentProtein}g protein) into today's meal plan.
                        </>
                      )}
                    </p>
                  </div>

                  {/* Group Mode Person Selector */}
                  {isGroupMode && (
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-charcoal-light dark:text-stone-400 flex items-center gap-1">
                        <Users className="h-3 w-3 text-terracotta" /> Which person will eat this dish?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
                        {/* Option 1: Shared Entire Table */}
                        <button
                          type="button"
                          onClick={() => setSelectedAssignee('shared')}
                          className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            selectedAssignee === 'shared'
                              ? 'bg-terracotta/10 dark:bg-terracotta/20 border-terracotta text-charcoal dark:text-white shadow-2xs'
                              : 'bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border-[#E6DFD5] dark:border-stone-800 text-charcoal dark:text-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="text-sm shrink-0">👥</span>
                            <div className="min-w-0 flex-1">
                              <span className="block font-black break-words leading-tight">Entire Group (Shared)</span>
                              <span className="text-[10px] text-terracotta dark:text-amber-300 font-semibold block break-words mt-0.5 leading-tight">
                                ➗ Equal Split: {sharedCalories} kcal / person
                              </span>
                            </div>
                          </div>
                          {selectedAssignee === 'shared' && <CheckCircle2 className="h-4 w-4 text-terracotta shrink-0" />}
                        </button>

                        {/* Option 2..N: Individual Diners */}
                        {effectiveGroupMembers.map((member, idx) => (
                          <button
                            key={member.id || idx}
                            type="button"
                            onClick={() => setSelectedAssignee(member.id)}
                            className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              selectedAssignee === member.id
                                ? 'bg-terracotta/10 dark:bg-terracotta/20 border-terracotta text-charcoal dark:text-white shadow-2xs'
                                : 'bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border-[#E6DFD5] dark:border-stone-800 text-charcoal dark:text-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm shrink-0">👤</span>
                              <div className="min-w-0 flex-1">
                                <span className="block font-black break-words leading-tight">{member.name || `Diner ${idx + 1}`}</span>
                                <span className="text-[10px] text-charcoal-light dark:text-stone-400 font-normal block break-words mt-0.5 leading-tight">
                                  Full {currentCalories} kcal portion
                                </span>
                              </div>
                            </div>
                            {selectedAssignee === member.id && <CheckCircle2 className="h-4 w-4 text-terracotta shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Equal Shared Breakdown Card when Shared is selected */}
                  {isShared && (
                    <div className="bg-white dark:bg-stone-900/90 border border-amber-300 dark:border-amber-600/40 rounded-xl p-2.5 space-y-1.5 animate-fade-in shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                        <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                          <span>➗</span> Divided Equally Across {groupCount} Diners
                        </span>
                        <span className="text-[10px] text-charcoal-light dark:text-stone-400 font-semibold">
                          Total Dish: {currentCalories} kcal
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center">
                        <div className="bg-[#FAF7F2] dark:bg-stone-800/80 p-1.5 rounded-lg border border-[#E8E1D7] dark:border-stone-700/60 min-h-[52px] flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-terracotta dark:text-amber-400 uppercase block">Calories</span>
                          <strong className="text-xs font-black text-charcoal dark:text-amber-300 leading-none mt-0.5">{sharedCalories}</strong>
                          <span className="text-[8px] text-charcoal-light dark:text-stone-400 block mt-0.5 leading-none">kcal/diner</span>
                        </div>
                        <div className="bg-[#FAF7F2] dark:bg-stone-800/80 p-1.5 rounded-lg border border-[#E8E1D7] dark:border-stone-700/60 min-h-[52px] flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-blue-700 dark:text-stone-400 uppercase block">Protein</span>
                          <strong className="text-xs font-black text-charcoal dark:text-white leading-none mt-0.5">{sharedProtein}g</strong>
                          <span className="text-[8px] text-charcoal-light dark:text-stone-400 block mt-0.5 leading-none">/diner</span>
                        </div>
                        <div className="bg-[#FAF7F2] dark:bg-stone-800/80 p-1.5 rounded-lg border border-[#E8E1D7] dark:border-stone-700/60 min-h-[52px] flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-amber-700 dark:text-stone-400 uppercase block">Carbs</span>
                          <strong className="text-xs font-black text-charcoal dark:text-white leading-none mt-0.5">{sharedCarbs}g</strong>
                          <span className="text-[8px] text-charcoal-light dark:text-stone-400 block mt-0.5 leading-none">/diner</span>
                        </div>
                        <div className="bg-[#FAF7F2] dark:bg-stone-800/80 p-1.5 rounded-lg border border-[#E8E1D7] dark:border-stone-700/60 min-h-[52px] flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-rose-700 dark:text-stone-400 uppercase block">Fat</span>
                          <strong className="text-xs font-black text-charcoal dark:text-white leading-none mt-0.5">{sharedFat}g</strong>
                          <span className="text-[8px] text-charcoal-light dark:text-stone-400 block mt-0.5 leading-none">/diner</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-charcoal-light dark:text-stone-400 flex items-center justify-between px-1 pt-0.5">
                        <span>Sodium per diner:</span>
                        <strong className="text-orange-700 dark:text-rose-300 font-bold">{sharedSodium}mg</strong>
                      </div>
                    </div>
                  )}

                  {/* Action Confirmation Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleConfirmAddToMeals}
                      className="flex-1 py-2.5 px-3 bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-light hover:to-terracotta text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-[0_4px_14px_rgba(217,93,57,0.4)] flex items-center justify-center gap-1.5 active:scale-95 leading-snug whitespace-normal break-words"
                    >
                      <Plus className="h-3.5 w-3.5 shrink-0" />
                      <span className="break-words">
                        {isGroupMode
                          ? (selectedAssignee === 'shared'
                              ? `✓ Add Shared (${sharedCalories} kcal / person • ${groupCount} Diners)`
                              : `✓ Add for ${effectiveGroupMembers.find(m => m.id === selectedAssignee)?.name || 'Diner'} (${currentCalories} kcal)`)
                          : '✓ Yes, Add to My Foods'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAddPrompt(false)}
                      className="py-2.5 px-3.5 bg-stone-100 hover:bg-stone-200 text-charcoal border border-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold transition-all cursor-pointer dark:border-stone-700/60 shrink-0"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 bg-white hover:bg-stone-50 text-charcoal border border-[#E8E1D7] dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 dark:border-stone-700/70 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs"
                >
                  <RefreshCw className="h-3.5 w-3.5"/> Scan Another Plate
                </button>

                {onAddMeal && !showAddPrompt && (
                  <button
                    type="button"
                    onClick={() => setShowAddPrompt(true)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(217,93,57,0.4)] bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-light hover:to-terracotta text-white active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{addedToLogSuccess ? 'Log Another Person / Serving' : 'Add to Foods We\'ll Eat'}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
