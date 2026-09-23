import React, { useState, useRef } from 'react';
import { Sparkles, Upload, X, FileText, CheckCircle2, Loader2, Award, AlertTriangle, Utensils, Users, Flame } from 'lucide-react';
import { catalogMenuWithAi } from '../djangoApi';
import { cleanMenuOcrSpelling, sanitizeMenuCatalog } from '../utils/menuOcrCleaner';

/**
 * AI Menu OCR & Automatic Dish Cataloger Component
 * Conforms to UI & Layout Specifications and the structured multimodal vision schema.
 */
export default function AiMenuCataloger({
  onApplyDishes = null,
  onOpenAiConfig = null,
  geminiApiKey = ''
}) {
  const [images, setImages] = useState([]);
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Parsing Menu Structure & Buffets...');
  const [catalogResult, setCatalogResult] = useState(null);
  const [activeTab, setActiveTab] = useState('dishes'); // 'dishes' | 'packages'
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Handle Multi-File Upload (.jpg, .png, .webp, .pdf)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    Promise.all(
      files.map(file => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          dataUrl: reader.result,
          name: file.name,
          type: file.type || 'image/jpeg',
          size: (file.size / 1024).toFixed(1) + ' KB'
        });
        reader.readAsDataURL(file);
      }))
    ).then(newImages => {
      setImages(prev => [...prev, ...newImages]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    });
  };

  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleClearAllImages = () => {
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Pre-process & run multi-column OCR on image before sending to cataloger
  const runOcrOnImage = async (dataUrl) => {
    // 1. Try table-aware Cloud OCR Space first
    try {
      const formData = new FormData();
      formData.append('base64Image', dataUrl);
      formData.append('language', 'eng');
      formData.append('isTable', 'true');
      formData.append('scale', 'true');
      formData.append('detectOrientation', 'true');
      formData.append('OCREngine', '2');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: { apikey: 'K88574744288957' },
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const text = data?.ParsedResults?.[0]?.ParsedText;
        if (text && text.trim().length > 10) {
          return text.trim();
        }
      }
    } catch {
      // fall through to Tesseract
    }

    // 2. Client-side Tesseract.js fallback
    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng');
      const ret = await worker.recognize(dataUrl);
      await worker.terminate();
      return ret?.data?.text || '';
    } catch (tErr) {
      console.warn("Tesseract OCR fallback failed:", tErr);
      return '';
    }
  };

  // Run AI Cataloging
  const handleAnalyze = async () => {
    if (images.length === 0 && !rawText.trim()) {
      alert("Please upload at least one menu photo/flyer or paste raw menu text to analyze.");
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Scanning menu items & structure...');

    try {
      let textToProcess = rawText.trim();

      // If user uploaded image(s) but did not paste raw text, perform OCR extraction first
      if (images.length > 0 && !textToProcess) {
        setLoadingMessage('Reading multi-column menu text with OCR...');
        const ocrResults = [];
        for (let idx = 0; idx < images.length; idx++) {
          const img = images[idx];
          const rawData = typeof img === 'string' ? img : img.dataUrl;
          if (rawData) {
            setLoadingMessage(`Scanning photo ${idx + 1} of ${images.length}...`);
            const extracted = await runOcrOnImage(rawData);
            if (extracted) ocrResults.push(cleanMenuOcrSpelling(extracted));
          }
        }
        if (ocrResults.length > 0) {
          textToProcess = cleanMenuOcrSpelling(ocrResults.join('\n\n'));
        }
      } else if (textToProcess) {
        textToProcess = cleanMenuOcrSpelling(textToProcess);
      }

      setLoadingMessage('Categorizing dishes, prices, allergens & kcal...');
      const result = await catalogMenuWithAi({
        rawText: textToProcess,
        images: images,
        apiKey: geminiApiKey || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || ''
      });

      if (result) {
        // Sanitize dishes, packages, remove phone/decimal junk, fix categories & prices
        const sanitizedResult = sanitizeMenuCatalog(result, textToProcess);
        setCatalogResult(sanitizedResult);
        // Default to whichever tab has items
        if ((!sanitizedResult.dishes || sanitizedResult.dishes.length === 0) && (sanitizedResult.buffet_and_set_packages && sanitizedResult.buffet_and_set_packages.length > 0)) {
          setActiveTab('packages');
        } else {
          setActiveTab('dishes');
        }
      }
    } catch (err) {
      console.error("AI Cataloger Error:", err);
      alert("Failed to catalog menu. Please verify your connection or API key.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply to Current Restaurant in Form
  const handleApplyToForm = () => {
    if (!catalogResult || !onApplyDishes) return;

    const formattedDishes = (catalogResult.dishes || []).map(d => ({
      name: d.name || '',
      price: d.price ? String(d.price) : '',
      ingredients: (d.estimated_ingredients || []).join(', ') || (d.description || ''),
      allergens: (d.allergens || []).join(', '),
      calories: String(d.calories || 450),
      isPackage: false,
      isSignature: Boolean(d.is_signature_or_specialty)
    }));

    const formattedPackages = (catalogResult.buffet_and_set_packages || []).map(p => ({
      name: `${p.package_name}${p.pricing_model === 'PER_PAX' ? ' (₱' + p.price + '/pax)' : ''}`,
      price: p.price ? String(p.price) : '',
      ingredients: `Included: ${(p.included_dishes || []).join(', ')}${p.other_inclusions?.length ? ' | Inclusions: ' + p.other_inclusions.join(', ') : ''}${p.selection_rules ? ' | Rules: ' + p.selection_rules : ''}`,
      allergens: '',
      calories: String(p.calories || 680),
      isPackage: true,
      isSignature: true
    }));

    onApplyDishes([...formattedDishes, ...formattedPackages]);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  const dishesCount = catalogResult?.dishes?.length || 0;
  const packagesCount = catalogResult?.buffet_and_set_packages?.length || 0;

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-5 sm:p-6 space-y-5 font-sans transition-all text-charcoal dark:text-stone-100">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="robot">🤖</span>
            <h3 className="text-sm sm:text-base font-black tracking-tight text-charcoal dark:text-stone-100 uppercase m-0">
              AI MENU OCR & AUTOMATIC DISH CATALOGER
            </h3>
          </div>
          <p className="text-xs text-charcoal-light dark:text-stone-400 m-0 leading-relaxed max-w-2xl">
            Upload a menu photo or paste raw menu text to auto-generate dishes, prices, ingredients & allergen warnings
          </p>
        </div>

        {/* Top Right Badge: AI Vision Setup (Free) */}
        <button
          type="button"
          onClick={onOpenAiConfig || (() => {})}
          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${
            geminiApiKey
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
          }`}
          title="Configure Google Gemini Vision AI API Key"
        >
          <Sparkles className="h-3.5 w-3.5 text-terracotta" />
          <span>{geminiApiKey ? "AI Vision Active (Gemini)" : "AI Vision Setup (Free)"}</span>
        </button>
      </div>

      {/* Dual-Input Section (Two Columns on Desktop, Stacked on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

        {/* Option 1: Photo Upload */}
        <div className="space-y-2 bg-white dark:bg-[#23201D] p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black uppercase tracking-wider text-charcoal dark:text-stone-200 flex items-center gap-1">
              📷 OPTION 1: UPLOAD MENU BOARD PHOTO(S) / FLYERS
              {images.length > 0 && (
                <span className="text-terracotta font-extrabold ml-1">({images.length})</span>
              )}
            </label>
            {images.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllImages}
                className="text-[10px] font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
              >
                ✕ Clear All
              </button>
            )}
          </div>

          <div
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-terracotta dark:hover:border-terracotta rounded-xl p-3.5 text-center cursor-pointer bg-stone-50/50 dark:bg-stone-900/30 transition-all hover:bg-amber-50/30"
          >
            <Upload className="h-5 w-5 mx-auto text-charcoal-light dark:text-stone-400 mb-1" />
            <p className="text-xs font-semibold text-charcoal dark:text-stone-300 m-0">
              Click to browse or drop menu photos
            </p>
            <span className="text-[10px] text-stone-500 dark:text-stone-400">
              Supports .jpg, .png, .webp, and .pdf
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Thumbnails Gallery */}
          {images.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> {images.length} file{images.length > 1 ? 's' : ''} staged for extraction
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1.5 bg-stone-50 dark:bg-stone-900/50 rounded-lg border border-stone-200 dark:border-stone-800">
                {images.map((img, idx) => (
                  <div key={img.id} className="relative group bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden p-1 flex flex-col items-center">
                    {img.type.includes('pdf') ? (
                      <div className="w-full h-16 bg-red-50 dark:bg-red-950/40 rounded flex flex-col items-center justify-center text-red-600 dark:text-red-400">
                        <FileText className="h-6 w-6" />
                        <span className="text-[8px] font-bold mt-0.5 uppercase">PDF Menu</span>
                      </div>
                    ) : (
                      <img src={img.dataUrl} alt={`Menu page ${idx + 1}`} className="w-full h-16 object-cover rounded" />
                    )}
                    <div className="w-full mt-1 flex items-center justify-between text-[9px] px-0.5">
                      <span className="truncate max-w-[80px] font-semibold text-charcoal dark:text-stone-300" title={img.name}>
                        {img.name || `Page ${idx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                        title="Remove this photo"
                        aria-label="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Option 2: Textarea */}
        <div className="space-y-2 bg-white dark:bg-[#23201D] p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs">
          <label className="text-[11px] font-black uppercase tracking-wider text-charcoal dark:text-stone-200 block">
            📝 OPTION 2: PASTE RAW MENU TEXT / PRICE LIST
          </label>
          <textarea
            rows={images.length > 0 ? 6 : 7}
            placeholder="e.g. Reservation Package A - ₱265/pax: Sizzling Chicken, Pork Sisig, Pancit Guisado, Rice, Drinks... OR SOUQ Pork Sisig ₱280, Bulalo ₱450..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-200 dark:border-stone-700 rounded-lg bg-[#FAF8F5] dark:bg-stone-900 text-charcoal dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono resize-y"
          />
          <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
            Paste unformatted text, buffet flyer lines, social media posts, or messenger price lists.
          </span>
        </div>

      </div>

      {/* Action Button - Polished Modern Interactive CTA */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={handleAnalyze}
          className="relative group overflow-hidden w-full sm:w-auto min-w-[320px] sm:min-w-[440px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] hover:from-[#153423] hover:via-[#245640] hover:to-[#153423] text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-950/25 hover:shadow-xl hover:shadow-emerald-900/30 border border-emerald-500/30 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3.5"
        >
          {/* Subtle light sweep reflection */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-amber-300 shrink-0" />
              <div className="text-left">
                <span className="block text-sm font-black tracking-normal text-white">{loadingMessage}</span>
                <span className="block text-[10px] text-emerald-200 font-medium tracking-normal">Processing menu flyer & photo sections...</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-2 rounded-xl bg-white/10 border border-white/20 text-amber-300 shadow-inner shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Sparkles className="h-4.5 w-4.5 fill-amber-300/30" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black tracking-tight text-white drop-shadow-xs">
                    Analyze & Auto-Organize Menu
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 text-[9px] font-black uppercase tracking-wider">
                    AI OCR
                  </span>
                </div>
                <span className="block text-[10px] text-emerald-200/90 font-medium tracking-normal mt-0.5">
                  Deep Kapampangan culinary spelling repair & calorie estimation
                </span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Results View */}
      {catalogResult && (
        <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-800 space-y-4 animate-fade-in">
          {catalogResult.is_valid_menu === false || (dishesCount === 0 && packagesCount === 0) ? (
            <div className="bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/80 rounded-2xl p-5 sm:p-6 text-charcoal dark:text-stone-100 shadow-sm space-y-3 animate-fade-in">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 shrink-0 shadow-inner">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="inline-block text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/40 px-2 py-0.5 rounded-md">
                    Non-Menu Image Detected
                  </span>
                  <h4 className="text-base font-black text-amber-950 dark:text-amber-100 m-0 leading-snug">
                    The uploaded image does not appear to be a restaurant menu
                  </h4>
                  <p className="text-xs text-amber-900/90 dark:text-amber-200/90 m-0 leading-relaxed max-w-2xl">
                    {catalogResult.error || "The uploaded image or text does not contain recognizable food dishes, meals, or pricing. To prevent inaccurate dishes and random definitions from being added to your catalog, this file was not processed."}
                  </p>
                  <div className="pt-2 text-xs text-amber-800 dark:text-amber-300 font-semibold flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-t border-amber-200 dark:border-amber-800/60 mt-3">
                    <span className="flex items-center gap-1">📸 Upload a clear photo of a printed menu, flyer, or board</span>
                    <span className="flex items-center gap-1">🏷️ Ensure food dish names and prices are legible</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Results Header with Title and Export Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#23201D] p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    ✓ AI Extraction Complete
                  </span>
                  <h4 className="text-base font-black text-charcoal dark:text-stone-100 mt-1 m-0">
                    {catalogResult.restaurant_or_menu_title || 'Menu Catalog Results'}
                  </h4>
                  <span className="text-xs text-charcoal-light dark:text-stone-400">
                    Currency: <strong className="text-charcoal dark:text-stone-200">{catalogResult.currency || 'PHP'}</strong> • {dishesCount} à la carte item{dishesCount !== 1 ? 's' : ''} • {packagesCount} package{packagesCount !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {onApplyDishes && (
                    <button
                      type="button"
                      onClick={handleApplyToForm}
                      className="px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                      title="Populate current restaurant form with all these extracted items"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{appliedSuccess ? 'Applied to Form! ✓' : 'Apply to Restaurant Menu'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Catalog Tab Selector */}
              <div className="flex border-b border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('dishes')}
                  className={`py-2.5 px-4 text-xs font-black border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'dishes'
                      ? 'border-emerald-700 text-emerald-800 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-transparent text-charcoal-light dark:text-stone-400 hover:text-charcoal dark:hover:text-stone-200'
                  }`}
                >
                  <Utensils className="h-3.5 w-3.5" />
                  <span>À La Carte Dishes</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 dark:bg-stone-700 text-charcoal dark:text-stone-200 font-bold">
                    {dishesCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('packages')}
                  className={`py-2.5 px-4 text-xs font-black border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'packages'
                      ? 'border-emerald-700 text-emerald-800 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-transparent text-charcoal-light dark:text-stone-400 hover:text-charcoal dark:hover:text-stone-200'
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Buffet / Event Packages</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 dark:bg-stone-700 text-charcoal dark:text-stone-200 font-bold">
                    {packagesCount}
                  </span>
                </button>
              </div>

              {/* TAB 1: À La Carte Dishes */}
              {activeTab === 'dishes' && (
                <div className="space-y-3">
                  {dishesCount === 0 ? (
                    <div className="p-8 text-center bg-white dark:bg-[#23201D] rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-charcoal-light dark:text-stone-400">
                      No individual dishes detected in this menu. Check the Buffet / Event Packages tab.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {catalogResult.dishes.map((dish, dIdx) => (
                        <div
                          key={dIdx}
                          className="bg-white dark:bg-[#23201D] p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all shadow-2xs space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <h5 className="text-xs font-black text-charcoal dark:text-stone-100 m-0 leading-snug">
                                  {dish.name}
                                </h5>
                                <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                  {dish.category && (
                                    <span className="text-[9px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                                      {dish.category}
                                    </span>
                                  )}
                                  {dish.calories ? (
                                    <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-200 dark:border-rose-800">
                                      <Flame className="h-2.5 w-2.5 text-rose-500 fill-rose-500" /> {dish.calories} kcal
                                    </span>
                                  ) : null}
                                  {dish.nutrients && (dish.nutrients.protein || dish.nutrients.carbs || dish.nutrients.fat) ? (
                                    <span className="inline-flex items-center gap-1 text-[8.5px] font-bold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/80 px-1.5 py-0.2 rounded border border-stone-200/60 dark:border-stone-700/60" title="Estimated Macronutrients">
                                      {dish.nutrients.protein ? `P: ${dish.nutrients.protein}` : ''}
                                      {dish.nutrients.carbs ? ` • C: ${dish.nutrients.carbs}` : ''}
                                      {dish.nutrients.fat ? ` • F: ${dish.nutrients.fat}` : ''}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <strong className="text-xs font-black text-emerald-800 dark:text-emerald-400 block">
                                  ₱{Number(dish.price || 0).toLocaleString()}
                                </strong>
                                {dish.is_signature_or_specialty && (
                                  <span className="inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800 mt-0.5">
                                    <Award className="h-2.5 w-2.5" /> Signature
                                  </span>
                                )}
                              </div>
                            </div>

                            {dish.description && (
                              <p className="text-[11px] text-charcoal-light dark:text-stone-400 m-0 line-clamp-2 leading-relaxed">
                                {dish.description}
                              </p>
                            )}
                          </div>

                          <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800 text-[10px]">
                            {dish.estimated_ingredients?.length > 0 && (
                              <div className="flex flex-wrap gap-1 items-center">
                                <span className="font-bold text-stone-500 dark:text-stone-400">Ingredients:</span>
                                {dish.estimated_ingredients.map((ing, iIdx) => (
                                  <span key={iIdx} className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-1.5 py-0.2 rounded text-[9px] font-medium">
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            )}

                            {dish.allergens?.length > 0 && (
                              <div className="flex flex-wrap gap-1 items-center">
                                <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-0.5">
                                  <AlertTriangle className="h-2.5 w-2.5" /> Allergens:
                                </span>
                                {dish.allergens.map((alg, aIdx) => (
                                  <span key={aIdx} className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-1.5 py-0.2 rounded text-[9px] font-bold">
                                    {alg}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Buffet / Event Packages */}
              {activeTab === 'packages' && (
                <div className="space-y-3">
                  {packagesCount === 0 ? (
                    <div className="p-8 text-center bg-white dark:bg-[#23201D] rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-charcoal-light dark:text-stone-400">
                      No reservation or buffet packages detected in this menu. Check the À La Carte Dishes tab.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {catalogResult.buffet_and_set_packages.map((pkg, pIdx) => (
                        <div
                          key={pIdx}
                          className="bg-white dark:bg-[#23201D] p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all shadow-2xs space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-2.5">
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[9px] font-black uppercase tracking-wider bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded-full inline-block">
                                  🏷️ {pkg.pricing_model === 'PER_PAX' ? 'Per-Pax Catering' : pkg.pricing_model === 'FIXED_TOTAL' ? 'Fixed Set Package' : 'Custom Bundle'}
                                </span>
                                {pkg.calories ? (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-200 dark:border-rose-800">
                                    <Flame className="h-2.5 w-2.5 text-rose-500 fill-rose-500" /> {pkg.calories} kcal
                                  </span>
                                ) : null}
                              </div>
                              <h5 className="text-sm font-black text-charcoal dark:text-stone-100 mt-1 m-0">
                                {pkg.package_name}
                              </h5>
                              {pkg.minimum_pax && (
                                <span className="text-[10px] text-charcoal-light dark:text-stone-400 font-semibold block">
                                  👥 Minimum: {pkg.minimum_pax} guests / pax
                                </span>
                              )}
                            </div>

                            <div className="text-right shrink-0">
                              <strong className="text-base font-black text-emerald-800 dark:text-emerald-400 block">
                                ₱{Number(pkg.price || 0).toLocaleString()}
                                {pkg.pricing_model === 'PER_PAX' && (
                                  <span className="text-[10px] text-stone-500 font-bold"> / pax</span>
                                )}
                              </strong>
                            </div>
                          </div>

                          {pkg.selection_rules && (
                            <div className="p-2 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 rounded-lg text-[10px] text-amber-900 dark:text-amber-200 font-medium">
                              <strong>Selection:</strong> {pkg.selection_rules}
                            </div>
                          )}

                          {/* Included Dishes */}
                          {pkg.included_dishes?.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-charcoal dark:text-stone-300 uppercase tracking-wider block">
                                Included Dishes ({pkg.included_dishes.length}):
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                                {pkg.included_dishes.map((dishName, iIdx) => (
                                  <div key={iIdx} className="flex items-center gap-1 text-charcoal dark:text-stone-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-700 dark:text-emerald-400 shrink-0" />
                                    <span className="truncate">{dishName}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Other Inclusions */}
                          {pkg.other_inclusions?.length > 0 && (
                            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-1 items-center text-[10px]">
                              <span className="font-bold text-stone-500 dark:text-stone-400">Inclusions:</span>
                              {pkg.other_inclusions.map((inc, incIdx) => (
                                <span key={incIdx} className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full text-[9px] font-bold">
                                  ✓ {inc}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      )}

    </div>
  );
}
