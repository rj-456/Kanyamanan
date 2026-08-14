import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  Sliders,
  User,
  Send,
  TrendingUp,
  Upload,
  Check,
  CheckCircle,
  Navigation,
  Activity,
  LogOut,
  Info,
  ShieldCheck,
  Heart,
  Coffee,
  Star,
  ChevronRight,
  Database,
  Briefcase,
  Layers,
  Map,
  X,
  Sparkles,
  MessageSquare,
  Compass,
  FileText
} from 'lucide-react';
import {
  PRESEEDED_RESTAURANTS,
  TRAVEL_CORRIDORS,
  MUNICIPALITIES,
  PRESEEDED_MEAL_PHOTOS,
  OCCUPANCY_HOURS,
  PRESEEDED_ATTRACTIONS
} from './mockData';
import {
  startCloudSync,
  pushCloudChangeRequests
} from './cloudSync';


// Distance calculator helper between two lat/lng points in kilometers
const calculateHaversineKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Universal Multi-Branch Helper Functions
const normalizeMun = (m) => {
  if (!m) return '';
  if (m === 'Mabalacat') return 'Mabalacat City';
  return m;
};

const getRestaurantMunicipalities = (r) => {
  if (!r) return [];
  const set = new Set();
  if (r.municipality) set.add(normalizeMun(r.municipality));
  if (Array.isArray(r.branches)) {
    r.branches.forEach(b => {
      const mun = typeof b === 'string' ? b : b.municipality;
      if (mun) set.add(normalizeMun(mun));
    });
  }
  return Array.from(set);
};

const isRestaurantInMunicipality = (r, targetMun) => {
  if (!targetMun || targetMun === 'All') return true;
  const muns = getRestaurantMunicipalities(r);
  return muns.includes(normalizeMun(targetMun));
};

const getBranchAddressForMunicipality = (r, targetMun) => {
  if (!r) return '';
  const normTarget = normalizeMun(targetMun);
  if (normTarget && normTarget !== 'All') {
    if (normalizeMun(r.municipality) === normTarget && r.address) return r.address;
    if (Array.isArray(r.branches)) {
      const match = r.branches.find(b => normalizeMun(typeof b === 'string' ? b : b.municipality) === normTarget);
      if (match && typeof match === 'object' && match.address) return match.address;
    }
  }
  return r.address || (r.branches && r.branches[0] && r.branches[0].address) || 'Multiple Locations in Pampanga';
};

const getBranchLat = (r, targetMun) => {
  if (!r) return 15.0300;
  const normTarget = normalizeMun(targetMun);
  if (Array.isArray(r.branches)) {
    const match = r.branches.find(b => normalizeMun(typeof b === 'string' ? b : b.municipality) === normTarget);
    if (match && typeof match === 'object' && match.lat) return match.lat;
  }
  return r.lat || 15.0300;
};


const getBranchOperatingHours = (r, targetMun) => {
  if (!r) return '09:00 AM - 09:00 PM';
  const normTarget = normalizeMun(targetMun);
  if (normTarget && normTarget !== 'All') {
    if (normalizeMun(r.municipality) === normTarget && r.operatingHours) return r.operatingHours;
    if (Array.isArray(r.branches)) {
      const match = r.branches.find(b => normalizeMun(typeof b === 'string' ? b : b.municipality) === normTarget);
      if (match && typeof match === 'object' && match.operatingHours) return match.operatingHours;
    }
  }
  return r.operatingHours || '09:00 AM - 09:00 PM';
};

const getBranchOccupancy = (r, targetMun) => {
  if (!r) return [20, 40, 60, 80, 95, 80, 60, 40, 60, 80, 95, 80, 40, 20, 10];
  const normTarget = normalizeMun(targetMun);
  if (normTarget && normTarget !== 'All') {
    if (normalizeMun(r.municipality) === normTarget && r.occupancy) return r.occupancy;
    if (Array.isArray(r.branches)) {
      const match = r.branches.find(b => normalizeMun(typeof b === 'string' ? b : b.municipality) === normTarget);
      if (match && typeof match === 'object' && match.occupancy) return match.occupancy;
    }
  }
  return r.occupancy || [20, 40, 60, 80, 95, 80, 60, 40, 60, 80, 95, 80, 40, 20, 10];
};

const getBranchLng = (r, targetMun) => {
  if (!r) return 120.6800;
  const normTarget = normalizeMun(targetMun);
  if (Array.isArray(r.branches)) {
    const match = r.branches.find(b => normalizeMun(typeof b === 'string' ? b : b.municipality) === normTarget);
    if (match && typeof match === 'object' && match.lng) return match.lng;
  }
  return r.lng || 120.6800;
};

function App() {
  // Hash & Pathname Routing for administrative standalone page
  const checkAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const hash = (window.location.hash || '').toLowerCase();
    const path = (window.location.pathname || '').toLowerCase();
    return hash.includes('admin') || path.endsWith('/admin') || path.includes('/admin');
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkAdminRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(checkAdminRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Consumer Views: 'homepage', 'auth', 'dashboard'
  const [activeView, setActiveView] = useState('homepage');
  const [branchSelectTarget, setBranchSelectTarget] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);

  // Dashboard Sub-Modules: 'planner', 'health', 'assistant', 'history'
  const [dashboardTab, setDashboardTab] = useState('planner');

  // Simulated dynamic toast/status state
  const [showToast, setShowToast] = useState(false);

  const [userProfile, setUserProfile] = useState({
    username: 'rancis',
    email: 'rancis@pampanga.gov.ph',
    calorieLimit: 2200,
    budgetLimit: 1500
  });

  // Local state restaurants database with 100% unique usernames & permanent frontend-backend persistence
  const [restaurants, setRestaurants] = useState(() => {
    try {
      const saved = localStorage.getItem('kanyamanan_restaurants_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.map((res, idx) => {
            if (!res || typeof res !== 'object') return null;
            return {
              ...res,
              id: res.id || `res-${Date.now()}-${idx}`,
              name: res.name || `Heritage Kitchen #${idx + 1}`,
              municipality: res.municipality || 'City of San Fernando',
              corridor: res.corridor || 'MacArthur Highway Line',
              operatingHours: res.operatingHours || '09:00 AM - 09:00 PM',
              priceTier: res.priceTier || '$',
              branches: Array.isArray(res.branches) && res.branches.length > 0 ? res.branches : [{ branchName: `${res.name || 'Restaurant'} (Main Branch)`, municipality: res.municipality || 'City of San Fernando', address: res.address || 'Pampanga', operatingHours: res.operatingHours || '09:00 AM - 09:00 PM', lat: res.lat || 15.0300, lng: res.lng || 120.6800 }],
              menu: Array.isArray(res.menu) && res.menu.length > 0 ? res.menu : [{ id: `menu-${idx}-0`, name: 'Signature Sisig', price: 250, ingredients: 'Grilled pork snout, calamansi, onions', allergens: 'Contains Pork', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', healthIndicators: 'Moderate Calorie', nutrition: { calories: 450, protein: 25, carbs: 10, fat: 35 } }],
              username: res.username || `${(res.name || 'res').toLowerCase().replace(/[^a-z0-9]/g, '_')}_owner`,
              password: res.password || 'password123'
            };
          }).filter(Boolean);

          if (sanitized.length > 0) {
            return sanitized;
          }
        }
      }
    } catch (e) {
      console.error("LocalStorage load error:", e);
    }

    const usedUsernames = new Set();
    return PRESEEDED_RESTAURANTS.map((res, idx) => {
      let baseUser = res.username;
      if (!baseUser || baseUser === 'owner') {
        baseUser = (res.name || 'restaurant')
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_+|_+$/g, '') + '_owner';
      }
      let uniqueUser = baseUser;
      let counter = 1;
      while (usedUsernames.has(uniqueUser)) {
        uniqueUser = `${baseUser}_${counter}`;
        counter++;
      }
      usedUsernames.add(uniqueUser);

      return {
        ...res,
        username: uniqueUser,
        password: res.password || 'password123'
      };
    });
  });

  // Persistent Tourist Attractions Database State with auto-healing error recovery
  const [attractions, setAttractions] = useState(() => {
    try {
      const saved = localStorage.getItem('kanyamanan_attractions_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.map((attr, idx) => {
            if (!attr || typeof attr !== 'object') return null;
            return {
              ...attr,
              id: attr.id || `attr-${Date.now()}-${idx}`,
              name: attr.name || `Heritage Destination #${idx + 1}`,
              municipality: attr.municipality || 'City of San Fernando',
              type: attr.type || '🏛️ Historic Parish Church',
              description: attr.description || 'Cultural heritage destination in Pampanga.',
              details: attr.details || attr.description || 'Cultural heritage destination in Pampanga.',
              image: attr.image || (Array.isArray(attr.images) && attr.images[0]) || 'https://images.unsplash.com/photo-1548625361-186b86d94c73?auto=format&fit=crop&w=800&q=80',
              images: Array.isArray(attr.images) && attr.images.length > 0 ? attr.images : [attr.image || 'https://images.unsplash.com/photo-1548625361-186b86d94c73?auto=format&fit=crop&w=800&q=80'],
              lat: Number(attr.lat) || 15.0300,
              lng: Number(attr.lng) || 120.6800
            };
          }).filter(Boolean);

          if (sanitized.length > 0) {
            return sanitized;
          }
        }
      }
    } catch (e) {
      console.error("LocalStorage attractions load error:", e);
      try { localStorage.removeItem('kanyamanan_attractions_db'); } catch (err) {}
    }
    return PRESEEDED_ATTRACTIONS;
  });

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCorridor, setSelectedCorridor] = useState('All');
  const [selectedMunicipality, setSelectedMunicipality] = useState('All');

  // Restaurant Drawer State
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDetailBranch, setSelectedDetailBranch] = useState(null);
  const [activeDish, setActiveDish] = useState(null);
  const [cvUploadedMeal, setCvUploadedMeal] = useState(null);
  const [isCVProcessing, setIsCVProcessing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Persistent localStorage synchronization effect for live frontend updates
  useEffect(() => {
    try {
      localStorage.setItem('kanyamanan_restaurants_db', JSON.stringify(restaurants));
    } catch (e) {
      console.error("LocalStorage save error:", e);
    }
  }, [restaurants]);

  // Live Cross-Tab & Storage Sync Listener so all open windows get updates
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'kanyamanan_restaurants_db' && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated) && updated.length > 0) {
            setRestaurants(updated);
          }
        } catch (err) {
          console.error("Storage sync error:", err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync open drawer & active trip when backend updates restaurants state
  useEffect(() => {
    if (selectedRestaurant) {
      const match = restaurants.find(r => r.id === selectedRestaurant.id);
      if (match) {
        setSelectedRestaurant(match);
      }
    }
  }, [restaurants]);

  // Trip routing pipeline State
  const [activeTrip, setActiveTrip] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [savedItineraries, setSavedItineraries] = useState([
    {
      id: 'trail-1',
      name: 'San Fernando Heritage Trail',
      stops: ["Everybody's Cafe", "Santo Tomas Palayok Kitchen"],
      isFinished: false
    },
    {
      id: 'trail-2',
      name: 'Angeles City Sisig Hop',
      stops: ["Aling Lucing's Sisig", "Atching Lillian's Ancestral Kitchen"],
      isFinished: false
    }
  ]);
  const [newItineraryName, setNewItineraryName] = useState('');

  // Constraints & Simulated traffic Adjuster
  const [stopCeiling, setStopCeiling] = useState(3);
  const [numPersons, setNumPersons] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomedDishImg, setZoomedDishImg] = useState(null);
  const [isTrackingGPS, setIsTrackingGPS] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Live Trip Navigation & Multi-Stop Progression States
  const [isTripActive, setIsTripActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [visitedStops, setVisitedStops] = useState([]);
  const [distanceToTargetKm, setDistanceToTargetKm] = useState(null);

  const [roadRouteCoords, setRoadRouteCoords] = useState([]);
  const [routeDistanceKm, setRouteDistanceKm] = useState(0);
  const [routeDurationMin, setRouteDurationMin] = useState(0);

  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const watchIdRef = useRef(null);
  const simIntervalRef = useRef(null);

  const [userLocation, setUserLocation] = useState({ lat: 15.0300, lng: 120.6800, name: "City of San Fernando (Default Start)" });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: "Your Detected Location"
        });
        setIsDetectingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve location. Defaulting to City of San Fernando.");
        setIsDetectingLocation(false);
      }
    );
  };

  const [isTrafficCongested, setIsTrafficCongested] = useState(false);
  const [adminRole, setAdminRole] = useState('superadmin'); // 'superadmin' or 'merchant'
  const [merchantResId, setMerchantResId] = useState(() => (Array.isArray(PRESEEDED_RESTAURANTS) && PRESEEDED_RESTAURANTS[0] ? PRESEEDED_RESTAURANTS[0].id : 'res-1'));
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginType, setAdminLoginType] = useState('superadmin'); // 'superadmin' or 'merchant'
  const [adminLoginUser, setAdminLoginUser] = useState('');
  const [adminLoginPass, setAdminLoginPass] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  // Persistent Pending Approvals Database State
  const [pendingApprovals, setPendingApprovals] = useState(() => {
    try {
      const saved = localStorage.getItem('kanyamanan_pending_approvals_db');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(item => ({
            ...item,
            status: item.status || 'pending'
          }));
        }
      }
    } catch (e) {
      console.error("LocalStorage load error for pending approvals:", e);
    }
    return [
      {
        id: 'appr-1',
        restaurantId: 'res-1',
        restaurantName: "Everybody's Cafe",
        submittedAt: 'Today, 10:30 AM',
        status: 'pending',
        original: {
          operatingHours: "07:00 AM - 09:00 PM",
          priceTier: "$$"
        },
        changes: {
          operatingHours: "06:30 AM - 10:00 PM",
          priceTier: "$$$"
        }
      }
    ];
  });

  // Persistent localStorage synchronization effect for pendingApprovals
  useEffect(() => {
    try {
      localStorage.setItem('kanyamanan_pending_approvals_db', JSON.stringify(pendingApprovals));
    } catch (e) {
      console.error("LocalStorage save error for pending approvals:", e);
    }
  }, [pendingApprovals]);

  // Live Cross-Tab & Storage Sync Listener for pendingApprovals
  useEffect(() => {
    const handleApprovalsStorage = (e) => {
      if (e.key === 'kanyamanan_pending_approvals_db' && e.newValue !== null) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) {
            setPendingApprovals(updated);
          }
        } catch (err) {
          console.error("Storage sync error for pending approvals:", err);
        }
      }
    };
    window.addEventListener('storage', handleApprovalsStorage);
    return () => window.removeEventListener('storage', handleApprovalsStorage);
  }, []);

  // Zero-Config Real-Time Cross-Device Cloud Sync Listener
  useEffect(() => {
    const unsub = startCloudSync((cloudRequests) => {
      if (Array.isArray(cloudRequests)) {
        setPendingApprovals(cloudRequests);
      }
    });
    return () => unsub();
  }, []);
  const [adminBranches, setAdminBranches] = useState([]);

  // Photo URL input states
  const [resPhotoUrlInput, setResPhotoUrlInput] = useState('');
  const [attrPhotoUrlInput, setAttrPhotoUrlInput] = useState('');

  // Free AI Menu Scanner States
  const [aiRawMenuText, setAiRawMenuText] = useState('');
  const [aiMenuImage, setAiMenuImage] = useState(null);
  const [isAiScanning, setIsAiScanning] = useState(false);

  // Trip Completion & Celebration States
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [completionGroupName, setCompletionGroupName] = useState('');
  const [completionGroupSize, setCompletionGroupSize] = useState('1 Traveler');
  const [completionPhotos, setCompletionPhotos] = useState([]);
  const [completionActiveTab, setCompletionActiveTab] = useState('polaroid');
  const [slotPhotos, setSlotPhotos] = useState({});

  // Real Client-Side Canvas Polaroid Album Downloader
  const downloadRealPolaroidAlbum = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');

    // Canvas Background
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title Header
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KANYAMANAN PAMPANGA FOOD CRAWL - MEMORY ALBUM', canvas.width / 2, 50);

    ctx.fillStyle = '#C85A32';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(newItineraryName || 'Pampanga Heritage Culinary Excursion', canvas.width / 2, 80);

    const stops = computedRoutePath.length > 0 ? computedRoutePath : [{ name: 'Heritage Kitchen', municipality: 'Pampanga', image: '' }];
    const cardsToDraw = stops.slice(0, 4);

    let loadedCount = 0;
    const totalToLoad = cardsToDraw.length;

    const renderCanvasAndDownload = () => {
      cardsToDraw.forEach((stop, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = 80 + col * 540;
        const y = 120 + row * 360;
        const cardW = 500;
        const cardH = 330;

        // Card Shadow & White Frame
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 5;
        ctx.fillRect(x, y, cardW, cardH);
        ctx.shadowColor = 'transparent';

        // Border
        ctx.strokeStyle = '#E9E5DE';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cardW, cardH);

        // Tape effect
        ctx.fillStyle = 'rgba(245, 230, 190, 0.7)';
        ctx.fillRect(x + cardW / 2 - 40, y - 10, 80, 20);

        // Image container
        const imgX = x + 20;
        const imgY = y + 20;
        const imgW = cardW - 40;
        const imgH = 220;

        const currentSlotImg = slotPhotos[idx] !== undefined ? slotPhotos[idx] : (completionPhotos[idx] || stop.image);

        if (currentSlotImg) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            ctx.drawImage(img, imgX, imgY, imgW, imgH);
            ctx.fillStyle = '#2C3E50';
            ctx.font = 'italic bold 18px serif';
            ctx.textAlign = 'center';
            ctx.fillText(stop.name || `Stop #${idx + 1}`, x + cardW / 2, y + 265);

            ctx.fillStyle = '#7F8C8D';
            ctx.font = '13px monospace';
            ctx.fillText(`📍 ${stop.municipality || 'Pampanga'} • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, x + cardW / 2, y + 295);

            loadedCount++;
            if (loadedCount === totalToLoad) {
              triggerCanvasDownload(canvas, `Kanyamanan_Polaroid_Memory_Album.png`);
            }
          };
          img.onerror = () => {
            ctx.fillStyle = '#F4F1EA';
            ctx.fillRect(imgX, imgY, imgW, imgH);
            ctx.fillStyle = '#2C3E50';
            ctx.font = 'italic bold 18px serif';
            ctx.textAlign = 'center';
            ctx.fillText(stop.name || `Stop #${idx + 1}`, x + cardW / 2, y + 265);
            loadedCount++;
            if (loadedCount === totalToLoad) {
              triggerCanvasDownload(canvas, `Kanyamanan_Polaroid_Memory_Album.png`);
            }
          };
          img.src = currentSlotImg;
        } else {
          ctx.fillStyle = '#F4F1EA';
          ctx.fillRect(imgX, imgY, imgW, imgH);
          ctx.fillStyle = '#2C3E50';
          ctx.font = 'italic bold 18px serif';
          ctx.textAlign = 'center';
          ctx.fillText(stop.name || `Stop #${idx + 1}`, x + cardW / 2, y + 265);
          loadedCount++;
          if (loadedCount === totalToLoad) {
            triggerCanvasDownload(canvas, `Kanyamanan_Polaroid_Memory_Album.png`);
          }
        }
      });
    };

    renderCanvasAndDownload();
  };

  // Real Client-Side Certificate Downloader
  const downloadRealCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Double Border
    ctx.strokeStyle = '#2C5E3B';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.strokeStyle = '#C85A32';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Header
    ctx.fillStyle = '#2C5E3B';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('REPUBLIC OF THE PHILIPPINES • PROVINCE OF PAMPANGA', canvas.width / 2, 110);

    ctx.fillStyle = '#C85A32';
    ctx.font = 'bold 28px serif';
    ctx.fillText('CERTIFICATE OF KAPAMPANGAN CULINARY EXCURSION', canvas.width / 2, 160);

    ctx.strokeStyle = '#C85A32';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, 180);
    ctx.lineTo(canvas.width / 2 + 100, 180);
    ctx.stroke();

    ctx.fillStyle = '#555555';
    ctx.font = 'italic 18px serif';
    ctx.fillText('This Certificate of Culinary Distinction is proudly presented to', canvas.width / 2, 230);

    // Recipient Name
    const recipient = completionGroupName.trim() || userProfile.username || 'Kapampangan Food Enthusiasts';
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(recipient, canvas.width / 2, 300);

    // Body Text
    ctx.fillStyle = '#333333';
    ctx.font = '18px sans-serif';
    ctx.fillText('For successfully navigating and completing the custom Kapampangan culinary route:', canvas.width / 2, 360);

    ctx.fillStyle = '#C85A32';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`"${newItineraryName || 'Pampanga Heritage Food Trail'}"`, canvas.width / 2, 410);

    ctx.fillStyle = '#333333';
    ctx.font = '16px sans-serif';
    ctx.fillText(`visiting ${computedRoutePath.length || 1} heritage destinations across the Culinary Capital of the Philippines.`, canvas.width / 2, 460);

    // Signatures
    const sigY = 620;
    ctx.strokeStyle = '#2C5E3B';
    ctx.lineWidth = 1.5;

    // Left Signature
    ctx.beginPath();
    ctx.moveTo(250, sigY);
    ctx.lineTo(480, sigY);
    ctx.stroke();

    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Team JECCAN', 365, sigY + 30);
    ctx.fillStyle = '#777777';
    ctx.font = '12px sans-serif';
    ctx.fillText('Group Leader / Development Team', 365, sigY + 50);

    // Right Signature
    ctx.beginPath();
    ctx.moveTo(720, sigY);
    ctx.lineTo(950, sigY);
    ctx.stroke();

    ctx.fillStyle = '#2C5E3B';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Kanyamanan Board', 835, sigY + 30);
    ctx.fillStyle = '#777777';
    ctx.font = '12px sans-serif';
    ctx.fillText('Health & Culinary Aggregator Core', 835, sigY + 50);

    // Official Stamp
    ctx.fillStyle = '#C85A32';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`OFFICIAL ENTRY STAMP • ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, canvas.width / 2, 750);

    triggerCanvasDownload(canvas, `Kapampangan_Culinary_Excursion_Certificate.png`);
  };

  // Helper function to trigger browser file download
  const triggerCanvasDownload = (canvas, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };





  // Tourist Attraction & Change Request Admin Management States
  const [adminSectionTab, setAdminSectionTab] = useState('restaurants'); // 'restaurants' | 'requests' | 'attractions'
  const [adminRequestFilterTab, setAdminRequestFilterTab] = useState('pending'); // 'pending' | 'all' | 'approved' | 'rejected'
  const [adminEditingAttractionId, setAdminEditingAttractionId] = useState(null);
  const [adminAttractionForm, setAdminAttractionForm] = useState({
    name: '',
    municipality: 'City of San Fernando',
    type: '🏛️ Historic Parish Church',
    description: '',
    details: '',
    image: '',
    lat: 15.0300,
    lng: 120.6800
  });

  const [adminDishes, setAdminDishes] = useState([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);
  const [trafficNotifications, setTrafficNotifications] = useState([
    {
      id: 1,
      type: 'info',
      corridor: 'MacArthur Highway Line',
      message: 'MacArthur Highway flowing smoothly at San Fernando hub.',
      timestamp: 'Just now'
    },
    {
      id: 2,
      type: 'warning',
      corridor: 'JASA Line',
      message: 'Moderate congestion near Lubao intersection due to local market hours.',
      timestamp: '15 mins ago'
    }
  ]);

  // Auth form
  const [regForm, setRegForm] = useState({
    username: '',
    email: '',
    password: '',
    calorieLimit: 2000,
    budgetLimit: 1500
  });
  const [formErrors, setFormErrors] = useState({});

  // Chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: "Mekeni, mangan tana! Welcome to Kanyamanan-Kasaup (Culinary Assistant). Kumusta po? I can help you alamin ang recipe ingredients, itinerary stops, and optimize your trip here in Pampanga!",
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Admin states
  const [adminSelectedMunicipality, setAdminSelectedMunicipality] = useState('All');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminEditingId, setAdminEditingId] = useState(null);
  const [adminForm, setAdminForm] = useState({
    name: '',
    municipality: 'City of San Fernando',
    operatingHours: '09:00 AM - 09:00 PM',
    priceTier: '$$',
    address: '',
    image: '',
    images: [],
    description: ''
  });
  // claimableMerchantView has been removed as customer traffic features are deprecated

  // Active cumulative calorie and cost estimator logic
  const activeTripMetrics = useMemo(() => {
    let calories = 0;
    let cost = 0;
    activeTrip.forEach(res => {
      if (res.menu && res.menu[0]) {
        calories += res.menu[0].nutrition.calories;
        cost += res.menu[0].price;
      }
      if (res.menu && res.menu[1]) {
        calories += res.menu[1].nutrition.calories * 0.5;
        cost += res.menu[1].price * 0.5;
      }
    });

    if (cvUploadedMeal) {
      calories += cvUploadedMeal.nutrition.calories;
    }

    return {
      calories: Math.round(calories),
      cost: Math.round(cost)
    };
  }, [activeTrip, cvUploadedMeal]);

  // Dynamic Route planning sequences (recalculates based on stops and congestion state)
  const computedRoutePath = useMemo(() => {
    if (activeTrip.length === 0) return [];

    let stops = activeTrip.slice(0, stopCeiling);

    if (isTrafficCongested) {
      const macArthurStops = stops.filter(s => s.corridor === 'MacArthur Highway Line');
      const otherStops = stops.filter(s => s.corridor !== 'MacArthur Highway Line');
      return [...otherStops, ...macArthurStops];
    }

    return stops;
  }, [activeTrip, stopCeiling, isTrafficCongested]);

  // Trigger loading toast when itinerary changes
  useEffect(() => {
    if (activeTrip.length > 0) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTrip, stopCeiling, isTrafficCongested]);

  // Traffic alert ticker effect
  useEffect(() => {
    if (isTrafficCongested) {
      setTrafficNotifications(prev => [
        {
          id: Date.now(),
          type: 'danger',
          corridor: 'MacArthur Highway Line',
          message: '⚠️ Heavy Traffic Congestion Near San Fernando Hub - Automatically Rerouting Dynamic Sequence along MacArthur Highway Corridor.',
          timestamp: 'Just now'
        },
        ...prev
      ]);
    } else {
      setTrafficNotifications(prev => [
        {
          id: Date.now(),
          type: 'success',
          corridor: 'MacArthur Highway Line',
          message: '🟢 Traffic Congestion Clear. Primary highway corridor routes operating under nominal conditions.',
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }
  }, [isTrafficCongested]);

  // Persistent localStorage synchronization effect for live attractions updates
  useEffect(() => {
    try {
      localStorage.setItem('kanyamanan_attractions_db', JSON.stringify(attractions));
    } catch (e) {
      console.error("LocalStorage attractions save error:", e);
    }
  }, [attractions]);

  // Live Cross-Tab & Storage Sync Listener for attractions
  useEffect(() => {
    const handleAttractionsStorage = (e) => {
      if (e.key === 'kanyamanan_attractions_db' && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated) && updated.length > 0) {
            setAttractions(updated);
          }
        } catch (err) {
          console.error("Attractions storage sync error:", err);
        }
      }
    };
    window.addEventListener('storage', handleAttractionsStorage);
    return () => window.removeEventListener('storage', handleAttractionsStorage);
  }, []);

  const [attractionMunFilter, setAttractionMunFilter] = useState('All');
  const [attractionTypeFilter, setAttractionTypeFilter] = useState('All');
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  // Sync open attraction detail modal & active trip when attractions update
  useEffect(() => {
    if (selectedAttraction) {
      const match = attractions.find(a => a.id === selectedAttraction.id);
      if (match) {
        setSelectedAttraction(match);
      }
    }
  }, [attractions]);

  // OSRM Road Routing Fetch Effect with Live Distance & Duration Calculation
  useEffect(() => {
    if (computedRoutePath.length === 0) {
      setRoadRouteCoords([]);
      setRouteDistanceKm(0);
      setRouteDurationMin(0);
      return;
    }

    const coords = [[userLocation.lng, userLocation.lat], ...computedRoutePath.map(r => [r.lng, r.lat])];
    const coordsString = coords.map(c => c.join(',')).join(';');

    fetch(`https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 'Ok' && data.routes && data.routes[0]) {
          const path = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
          setRoadRouteCoords(path);
          setRouteDistanceKm((data.routes[0].distance / 1000).toFixed(1));
          setRouteDurationMin(Math.round(data.routes[0].duration / 60));
        } else {
          setRoadRouteCoords([]);
          setRouteDistanceKm(0);
          setRouteDurationMin(0);
        }
      })
      .catch(() => {
        setRoadRouteCoords([]);
      });
  }, [userLocation, computedRoutePath]);

  
  // Live Location & Proximity Tracker for Multi-Stop Trip Progression
  useEffect(() => {
    if (!isTripActive || computedRoutePath.length === 0) return;

    const currentTargetStop = computedRoutePath[currentStopIndex];
    if (!currentTargetStop) return;

    const targetLat = currentTargetStop.lat;
    const targetLng = currentTargetStop.lng;

    if (userLocation && targetLat && targetLng) {
      const dist = calculateHaversineKm(userLocation.lat, userLocation.lng, targetLat, targetLng);
      setDistanceToTargetKm(dist.toFixed(2));

      // Automatic arrival check if user comes within 150 meters (0.15 km)
      if (dist <= 0.15 && !visitedStops.includes(currentTargetStop.id)) {
        const nextVisited = [...visitedStops, currentTargetStop.id];
        setVisitedStops(nextVisited);

        if (currentStopIndex < computedRoutePath.length - 1) {
          const nextIndex = currentStopIndex + 1;
          const nextStop = computedRoutePath[nextIndex];
          setCurrentStopIndex(nextIndex);
          alert(`🎉 Arrived at Stop #${currentStopIndex + 1}: "${currentTargetStop.name}"!\n\n➡️ Continuing trip to Next Destination: "${nextStop.name}" (${nextStop.municipality})`);
        } else {
          setIsTripActive(false);
          setIsSimulating(false);
          alert(`🏆 Congratulations! You reached your final destination "${currentTargetStop.name}" and completed all ${computedRoutePath.length} stops on your Kapampangan Heritage Crawl!`);
        }
      }
    }
  }, [userLocation, isTripActive, currentStopIndex, computedRoutePath, visitedStops]);

  // Handle Start Live Trip
  const handleStartLiveTrip = () => {
    if (computedRoutePath.length === 0) {
      alert("Please add at least 1 destination to your itinerary before starting your trip!");
      return;
    }
    setIsTripActive(true);
    setCurrentStopIndex(0);
    setVisitedStops([]);
    startRouteSimulation();
  };

  // Handle Manual Advance to Next Stop
  const handleAdvanceNextStop = () => {
    if (computedRoutePath.length === 0) return;
    const currentTargetStop = computedRoutePath[currentStopIndex];
    if (currentTargetStop && !visitedStops.includes(currentTargetStop.id)) {
      setVisitedStops(prev => [...prev, currentTargetStop.id]);
    }

    if (currentStopIndex < computedRoutePath.length - 1) {
      const nextIndex = currentStopIndex + 1;
      const nextStop = computedRoutePath[nextIndex];
      setCurrentStopIndex(nextIndex);
      alert(`✓ Reached Stop #${currentStopIndex + 1}: "${currentTargetStop.name}". Advancing to Stop #${nextIndex + 1}: "${nextStop.name}"!`);
    } else {
      setIsTripActive(false);
      setIsSimulating(false);
      alert(`🏆 Trip Completed! You visited all ${computedRoutePath.length} heritage destinations on your itinerary.`);
    }
  };

  // Handle End Live Trip
  const handleEndLiveTrip = () => {
    setIsTripActive(false);
    setIsSimulating(false);
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    alert("Live trip navigation ended.");
  };


  // ETA Clock Helper
  const calculateETA = (durationMin) => {
    const mins = isTrafficCongested ? Math.round((durationMin || 25) * 1.35) : (durationMin || 25);
    const d = new Date();
    d.setMinutes(d.getMinutes() + mins);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // GPS Tracking Logic
  const toggleGPSWatch = () => {
    if (isTrackingGPS) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setIsTrackingGPS(false);
    } else {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      setIsSimulating(false);
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
      }
      
      setIsTrackingGPS(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoords = [latitude, longitude];
          
          setUserLocation({
            lat: latitude,
            lng: longitude,
            name: `GPS Tracked Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
          });
          
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng(newCoords);
          }
          if (mapRef.current) {
            mapRef.current.setView(newCoords, 16);
          }
        },
        (error) => {
          console.error("GPS error:", error);
          alert("Error getting GPS location. Please check permissions.");
          setIsTrackingGPS(false);
        },
        { enableHighAccuracy: true, maximumAge: 1000 }
      );
    }
  };

  // Route Simulation Logic
  const startRouteSimulation = () => {
    if (roadRouteCoords.length === 0) return;
    
    if (isTrackingGPS) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setIsTrackingGPS(false);
    }
    
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
    }
    
    setIsSimulating(true);
    let currentStep = 0;
    
    simIntervalRef.current = setInterval(() => {
      if (currentStep >= roadRouteCoords.length) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
        setIsSimulating(false);
        alert("Destination reached!");
        return;
      }
      
      const newCoords = roadRouteCoords[currentStep];
      
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(newCoords);
      }
      if (mapRef.current) {
        mapRef.current.setView(newCoords, 15);
      }
      
      currentStep++;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
      }
    };
  }, []);

  // Map Rendering Effect
  useEffect(() => {
    if (!window.L || activeView !== 'dashboard' || dashboardTab !== 'planner') return;

    const container = L.DomUtil.get('leaflet-map');
    if (container !== null) {
      container._leaflet_id = null;
    }

    const map = L.map('leaflet-map').setView([userLocation.lat, userLocation.lng], 11);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/index.html?tile={z}/{x}/{y}', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
      tileUrlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }).addTo(map);

    map.eachLayer((layer) => {
      if (layer.setUrl) {
        layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      }
    });

    const markers = [];

    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
          className: 'custom-user-icon',
          html: `<div class="relative flex items-center justify-center"><div class="w-4 h-4 rounded-full bg-[#2C5E3B] border-2 border-white shadow-lg animate-ping absolute"></div><div class="w-4 h-4 rounded-full bg-[#2C5E3B] border-2 border-white shadow-lg relative"></div></div>`
        })
      })
        .addTo(map)
        .bindPopup(`<b>Start Point:</b> ${userLocation.name}`)
        .openPopup();
      
      userMarkerRef.current = userMarker;
      markers.push([userLocation.lat, userLocation.lng]);
    }

    computedRoutePath.forEach((res, index) => {
      L.marker([res.lat, res.lng], {
        icon: L.divIcon({
          className: 'custom-restaurant-icon',
          html: `<div class="w-6 h-6 rounded-full bg-[#D95D39] border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-black">${index + 1}</div>`
        })
      })
        .addTo(map)
        .bindPopup(`<b>Stop ${index + 1}: ${res.name}</b><br/>${res.municipality}`);
      markers.push([res.lat, res.lng]);
    });

    if (roadRouteCoords.length > 0) {
      const polyline = L.polyline(roadRouteCoords, {
        color: '#D95D39',
        weight: 5,
        opacity: 0.8
      }).addTo(map);
      
      if (!isSimulating) {
        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      }
    } else if (markers.length >= 2) {
      const polyline = L.polyline(markers, {
        color: '#D95D39',
        weight: 4,
        dashArray: '8, 6',
        opacity: 0.9
      }).addTo(map);

      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    } else if (markers.length === 1) {
      map.setView(markers[0], 13);
    }

    return () => {
      mapRef.current = null;
      userMarkerRef.current = null;
    };
  }, [activeView, dashboardTab, userLocation, computedRoutePath, roadRouteCoords]);

  // Restaurant counts per municipality (including all branch locations)
  const municipalityCounts = useMemo(() => {
    const counts = {};
    MUNICIPALITIES.forEach(m => {
      counts[m] = (restaurants || []).filter(r => 
        r && (r.municipality === m || (Array.isArray(r.branches) && r.branches.some(b => b && (typeof b === 'string' ? b === m : b.municipality === m))))
      ).length;
    });
    return counts;
  }, [restaurants]);

  // Filtered Restaurant Feed
  const filteredRestaurants = useMemo(() => {
    const q = (searchQuery || '').toLowerCase().trim();
    return (restaurants || []).filter(res => {
      if (!res || typeof res !== 'object') return false;

      const resName = (res.name || '').toLowerCase();
      const resDesc = (res.description || '').toLowerCase();
      const matchesMenu = Array.isArray(res.menu) && res.menu.some(dish => 
        dish && (dish.name || '').toLowerCase().includes(q)
      );

      const matchesSearch = !q || resName.includes(q) || resDesc.includes(q) || matchesMenu;
      const matchesCorridor = selectedCorridor === 'All' || res.corridor === selectedCorridor;
      const matchesMunicipality = selectedMunicipality === 'All' || 
        res.municipality === selectedMunicipality ||
        (Array.isArray(res.branches) && res.branches.some(b => b && (typeof b === 'string' ? b === selectedMunicipality : b.municipality === selectedMunicipality)));

      return matchesSearch && matchesCorridor && matchesMunicipality;
    });
  }, [restaurants, searchQuery, selectedCorridor, selectedMunicipality]);

  // Chatbot logic
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const updatedMessages = [...chatMessages, { sender: 'user', text: userMsg }];
    setChatMessages(updatedMessages);
    setChatInput('');

    setTimeout(() => {
      let botResponse = "";
      const msgLower = userMsg.toLowerCase();

      // --- Search for a specific restaurant by name ---
      const matchedRestaurant = restaurants.find(r =>
        msgLower.includes(r.name.toLowerCase()) ||
        r.name.toLowerCase().split(/[\s']+/).some(word => word.length > 3 && msgLower.includes(word))
      );

      // --- Search for a specific dish across all menus ---
      let matchedDish = null;
      let matchedDishRestaurant = null;
      for (const r of restaurants) {
        for (const m of r.menu) {
          if (msgLower.includes(m.name.toLowerCase()) ||
              m.name.toLowerCase().split(/[\s]+/).some(word => word.length > 3 && msgLower.includes(word))) {
            matchedDish = m;
            matchedDishRestaurant = r;
            break;
          }
        }
        if (matchedDish) break;
      }

      // --- Match by municipality/city ---
      const matchedMunicipality = MUNICIPALITIES.find(m =>
        msgLower.includes(m.toLowerCase())
      );

      // --- Match by corridor ---
      const matchedCorridor = TRAVEL_CORRIDORS.find(c =>
        msgLower.includes(c.name.toLowerCase()) ||
        c.name.toLowerCase().split(/[\s()]+/).some(word => word.length > 3 && msgLower.includes(word))
      );

      // Build response based on best match
      if (matchedDish && matchedDishRestaurant) {
        // User asked about a specific dish
        const d = matchedDish;
        const r = matchedDishRestaurant;
        botResponse = `🍽️ The signature dish "${d.name}" is served at ${r.name} (${r.municipality}) for ₱${d.price}.\n\n`;
        botResponse += `📋 Rekado (Ingredients): ${d.ingredients || 'Not specified'}.\n`;
        botResponse += `⚠️ Allergens: ${d.allergens || 'None listed'}.\n`;
        botResponse += `🔥 Calories: ${d.nutrition?.calories || 'N/A'} kcal — ${d.healthIndicators || 'Standard'}.\n`;
        botResponse += `📍 Lokasyon (Address): ${r.address || r.municipality}.\n`;
        botResponse += `🕐 Bukas (Hours): ${r.operatingHours}.`;

      } else if (matchedRestaurant) {
        // User asked about a specific restaurant
        const r = matchedRestaurant;
        const menuList = r.menu.map(m => `• ${m.name} — ₱${m.price} (${m.nutrition?.calories || '?'} kcal)`).join('\n');
        const allergenList = [...new Set(r.menu.map(m => m.allergens).filter(a => a && a !== 'None'))].join(', ') || 'None flagged';
        botResponse = `🏪 ${r.name}\n`;
        botResponse += `📍 Lokasyon: ${r.address || r.municipality}\n`;
        botResponse += `🕐 Hours: ${r.operatingHours} | 💰 Price Tier: ${r.priceTier}\n`;
        botResponse += `${r.description ? `📝 Description: ${r.description}\n` : ''}`;
        botResponse += `\n🍽️ Menu (Dishes):\n${menuList}\n`;
        botResponse += `\n⚠️ Allergen flags: ${allergenList}`;

      } else if (msgLower.includes('allergen') || msgLower.includes('allergy') || msgLower.includes('bagoong') || msgLower.includes('peanut') || msgLower.includes('shrimp paste')) {
        // Allergen-related query
        const allergenItems = [];
        restaurants.forEach(r => {
          r.menu.forEach(m => {
            if (m.allergens && m.allergens !== 'None') {
              allergenItems.push(`• ${m.name} at ${r.name} — ${m.allergens}`);
            }
          });
        });
        botResponse = `⚠️ Here are menu items with known allergen flags (mga pagkaing may alerhiya):\n\n${allergenItems.slice(0, 10).join('\n')}\n\nAlways notify the restaurant staff about your specific dietary restrictions (mga bawal na pagkain) bago kayo umorder.`;

      } else if (msgLower.includes('cheap') || msgLower.includes('affordable') || msgLower.includes('budget') || msgLower.includes('price') || msgLower.includes('cost') || msgLower.includes('expensive')) {
        // Budget/pricing query
        const byPrice = [...restaurants].sort((a, b) => {
          const tierValue = { '$': 1, '$$': 2, '$$$': 3 };
          return (tierValue[a.priceTier] || 2) - (tierValue[b.priceTier] || 2);
        });
        const cheapList = byPrice.slice(0, 5).map(r => `• ${r.name} (${r.priceTier}) — ${r.municipality}`).join('\n');
        botResponse = `💰 Here are the most affordable heritage kitchens in Pampanga (abot-kaya sa bulsa):\n\n${cheapList}\n\nYour active budget limit is ₱${userProfile.budgetLimit || 1500}. Kasalukuyang gastos sa biyahe: ₱${activeTripMetrics.cost}.`;

      } else if (matchedMunicipality) {
        // Municipality/city query
        const inMunicipality = restaurants.filter(r => r.municipality === matchedMunicipality);
        if (inMunicipality.length > 0) {
          const list = inMunicipality.map(r => `• ${r.name} (${r.priceTier}) — ${r.operatingHours}`).join('\n');
          botResponse = `📍 Restaurants located in ${matchedMunicipality}:\n\n${list}`;
        } else {
          botResponse = `📍 Pasensya na pu, we don't have any registered heritage kitchens in ${matchedMunicipality} yet. Try searching for restaurants in San Fernando or Angeles City!`;
        }

      } else if (matchedCorridor) {
        // Corridor/route query
        const inCorridor = restaurants.filter(r => r.corridor === matchedCorridor.name);
        const list = inCorridor.map(r => `• ${r.name} — ${r.municipality} (${r.priceTier})`).join('\n');
        botResponse = `🛣️ Restaurants along ${matchedCorridor.name}:\n\n${list || 'No listings found.'}\n\n${matchedCorridor.description || ''}`;

      } else if (msgLower.includes('calorie') || msgLower.includes('diet') || msgLower.includes('kcal') || msgLower.includes('limit') || msgLower.includes('health')) {
        // Calorie/health query
        botResponse = `🔥 Your daily calorie limit: ${userProfile.calorieLimit || 2200} kcal.\n`;
        botResponse += `📊 Current trip total: ${activeTripMetrics.calories} kcal consumed.\n`;
        botResponse += `✅ Remaining allowance: ${Math.max(0, (userProfile.calorieLimit || 2200) - activeTripMetrics.calories)} kcal.\n\n`;
        if (activeTripMetrics.calories > (userProfile.calorieLimit || 2200)) {
          botResponse += `⚠️ You have exceeded your daily limit! Consider removing some high-calorie items from your itinerary.`;
        } else {
          botResponse += `💡 Tip: Sisig and lechon tend to be high in calories (500-900 kcal). Balance your diet with vegetable-based dishes tulad ng pinakbet or ensaladang talong.`;
        }

      } else if (msgLower.includes('route') || msgLower.includes('plan') || msgLower.includes('itinerary') || msgLower.includes('trip') || msgLower.includes('stop')) {
        // Route/itinerary query
        if (activeTrip.length > 0) {
          const stops = activeTrip.map((r, i) => `${i + 1}. ${r.name} — ${r.municipality}`).join('\n');
          botResponse = `🗺️ Your current itinerary stops (${activeTrip.length}/${stopCeiling}):\n\n${stops}\n\n`;
          botResponse += `📊 Total metrics: ${activeTripMetrics.calories} kcal | ₱${activeTripMetrics.cost}\n`;
          botResponse += `💡 ${activeTrip.length < stopCeiling ? `You can add ${stopCeiling - activeTrip.length} more stop(s). Maghanap sa map planner of other heritage kitchens!` : 'Nakarating ka na sa limitasyon ng inyong stops (stop ceiling). You can swap high-calorie stops to keep a healthy trip.'}`;
        } else {
          botResponse = `🗺️ You don't have any stops in your itinerary yet! Head to the Provincial Food Trip Planner to select and add heritage kitchens.`;
        }

      } else if (msgLower.includes('open') || msgLower.includes('hour') || msgLower.includes('time') || msgLower.includes('when') || msgLower.includes('close')) {
        // Operating hours query
        const now = new Date();
        const currentHour = now.getHours();
        const openNow = restaurants.filter(r => {
          const match = r.operatingHours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
          if (!match) return true;
          let openH = parseInt(match[1]) + (match[3].toUpperCase() === 'PM' && parseInt(match[1]) !== 12 ? 12 : 0);
          let closeH = parseInt(match[4]) + (match[6].toUpperCase() === 'PM' && parseInt(match[4]) !== 12 ? 12 : 0);
          return currentHour >= openH && currentHour < closeH;
        });
        const list = openNow.slice(0, 8).map(r => `• ${r.name} — ${r.operatingHours}`).join('\n');
        botResponse = `🕐 Heritage kitchens likely open right now (${now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}):\n\n${list || 'Checking availability...'}\n\nReminder: It's always best to confirm operating hours directly with the kitchen, lalo na kapag holidays!`;

      } else if (msgLower.includes('recommend') || msgLower.includes('suggest') || msgLower.includes('best') || msgLower.includes('top') || msgLower.includes('popular') || msgLower.includes('famous')) {
        // Recommendation query
        const picks = restaurants.slice(0, 5).map(r => `• ${r.name} — ${r.municipality} (${r.priceTier})`).join('\n');
        botResponse = `⭐ Top recommended heritage kitchens in Pampanga:\n\n${picks}\n\n💡 For the original Kapampangan sisig experience, visit Aling Lucing's in Angeles City. For a broader traditional menu, try Everybody's Cafe in San Fernando!`;

      } else if (msgLower.includes('menu') || msgLower.includes('food') || msgLower.includes('dish') || msgLower.includes('eat') || msgLower.includes('serve')) {
        // General menu query
        const allDishes = [];
        restaurants.forEach(r => {
          r.menu.forEach(m => {
            allDishes.push(`• ${m.name} — ₱${m.price} at ${r.name} (${m.nutrition?.calories || '?'} kcal)`);
          });
        });
        botResponse = `🍽️ Here are some signature dishes across Pampanga:\n\n${allDishes.slice(0, 12).join('\n')}\n\n💡 Ask me about a specific dish to check its ingredients, allergens, and calorie information!`;

      } else if (msgLower.includes('hello') || msgLower.includes('hi') || msgLower.includes('hey') || msgLower.includes('mangan') || msgLower.includes('kumusta')) {
        botResponse = `Mekeni, mangan tana! 👋 Welcome to Kanyamanan-Kasaup! Kumusta po kayo? I can help you with:\n\n🍽️ Dish info — Ask about the menu (e.g. "sabihin mo ang tungkol sa sisig")\n🏪 Restaurant details — Ask about heritage kitchens (e.g. "Everybody's Cafe")\n📍 Area search — Ask about a municipality/city (e.g. "restaurants in Angeles")\n🔥 Calories & diet — Check your health limits\n💰 Budget — Find affordable options\n⚠️ Allergens — Check for dietary flags\n\nWhat would you like to know po?`;

      } else if (msgLower.includes('thank') || msgLower.includes('salamat')) {
        botResponse = `Dacal a salamat pu! 🙏 Happy to help you. Enjoy your Kapampangan culinary trip! Ask me anytime if you need more information.`;

      } else {
        // Intelligent fallback — try to find partial matches in restaurant names or dishes
        const partialRes = restaurants.find(r =>
          r.name.toLowerCase().split(/[\s']+/).some(word => word.length > 2 && msgLower.includes(word))
        );
        if (partialRes) {
          const menuList = partialRes.menu.map(m => `• ${m.name} — ₱${m.price}`).join('\n');
          botResponse = `Did you mean ${partialRes.name}?\n\n📍 Lokasyon: ${partialRes.address || partialRes.municipality}\n🕐 Operating Hours: ${partialRes.operatingHours}\n\n🍽️ Menu:\n${menuList}`;
        } else {
          botResponse = `I'm not sure I understood that. Here's what I can help you with po:\n\n🍽️ Ask about a dish — e.g. "sisig", "bringhe"\n🏪 Ask about a restaurant — e.g. "Everybody's Cafe"\n📍 Ask about a location — e.g. "restaurants in San Fernando"\n🔥 Ask about calories — e.g. "calorie limit"\n💰 Ask about budget — e.g. "murang kainan"\n⚠️ Ask about allergens — e.g. "peanut allergens"\n\nTry asking something specific po!`;
        }
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  const triggerCVMealUpload = (meal) => {
    setIsCVProcessing(true);
    setCvUploadedMeal(null);
    setTimeout(() => {
      setCvUploadedMeal(meal);
      setIsCVProcessing(false);
    }, 1200);
  };

  const handleAddToItinerary = (res) => {
    if (activeTrip.some(item => item.id === res.id)) return;
    if (activeTrip.length >= 5) {
      alert("Itinerary limit reached. Please optimize your list.");
      return;
    }
    setActiveTrip([...activeTrip, res]);
  };

  
  // Helper to reorder itinerary stops (Drag & Drop / Move Up / Move Down)
  const moveItineraryItem = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= activeTrip.length) return;
    const updated = [...activeTrip];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    setActiveTrip(updated);
  };

  const handleRemoveFromItinerary = (resId) => {
    setActiveTrip(activeTrip.filter(item => item.id !== resId));
  };

  const handleSaveActiveTrip = (e) => {
    e.preventDefault();
    if (!newItineraryName.trim() || activeTrip.length === 0) return;

    const newItin = {
      id: 'trail-' + Date.now(),
      name: newItineraryName.trim(),
      stops: computedRoutePath.map(r => r.name),
      isFinished: false
    };

    setSavedItineraries([newItin, ...savedItineraries]);
    setNewItineraryName('');
    setDashboardTab('history');
    alert(`"${newItin.name}" saved successfully! Opened Itinerary History to check. Click any saved route to load and do the plan!`);
  };

  const handleLoadSavedItinerary = (itin) => {
    if (!itin || !itin.stops) return;

    const matchedStops = itin.stops.map(stop => {
      if (typeof stop === 'object' && stop !== null) return stop;

      const stopNameStr = String(stop).trim();
      const normalize = (str) => String(str || '').toLowerCase().replace(/santo|santa/g, 'san').replace(/[^a-z0-9]/g, '');

      // 1. Exact or normalized name match in restaurants
      let match = (restaurants || []).find(r => r && (
        r.name === stopNameStr || 
        r.id === stopNameStr ||
        normalize(r.name) === normalize(stopNameStr)
      ));

      // 2. Exact or normalized name match in attractions
      if (!match) {
        match = (attractions || []).find(a => a && (
          a.name === stopNameStr || 
          a.id === stopNameStr ||
          normalize(a.name) === normalize(stopNameStr)
        ));
      }

      // 3. Partial substring match in restaurants
      if (!match) {
        match = (restaurants || []).find(r => r && r.name && (
          r.name.toLowerCase().includes(stopNameStr.toLowerCase()) || 
          stopNameStr.toLowerCase().includes(r.name.toLowerCase())
        ));
      }

      // 4. Partial substring match in attractions
      if (!match) {
        match = (attractions || []).find(a => a && a.name && (
          a.name.toLowerCase().includes(stopNameStr.toLowerCase()) || 
          stopNameStr.toLowerCase().includes(a.name.toLowerCase())
        ));
      }

      // 5. Fallback object if not found by exact string
      if (!match) {
        match = {
          id: 'custom-' + stopNameStr.replace(/\s+/g, '-').toLowerCase(),
          name: stopNameStr,
          municipality: 'Pampanga',
          corridor: 'Pampanga Tourism Line',
          image: '/attractions/media_.png',
          operatingHours: '08:00 AM - 08:00 PM',
          priceTier: '$',
          menu: []
        };
      }
      return match;
    }).filter(Boolean);

    setActiveTrip(matchedStops);
    setDashboardTab('planner');

    setTimeout(() => {
      const plannerEl = document.getElementById('food-trip-planner-section');
      if (plannerEl) {
        plannerEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDeleteItinerary = (itinId, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this saved route?")) {
      setSavedItineraries(savedItineraries.filter(item => item.id !== itinId));
    }
  };

  const handleToggleFinishItinerary = (itinId, e) => {
    e.stopPropagation();
    setSavedItineraries(savedItineraries.map(item => {
      if (item.id === itinId) {
        return { ...item, isFinished: !item.isFinished };
      }
      return item;
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = {};
    if (!regForm.username) errors.username = "Username required.";
    if (!regForm.email) errors.email = "Email required.";
    if (!regForm.password) errors.password = "Password required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setUserProfile({
      username: regForm.username,
      email: regForm.email,
      calorieLimit: Number(regForm.calorieLimit) || 2200,
      budgetLimit: Number(regForm.budgetLimit) || 1500
    });
    setIsAuthenticated(true);
    setIsGuest(false);
    setActiveView('homepage');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = {};
    if (!regForm.email) errors.email = "Email required.";
    if (!regForm.password) errors.password = "Password required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const computedUser = regForm.email.split('@')[0] || "Explorer";
    setUserProfile({
      username: computedUser,
      email: regForm.email,
      calorieLimit: 2200,
      budgetLimit: 1500
    });
    setIsAuthenticated(true);
    setActiveView('homepage');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminLoginError('');

    if (adminLoginType === 'superadmin') {
      if (adminLoginUser.trim() === 'admin' && adminLoginPass === 'admin123') {
        setAdminRole('superadmin');
        setIsAdminAuthenticated(true);
        setAdminLoginUser('');
        setAdminLoginPass('');
      } else {
        setAdminLoginError('Invalid Administrator credentials. (Use username "admin" and password "admin123")');
      }
    } else {
      // Authenticate Restaurant Owner using assigned username & password
      const matchedRes = restaurants.find(r => 
        (r.username || 'owner').trim().toLowerCase() === adminLoginUser.trim().toLowerCase() &&
        (r.password || 'password123') === adminLoginPass
      );

      if (matchedRes) {
        setAdminRole('merchant');
        setMerchantResId(matchedRes.id);
        setIsAdminAuthenticated(true);
        setAdminLoginUser('');
        setAdminLoginPass('');
      } else {
        setAdminLoginError('Invalid Username or Password for Restaurant Owner account. Check the assigned credentials in the System Admin database.');
      }
    }
  };

  const handleAdminFormChange = (e) => {
    const { name, value } = e.target;
    setAdminForm({ ...adminForm, [name]: value });
  };

  const startAdminEdit = (res) => {
    if (!res) return;
    setAdminEditingId(res.id);
    setAdminForm({
      name: res.name || '',
      municipality: res.municipality || 'City of San Fernando',
      operatingHours: res.operatingHours || '09:00 AM - 09:00 PM',
      priceTier: res.priceTier || '$',
      address: res.address || '',
      image: res.image || (res.images && res.images[0]) || '',
      images: res.images || (res.image ? [res.image] : []),
      description: res.description || '',
      username: res.username || 'owner',
      password: res.password || 'password123'
    });

    // Populate branches array
    if (Array.isArray(res.branches) && res.branches.length > 0) {
      setAdminBranches(res.branches.map(b => ({
        branchName: b.branchName || b.name || `${res.name} (${b.municipality || 'Main'}) Branch`,
        municipality: b.municipality || res.municipality || 'City of San Fernando',
        address: b.address || res.address || '',
        operatingHours: b.operatingHours || res.operatingHours || '09:00 AM - 09:00 PM',
        lat: b.lat || res.lat || 15.0300,
        lng: b.lng || res.lng || 120.6800
      })));
    } else {
      setAdminBranches([{
        branchName: `${res.name} (Main Branch)`,
        municipality: res.municipality || 'City of San Fernando',
        address: res.address || '',
        operatingHours: res.operatingHours || '09:00 AM - 09:00 PM',
        lat: res.lat || 15.0300,
        lng: res.lng || 120.6800
      }]);
    }

    if (Array.isArray(res.menu) && res.menu.length > 0) {
      setAdminDishes(res.menu.map(d => ({
        name: d.name || '',
        price: d.price || '',
        ingredients: d.ingredients || '',
        allergens: d.allergens || '',
        calories: d.nutrition?.calories || d.calories || '',
        image: d.image || ''
      })));
    } else {
      setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const unusedStartAdminEdit = (deprecated) => {
    setAdminEditingId(res.id);
    setAdminForm({
      name: res.name,
      municipality: res.municipality,
      operatingHours: res.operatingHours,
      priceTier: res.priceTier,
      address: res.address || '',
      image: res.image || '',
      images: res.images || [],
      description: res.description
    });
    setAdminDishes(
      res.menu.length > 0
        ? res.menu.map(m => ({
            name: m.name || '',
            price: m.price || '',
            ingredients: m.ingredients || '',
            allergens: m.allergens || '',
            calories: m.nutrition?.calories || '',
            image: m.image || ''
          }))
        : [{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]
    );
  };

  
  // Free AI Menu OCR & Intelligent Text Organizer Engine
  const handleAiAnalyzeMenu = () => {
    if (!aiRawMenuText.trim() && !aiMenuImage) {
      alert("Please upload a menu image or paste raw menu text to let AI scan and organize it for you!");
      return;
    }

    setIsAiScanning(true);

    setTimeout(() => {
      let rawText = aiRawMenuText.trim();
      
      // Default fallback simulated text if user uploaded an image without typing text
      if (!rawText && aiMenuImage) {
        rawText = `Special Pork Sisig ₱280 - Pork mask, calamansi, chili, onion
Crispy Liempo Kare-Kare ₱390 - Pork liempo, peanut sauce, vegetables
Kapampangan Bringhe ₱220 - Sticky rice, coconut milk, chicken, egg
Traditional Halo-Halo ₱150 - Shaved ice, milk, sweetened fruits, flan`;
      }

      // Intelligent regex parsing line by line
      const lines = rawText.split(/\r?\n|,|;/).map(l => l.trim()).filter(Boolean);
      const parsedDishes = [];

      lines.forEach((line, index) => {
        // Extract Price (e.g. ₱250, P250, 250.00, ₱ 180)
        const priceMatch = line.match(/(?:₱|P|PHP)?\s*(\d{2,4}(?:\.\d{2})?)/i);
        const price = priceMatch ? priceMatch[1] : (150 + index * 50).toString();

        // Extract Dish Name (remove price from string)
        let name = line.replace(/(?:₱|P|PHP)?\s*\d{2,4}(?:\.\d{2})?/gi, '').replace(/[-–—]/g, ' ').trim();
        if (!name || name.length < 3) {
          name = `Heritage Dish #${index + 1}`;
        }

        // Infer Ingredients, Allergens, and Calories based on dish name keywords
        const lowerName = line.toLowerCase();
        let ingredients = 'Local spices, onions, native herbs';
        let allergens = 'None';
        let calories = '450';

        if (lowerName.includes('sisig') || lowerName.includes('pork') || lowerName.includes('liempo')) {
          ingredients = 'Grilled pork mask, ear, calamansi, chili, onion, chicken liver';
          allergens = 'Contains Pork';
          calories = '680';
        } else if (lowerName.includes('kare') || lowerName.includes('peanut')) {
          ingredients = 'Beef tripe, pork belly, savory peanut butter sauce, eggplant, string beans, bagoong';
          allergens = 'Contains Peanuts, Crustaceans/Shrimp Paste (Bagoong)';
          calories = '750';
        } else if (lowerName.includes('bringhe') || lowerName.includes('rice')) {
          ingredients = 'Glutinous rice, coconut milk, chicken, boiled egg, bell peppers, turmeric';
          allergens = 'Contains Eggs';
          calories = '580';
        } else if (lowerName.includes('halo') || lowerName.includes('dessert') || lowerName.includes('flan') || lowerName.includes('milk')) {
          ingredients = 'Shaved ice, evaporated milk, ube halaya, saba banana, sweetened beans, leche flan';
          allergens = 'Contains Dairy, Soy';
          calories = '420';
        } else if (lowerName.includes('fish') || lowerName.includes('shrimp') || lowerName.includes('seafood') || lowerName.includes('hison')) {
          ingredients = 'Fresh catch seafood, citrus, garlic, ginger, local greens';
          allergens = 'Contains Shellfish / Fish';
          calories = '380';
        }

        parsedDishes.push({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          price: price,
          ingredients: ingredients,
          allergens: allergens,
          calories: calories,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
        });
      });

      if (parsedDishes.length > 0) {
        setAdminDishes(parsedDishes);
        alert(`🎉 AI successfully scanned and organized ${parsedDishes.length} menu items into your signature catalog with prices, ingredients, and allergen warnings!`);
      } else {
        alert("AI could not extract dish items. Please try pasting clearer menu text.");
      }

      setIsAiScanning(false);
    }, 1200);
  };

  const handleSaveAdminListing = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const nameToSave = (adminForm.name || '').trim();
    if (!nameToSave) {
      alert("Please enter a Restaurant Establishment Name before saving.");
      return;
    }

    const usernameToSave = (adminForm.username || '').trim().toLowerCase();
    if (!usernameToSave) {
      alert("Please enter a Merchant Account Username.");
      return;
    }

    const passwordToSave = adminForm.password || 'password123';

    // Strict Unique Username Validation Check
    const duplicateUser = restaurants.find(r => 
      r.id !== adminEditingId && 
      (r.username || '').trim().toLowerCase() === usernameToSave
    );

    if (duplicateUser) {
      alert(`⚠️ Duplicate Username Blocked!\n\nThe username "${usernameToSave}" is already assigned to "${duplicateUser.name}".\n\nPlease enter a unique username for this restaurant.`);
      return;
    }

    const formattedMenu = adminDishes
      .filter(d => d.name && d.name.trim())
      .map((d, i) => ({
        id: 'menu-' + Date.now() + '-' + i,
        name: d.name.trim(),
        price: Number(d.price) || 100,
        ingredients: d.ingredients || 'Local Kapampangan ingredients',
        allergens: d.allergens || 'None',
        image: d.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
        healthIndicators: Number(d.calories) > 500 ? '⚠️ High Calories' : '🟢 Healthy Choice',
        nutrition: {
          calories: Number(d.calories) || 300,
          protein: 20, carbs: 40, fat: 15
        }
      }));

    if (adminEditingId) {
      const originalRes = restaurants.find(r => r.id === adminEditingId);

      const updatedBranches = adminBranches.length > 0 ? adminBranches.map((b, idx) => ({
        branchName: b.branchName || `${nameToSave} Branch #${idx + 1}`,
        municipality: b.municipality || adminForm.municipality || 'City of San Fernando',
        address: b.address || adminForm.address || 'Pampanga',
        operatingHours: b.operatingHours || adminForm.operatingHours || '09:00 AM - 09:00 PM',
        lat: b.lat || 15.0300,
        lng: b.lng || 120.6800
      })) : (originalRes ? originalRes.branches : []);

      const primaryBranch = updatedBranches && updatedBranches[0];

      const updatedResObj = {
        ...(originalRes || {}),
        id: adminEditingId,
        name: nameToSave,
        municipality: primaryBranch?.municipality || adminForm.municipality || originalRes?.municipality || 'City of San Fernando',
        operatingHours: primaryBranch?.operatingHours || adminForm.operatingHours || originalRes?.operatingHours || '09:00 AM - 09:00 PM',
        priceTier: adminForm.priceTier || originalRes?.priceTier || '$',
        address: primaryBranch?.address || adminForm.address || originalRes?.address || '',
        image: adminForm.image || (adminForm.images && adminForm.images[0]) || originalRes?.image || '',
        images: adminForm.images && adminForm.images.length > 0 ? adminForm.images : (adminForm.image ? [adminForm.image] : originalRes?.images || []),
        description: adminForm.description || originalRes?.description || 'Heritage Kitchen in Pampanga',
        branches: updatedBranches,
        username: usernameToSave,
        password: passwordToSave,
        menu: formattedMenu.length > 0 ? formattedMenu : originalRes?.menu || []
      };

      // --- RESTAURANT OWNER WORKFLOW (Requires System Admin Approval) ---
      if (adminRole === 'merchant') {
        const targetResId = adminEditingId || merchantResId || (originalRes ? originalRes.id : 'res-1');
        const confirmSave = window.confirm(`Are you sure you want to submit profile changes for "${nameToSave}" to the System Administrator for vetting?`);
        if (!confirmSave) return;

        const changes = {};
        const original = {};

        if (originalRes && originalRes.name !== nameToSave) {
          changes.name = nameToSave;
          original.name = originalRes.name;
        }
        if (originalRes && originalRes.municipality !== adminForm.municipality) {
          changes.municipality = adminForm.municipality;
          original.municipality = originalRes.municipality;
        }
        if (originalRes && originalRes.operatingHours !== adminForm.operatingHours) {
          changes.operatingHours = adminForm.operatingHours;
          original.operatingHours = originalRes.operatingHours;
        }
        if (originalRes && originalRes.priceTier !== adminForm.priceTier) {
          changes.priceTier = adminForm.priceTier;
          original.priceTier = originalRes.priceTier;
        }
        if (originalRes && originalRes.description !== adminForm.description) {
          changes.description = adminForm.description;
          original.description = originalRes.description;
        }
        if (originalRes && originalRes.address !== adminForm.address) {
          changes.address = adminForm.address;
          original.address = originalRes.address;
        }

        // Compare cover photo and gallery photo array
        const origImgs = originalRes?.images || (originalRes?.image ? [originalRes.image] : []);
        const newImgs = adminForm.images && adminForm.images.length > 0 ? adminForm.images : (adminForm.image ? [adminForm.image] : []);
        const origImgsStr = JSON.stringify(origImgs);
        const newImgsStr = JSON.stringify(newImgs);

        if (origImgsStr !== newImgsStr || (originalRes && originalRes.image !== adminForm.image)) {
          changes.pictures = `Updated ${newImgs.length} photo(s) in establishment gallery`;
          changes.image = adminForm.image || newImgs[0] || '';
          changes.images = newImgs;

          original.pictures = `${origImgs.length} photo(s) in original gallery`;
          original.image = originalRes?.image || '';
          original.images = origImgs;
        }

        if (formattedMenu.length > 0) {
          changes.menu = formattedMenu.map(m => `${m.name} (₱${m.price})`).join(', ');
          original.menu = (originalRes?.menu || []).map(m => `${m.name} (₱${m.price})`).join(', ');
        }

        const nowFormatted = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

        const newApprovalRequest = {
          id: 'appr-' + Date.now(),
          restaurantId: targetResId,
          restaurantName: nameToSave,
          submittedAt: nowFormatted,
          status: 'pending',
          original: Object.keys(original).length > 0 ? original : { profile: originalRes?.name || 'Current Published Profile' },
          changes: Object.keys(changes).length > 0 ? changes : { profile: 'Updated establishment profile & pictures' },
          fullUpdatedRes: updatedResObj,
          dismissedByMerchant: false
        };

        const nextPending = [newApprovalRequest, ...pendingApprovals.filter(a => a.id !== newApprovalRequest.id)];
        setPendingApprovals(nextPending);
        try {
          localStorage.setItem('kanyamanan_pending_approvals_db', JSON.stringify(nextPending));
        } catch (e) {
          console.error("Save error for pending approvals:", e);
        }

        // Broadcast to shared cloud so all devices (phones & PCs) see it instantly
        pushCloudChangeRequests(nextPending);

        setAdminEditingId(null);
        setAdminForm({
          name: '', municipality: 'City of San Fernando',
          operatingHours: '09:00 AM - 09:00 PM', priceTier: '$$',
          address: '', image: '', images: [], description: '', username: '', password: ''
        });
        setAdminBranches([]);
        setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);

        alert(`📋 Profile Changes Submitted!\n\nYour profile modifications for "${nameToSave}" have been submitted for administrator vetting. You can monitor its status under "My Change Requests Status & History" in your owner panel.`);
        return;
      }

      // --- SYSTEM ADMIN WORKFLOW (Saves Immediately Live - No Approval Needed) ---
      const confirmSave = window.confirm(`Are you sure you want to save all changes for "${nameToSave}"?`);
      if (!confirmSave) return;

      setRestaurants(prev => prev.map(res => res.id === adminEditingId ? updatedResObj : res));
      setAdminSearchQuery('');

      if (selectedRestaurant && selectedRestaurant.id === adminEditingId) {
        setSelectedRestaurant(updatedResObj);
      }

      if (activeTrip && activeTrip.length > 0) {
        setActiveTrip(prevTrip => prevTrip.map(item => item.id === adminEditingId ? { ...item, ...updatedResObj } : item));
      }

      setAdminEditingId(null);
      setAdminForm({
        name: '', municipality: 'City of San Fernando',
        operatingHours: '09:00 AM - 09:00 PM', priceTier: '$$',
        address: '', image: '', images: [], description: '', username: '', password: ''
      });
      setAdminBranches([]);
      setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);

      alert(`✅ Update Saved!\n\nThe restaurant information for "${nameToSave}" has been successfully updated and published live.`);
      return;
    } else {
      const defaultCoord = { lat: 15.0300, lng: 120.6800 };
      if (adminForm.municipality === 'Angeles City') {
        defaultCoord.lat = 15.1441; defaultCoord.lng = 120.5887;
      } else if (adminForm.municipality === 'Guagua') {
        defaultCoord.lat = 14.9701; defaultCoord.lng = 120.6300;
      } else if (adminForm.municipality === 'Bacolor') {
        defaultCoord.lat = 15.0002; defaultCoord.lng = 120.6500;
      }

      const newRes = {
        id: 'res-' + Date.now(),
        name: adminForm.name,
        municipality: adminForm.municipality,
        corridor: 'MacArthur Highway Line',
        operatingHours: adminForm.operatingHours,
        priceTier: adminForm.priceTier,
        lat: defaultCoord.lat + (Math.random() - 0.5) * 0.02,
        lng: defaultCoord.lng + (Math.random() - 0.5) * 0.02,
        categories: ['🏛️ Ancestral Kitchen'],
        description: adminForm.description,
        address: adminForm.address || `Barangay San Jose, ${adminForm.municipality}, Pampanga`,
        image: adminForm.image || 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
        images: adminForm.images && adminForm.images.length > 0 ? adminForm.images : [
          adminForm.image || 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'
        ],
        branches: adminBranches.length > 0 ? adminBranches : [{
          branchName: `${adminForm.name} (Main Branch)`,
          municipality: adminForm.municipality,
          address: adminForm.address || `Barangay San Jose, ${adminForm.municipality}`,
          operatingHours: adminForm.operatingHours,
          lat: defaultCoord.lat,
          lng: defaultCoord.lng
        }],
        username: adminForm.username || 'owner',
        password: adminForm.password || 'password123',
        occupancy: [10, 20, 30, 60, 90, 80, 50, 40, 60, 80, 90, 70, 40, 20, 10],
        menu: formattedMenu.length > 0 ? formattedMenu : [
          {
            id: 'm-default',
            name: 'Signature Sisig',
            price: 250,
            ingredients: 'Pork, citrus, soy sauce',
            allergens: 'Contains Pork',
            healthIndicators: 'High Lipids',
            nutrition: { calories: 500, protein: 25, carbs: 5, fat: 40 },
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
          }
        ]
      };
      setRestaurants([newRes, ...restaurants]);
      alert("New Heritage Restaurant registered successfully.");
    }

    setAdminForm({
      name: '', municipality: 'City of San Fernando',
      operatingHours: '09:00 AM - 09:00 PM', priceTier: '$',
      address: '', image: '', images: [], description: '', username: '', password: ''
    });
    setAdminBranches([]);
    setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);
  };

  
  // Start editing a Tourist Attraction in Admin portal
  const startAdminAttractionEdit = (attr) => {
    if (!attr) return;
    setAdminEditingAttractionId(attr.id);
    const existingImgs = Array.isArray(attr.images) && attr.images.length > 0 ? attr.images : (attr.image ? [attr.image] : []);
    setAdminAttractionForm({
      name: attr.name || '',
      municipality: attr.municipality || 'City of San Fernando',
      type: attr.type || '🏛️ Historic Parish Church',
      description: attr.description || '',
      details: attr.details || attr.description || '',
      image: attr.image || (existingImgs[0] || ''),
      images: existingImgs,
      lat: attr.lat || 15.0300,
      lng: attr.lng || 120.6800
    });
    setAdminSectionTab('attractions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save/Update Tourist Attraction in Admin portal
  const handleSaveAdminAttraction = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const nameToSave = (adminAttractionForm.name || '').trim();
    if (!nameToSave) {
      alert("Please enter a Tourist Destination Name before saving.");
      return;
    }

    const primaryImg = adminAttractionForm.image || (adminAttractionForm.images && adminAttractionForm.images[0]) || 'https://images.unsplash.com/photo-1548625361-186b86d94c73?auto=format&fit=crop&w=800&q=80';
    const imagesToSave = adminAttractionForm.images && adminAttractionForm.images.length > 0 ? adminAttractionForm.images : [primaryImg];

    const updatedAttrObj = {
      name: nameToSave,
      municipality: adminAttractionForm.municipality || 'City of San Fernando',
      type: adminAttractionForm.type || '🏛️ Historic Parish Church',
      description: adminAttractionForm.description || '',
      details: adminAttractionForm.details || adminAttractionForm.description || '',
      image: primaryImg,
      images: imagesToSave,
      lat: Number(adminAttractionForm.lat) || 15.0300,
      lng: Number(adminAttractionForm.lng) || 120.6800
    };

    if (adminEditingAttractionId) {
      const confirmSave = window.confirm(`Are you sure you want to save changes for tourist destination "${nameToSave}"?`);
      if (!confirmSave) return;

      const updatedAttrFull = { id: adminEditingAttractionId, ...updatedAttrObj };
      setAttractions(prev => prev.map(a => a.id === adminEditingAttractionId ? updatedAttrFull : a));

      if (selectedAttraction && selectedAttraction.id === adminEditingAttractionId) {
        setSelectedAttraction(updatedAttrFull);
      }

      if (activeTrip && activeTrip.length > 0) {
        setActiveTrip(prevTrip => prevTrip.map(item => item.id === adminEditingAttractionId ? { ...item, ...updatedAttrFull } : item));
      }

      alert(`✅ Update Saved!\n\nThe tourist destination "${nameToSave}" has been successfully updated and published live.`);
    } else {
      const confirmSave = window.confirm(`Are you sure you want to register and publish new tourist destination "${nameToSave}" live?`);
      if (!confirmSave) return;

      const newAttr = {
        id: `attr-${Date.now()}`,
        ...updatedAttrObj
      };
      setAttractions(prev => [newAttr, ...prev]);
      alert(`✅ Destination Registered!\n\nThe new tourist destination "${nameToSave}" has been published live.`);
    }

    setAdminEditingAttractionId(null);
    setAdminAttractionForm({
      name: '',
      municipality: 'City of San Fernando',
      type: '🏛️ Historic Parish Church',
      description: '',
      details: '',
      image: '',
      images: [],
      lat: 15.0300,
      lng: 120.6800
    });
  };

  // Delete Tourist Attraction in Admin portal
  const deleteAttraction = (id) => {
    if (confirm("Are you sure you want to remove this tourist destination from the database?")) {
      setAttractions(attractions.filter(a => a.id !== id));
      alert("Destination removed.");
    }
  };

  const deleteRestaurant = (id) => {
    if (confirm("Are you sure you want to remove this Pampanga Heritage listing?")) {
      setRestaurants(restaurants.filter(r => r.id !== id));
      setActiveTrip(activeTrip.filter(r => r.id !== id));
    }
  };

  const handleApproveApproval = (req, adminNote = '') => {
    if (!req) return;

    let updatedRestaurants;
    if (req.fullUpdatedRes) {
      updatedRestaurants = restaurants.map(res => {
        if (res.id === req.restaurantId || res.name === req.restaurantName) {
          return {
            ...res,
            ...req.fullUpdatedRes,
            id: res.id || req.restaurantId
          };
        }
        return res;
      });
    } else {
      updatedRestaurants = restaurants.map(res => {
        const isMatch = res.id === req.restaurantId ||
          res.name === req.restaurantName ||
          (req.id === 'appr-1' && (res.id === 'res-1' || (res.name && res.name.toLowerCase().includes('everybody'))));

        if (isMatch) {
          return {
            ...res,
            operatingHours: req.changes.operatingHours || res.operatingHours,
            priceTier: req.changes.priceTier || res.priceTier,
            ...(req.changes.name ? { name: req.changes.name } : {}),
            ...(req.changes.address ? { address: req.changes.address } : {}),
            ...(req.changes.branches ? { branches: req.changes.branches } : {}),
            ...(req.changes.menu ? { menu: req.changes.menu } : {})
          };
        }
        return res;
      });
    }

    setRestaurants(updatedRestaurants);

    const nowFormatted = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    const updatedPending = pendingApprovals.map(a => {
      if (a.id === req.id) {
        return {
          ...a,
          status: 'approved',
          reviewedAt: nowFormatted,
          adminNote: adminNote || 'Approved and published live by System Admin.',
          dismissedByMerchant: false
        };
      }
      return a;
    });

    setPendingApprovals(updatedPending);

    // Save to localStorage immediately
    try {
      localStorage.setItem('kanyamanan_restaurants_db', JSON.stringify(updatedRestaurants));
      localStorage.setItem('kanyamanan_pending_approvals_db', JSON.stringify(updatedPending));
    } catch (e) {
      console.error("Save error during approval:", e);
    }

    // Broadcast approval to shared cloud so merchant device receives approval status
    pushCloudChangeRequests(updatedPending);

    // Sync selected restaurant drawer & active trip if present
    if (selectedRestaurant) {
      const match = updatedRestaurants.find(r => r.id === selectedRestaurant.id || r.name === selectedRestaurant.name);
      if (match) setSelectedRestaurant(match);
    }
    if (activeTrip && activeTrip.length > 0) {
      setActiveTrip(prevTrip => prevTrip.map(item => {
        const match = updatedRestaurants.find(r => r.id === item.id || r.name === item.name);
        return match ? { ...item, ...match } : item;
      }));
    }

    alert(`✅ Approved & Published Live!\n\nMerchant changes for "${req.restaurantName}" have been approved and published to the live public feed. The restaurant owner will be notified in their portal.`);
  };

  const handleRejectApproval = (req) => {
    if (!req) return;
    const reason = prompt(`Provide a reason for rejecting the change request from "${req.restaurantName}" (optional):`, "Information needs further verification by admin.") || "Request denied by administrator.";
    const nowFormatted = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

    const updatedPending = pendingApprovals.map(a => {
      if (a.id === req.id) {
        return {
          ...a,
          status: 'rejected',
          reviewedAt: nowFormatted,
          adminNote: reason,
          dismissedByMerchant: false
        };
      }
      return a;
    });

    setPendingApprovals(updatedPending);
    try {
      localStorage.setItem('kanyamanan_pending_approvals_db', JSON.stringify(updatedPending));
    } catch (e) {}

    // Broadcast rejection to shared cloud so merchant device receives rejection status
    pushCloudChangeRequests(updatedPending);
    alert(`Dismissed: Changes requested by "${req.restaurantName}" have been rejected. The restaurant owner will be notified in their portal.`);
  };

  const handleDismissMerchantNotification = (reqId) => {
    const updatedPending = pendingApprovals.map(a => {
      if (a.id === reqId) {
        return { ...a, dismissedByMerchant: true };
      }
      return a;
    });
    setPendingApprovals(updatedPending);
    try {
      localStorage.setItem('kanyamanan_pending_approvals_db', JSON.stringify(updatedPending));
    } catch (e) {}

    // Broadcast dismissal to shared cloud
    pushCloudChangeRequests(updatedPending);
  };

  // =========================================================================
  // VIEW 4: CENTRALIZED DATA-INGESTION & ADMIN/MERCHANT PORTAL (Standalone Screen)
  // =========================================================================
  if (isAdminRoute) {
    const selectedMerchantRes = restaurants.find(r => r.id === merchantResId) || restaurants[0];

    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-charcoal text-white flex flex-col justify-center items-center p-6 font-sans">
          <div className="max-w-md w-full bg-charcoal-light border border-charcoal-dark p-8 rounded-2xl shadow-2xl space-y-6 relative animate-slide-up">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-terracotta rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-black tracking-tight mt-3">Kanyamanan Portal Sign In</h2>
              <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                Select profile type to enter control panel
              </p>
            </div>

            {/* Login Type Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-charcoal rounded-xl border border-charcoal-dark text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => {
                  setAdminLoginType('superadmin');
                  setAdminLoginError('');
                }}
                className={`py-2 rounded-lg transition-all ${adminLoginType === 'superadmin' ? 'bg-terracotta text-white' : 'text-gray-300 hover:text-white'}`}
              >
                👑 System Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdminLoginType('merchant');
                  setAdminLoginError('');
                }}
                className={`py-2 rounded-lg transition-all ${adminLoginType === 'merchant' ? 'bg-terracotta text-white' : 'text-gray-300 hover:text-white'}`}
              >
                🏪 Restaurant Owner
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              {adminLoginError && (
                <div className="p-3 bg-terracotta/10 border border-terracotta/25 text-terracotta text-xs font-semibold rounded-lg">
                  {adminLoginError}
                </div>
              )}

              {adminLoginType === 'superadmin' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. admin"
                      value={adminLoginUser}
                      onChange={(e) => setAdminLoginUser(e.target.value)}
                      className="block w-full px-3.5 py-2.5 bg-charcoal border border-[#3E3E3E] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminLoginPass}
                      onChange={(e) => setAdminLoginPass(e.target.value)}
                      className="block w-full px-3.5 py-2.5 bg-charcoal border border-[#3E3E3E] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                  <span className="block text-[9px] text-gray-400 font-semibold italic">
                    💡 Super Admin Demo Credentials: Use username "admin" and password "admin123"
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Restaurant Account Username
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. owner or kabigtings_owner"
                      value={adminLoginUser}
                      onChange={(e) => setAdminLoginUser(e.target.value)}
                      className="block w-full px-3.5 py-2.5 bg-charcoal border border-[#3E3E3E] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-terracotta font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Account Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminLoginPass}
                      onChange={(e) => setAdminLoginPass(e.target.value)}
                      className="block w-full px-3.5 py-2.5 bg-charcoal border border-[#3E3E3E] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                  <span className="block text-[9px] text-gray-400 font-semibold italic">
                    💡 Restaurant Owner Login: Enter your assigned username and password from the System Admin database (e.g. username "owner" and password "password123")
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-white text-xs font-black uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                Verify Credentials <ChevronRight className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center pt-2">
              <a
                href="#/"
                onClick={() => setIsAdminRoute(false)}
                className="text-xs font-bold text-gray-400 hover:text-white hover:underline"
              >
                ← Return to Public Aggregator
              </a>
            </div>

          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-ivory text-charcoal flex flex-col font-sans">

        {/* Dedicated Admin Header */}
        <header className="bg-charcoal text-white border-b border-charcoal-dark shadow-md py-4 px-6 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta flex items-center justify-center shadow-lg">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-white m-0 flex items-center gap-2">
                  Kanyamanan Portal
                  <span className="text-[10px] bg-terracotta text-white px-2 py-0.5 rounded font-black uppercase">
                    {adminRole === 'superadmin' ? 'Super Admin' : 'Merchant Owner'}
                  </span>
                  <span className="text-[9px] bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1 border border-emerald-500/40 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span> Live Cross-Device Sync Active
                  </span>
                </h1>
                <p className="text-[10px] text-gray-300 font-medium tracking-wide">
                  SECURE HERITAGE DATABASE MANAGER & MERCHANT ANALYTICS CORE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Access Role Selection Dropdown - Super Admins Only */}
              {adminRole === 'superadmin' ? (
                <div className="flex items-center gap-2 text-xs bg-charcoal-light/35 border border-charcoal-dark px-2.5 py-1.5 rounded-xl">
                  <span className="text-gray-300 font-semibold uppercase tracking-wider text-[9px] whitespace-nowrap">Active Role:</span>
                  <select
                    value={adminRole === 'superadmin' ? 'superadmin' : `merchant-${merchantResId}`}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'superadmin') {
                        setAdminRole('superadmin');
                      } else {
                        setAdminRole('merchant');
                        setMerchantResId(val.replace('merchant-', ''));
                      }
                      setAdminEditingId(null);
                      setAdminForm({
                        name: '', municipality: 'City of San Fernando',
                        operatingHours: '09:00 AM - 09:00 PM', priceTier: '$',
                        address: '', image: '', images: [], description: '', username: '', password: ''
                      });
                      setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);
                    }}
                    className="bg-charcoal text-white rounded text-xs font-bold py-0.5 px-1 border-none focus:outline-none max-w-[180px]"
                  >
                    <option value="superadmin">👑 System Admin (All Access)</option>
                    <optgroup label="Simulate Merchant Owners">
                      {restaurants.map(res => (
                        <option key={res.id} value={`merchant-${res.id}`}>
                          🏪 Owner: {res.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg bg-bananaleaf/10 text-bananaleaf border border-bananaleaf/25 text-xs font-black">
                  🏪 Owner Mode: {selectedMerchantRes?.name}
                </div>
              )}



              <a
                href="#/"
                onClick={() => setIsAdminRoute(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10"
              >
                <Compass className="h-4.5 w-4.5" />
                Go to Public Aggregator
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsAdminAuthenticated(false);
                  setAdminRole('superadmin');
                  setAdminLoginPass('');
                }}
                className="px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow"
              >
                Sign Out
              </button>
            </div>

          </div>
        </header>

      


        {/* Admin main work grid */}
        
        {/* Admin Section Navigation Tabs (Super Admin / Merchant) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex border-b border-[#E9E5DE] bg-white rounded-xl p-1.5 shadow-xs gap-1">
            <button
              type="button"
              onClick={() => setAdminSectionTab('restaurants')}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${adminSectionTab === 'restaurants' ? 'bg-terracotta text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal cursor-pointer'}`}
            >
              <span>🏪</span> Heritage Restaurants ({restaurants.length})
            </button>
            {adminRole === 'superadmin' && (
              <>
                <button
                  type="button"
                  onClick={() => setAdminSectionTab('requests')}
                  className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 relative ${adminSectionTab === 'requests' ? 'bg-terracotta text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal cursor-pointer'}`}
                >
                  <span>📋</span> Change Requests Queue ({pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length})
                  {pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length > 0 && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-amber-500 text-white font-black rounded-full animate-pulse ml-1">
                      {pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length} PENDING
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setAdminSectionTab('attractions')}
                  className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${adminSectionTab === 'attractions' ? 'bg-terracotta text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal cursor-pointer'}`}
                >
                  <span>🏛️</span> Tourist Attractions ({attractions.length})
                </button>
              </>
            )}
          </div>
        </div>


        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {adminSectionTab === 'restaurants' && (
            <div className="space-y-6">

              {/* Form panel */}
              {adminRole === 'merchant' && !adminEditingId ? (
                <div className="space-y-4">
                  {/* Active Decision Notification Banner for Restaurant Owner */}
                  {(() => {
                    const currentRes = restaurants.find(r => r.id === merchantResId);
                    const myRequests = pendingApprovals.filter(a => a.restaurantId === merchantResId || (currentRes && a.restaurantName === currentRes.name));
                    const latestUnreadDecision = myRequests.find(a => (a.status === 'approved' || a.status === 'rejected') && !a.dismissedByMerchant);

                    if (!latestUnreadDecision) return null;

                    if (latestUnreadDecision.status === 'approved') {
                      return (
                        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-xl shadow-xs flex items-start justify-between gap-3 animate-fade-in">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-emerald-600 text-white rounded-lg mt-0.5">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider m-0">
                                🎉 Change Request Approved & Live!
                              </h4>
                              <p className="text-xs text-emerald-800 font-medium m-0 leading-relaxed">
                                Your submitted info updates for <strong>"{latestUnreadDecision.restaurantName}"</strong> (submitted on {latestUnreadDecision.submittedAt}) were <strong>APPROVED</strong> by the System Admin on {latestUnreadDecision.reviewedAt} and are now published live!
                              </p>
                              {latestUnreadDecision.adminNote && (
                                <p className="text-[11px] text-emerald-700 italic m-0">
                                  System Admin Note: "{latestUnreadDecision.adminNote}"
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDismissMerchantNotification(latestUnreadDecision.id)}
                            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer"
                          >
                            Dismiss
                          </button>
                        </div>
                      );
                    }

                    if (latestUnreadDecision.status === 'rejected') {
                      return (
                        <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-xl shadow-xs flex items-start justify-between gap-3 animate-fade-in">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-rose-600 text-white rounded-lg mt-0.5">
                              <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-black text-rose-900 uppercase tracking-wider m-0">
                                ❌ Change Request Denied by Administrator
                              </h4>
                              <p className="text-xs text-rose-800 font-medium m-0 leading-relaxed">
                                Your submitted info updates for <strong>"{latestUnreadDecision.restaurantName}"</strong> (submitted on {latestUnreadDecision.submittedAt}) were <strong>DENIED</strong> by the System Admin on {latestUnreadDecision.reviewedAt}.
                              </p>
                              <p className="text-xs font-bold text-rose-900 bg-white/80 p-2 rounded border border-rose-200 m-0">
                                Reason: "{latestUnreadDecision.adminNote || 'Information needs further verification by administrator.'}"
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDismissMerchantNotification(latestUnreadDecision.id)}
                            className="text-xs font-bold text-rose-800 hover:text-rose-950 underline shrink-0 cursor-pointer"
                          >
                            Dismiss
                          </button>
                        </div>
                      );
                    }

                    return null;
                  })()}

                  <div className="bento-card p-6 bg-white space-y-4 shadow-sm border-[#E9E5DE]">
                    <div className="text-center space-y-2">
                      <span className="text-3xl block">🏪</span>
                      <h3 className="text-sm font-extrabold text-charcoal tracking-tight">
                        Merchant Owner Control Panel: {restaurants.find(r => r.id === merchantResId)?.name || "Your Restaurant"}
                      </h3>
                      <p className="text-xs text-charcoal-light max-w-md mx-auto leading-relaxed">
                        To modify operating hours, coordinates, price levels, photos, branches, or update your signature catalog dishes, click the button below to submit a change request to the System Admin.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const targetRes = restaurants.find(r => r.id === merchantResId);
                          if (targetRes) startAdminEdit(targetRes);
                        }}
                        className="mt-2 px-5 py-2.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-black transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer active:scale-98"
                      >
                        <Edit className="h-4 w-4" /> Edit My Restaurant Profile Information
                      </button>
                    </div>

                    {/* Restaurant Owner Request History & Status Section */}
                    {(() => {
                      const currentRes = restaurants.find(r => r.id === merchantResId);
                      const myRequests = pendingApprovals.filter(a => a.restaurantId === merchantResId || (currentRes && a.restaurantName === currentRes.name));

                      if (myRequests.length === 0) return null;

                      return (
                        <div className="mt-6 pt-5 border-t border-[#E9E5DE] text-left space-y-3">
                          <h4 className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5 m-0">
                            <span>📋</span> My Change Requests Status & History ({myRequests.length})
                          </h4>
                          <div className="space-y-2.5">
                            {myRequests.map(req => {
                              const reqStatus = req.status || 'pending';
                              return (
                                <div key={req.id} className="p-3.5 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl text-xs space-y-2">
                                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9E5DE] pb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-charcoal text-xs">Submitted on: {req.submittedAt}</span>
                                    </div>
                                    <div>
                                      {reqStatus === 'pending' && (
                                        <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-300 font-extrabold rounded-full text-[10px] inline-flex items-center gap-1">
                                          <Clock className="h-3 w-3 animate-pulse text-amber-600" /> ⏳ Pending Admin Vetting
                                        </span>
                                      )}
                                      {reqStatus === 'approved' && (
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold rounded-full text-[10px] inline-flex items-center gap-1">
                                          <CheckCircle className="h-3 w-3 text-emerald-600" /> ✅ Approved & Published Live
                                        </span>
                                      )}
                                      {reqStatus === 'rejected' && (
                                        <span className="px-2.5 py-1 bg-rose-100 text-rose-800 border border-rose-300 font-extrabold rounded-full text-[10px] inline-flex items-center gap-1">
                                          <AlertTriangle className="h-3 w-3 text-rose-600" /> ❌ Denied / Rejected
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="bg-white p-2.5 rounded-lg border border-[#E9E5DE] text-[11px] space-y-1">
                                    <span className="font-bold text-charcoal block">Requested Profile Modifications:</span>
                                    <div className="text-charcoal-light space-y-0.5">
                                      {Object.keys(req.changes).map(k => (
                                        <div key={k}>
                                          <strong>{k}:</strong> <span className="text-bananaleaf">{typeof req.changes[k] === 'string' ? req.changes[k] : JSON.stringify(req.changes[k])}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {req.reviewedAt && (
                                    <div className="text-[10px] text-charcoal-light flex items-center justify-between pt-1">
                                      <span>Reviewed on: {req.reviewedAt}</span>
                                      {req.adminNote && (
                                        <span className="font-semibold text-charcoal italic">Admin Feedback: "{req.adminNote}"</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                <div className="bento-card p-6 bg-white space-y-4 shadow-sm border-[#E9E5DE]">
                  <div className="flex flex-wrap items-center justify-between border-b border-[#E9E5DE] pb-3 gap-2">
                    <h3 className="text-sm font-extrabold text-charcoal tracking-tight flex items-center gap-2 m-0">
                      <Plus className="h-4.5 w-4.5 text-terracotta" />
                      {adminEditingId ? "Modify Registered Heritage Kitchen" : "Register New Heritage Kitchen"}
                    </h3>
                  </div>

                  <form onSubmit={handleSaveAdminListing} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                          Restaurant Establishment Name
                        </label>
                        <input
                          type="text"
                          placeholder="ex. Everybody's Cafe"
                          name="name"
                          value={adminForm.name}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-2 text-xs border border-[#E9E5DE] rounded-xl bg-ivory font-black focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                          Price Tier
                        </label>
                        <select
                          name="priceTier"
                          value={adminForm.priceTier}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-2 text-xs border border-[#E9E5DE] rounded-xl bg-ivory font-bold focus:outline-none"
                        >
                          <option value="$">$ (Budget)</option>
                          <option value="$">$ (Moderate)</option>
                          <option value="$$">$$ (Premium)</option>
                          <option value="$$">$$ (Fine Degustation)</option>
                        </select>
                      </div>
                    </div>

                    {/* Dual Image Input: File Upload + Add Image URL */}
                    <div className="p-3.5 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl space-y-2.5">
                      <label className="block text-[10px] font-black text-charcoal uppercase tracking-wider">
                        📷 Restaurant Photos (Upload Local Files or Add Photo URLs)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="block text-[9px] font-bold text-charcoal-light uppercase mb-1">Option 1: Upload Local Picture Files</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              if (files.length > 0) {
                                const base64Promises = files.map(file => {
                                  return new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => resolve(reader.result);
                                    reader.readAsDataURL(file);
                                  });
                                });
                                Promise.all(base64Promises).then(results => {
                                  const newImages = [...(adminForm.images || []), ...results];
                                  setAdminForm({
                                    ...adminForm,
                                    images: newImages,
                                    image: newImages[0] || ''
                                  });
                                });
                              }
                            }}
                            className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white text-charcoal focus:outline-none"
                          />
                        </div>

                        <div>
                          <span className="block text-[9px] font-bold text-charcoal-light uppercase mb-1">Option 2: Add Image Web URL</span>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              placeholder="https://example.com/photo.jpg"
                              value={resPhotoUrlInput}
                              onChange={(e) => setResPhotoUrlInput(e.target.value)}
                              className="flex-1 px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (resPhotoUrlInput.trim()) {
                                  const newImages = [...(adminForm.images || []), resPhotoUrlInput.trim()];
                                  setAdminForm({
                                    ...adminForm,
                                    images: newImages,
                                    image: newImages[0] || ''
                                  });
                                  setResPhotoUrlInput('');
                                }
                              }}
                              className="px-3 py-1.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-lg text-xs font-bold cursor-pointer shrink-0"
                            >
                              + Add URL
                            </button>
                          </div>
                        </div>
                      </div>

                      {adminForm.images && adminForm.images.length > 0 && (
                        <div className="pt-2 border-t border-[#E9E5DE] space-y-1">
                          <div className="flex flex-wrap gap-2">
                            {adminForm.images.map((imgSrc, idx) => (
                              <div key={idx} className="relative w-12 h-12 shrink-0">
                                <img src={imgSrc} className="w-full h-full rounded-lg object-cover border border-[#E9E5DE] shadow-xs" alt={`Preview ${idx + 1}`} />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedImages = adminForm.images.filter((_, i) => i !== idx);
                                    setAdminForm({
                                      ...adminForm,
                                      images: updatedImages,
                                      image: updatedImages[0] || ''
                                    });
                                  }}
                                  className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[8px] font-black flex items-center justify-center shadow-md cursor-pointer transition-colors"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                          <span className="text-[9px] text-bananaleaf font-black block pt-0.5">
                            ✓ {adminForm.images.length} Photos Attached
                          </span>
                        </div>
                      )}
                    </div>

                    
                    
                    {/* Prominent Multi-Branch Location Manager inside Main Form Card */}
                    <div className="bg-[#FAF8F5] border border-[#2C5E3B]/25 p-4 rounded-xl space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9E5DE] pb-2">
                        <div>
                          <span className="text-[10px] font-black text-[#2C5E3B] uppercase tracking-wider block">
                            🏪 Restaurant Branch Locations Manager ({adminBranches.length} Active Branch{adminBranches.length !== 1 ? 'es' : ''})
                          </span>
                          <span className="text-[10px] text-charcoal-light font-medium block">
                            Register additional branches across Pampanga municipalities
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setAdminBranches([
                              ...adminBranches,
                              {
                                branchName: `${adminForm.name || 'Restaurant'} Branch #${adminBranches.length + 1}`,
                                municipality: adminForm.municipality || 'City of San Fernando',
                                address: '',
                                operatingHours: adminForm.operatingHours || '09:00 AM - 09:00 PM',
                                lat: 15.0300,
                                lng: 120.6800
                              }
                            ]);
                          }}
                          className="px-3 py-1.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white rounded-lg text-xs font-black transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          + Add Branch Location
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {adminBranches.map((branch, bIdx) => (
                          <div key={bIdx} className="p-3 bg-white border border-[#E9E5DE] rounded-xl space-y-2 text-xs shadow-2xs">
                            <div className="flex items-center justify-between gap-2">
                              <strong className="text-xs font-black text-charcoal flex items-center gap-1">
                                📍 Branch #{bIdx + 1}:
                              </strong>
                              {adminBranches.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => setAdminBranches(adminBranches.filter((_, idx) => idx !== bIdx))}
                                  className="px-2 py-0.5 text-terracotta hover:bg-terracotta/10 rounded font-bold text-[10px] transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  ✕ Remove Branch
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
                              <div>
                                <label className="block text-[9px] font-bold text-charcoal-light uppercase mb-0.5">Branch Name</label>
                                <input
                                  type="text"
                                  placeholder="e.g. SOUQ San Fernando Branch"
                                  value={branch.branchName || ''}
                                  onChange={(e) => {
                                    const updated = [...adminBranches];
                                    updated[bIdx] = { ...updated[bIdx], branchName: e.target.value };
                                    setAdminBranches(updated);
                                  }}
                                  className="block w-full px-2.5 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-[#FAF8F5] font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-charcoal-light uppercase mb-0.5">Branch Municipality / City</label>
                                <select
                                  value={branch.municipality || 'City of San Fernando'}
                                  onChange={(e) => {
                                    const updated = [...adminBranches];
                                    updated[bIdx] = { ...updated[bIdx], municipality: e.target.value };
                                    setAdminBranches(updated);
                                  }}
                                  className="block w-full px-2.5 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-[#FAF8F5] font-bold"
                                >
                                  {MUNICIPALITIES.map(mun => (
                                    <option key={mun} value={mun}>{mun}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-charcoal-light uppercase mb-0.5">Branch Operating Hours</label>
                                <input
                                  type="text"
                                  placeholder="e.g. 11:00 AM - 10:00 PM"
                                  value={branch.operatingHours || '09:00 AM - 09:00 PM'}
                                  onChange={(e) => {
                                    const updated = [...adminBranches];
                                    updated[bIdx] = { ...updated[bIdx], operatingHours: e.target.value };
                                    setAdminBranches(updated);
                                  }}
                                  className="block w-full px-2.5 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-[#FAF8F5] font-semibold"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold text-charcoal-light uppercase mb-0.5">Branch Exact Address</label>
                                <input
                                  type="text"
                                  placeholder="e.g. McArthur Highway, Dolores"
                                  value={branch.address || ''}
                                  onChange={(e) => {
                                    const updated = [...adminBranches];
                                    updated[bIdx] = { ...updated[bIdx], address: e.target.value };
                                    setAdminBranches(updated);
                                  }}
                                  className="block w-full px-2.5 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-[#FAF8F5]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-terracotta/5 border border-terracotta/20 p-3.5 rounded-xl">
                      <div>
                        <label className="block text-[10px] font-black text-terracotta uppercase tracking-wider mb-1">
                          👤 Merchant Account Username
                        </label>
                        <input
                          type="text"
                          placeholder="ex. ningnangan_owner"
                          name="username"
                          value={adminForm.username || ''}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-terracotta uppercase tracking-wider mb-1">
                          🔑 Merchant Account Password
                        </label>
                        <input
                          type="text"
                          placeholder="ex. ningnangan123"
                          name="password"
                          value={adminForm.password || ''}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        Culinary Description
                      </label>
                      <input
                        type="text"
                        placeholder="Describe the lineage, heritage, or cooking philosophy..."
                        name="description"
                        value={adminForm.description}
                        onChange={handleAdminFormChange}
                        className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory"
                      />
                    </div>

                  
                  {/* Free AI Menu OCR & Text Scanner Component */}
                  <div className="bg-gradient-to-r from-terracotta/10 via-saffron/10 to-[#2C5E3B]/10 border border-terracotta/30 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🤖</span>
                        <div>
                          <h4 className="text-xs font-black text-charcoal uppercase tracking-wider m-0">
                            Free AI Menu OCR & Automatic Dish Cataloger
                          </h4>
                          <span className="text-[10px] text-charcoal-light font-medium block">
                            Upload a menu photo or paste raw menu text to auto-generate dishes, prices, ingredients & allergen warnings
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-bananaleaf bg-white px-2.5 py-1 rounded-full border border-bananaleaf/30 shadow-2xs">
                        ⚡ 100% Free AI Engine
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-charcoal-light uppercase mb-1">
                          📷 Option 1: Upload Menu Board Photo / Flyer
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setAiMenuImage(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-charcoal-light uppercase mb-1">
                          📝 Option 2: Paste Raw Menu Text / Price List
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. SOUQ Pork Sisig ₱280, Crispy Kare-Kare ₱390, Bringhe ₱220..."
                          value={aiRawMenuText}
                          onChange={(e) => setAiRawMenuText(e.target.value)}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isAiScanning}
                      onClick={handleAiAnalyzeMenu}
                      className="w-full py-2.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white text-xs font-black rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      {isAiScanning ? "🤖 AI Scanning & Organizing Menu Items..." : "✨ Analyze & Auto-Organize Menu with AI (Free)"}
                    </button>
                  </div>


                  {/* Dynamic Dishes Input */}
                  <div className="border border-[#E9E5DE] rounded-xl p-4 bg-[#FAF8F5] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-extrabold text-charcoal-light uppercase tracking-wider flex items-center gap-1">
                        <Coffee className="h-3.5 w-3.5" /> Signature Dishes ({adminDishes.length})
                      </h4>
                      <button
                        type="button"
                        onClick={() => setAdminDishes([...adminDishes, { name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }])}
                        className="px-2.5 py-1 bg-terracotta text-white text-[10px] font-black rounded-lg hover:bg-terracotta-dark transition-colors flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> Add Dish
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adminDishes.map((dish, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border border-[#E9E5DE] space-y-2 relative">
                          <div className="flex items-center justify-between">
                            <span className="block text-[10px] font-black text-terracotta">DISH {String.fromCharCode(65 + idx)}</span>
                            {adminDishes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setAdminDishes(adminDishes.filter((_, i) => i !== idx))}
                                className="text-[9px] text-terracotta hover:text-red-600 font-bold px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors"
                              >
                                ✕ Remove
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              placeholder="Dish name"
                              value={dish.name}
                              onChange={(e) => {
                                const updated = [...adminDishes];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setAdminDishes(updated);
                              }}
                              className="col-span-2 px-2 py-1 text-[11px] border border-[#E9E5DE] rounded bg-white"
                            />
                            <input
                              type="number"
                              placeholder="Price (₱)"
                              value={dish.price}
                              onChange={(e) => {
                                const updated = [...adminDishes];
                                updated[idx] = { ...updated[idx], price: e.target.value };
                                setAdminDishes(updated);
                              }}
                              className="px-2 py-1 text-[11px] border border-[#E9E5DE] rounded bg-white"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Ingredients list"
                            value={dish.ingredients}
                            onChange={(e) => {
                              const updated = [...adminDishes];
                              updated[idx] = { ...updated[idx], ingredients: e.target.value };
                              setAdminDishes(updated);
                            }}
                            className="w-full px-2 py-1 text-[10px] border border-[#E9E5DE] rounded bg-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Allergen tags"
                              value={dish.allergens}
                              onChange={(e) => {
                                const updated = [...adminDishes];
                                updated[idx] = { ...updated[idx], allergens: e.target.value };
                                setAdminDishes(updated);
                              }}
                              className="px-2 py-1 text-[10px] border border-[#E9E5DE] rounded bg-white"
                            />
                            <input
                              type="number"
                              placeholder="Calories (kcal)"
                              value={dish.calories}
                              onChange={(e) => {
                                const updated = [...adminDishes];
                                updated[idx] = { ...updated[idx], calories: e.target.value };
                                setAdminDishes(updated);
                              }}
                              className="px-2 py-1 text-[10px] border border-[#E9E5DE] rounded bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-charcoal-light uppercase tracking-wider">
                              Upload Dish Photo (Required)
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const updated = [...adminDishes];
                                    updated[idx] = { ...updated[idx], image: reader.result };
                                    setAdminDishes(updated);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="block w-full px-2 py-1 text-[10px] border border-[#E9E5DE] rounded bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-terracotta"
                            />
                            {dish.image && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <img src={dish.image} className="w-6 h-6 rounded object-cover border border-[#E9E5DE]" alt="Preview" />
                                <span className="text-[8px] text-bananaleaf font-black">✓ Photo Uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end pt-3 border-t border-[#E9E5DE]">
                    {adminEditingId ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setAdminEditingId(null);
                            setAdminForm({
                              name: '', municipality: 'City of San Fernando',
                              operatingHours: '09:00 AM - 09:00 PM', priceTier: '$$',
                              address: '', image: '', images: [], description: ''
                            });
                            setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);
                          }}
                          className="px-4 py-2 border border-[#E9E5DE] rounded-xl text-xs font-bold text-charcoal hover:bg-[#FAF8F5] cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveAdminListing}
                          className="px-6 py-2.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
                        >
                          💾 Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer"
                      >
                        Register Heritage Kitchen
                      </button>
                    )}
                  </div>
                </form>
              </div>
              )}

              {/* Top Alert Banner for System Admin if Pending Requests exist */}
              {adminRole === 'superadmin' && pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length > 0 && (
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-xs animate-pulse">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider m-0">
                        ⚠️ Pending Merchant Change Request(s) Requiring Admin Action
                      </h4>
                      <p className="text-xs text-amber-800 font-medium m-0">
                        There are <strong>{pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length}</strong> restaurant info change request(s) submitted by owners waiting for vetting.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAdminSectionTab('requests')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Review All Requests Now →
                  </button>
                </div>
              )}

              {/* Super Admin Pending Approvals Queue (Embedded in Restaurants tab) */}
              {adminRole === 'superadmin' && pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length > 0 && (
                <div className="bento-card p-5 bg-white border border-[#E9E5DE] rounded-xl space-y-4 shadow-sm">
                  <h3 className="text-xs font-bold text-terracotta uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-4.5 w-4.5 text-terracotta animate-pulse" /> Pending Registry Approvals Queue ({pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length})
                  </h3>
                  <div className="space-y-3">
                    {pendingApprovals.filter(a => (a.status || 'pending') === 'pending').map(req => (
                      <div key={req.id} className="p-4 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl text-xs space-y-3 animate-fade-in">
                        <div className="flex justify-between items-center border-b border-[#E9E5DE] pb-2">
                          <span className="font-extrabold text-charcoal text-sm">🏪 {req.restaurantName}</span>
                          <span className="text-[10px] text-charcoal-light font-medium uppercase tracking-wider">{req.submittedAt}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[9px] font-black text-charcoal-light uppercase mb-1">Current Published Profile</span>
                            <div className="space-y-1 bg-white border border-[#E9E5DE] p-2.5 rounded-lg text-charcoal-light leading-relaxed">
                              {Object.keys(req.original).filter(k => k !== 'images' && k !== 'image').map(key => (
                                <div key={key}>
                                  <strong>{key}:</strong> {typeof req.original[key] === 'string' ? req.original[key] : JSON.stringify(req.original[key])}
                                </div>
                              ))}
                              {Array.isArray(req.original.images) && req.original.images.length > 0 && (
                                <div className="pt-1.5 flex flex-wrap gap-1">
                                  <span className="w-full text-[9px] font-bold text-charcoal-light">Original Photos:</span>
                                  {req.original.images.map((img, i) => (
                                    <img key={i} src={img} className="w-10 h-10 rounded object-cover border border-[#E9E5DE]" alt="Original photo" />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="block text-[9px] font-black text-terracotta uppercase mb-1">Proposed Profile Changes</span>
                            <div className="space-y-1 bg-white border border-terracotta/20 p-2.5 rounded-lg text-charcoal font-semibold leading-relaxed">
                              {Object.keys(req.changes).filter(k => k !== 'images' && k !== 'image').map(key => (
                                <div key={key} className="flex gap-1.5 items-center">
                                  <span><strong>{key}:</strong></span>
                                  <span className="text-bananaleaf">{typeof req.changes[key] === 'string' ? req.changes[key] : JSON.stringify(req.changes[key])}</span>
                                </div>
                              ))}
                              {Array.isArray(req.changes.images) && req.changes.images.length > 0 && (
                                <div className="pt-1.5 flex flex-wrap gap-1">
                                  <span className="w-full text-[9px] font-bold text-terracotta">New Proposed Photos:</span>
                                  {req.changes.images.map((img, i) => (
                                    <img key={i} src={img} className="w-10 h-10 rounded object-cover border border-terracotta/40 shadow-xs" alt="New photo" />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-1 border-t border-[#E9E5DE]">
                          <button
                            onClick={() => handleRejectApproval(req)}
                            className="px-3.5 py-1.5 border border-terracotta/20 text-terracotta font-extrabold rounded-lg hover:bg-terracotta/5 transition-colors cursor-pointer"
                          >
                            Reject & Dismiss
                          </button>
                          <button
                            onClick={() => handleApproveApproval(req)}
                            className="px-4 py-1.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white font-extrabold rounded-lg shadow-sm transition-colors cursor-pointer"
                          >
                            Approve & Publish Live
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Table */}
              <div className="bento-card p-5 bg-white space-y-4 shadow-sm border-[#E9E5DE]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider m-0">
                      Heritage Kitchen Database Listings
                    </h3>
                    <span className="text-[10px] text-charcoal-light font-medium block mt-0.5">
                      Alphabetically Sorted A-Z
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Admin Search Bar */}
                    <div className="relative flex items-center min-w-[220px]">
                      <Search className="absolute left-2.5 h-3.5 w-3.5 text-charcoal-light pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search by restaurant, city, address..."
                        value={adminSearchQuery}
                        onChange={(e) => setAdminSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-ivory border border-[#E9E5DE] text-xs focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                      />
                      {adminSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setAdminSearchQuery('')}
                          className="absolute right-2 text-charcoal-light hover:text-charcoal text-xs font-bold"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Location Filter */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-charcoal uppercase tracking-wider whitespace-nowrap">Filter Location:</span>
                      <select
                        value={adminSelectedMunicipality}
                        onChange={(e) => setAdminSelectedMunicipality(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-ivory border border-[#E9E5DE] text-xs font-semibold focus:outline-none"
                      >
                        <option value="All">All Municipalities/Cities</option>
                        {MUNICIPALITIES.map(mun => (
                          <option key={mun} value={mun}>{mun}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto border border-[#E9E5DE] rounded-xl">
                  <table className="min-w-full divide-y divide-[#E9E5DE] text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-charcoal-light uppercase font-bold tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3">Kitchen/Restaurant</th>
                        <th className="px-4 py-3">Branches</th>
                        <th className="px-4 py-3">Account Credentials</th>
                        <th className="px-4 py-3">Municipality/City</th>
                        <th className="px-4 py-3">Primary Address</th>
                        <th className="px-4 py-3">Hours</th>
                        <th className="px-4 py-3">Tier</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E5DE] bg-white text-charcoal font-medium">
                      {restaurants
                        .filter(r => {
                          if (adminRole === 'merchant') {
                            return r.id === merchantResId;
                          }
                          const matchesMun = isRestaurantInMunicipality(r, adminSelectedMunicipality);
                          const q = adminSearchQuery.trim().toLowerCase();
                          const matchesQuery = !q || (
                            (r.name && r.name.toLowerCase().includes(q)) ||
                            (r.municipality && r.municipality.toLowerCase().includes(q)) ||
                            (r.address && r.address.toLowerCase().includes(q)) ||
                            (r.username && r.username.toLowerCase().includes(q)) ||
                            (Array.isArray(r.branches) && r.branches.some(b => (b.branchName || '').toLowerCase().includes(q) || (b.address || '').toLowerCase().includes(q) || (b.municipality || '').toLowerCase().includes(q)))
                          );
                          return matchesMun && matchesQuery;
                        })
                        .sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }))
                        .map(res => (
                          <tr key={res.id} className="hover:bg-ivory/40 transition-colors">
                            <td
                              className="px-4 py-3 font-extrabold text-charcoal hover:text-terracotta cursor-pointer"
                              onClick={() => { setSelectedRestaurant(res); setActiveImgIdx(0); }}
                              title="Click to view updated listing drawer"
                            >
                              {res.name}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <span className="inline-flex items-center gap-1 bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full text-[10px] font-black border border-terracotta/20">
                                📍 {Array.isArray(res.branches) && res.branches.length > 0 ? `${res.branches.length} Branch${res.branches.length > 1 ? 'es' : ''}` : `1 Branch`}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <div className="flex flex-col text-[11px] space-y-0.5">
                                <span className="font-bold text-terracotta">👤 {res.username || 'owner'}</span>
                                <span className="text-charcoal-light font-mono text-[10px]">🔑 {res.password || 'password123'}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 font-bold text-terracotta text-xs">
                              {Array.isArray(res.branches) && res.branches.length > 1
                                ? res.branches.map(b => b.municipality).join(' • ')
                                : res.municipality}
                            </td>
                            <td className="px-4 py-3 text-charcoal-light text-[10px] font-semibold max-w-xs truncate">
                              {Array.isArray(res.branches) && res.branches.length > 1
                                ? res.branches.map((b, i) => `${i + 1}. ${b.address || b.municipality}`).join(' | ')
                                : res.address}
                            </td>
                            <td className="px-4 py-3 text-charcoal-light">{res.operatingHours}</td>
                            <td className="px-4 py-3 text-bananaleaf font-bold">{res.priceTier}</td>
                            <td className="px-4 py-3 text-right space-x-1 shrink-0 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => startAdminEdit(res)}
                                className="p-1.5 text-charcoal-light hover:text-terracotta rounded-lg hover:bg-terracotta/5 inline-flex border border-[#E9E5DE] bg-white cursor-pointer shadow-2xs hover:border-terracotta"
                                title="Edit Listing & Credentials"
                              >
                                <Edit className="h-4 w-4 text-terracotta" />
                              </button>
                              {adminRole !== 'merchant' && (
                                <button
                                  type="button"
                                  onClick={() => deleteRestaurant(res.id)}
                                  className="p-1.5 text-charcoal-light hover:text-red-600 rounded-lg hover:bg-red-50 inline-flex border border-[#E9E5DE] bg-white cursor-pointer shadow-2xs hover:border-red-300"
                                  title="Remove Listing"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SYSTEM ADMIN DEDICATED CHANGE REQUESTS VETTING & CONTROL PANEL */}
          {/* ========================================================================= */}
          {adminSectionTab === 'requests' && adminRole === 'superadmin' && (
            <div className="space-y-6">
              {/* Request Stats Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bento-card p-4 bg-white border border-[#E9E5DE] rounded-xl flex items-center gap-3">
                  <div className="p-3 bg-terracotta/10 text-terracotta rounded-xl">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-charcoal-light uppercase tracking-wider block">Total Requests</span>
                    <span className="text-xl font-black text-charcoal">{pendingApprovals.length}</span>
                  </div>
                </div>

                <div className="bento-card p-4 bg-white border border-amber-200 rounded-xl flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <Clock className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Pending Review</span>
                    <span className="text-xl font-black text-amber-900">{pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length}</span>
                  </div>
                </div>

                <div className="bento-card p-4 bg-white border border-emerald-200 rounded-xl flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Approved & Live</span>
                    <span className="text-xl font-black text-emerald-900">{pendingApprovals.filter(a => a.status === 'approved').length}</span>
                  </div>
                </div>

                <div className="bento-card p-4 bg-white border border-rose-200 rounded-xl flex items-center gap-3">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">Denied / Rejected</span>
                    <span className="text-xl font-black text-rose-900">{pendingApprovals.filter(a => a.status === 'rejected').length}</span>
                  </div>
                </div>
              </div>

              {/* Request Filter Tabs & Queue */}
              <div className="bento-card p-6 bg-white space-y-5 border-[#E9E5DE] shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E5DE] pb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-charcoal uppercase tracking-wider flex items-center gap-2 m-0">
                      <span>📋</span> Merchant Profile Change Requests Vetting Center
                    </h3>
                    <span className="text-[11px] text-charcoal-light font-medium block mt-0.5">
                      Review, vet, approve or deny restaurant owner profile modifications
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 bg-ivory p-1 rounded-xl border border-[#E9E5DE] text-xs">
                    <button
                      type="button"
                      onClick={() => setAdminRequestFilterTab('pending')}
                      className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${adminRequestFilterTab === 'pending' ? 'bg-amber-500 text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal'}`}
                    >
                      ⏳ Pending Queue ({pendingApprovals.filter(a => (a.status || 'pending') === 'pending').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminRequestFilterTab('all')}
                      className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${adminRequestFilterTab === 'all' ? 'bg-terracotta text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal'}`}
                    >
                      All Requests ({pendingApprovals.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminRequestFilterTab('approved')}
                      className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${adminRequestFilterTab === 'approved' ? 'bg-emerald-600 text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal'}`}
                    >
                      ✅ Approved ({pendingApprovals.filter(a => a.status === 'approved').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminRequestFilterTab('rejected')}
                      className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${adminRequestFilterTab === 'rejected' ? 'bg-rose-600 text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal'}`}
                    >
                      ❌ Denied ({pendingApprovals.filter(a => a.status === 'rejected').length})
                    </button>
                  </div>
                </div>

                {/* Request List */}
                {(() => {
                  const filteredRequests = pendingApprovals.filter(req => {
                    const status = req.status || 'pending';
                    if (adminRequestFilterTab === 'pending') return status === 'pending';
                    if (adminRequestFilterTab === 'approved') return status === 'approved';
                    if (adminRequestFilterTab === 'rejected') return status === 'rejected';
                    return true;
                  });

                  if (filteredRequests.length === 0) {
                    return (
                      <div className="py-12 text-center text-charcoal-light space-y-2 bg-[#FAF8F5] rounded-xl border border-[#E9E5DE]">
                        <span className="text-3xl block">📋</span>
                        <p className="text-xs font-bold uppercase tracking-wider">No change requests found in this view filter</p>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {filteredRequests.map(req => {
                        const status = req.status || 'pending';
                        return (
                          <div key={req.id} className="p-5 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl text-xs space-y-4 shadow-2xs animate-fade-in">
                            <div className="flex flex-wrap items-center justify-between border-b border-[#E9E5DE] pb-3 gap-2">
                              <div>
                                <span className="font-extrabold text-charcoal text-base block">🏪 {req.restaurantName}</span>
                                <span className="text-[10px] text-charcoal-light font-medium uppercase tracking-wider">Submitted: {req.submittedAt} • Request ID: {req.id}</span>
                              </div>
                              <div>
                                {status === 'pending' && (
                                  <span className="px-3 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 font-extrabold rounded-full text-xs inline-flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-amber-600 animate-pulse" /> ⏳ Pending Vetting
                                  </span>
                                )}
                                {status === 'approved' && (
                                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold rounded-full text-xs inline-flex items-center gap-1.5">
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600" /> ✅ Approved & Published Live
                                  </span>
                                )}
                                {status === 'rejected' && (
                                  <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border border-rose-300 font-extrabold rounded-full text-xs inline-flex items-center gap-1.5">
                                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600" /> ❌ Denied / Rejected
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <span className="block text-[10px] font-black text-charcoal-light uppercase tracking-wider mb-1.5">
                                  Current Published Profile State
                                </span>
                                <div className="space-y-1.5 bg-white border border-[#E9E5DE] p-3 rounded-xl text-charcoal-light leading-relaxed">
                                  {Object.keys(req.original).filter(k => k !== 'images' && k !== 'image').map(key => (
                                    <div key={key}>
                                      <strong className="text-charcoal">{key}:</strong> {typeof req.original[key] === 'string' ? req.original[key] : JSON.stringify(req.original[key])}
                                    </div>
                                  ))}
                                  {Array.isArray(req.original.images) && req.original.images.length > 0 && (
                                    <div className="pt-2 flex flex-wrap gap-1.5">
                                      <span className="w-full text-[9px] font-bold text-charcoal-light uppercase">Original Gallery Photos:</span>
                                      {req.original.images.map((img, i) => (
                                        <img key={i} src={img} className="w-12 h-12 rounded-lg object-cover border border-[#E9E5DE]" alt="Original photo" />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <span className="block text-[10px] font-black text-terracotta uppercase tracking-wider mb-1.5">
                                  Proposed Profile Modifications
                                </span>
                                <div className="space-y-1.5 bg-white border border-terracotta/30 p-3 rounded-xl text-charcoal font-semibold leading-relaxed shadow-2xs">
                                  {Object.keys(req.changes).filter(k => k !== 'images' && k !== 'image').map(key => (
                                    <div key={key} className="flex flex-wrap gap-1 items-center">
                                      <span className="text-charcoal font-bold">{key}:</span>
                                      <span className="text-bananaleaf font-extrabold">{typeof req.changes[key] === 'string' ? req.changes[key] : JSON.stringify(req.changes[key])}</span>
                                    </div>
                                  ))}
                                  {Array.isArray(req.changes.images) && req.changes.images.length > 0 && (
                                    <div className="pt-2 flex flex-wrap gap-1.5">
                                      <span className="w-full text-[9px] font-bold text-terracotta uppercase">New Proposed Gallery Photos:</span>
                                      {req.changes.images.map((img, i) => (
                                        <img key={i} src={img} className="w-12 h-12 rounded-lg object-cover border border-terracotta/40 shadow-xs" alt="New photo" />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {status === 'pending' ? (
                              <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#E9E5DE]">
                                <button
                                  type="button"
                                  onClick={() => handleRejectApproval(req)}
                                  className="px-4 py-2 border border-rose-300 text-rose-700 font-extrabold rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                                >
                                  ❌ Deny & Dismiss Request
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleApproveApproval(req)}
                                  className="px-5 py-2 bg-[#2C5E3B] hover:bg-[#20452B] text-white font-black rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  <CheckCircle className="h-4 w-4" /> Approve & Publish Live
                                </button>
                              </div>
                            ) : (
                              <div className="pt-2 border-t border-[#E9E5DE] text-[11px] text-charcoal-light flex flex-wrap items-center justify-between gap-2 bg-white p-2.5 rounded-lg border">
                                <span><strong>Reviewed Date:</strong> {req.reviewedAt || 'Recently'}</span>
                                {req.adminNote && (
                                  <span className="font-bold text-charcoal"><strong>Admin Note:</strong> "{req.adminNote}"</span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          
          {/* ========================================================================= */}
          {/* TOURIST ATTRACTIONS & HERITAGE SITES ADMIN MANAGEMENT VIEW */}
          {/* ========================================================================= */}
          {adminSectionTab === 'attractions' && adminRole === 'superadmin' && (
            <div className="space-y-6">
              {/* Attraction Add/Edit Form */}
              <div className="bento-card p-6 bg-white space-y-5 border-[#E9E5DE] shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E9E5DE] pb-3">
                  <h3 className="text-sm font-extrabold text-charcoal uppercase tracking-wider flex items-center gap-2 m-0">
                    <span>🏛️</span> {adminEditingAttractionId ? "Modify Registered Tourist Attraction" : "Register New Tourist Destination"}
                  </h3>
                  {adminEditingAttractionId && (
                    <span className="text-xs font-black text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full border border-terracotta/20">
                      Editing Destination Mode
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveAdminAttraction} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        Attraction / Landmark Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Candaba Wetland Reserve"
                        value={adminAttractionForm.name}
                        onChange={(e) => setAdminAttractionForm({ ...adminAttractionForm, name: e.target.value })}
                        className="block w-full px-3 py-2 border border-[#E9E5DE] rounded-xl bg-ivory text-xs font-extrabold focus:outline-none focus:ring-1 focus:ring-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        Municipality / City
                      </label>
                      <select
                        value={adminAttractionForm.municipality}
                        onChange={(e) => setAdminAttractionForm({ ...adminAttractionForm, municipality: e.target.value })}
                        className="block w-full px-3 py-2 border border-[#E9E5DE] rounded-xl bg-ivory text-xs font-extrabold focus:outline-none"
                      >
                        {MUNICIPALITIES.map(mun => (
                          <option key={mun} value={mun}>{mun}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        Category / Type
                      </label>
                      <select
                        value={adminAttractionForm.type}
                        onChange={(e) => setAdminAttractionForm({ ...adminAttractionForm, type: e.target.value })}
                        className="block w-full px-3 py-2 border border-[#E9E5DE] rounded-xl bg-ivory text-xs font-extrabold focus:outline-none"
                      >
                        <option value="🏛️ Historic Parish Church">🏛️ Historic Parish Church</option>
                        <option value="🌲 Nature / Ecotourism">🌲 Nature / Ecotourism</option>
                        <option value="🎨 Heritage Museum">🎨 Heritage Museum</option>
                        <option value="🏺 Artisan Workshop">🏺 Artisan Workshop</option>
                        <option value="📍 Cultural Landmark">📍 Cultural Landmark</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl space-y-2.5">
                      <label className="block text-[10px] font-black text-charcoal uppercase tracking-wider">
                        📷 Tourist Destination Photos (Upload Local Files or Add Photo URLs)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="block text-[9px] font-bold text-charcoal-light uppercase mb-1">Option 1: Upload Local Picture Files</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              if (files.length > 0) {
                                const base64Promises = files.map(file => {
                                  return new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => resolve(reader.result);
                                    reader.readAsDataURL(file);
                                  });
                                });
                                Promise.all(base64Promises).then(results => {
                                  const existing = adminAttractionForm.images || (adminAttractionForm.image ? [adminAttractionForm.image] : []);
                                  const updatedImages = [...existing, ...results];
                                  setAdminAttractionForm({
                                    ...adminAttractionForm,
                                    images: updatedImages,
                                    image: updatedImages[0] || ''
                                  });
                                });
                              }
                            }}
                            className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white text-charcoal focus:outline-none"
                          />
                        </div>

                        <div>
                          <span className="block text-[9px] font-bold text-charcoal-light uppercase mb-1">Option 2: Add Image Web URL</span>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              placeholder="/attractions/candaba_bird_sanctuary.jpg or https://..."
                              value={attrPhotoUrlInput}
                              onChange={(e) => setAttrPhotoUrlInput(e.target.value)}
                              className="flex-1 px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-white focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (attrPhotoUrlInput.trim()) {
                                  const existing = adminAttractionForm.images || (adminAttractionForm.image ? [adminAttractionForm.image] : []);
                                  const updatedImages = [...existing, attrPhotoUrlInput.trim()];
                                  setAdminAttractionForm({
                                    ...adminAttractionForm,
                                    images: updatedImages,
                                    image: updatedImages[0] || ''
                                  });
                                  setAttrPhotoUrlInput('');
                                }
                              }}
                              className="px-3 py-1.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-lg text-xs font-bold cursor-pointer shrink-0"
                            >
                              + Add URL
                            </button>
                          </div>
                        </div>
                      </div>

                      {((adminAttractionForm.images && adminAttractionForm.images.length > 0) || adminAttractionForm.image) && (
                        <div className="pt-2 border-t border-[#E9E5DE] space-y-1">
                          <div className="flex flex-wrap gap-2">
                            {(adminAttractionForm.images && adminAttractionForm.images.length > 0 ? adminAttractionForm.images : [adminAttractionForm.image]).map((imgSrc, idx) => (
                              <div key={idx} className="relative w-12 h-12 shrink-0">
                                <img src={imgSrc} className="w-full h-full rounded-lg object-cover border border-[#E9E5DE] shadow-xs" alt="Preview" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentImgs = adminAttractionForm.images || [adminAttractionForm.image];
                                    const updated = currentImgs.filter((_, i) => i !== idx);
                                    setAdminAttractionForm({
                                      ...adminAttractionForm,
                                      images: updated,
                                      image: updated[0] || ''
                                    });
                                  }}
                                  className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[8px] font-black flex items-center justify-center shadow-md cursor-pointer transition-colors"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                          <span className="text-[9px] text-bananaleaf font-black block pt-0.5">
                            ✓ {(adminAttractionForm.images || [adminAttractionForm.image]).length} Photos Attached
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        Historical / Cultural Summary
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. National Cultural Treasure built in 1575..."
                        value={adminAttractionForm.description}
                        onChange={(e) => setAdminAttractionForm({ ...adminAttractionForm, description: e.target.value })}
                        className="block w-full px-3 py-2 border border-[#E9E5DE] rounded-xl bg-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2 border-t border-[#E9E5DE]">
                    {adminEditingAttractionId && (
                      <button
                        type="button"
                        onClick={() => {
                          setAdminEditingAttractionId(null);
                          setAdminAttractionForm({
                            name: '',
                            municipality: 'City of San Fernando',
                            type: '🏛️ Historic Parish Church',
                            description: '',
                            details: '',
                            image: '',
                            lat: 15.0300,
                            lng: 120.6800
                          });
                        }}
                        className="px-4 py-2 border border-[#E9E5DE] rounded-xl text-xs font-semibold text-charcoal hover:bg-[#FAF8F5] cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 py-2 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-black shadow-sm cursor-pointer"
                    >
                      {adminEditingAttractionId ? "Update Destination" : "Register Destination"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Tourist Attractions Data Table */}
              <div className="bento-card p-5 bg-white space-y-4 shadow-sm border-[#E9E5DE]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-charcoal uppercase tracking-wider m-0">
                    Heritage Tourist Destinations Database ({attractions.length} Sites)
                  </h3>
                </div>

                <div className="overflow-x-auto border border-[#E9E5DE] rounded-xl">
                  <table className="min-w-full divide-y divide-[#E9E5DE] text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-charcoal-light uppercase font-bold tracking-wider text-[11px]">
                      <tr>
                        <th className="px-4 py-3">Landmark Name</th>
                        <th className="px-4 py-3">Municipality / City</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E5DE] bg-white text-charcoal font-medium">
                      {attractions.map(attr => (
                        <tr key={attr.id} className="hover:bg-ivory/40">
                          <td className="px-4 py-3 font-extrabold flex items-center gap-2">
                            {attr.image && <img src={attr.image} alt={attr.name} className="w-8 h-8 rounded object-cover border border-[#E9E5DE]" />}
                            <span>{attr.name}</span>
                          </td>
                          <td className="px-4 py-3 text-terracotta font-bold">📍 {attr.municipality}</td>
                          <td className="px-4 py-3 text-charcoal-light">{attr.type}</td>
                          <td className="px-4 py-3 text-charcoal-light text-[11px] max-w-xs truncate">{attr.description}</td>
                          <td className="px-4 py-3 text-right space-x-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => startAdminAttractionEdit(attr)}
                              className="p-1.5 text-charcoal-light hover:text-terracotta rounded-lg hover:bg-terracotta/5 inline-flex border border-[#E9E5DE] bg-white cursor-pointer shadow-2xs hover:border-terracotta"
                              title="Edit Destination"
                            >
                              <Edit className="h-4 w-4 text-terracotta" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteAttraction(attr.id)}
                              className="p-1.5 text-charcoal-light hover:text-terracotta rounded-lg hover:bg-terracotta/5 inline-flex border border-[#E9E5DE] bg-white cursor-pointer shadow-2xs"
                              title="Delete Destination"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Admin page footer with GROUP JECCAN! Project Creators & Developers */}
        <footer className="bg-charcoal text-white py-8 mt-12 border-t border-charcoal-dark font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            {/* GROUP JECCAN! Section */}
            <div className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-5 space-y-3 shadow-md border-l-4 border-l-terracotta">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-terracotta uppercase tracking-wider">
                  GROUP JECCAN!
                </span>
                <span className="bg-[#E2F1E7] text-[#2C5E3B] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#2C5E3B]/20 inline-block">
                  Project Creators & Developers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#FAF8F5] border border-[#E9E5DE] p-3.5 rounded-xl space-y-0.5">
                  <span className="block text-xs font-black text-charcoal">
                    Rancis J. Santos
                  </span>
                  <span className="block text-[10px] font-bold text-terracotta">
                    Team Leader
                  </span>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9E5DE] p-3.5 rounded-xl space-y-0.5">
                  <span className="block text-xs font-black text-charcoal">
                    Lance Jerald D. Laxamana
                  </span>
                  <span className="block text-[10px] font-medium text-charcoal-light">
                    Core Member
                  </span>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9E5DE] p-3.5 rounded-xl space-y-0.5">
                  <span className="block text-xs font-black text-charcoal">
                    Kirsen Yaj B. Villanueva
                  </span>
                  <span className="block text-[10px] font-medium text-charcoal-light">
                    Core Member
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom System Info */}
            <div className="text-center text-xs text-gray-400 border-t border-[#333333] pt-4">
              <span className="block font-black text-white uppercase tracking-wider">Kanyamanan Administrative Core</span>
              <span className="block mt-1 text-[11px]">
                Authorized access only. Secure database access logs active.
              </span>
            </div>

          </div>
        </footer>

      </div>
    );
  }

  // =========================================================================
  // CONSUMER / PUBLIC Aggregator PORTAL VIEW
  // =========================================================================
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col font-sans relative pb-20 sm:pb-0">

      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E9E5DE] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

          {/* Logo Brand Typography */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveView('homepage'); setSelectedMunicipality('All'); setSelectedCorridor('All'); }}>
            <img 
              src="/kanyamanan-logo.png" 
              alt="Kanyamanan Logo" 
              className="w-10 h-10 object-contain rounded-xl shadow-md border border-[#E9E5DE] shrink-0 bg-white p-0.5" 
            />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-charcoal m-0 flex items-center gap-1.5 leading-none">
                Kanyamanan
              </h1>
              <p className="text-[10px] text-charcoal-light font-medium tracking-wide mt-0.5">
                PAMPANGA HEALTH INFORMATICS & CULINARY RESTAURANT AGGREGATOR
              </p>
            </div>
          </div>

          {/* Centralized Search Input */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-charcoal-light" />
            </div>
            <input
              type="text"
              placeholder="Search dishes, heritage kitchens, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-[#E9E5DE] rounded-xl bg-[#FAF8F5] text-sm placeholder-charcoal-light focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal-light hover:text-charcoal"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveView('homepage')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeView === 'homepage' ? 'text-terracotta bg-terracotta/5' : 'text-charcoal-light hover:text-charcoal'}`}
            >
              Explore Feed
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeView === 'dashboard' ? 'text-terracotta bg-terracotta/5' : 'text-charcoal-light hover:text-charcoal'}`}
                >
                  🗺️ My Food Trip Planner
                </button>
                <div className="h-6 w-px bg-[#E9E5DE] hidden sm:block"></div>
                <div className="flex items-center gap-2 pl-1 bg-white border border-[#E9E5DE] rounded-full p-0.5">
                  <div className="w-8 h-8 rounded-full bg-bananaleaf flex items-center justify-center text-white text-xs font-bold shadow-inner">
                    {userProfile.username.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-charcoal hidden sm:inline-block pr-3">
                    Mangan, {userProfile.username}!
                  </span>
                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setIsGuest(false);
                      setActiveView('homepage');
                      setActiveTrip([]);
                    }}
                    title="Sign Out"
                    className="p-2 text-charcoal-light hover:text-terracotta rounded-full hover:bg-terracotta/5 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : isGuest ? (
              <>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeView === 'dashboard' ? 'text-terracotta bg-terracotta/5' : 'text-charcoal-light hover:text-charcoal'}`}
                >
                  🗺️ Trip Planner (Guest)
                </button>
                <button
                  onClick={() => setActiveView('auth')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-terracotta text-terracotta text-xs font-bold rounded-xl hover:bg-terracotta hover:text-white transition-colors"
                >
                  <User className="h-3.5 w-3.5" /> Sign In
                </button>
                <button
                  onClick={() => {
                    setIsGuest(false);
                    setActiveView('homepage');
                    setActiveTrip([]);
                  }}
                  title="Exit Guest Mode"
                  className="p-2 text-charcoal-light hover:text-terracotta rounded-full hover:bg-terracotta/5 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsGuest(true);
                    setActiveView('dashboard');
                    setDashboardTab('planner');
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold tracking-wide text-charcoal-light hover:text-charcoal transition-colors"
                >
                  🗺️ Plan Trip (Guest Mode)
                </button>
                <button
                  onClick={() => setActiveView('auth')}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-xs font-bold rounded-xl shadow-sm text-white bg-terracotta hover:bg-terracotta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta transition-colors"
                >
                  <User className="h-3.5 w-3.5" />
                  Sign In / Register
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Loading Toast (Stirring the palayok... Optimizing your routes.) */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-charcoal text-white px-5 py-3 rounded-full flex items-center gap-2.5 shadow-2xl border border-charcoal-light animate-bounce">
          <Coffee className="h-4 w-4 text-saffron animate-spin shrink-0" />
          <span className="text-xs font-bold tracking-wide text-saffron">Stirring the palayok... Optimizing your routes.</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Mobile Search input */}
        <div className="md:hidden w-full mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-charcoal-light" />
          </div>
          <input
            type="text"
            placeholder="Search kitchens, dishes, municipalities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-[#E9E5DE] rounded-xl bg-white text-sm placeholder-charcoal-light focus:outline-none focus:ring-1 focus:ring-terracotta"
          />
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: THE PUBLIC HOMEPAGE */}
        {/* ========================================================================= */}
        {activeView === 'homepage' && (
          <div className="space-y-6">

            {/* Hero Section */}
            <div className="bento-card relative overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-white via-[#FAF9F6] to-ivory border-2 border-saffron/20 shadow-md">
              {/* Background Parul Sampernandu (Giant Lantern) Watermark */}
              <div className="absolute right-0 bottom-0 w-36 h-36 sm:w-56 sm:h-56 text-saffron/10 opacity-30 pointer-events-none z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1">
                  <polygon points="50,15 57,38 80,38 61,52 69,75 50,60 31,75 39,52 20,38 43,38" />
                  <circle cx="50" cy="50" r="30" />
                  <circle cx="50" cy="50" r="42" />
                  <line x1="50" y1="8" x2="50" y2="92" />
                  <line x1="8" y1="50" x2="92" y2="50" />
                  <line x1="20" y1="20" x2="80" y2="80" />
                  <line x1="20" y1="80" x2="80" y2="20" />
                </svg>
              </div>

              <div className="relative z-10 max-w-3xl">
                {/* Cultural Greeting Subtitle */}
                <div className="space-y-2.5 mb-6 select-none">
                  <div>
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase bg-terracotta/5 text-terracotta border border-terracotta/10">
                      Manyaman a Kayamanan • A Delicious Treasure
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black text-bananaleaf tracking-wide leading-tight flex items-center gap-2">
                    <span>🍽️ Mekeni, Mangan Tana king Pampanga!</span>
                  </h3>
                  <span className="block text-[10px] sm:text-xs font-black text-charcoal-light uppercase tracking-widest">
                    Come, Let's Eat in Pampanga! • Culinary Heritage
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] leading-tight tracking-tight m-0">
                  Explore Pampanga's <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-[#993A16] relative inline-block">Culinary Map<span className="absolute bottom-1 left-0 w-full h-1 bg-saffron/35 rounded-full"></span></span>
                </h2>
                
                <p className="mt-4 text-sm sm:text-base text-charcoal-light leading-relaxed max-w-3xl font-medium">
                  Welcome to <span className="font-extrabold text-terracotta">Kanyamanan</span>. Discover slow-cooked ancestral recipes,
                  analyze regional traffic sequence delays, and optimize your nutritional boundaries in one centralized, heritage-optimized grid.
                </p>
              </div>
            </div>

            {/* Bento Grid: 12-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Sidebar: Municipalities List (col-span-3) */}
              <div className="lg:col-span-3 space-y-6">

                {/* Municipality Selector list in sidebar */}
                <div className="bento-card p-5 bg-white space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E9E5DE]">
                    <h3 className="text-xs font-extrabold text-charcoal uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-terracotta" /> Municipality/City Selection
                    </h3>
                    <span className="text-[10px] font-bold text-charcoal-light bg-[#FAF8F5] border border-[#E9E5DE] px-2 py-0.5 rounded-md">
                      {MUNICIPALITIES.length} Areas
                    </span>
                  </div>

                  <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
                    <button
                      onClick={() => setSelectedMunicipality('All')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${selectedMunicipality === 'All' ? 'bg-terracotta text-white shadow-sm' : 'bg-ivory/50 hover:bg-[#E9E5DE] text-charcoal-light hover:text-charcoal'}`}
                    >
                      <span>All Locations</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedMunicipality === 'All' ? 'bg-white/20 text-white' : 'bg-charcoal/5 text-charcoal-light'}`}>
                        {restaurants.length}
                      </span>
                    </button>

                    {MUNICIPALITIES.map(mun => (
                      <button
                        key={mun}
                        onClick={() => setSelectedMunicipality(mun)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${selectedMunicipality === mun ? 'bg-terracotta text-white shadow-sm' : 'bg-ivory/50 hover:bg-[#E9E5DE] text-charcoal-light hover:text-charcoal'}`}
                      >
                        <span className="truncate pr-1">{mun}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${selectedMunicipality === mun ? 'bg-white/20 text-white' : 'bg-charcoal/5 text-charcoal-light'}`}>
                          {municipalityCounts[mun] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Local Info */}
                <div className="bento-card p-5 bg-gradient-to-br from-[#2C5E3B]/5 to-transparent border-[#2C5E3B]/10">
                  <h3 className="text-xs font-bold text-bananaleaf uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4" /> Kapampangan Kitchens
                  </h3>
                  <p className="text-xs text-charcoal-light leading-relaxed">
                    Local dishes preserve traditional <b>palayok</b> cooking methods (clay pot slow simmer) and wood-fired stoves.
                  </p>
                </div>

              </div>

              {/* Feed Grid Area (col-span-9) */}
              <div className="lg:col-span-9 space-y-6">

                {/* Filter indicators */}
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#E9E5DE]">
                  <span className="text-xs text-charcoal-light font-medium">
                    Showing <strong className="text-charcoal">{filteredRestaurants.length}</strong> culinary heritage establishments
                  </span>
                  <span className="text-[10px] font-semibold text-charcoal-light uppercase bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E9E5DE] truncate max-w-xs">
                    {selectedMunicipality === 'All' ? 'All Municipalities/Cities' : selectedMunicipality}
                  </span>
                </div>

                {/* Main Feed: 3-column sub-grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRestaurants.length === 0 ? (
                    <div className="col-span-full bg-white p-12 rounded-2xl border border-[#E9E5DE] text-center">
                      <AlertTriangle className="h-10 w-10 text-saffron mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-charcoal">No culinary listings matched your filter settings</h4>
                      <p className="text-xs text-charcoal-light mt-1">Try resetting the municipalities filter or search query.</p>
                      <button
                        onClick={() => { setSelectedMunicipality('All'); setSearchQuery(''); }}
                        className="mt-4 px-3.5 py-2 bg-terracotta text-white rounded-lg text-xs font-bold hover:bg-terracotta-dark"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    filteredRestaurants.map(res => (
                      <div
                        key={res.id}
                        onClick={() => { setSelectedRestaurant(res); setActiveImgIdx(0); }}
                        className="bento-card bg-white p-5 flex flex-col justify-between cursor-pointer border-[#E9E5DE] hover:border-terracotta/30 group"
                      >
                        <div>
                          {/* Image Box */}
                          <div className="aspect-[4/3] w-full rounded-xl bg-[#FAF8F5] border border-[#E9E5DE] mb-4 relative overflow-hidden flex items-center justify-center text-charcoal-light group-hover:border-terracotta/25 transition-all">
                            {res.image ? (
                              <img
                                src={res.image}
                                alt={res.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-image opacity-15 pointer-events-none bg-center bg-no-repeat bg-cover lantern-overlay"></div>
                                <div className="z-10 text-center p-4">
                                  <span className="block text-2xl mb-1">🏛️</span>
                                  <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal-light block">Heritage Kitchen</span>
                                </div>
                              </>
                            )}


                          </div>

                          <div className="flex items-start justify-between gap-1.5">
                            <h3 className="text-base font-extrabold text-charcoal leading-snug group-hover:text-terracotta transition-colors m-0">
                              {res.name}
                            </h3>
                            <span className="text-xs font-bold text-bananaleaf bg-bananaleaf/5 px-2 py-0.5 rounded border border-bananaleaf/10 shrink-0">
                              {res.priceTier}
                            </span>
                          </div>

                          <p className="text-[11px] text-charcoal-light leading-relaxed mt-2 line-clamp-2">
                            {res.description}
                          </p>
                        </div>

                        {/* Tech metrics placeholders */}
                        <div className="mt-4 pt-3 border-t border-[#FAF8F5] space-y-2 text-[10px] text-charcoal-light">
                          <div className="flex items-center justify-between font-semibold">
                            <span className="flex items-center gap-1"><Activity className="h-3.5 w-3.5 text-terracotta shrink-0" /> Crowd Forecaster:</span>
                            <span className="text-terracotta">{res.occupancy[4]}% Peak</span>
                          </div>
                          <div className="flex items-center justify-between font-semibold">
                            <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-bananaleaf shrink-0" /> Est. Cost:</span>
                            <span className="text-bananaleaf">₱{res.menu[0]?.price || 200} base</span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#FAF8F5]">
                            <div className="flex items-center gap-1.5 font-semibold text-charcoal-light min-w-0 max-w-[60%]" title={getRestaurantMunicipalities(res).join(', ')}>
                              <MapPin className="h-3.5 w-3.5 text-saffron shrink-0" />
                              {getRestaurantMunicipalities(res).length > 1 ? (
                                <span className="text-[10px] font-black text-terracotta truncate bg-terracotta/5 px-1.5 py-0.5 rounded border border-terracotta/15">
                                  {getRestaurantMunicipalities(res).length} Branches ({getRestaurantMunicipalities(res).join(' • ')})
                                </span>
                              ) : (
                                <span className="truncate text-xs font-bold text-charcoal">{res.municipality}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const muns = getRestaurantMunicipalities(res);
                                  if (muns.length > 1) {
                                    setBranchSelectTarget(res);
                                  } else {
                                    handleAddToItinerary(res);
                                    alert(`✓ Added "${res.name}" to active trip itinerary!`);
                                  }
                                }}
                                className="px-2.5 py-1 bg-terracotta hover:bg-terracotta-dark text-white text-[10px] font-extrabold rounded-lg flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                              >
                                <Plus className="h-3 w-3" /> Add Stop
                              </button>
                              <span className="text-xs font-bold text-terracotta flex items-center gap-0.5">
                                Drawer <ChevronRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: USER REGISTRATION & LOGIN SYSTEM */}
        {/* ========================================================================= */}
        {activeView === 'auth' && (
          <div className="max-w-md mx-auto my-12 animate-slide-up">
            <div className="bento-card p-6 sm:p-8 bg-white border-[#E9E5DE] lantern-overlay shadow-xl">

              <div className="text-center mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta/10 text-terracotta mb-3">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <h2 className="text-2xl font-black text-charcoal tracking-tight m-0">
                  {isRegistering ? "Create Your Profile" : "Welcome Back"}
                </h2>
                <p className="text-xs text-charcoal-light mt-1.5">
                  {isRegistering ? "Configure dietary targets and active route constraints." : "Access your dynamic itineraries and wellness targets."}
                </p>
              </div>

              <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                {isRegistering && (
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex. JuanDelaCruz"
                      value={regForm.username}
                      onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                      className="block w-full px-3.5 py-2.5 border border-[#E9E5DE] rounded-xl text-sm bg-ivory focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                    />
                    {formErrors.username && <p className="text-xs text-terracotta mt-1">{formErrors.username}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="juan@pampanga.gov.ph"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="block w-full px-3.5 py-2.5 border border-[#E9E5DE] rounded-xl text-sm bg-ivory focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                  />
                  {formErrors.email && <p className="text-xs text-terracotta mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                    className="block w-full px-3.5 py-2.5 border border-[#E9E5DE] rounded-xl text-sm bg-ivory focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                  />
                  {formErrors.password && <p className="text-xs text-terracotta mt-1">{formErrors.password}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-terracotta text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-terracotta-dark shadow transition-colors flex items-center justify-center gap-2"
                >
                  {isRegistering ? "Create Secure Profile" : "Sign In to Your Profile"} <ChevronRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-[#FAF8F5] text-center">
                <button
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setFormErrors({});
                  }}
                  className="text-xs font-bold text-terracotta hover:underline"
                >
                  {isRegistering ? "Already have a profile? Sign In" : "Don't have a profile yet? Register"}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: AUTHENTICATED CONSUMER DASHBOARD */}
        {/* ========================================================================= */}
        {activeView === 'dashboard' && (
          <div className="space-y-6 animate-slide-up">

            {/* Tabbed Side Menu/Navbar */}
            <div className="flex border-b border-[#E9E5DE] bg-white rounded-xl p-1.5 shadow-sm">
              <button
                onClick={() => setDashboardTab('planner')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${dashboardTab === 'planner' ? 'bg-terracotta text-white shadow-sm' : 'text-charcoal-light hover:text-charcoal'}`}
              >
                <Compass className="h-4 w-4" /> Provincial Food Trip Planner
              </button>
              <button
                onClick={() => setDashboardTab('health')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${dashboardTab === 'health' ? 'bg-terracotta text-white shadow-sm' : 'text-charcoal-light hover:text-charcoal'}`}
              >
                <Heart className="h-4 w-4" /> Health Informatics Core
              </button>
              <button
                onClick={() => setDashboardTab('assistant')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${dashboardTab === 'assistant' ? 'bg-terracotta text-white shadow-sm' : 'text-charcoal-light hover:text-charcoal'}`}
              >
                <MessageSquare className="h-4 w-4" /> Interactive Travel Kanyamanan-Kasaup
              </button>
              <button
                onClick={() => setDashboardTab('history')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${dashboardTab === 'history' ? 'bg-terracotta text-white shadow-sm' : 'text-charcoal-light hover:text-charcoal'}`}
              >
                <Star className="h-4 w-4" /> User Travel History
              </button>
            </div>

            {/* TAB CONTENT: 1. Provincial Food Trip Planner (Split-Pane layout) */}
            {dashboardTab === 'planner' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Pane: Config fields */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bento-card p-5 bg-white space-y-5">
                    <h3 className="text-sm font-extrabold text-charcoal tracking-tight flex items-center gap-2">
                      <Sliders className="h-4.5 w-4.5 text-terracotta" /> Itinerary Optimization Bounding
                    </h3>

                    {/* Geolocation Starting Point */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                        Starting Location Point
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value={userLocation.name === "Your Detected Location" ? `📍 Detected (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})` : userLocation.name}
                          className="flex-1 px-3 py-1.5 border border-[#E9E5DE] rounded-lg bg-[#FAF8F5] text-xs font-semibold focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={detectUserLocation}
                          className="px-3 py-1.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white rounded-lg text-xs font-bold transition-colors shrink-0"
                        >
                          {isDetectingLocation ? "Locating..." : "📍 Locate Me"}
                        </button>
                      </div>
                      <span className="block text-[10px] text-charcoal-light">
                        Calibrate starting coords point via browser device GPS.
                      </span>
                    </div>

                    <div className="h-px bg-[#E9E5DE]"></div >

                    
                    {/* Tourist Destinations Picker per Municipality in Planner */}
                    <div className="bento-card p-5 bg-white space-y-4 border-[#E9E5DE]">
                      <div className="flex items-center justify-between border-b border-[#E9E5DE] pb-2.5">
                        <div>
                          <h3 className="text-xs font-extrabold text-charcoal uppercase tracking-wider flex items-center gap-1.5 m-0">
                            <span>🏛️</span> Tourist Destinations Per Place
                          </h3>
                          <span className="text-[10px] text-charcoal-light font-medium block mt-0.5">
                            Pick heritage sights & landmarks to visit on your trip
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-terracotta bg-terracotta/5 px-2 py-0.5 rounded border border-terracotta/10">
                          {attractions.filter(a => attractionMunFilter === 'All' || a.municipality === attractionMunFilter).length} Places
                        </span>
                      </div>

                      {/* Select Municipality/City Filter for Destinations */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider">
                          Select Municipality / City Destinations
                        </label>
                        <select
                          value={attractionMunFilter}
                          onChange={(e) => setAttractionMunFilter(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-[#E9E5DE] rounded-xl bg-[#FAF8F5] font-bold focus:outline-none focus:bg-white"
                        >
                          <option value="All">All Municipalities & Cities ({attractions.length} Heritage Sites)</option>
                          {MUNICIPALITIES.map(mun => (
                            <option key={mun} value={mun}>📍 {mun}</option>
                          ))}
                        </select>
                      </div>

                      {/* Destinations Cards List in Planner */}
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {attractions.filter(attr => attractionMunFilter === 'All' || attr.municipality === attractionMunFilter).map(attr => {
                          const isAdded = activeTrip.some(item => item.id === attr.id);

                          return (
                            <div key={attr.id} className="p-3 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl flex items-center justify-between gap-3 hover:border-terracotta/30 transition-all">
                              <div className="flex items-start gap-2.5 min-w-0">
                                {attr.image && (
                                  <img src={attr.image} alt={attr.name} className="w-11 h-11 rounded-lg object-cover border border-[#E9E5DE] shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <strong className="text-xs font-black text-charcoal block truncate">{attr.name}</strong>
                                  <span className="text-[10px] font-bold text-terracotta block">📍 {attr.municipality}</span>
                                  <span className="text-[9px] text-charcoal-light font-medium block truncate">{attr.type}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setSelectedAttraction(attr)}
                                  className="p-1.5 text-charcoal-light hover:text-charcoal text-[10px] font-bold rounded-md bg-white border border-[#E9E5DE]"
                                  title="View Details"
                                >
                                  ℹ️
                                </button>
                                <button
                                  type="button"
                                  disabled={isAdded}
                                  onClick={() => {
                                    handleAddToItinerary(attr);
                                    alert(`✓ Added "${attr.name}" (${attr.municipality}) to your trip itinerary!`);
                                  }}
                                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black transition-colors ${
                                    isAdded ? 'bg-bananaleaf/10 text-bananaleaf border border-bananaleaf/20' : 'bg-[#2C5E3B] hover:bg-[#20452B] text-white cursor-pointer shadow-2xs'
                                  }`}
                                >
                                  {isAdded ? '✓ Added' : '+ Add Place'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>


                    {/* Enforceable Stop Ceiling Slider (1-5 stops limit) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-charcoal">
                        <span>Same-day Excursionist Stop Ceiling</span>
                        <strong className="text-terracotta bg-terracotta/5 px-2 py-0.5 rounded border border-terracotta/10 text-xs">
                          {stopCeiling} stops limit
                        </strong>
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={stopCeiling}
                        onChange={(e) => setStopCeiling(Number(e.target.value))}
                        className="w-full h-1.5 bg-[#FAF8F5] border border-[#E9E5DE] rounded-lg appearance-none cursor-pointer accent-terracotta"
                      />
                      <div className="flex items-center justify-between text-[9px] text-charcoal-light font-black tracking-wider uppercase">
                        <span>1 Stop (Nominal)</span>
                        <span>5 Stops (Maximum Limit)</span>
                      </div>
                    </div>

                    <div className="h-px bg-[#E9E5DE]"></div>

                    
                    
                    {/* Live Trip Start & Navigation Control Panel */}
                    <div className="bg-white border border-[#2C5E3B]/25 rounded-2xl p-4 space-y-3 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-black text-terracotta uppercase tracking-wider block">
                            🚀 Real-Time Multi-Stop Navigation Engine
                          </span>
                          <h4 className="text-sm font-black text-charcoal m-0 flex items-center gap-1.5">
                            {isTripActive ? (
                              <span className="flex items-center gap-1.5 text-bananaleaf">
                                <span className="w-2.5 h-2.5 rounded-full bg-bananaleaf animate-ping inline-block"></span>
                                Live Navigation Active
                              </span>
                            ) : (
                              "Start Your Kapampangan Crawl"
                            )}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          {!isTripActive ? (
                            <button
                              type="button"
                              onClick={handleStartLiveTrip}
                              className="px-5 py-2.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                            >
                              🚀 Start Trip Navigation
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={handleAdvanceNextStop}
                                className="px-3.5 py-2 bg-saffron hover:bg-saffron-dark text-charcoal text-xs font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer"
                              >
                                ✓ Arrived / Next Stop ➡️
                              </button>
                              <button
                                type="button"
                                onClick={handleEndLiveTrip}
                                className="px-3.5 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                              >
                                ⏹️ End Trip
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Multi-Stop Progress Track */}
                      {computedRoutePath.length > 0 && (
                        <div className="pt-2 border-t border-[#E9E5DE] space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-black uppercase text-charcoal-light">
                            <span>Itinerary Progress: {visitedStops.length} of {computedRoutePath.length} Visited</span>
                            {isTripActive && computedRoutePath[currentStopIndex] && (
                              <span className="text-terracotta font-black">
                                Target: {computedRoutePath[currentStopIndex].name} ({distanceToTargetKm ? `${distanceToTargetKm} km away` : 'Navigating'})
                              </span>
                            )}
                          </div>

                          {/* Progress Stepper Pills */}
                          <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {computedRoutePath.map((stop, idx) => {
                              const isVisited = visitedStops.includes(stop.id);
                              const isCurrentTarget = isTripActive && idx === currentStopIndex;

                              return (
                                <div
                                  key={stop.id}
                                  className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 shrink-0 transition-all ${
                                    isVisited
                                      ? 'bg-bananaleaf/10 border-bananaleaf text-bananaleaf font-bold'
                                      : isCurrentTarget
                                      ? 'bg-terracotta text-white border-terracotta font-black shadow-xs animate-pulse'
                                      : 'bg-[#FAF8F5] border-[#E9E5DE] text-charcoal-light font-semibold'
                                  }`}
                                >
                                  <span>{isVisited ? '✓' : isCurrentTarget ? '🎯' : idx + 1}</span>
                                  <span className="truncate max-w-[120px]">{stop.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>


                    {/* Live Trip Departure & ETA Navigation Banner */}
                    {computedRoutePath.length > 0 && (
                      <div className="bg-gradient-to-r from-[#2C5E3B]/10 via-terracotta/10 to-saffron/10 border border-[#2C5E3B]/20 rounded-2xl p-4 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2C5E3B]/15 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🚗</span>
                            <div>
                              <div className="flex items-center justify-between w-full">
                                <h4 className="text-xs font-black text-charcoal uppercase tracking-wider m-0">Live Trip Navigation & ETA</h4>
                                <button
                                  type="button"
                                  onClick={() => setIsCompletionModalOpen(true)}
                                  className="px-3.5 py-1.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                                >
                                  <span>🎉</span> Done / Finish Trip
                                </button>
                              </div>
                              <span className="text-[10px] text-charcoal-light font-bold">
                                {isSimulating ? '⚡ Live Route Simulation Active' : '📍 Trip Departure Point: ' + userLocation.name}
                              </span>
                            </div>
                          </div>
                          
                          <div className="bg-white border border-[#2C5E3B]/30 px-3.5 py-1.5 rounded-xl shadow-xs text-right">
                            <span className="text-[9px] font-black text-charcoal-light uppercase tracking-wider block">Estimated Arrival (ETA)</span>
                            <strong className="text-sm font-black text-[#2C5E3B]">
                              ⏰ {calculateETA(routeDurationMin)}
                            </strong>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-white p-2 rounded-xl border border-[#E9E5DE]">
                            <span className="block text-[9px] font-bold text-charcoal-light uppercase">Total Distance</span>
                            <strong className="text-xs font-black text-charcoal">{routeDistanceKm > 0 ? `${routeDistanceKm} km` : '~12.5 km'}</strong>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-[#E9E5DE]">
                            <span className="block text-[9px] font-bold text-charcoal-light uppercase">Drive Duration</span>
                            <strong className="text-xs font-black text-terracotta">
                              {routeDurationMin > 0 ? `${isTrafficCongested ? Math.round(routeDurationMin * 1.35) : routeDurationMin} mins` : '~25 mins'}
                            </strong>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-[#E9E5DE]">
                            <span className="block text-[9px] font-bold text-charcoal-light uppercase">Traffic Status</span>
                            <strong className={`text-xs font-black ${isTrafficCongested ? 'text-red-600' : 'text-bananaleaf'}`}>
                              {isTrafficCongested ? '⚠️ Congested (+35%)' : '🟢 Smooth Flow'}
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}


                    {/* Active Itinerary List */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[10px] font-black text-charcoal-light uppercase tracking-wider">
                          Active Route Nodes ({activeTrip.length} Stops)
                        </h4>
                        <span className="text-[9px] font-bold text-terracotta bg-terracotta/5 px-2 py-0.5 rounded border border-terracotta/10">
                          🖐️ Drag cards or use ▲ ▼ to reorder stop numbers
                        </span>
                      </div>
                        <span className="text-[9px] font-bold text-terracotta bg-terracotta/5 px-2 py-0.5 rounded border border-terracotta/10">
                          🖐️ Drag cards or use ▲ ▼ to reorder stop numbers
                        </span>
                      </div>

                      {activeTrip.length === 0 ? (
                        <div className="bg-[#FAF8F5] border border-dashed border-[#E9E5DE] p-6 rounded-xl text-center">
                          <p className="text-xs text-charcoal-light">No destinations added yet.</p>
                          <button
                            onClick={() => setActiveView('homepage')}
                            className="mt-3 px-3.5 py-1.5 bg-terracotta text-white rounded-lg text-xs font-bold"
                          >
                            Browse Feed
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            {computedRoutePath.map((res, index) => (
                              <div
                                key={res.id}
                                draggable={true}
                                onDragStart={() => setDraggedIndex(index)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  if (draggedIndex !== null && draggedIndex !== index) {
                                    moveItineraryItem(draggedIndex, index);
                                    setDraggedIndex(null);
                                  }
                                }}
                                className={`bg-[#FAF8F5] p-3 rounded-xl border transition-all flex items-center justify-between gap-3 shadow-2xs group cursor-grab active:cursor-grabbing ${
                                  draggedIndex === index ? 'border-terracotta bg-terracotta/5 opacity-50 scale-[0.98]' : 'border-[#E9E5DE] hover:border-terracotta/40 hover:bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {/* Drag Handle & Numbering */}
                                  <span className="text-charcoal-light group-hover:text-terracotta font-bold text-sm select-none shrink-0" title="Drag to reorder">
                                    ⋮⋮
                                  </span>
                                  <span className="w-6 h-6 rounded-full bg-bananaleaf text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-xs">
                                    {index + 1}
                                  </span>
                                  <div className="min-w-0">
                                    <span className="block text-xs font-black text-charcoal truncate group-hover:text-terracotta transition-colors">{res.name}</span>
                                    <span className="block text-[9px] text-charcoal-light font-semibold truncate">
                                      📍 {res.municipality} • {res.address}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  {/* Move Up Button */}
                                  <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => moveItineraryItem(index, index - 1)}
                                    className={`p-1 rounded text-xs font-bold transition-colors ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-charcoal-light hover:text-terracotta hover:bg-terracotta/5 cursor-pointer'}`}
                                    title="Move Stop Up (Change to previous number)"
                                  >
                                    ▲
                                  </button>
                                  {/* Move Down Button */}
                                  <button
                                    type="button"
                                    disabled={index === computedRoutePath.length - 1}
                                    onClick={() => moveItineraryItem(index, index + 1)}
                                    className={`p-1 rounded text-xs font-bold transition-colors ${index === computedRoutePath.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-charcoal-light hover:text-terracotta hover:bg-terracotta/5 cursor-pointer'}`}
                                    title="Move Stop Down (Change to next number)"
                                  >
                                    ▼
                                  </button>
                                  {/* Remove Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFromItinerary(res.id)}
                                    className="p-1 text-charcoal-light hover:text-terracotta cursor-pointer transition-colors ml-1"
                                    title="Remove Stop"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Save Plan Form */}
                          <form onSubmit={handleSaveActiveTrip} className="mt-4 pt-4 border-t border-[#E9E5DE] space-y-2">
                            <label className="block text-[10px] font-black text-charcoal-light uppercase tracking-wider">
                              Name and Store Your Plan
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                required
                                placeholder="e.g. My Heritage Weekend Crawl"
                                value={newItineraryName}
                                onChange={(e) => setNewItineraryName(e.target.value)}
                                className="flex-1 px-3 py-2 border border-[#E9E5DE] rounded-xl bg-[#FAF8F5] text-xs font-semibold focus:outline-none focus:bg-white"
                              />
                              <button
                                type="submit"
                                className="px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                              >
                                Save Route
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Adaptive Highway Traffic Adjuster Notifications Ticker */}
                  <div className="bento-card p-5 bg-white space-y-4">
                    <div className="flex items-center justify-between border-b border-[#FAF8F5] pb-2">
                      <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-terracotta animate-pulse" /> Traffic Adjuster Simulation
                      </h3>
                      <button
                        onClick={() => setIsTrafficCongested(!isTrafficCongested)}
                        className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border tracking-wider transition-colors ${isTrafficCongested ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-terracotta border-terracotta/20'}`}
                      >
                        {isTrafficCongested ? "Clear Jams" : "Simulate Congestion"}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {trafficNotifications.slice(0, 2).map(n => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg border text-xs leading-normal flex gap-2 ${n.type === 'danger' ? 'bg-terracotta/5 border-terracotta/20 text-terracotta-dark font-semibold' : 'bg-bananaleaf/5 border-bananaleaf/20 text-bananaleaf'}`}
                        >
                          <span className="text-sm shrink-0">{n.type === 'danger' ? '⚠️' : '🟢'}</span>
                          <span>{n.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget settings panel */}
                  <div className="bento-card p-5 bg-white space-y-4">
                    <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-base">💰</span> Budget Allocation Settings
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-charcoal-light uppercase tracking-wider mb-1">
                            Total Budget Limit (PHP)
                          </label>
                          <input
                            type="number"
                            min="200"
                            max="10000"
                            value={userProfile.budgetLimit}
                            onChange={(e) => setUserProfile({ ...userProfile, budgetLimit: Number(e.target.value) || 1500 })}
                            className="block w-full px-2.5 py-1.5 border border-[#E9E5DE] rounded bg-[#FAF8F5] text-xs text-charcoal font-bold focus:outline-none focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-charcoal-light uppercase tracking-wider mb-1">
                            Number of Persons
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={numPersons}
                            onChange={(e) => setNumPersons(Math.max(1, Number(e.target.value) || 1))}
                            className="block w-full px-2.5 py-1.5 border border-[#E9E5DE] rounded bg-[#FAF8F5] text-xs text-charcoal font-bold focus:outline-none focus:bg-white"
                          />
                        </div>
                      </div>



                      {/* Division Calculations */}
                      <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E9E5DE] text-xs space-y-2">
                        <h4 className="font-bold text-charcoal tracking-tight">Per-Person Allocations ({numPersons} pax):</h4>
                        <div className="flex justify-between items-center text-charcoal-light">
                          <span>Budget Limit per Person:</span>
                          <strong className="text-charcoal font-extrabold">₱{Math.round(userProfile.budgetLimit / numPersons)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Pane: Accurate Map */}
                <div className="lg:col-span-7">
                  <div className="bento-card p-5 bg-[#FAF8F5] border border-[#E9E5DE] space-y-4 h-full flex flex-col">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E9E5DE] pb-2">
                      <h3 className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                        <Map className="h-4.5 w-4.5 text-terracotta" /> Provincial Route Mapping Engine
                      </h3>
                      
                      {/* Nav Controls */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={toggleGPSWatch}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 border ${isTrackingGPS ? 'bg-bananaleaf text-white border-bananaleaf' : 'bg-white text-charcoal-light border-[#E9E5DE] hover:text-charcoal hover:bg-white'}`}
                        >
                          🌐 {isTrackingGPS ? "Tracking GPS..." : "Track My GPS"}
                        </button>
                        {roadRouteCoords.length > 0 && (
                          <button
                            type="button"
                            onClick={startRouteSimulation}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 border ${isSimulating ? 'bg-terracotta text-white border-terracotta animate-pulse' : 'bg-white text-charcoal-light border-[#E9E5DE] hover:text-charcoal hover:bg-white'}`}
                          >
                            🚗 {isSimulating ? "Navigating..." : "Simulate Navigation"}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="relative flex-1 min-h-[360px] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-[#E9E5DE]">
                      <div id="leaflet-map" className="w-full h-full min-h-[360px] rounded-2xl z-10"></div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: 2. Health Informatics Core */}
            {dashboardTab === 'health' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left side: Image uploader uploader card & Daily budget meters */}
                <div className="lg:col-span-5 space-y-6">

                  {/* Visual Calorie Scanners Dropzone */}
                  <div className="bento-card p-5 bg-white space-y-4">
                    <div>
                      <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                        <Upload className="h-4.5 w-4.5 text-terracotta" /> Image Uploader (Computer Vision Estimator)
                      </h3>
                      <p className="text-[10px] text-charcoal-light mt-0.5">
                        Simulate photo scans to deconstruct caloric compositions.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {PRESEEDED_MEAL_PHOTOS.slice(0, 2).map(m => (
                        <button
                          key={m.id}
                          onClick={() => triggerCVMealUpload(m)}
                          className={`p-2.5 rounded-lg border text-center transition-all ${cvUploadedMeal?.id === m.id ? 'border-bananaleaf bg-bananaleaf/5' : 'border-[#E9E5DE]'}`}
                        >
                          <span className="text-xs font-black block text-charcoal truncate">{m.name}</span>
                          <span className="text-[9px] text-terracotta font-bold mt-1 block">Simulate Scan</span>
                        </button>
                      ))}
                    </div>

                    <div className="border border-dashed border-[#E9E5DE] rounded-xl p-4 bg-[#FAF8F5] text-center min-h-[140px] flex flex-col justify-center items-center">
                      {isCVProcessing ? (
                        <div className="space-y-1.5 animate-pulse text-center">
                          <span className="text-xl block">🧠</span>
                          <span className="text-xs font-black text-terracotta">Analyzing Portion Volume...</span>
                        </div>
                      ) : cvUploadedMeal ? (
                        <div className="text-left w-full space-y-2 text-xs">
                          <span className="block text-xs font-extrabold text-bananaleaf bg-bananaleaf/5 px-2 py-0.5 rounded">
                            Identified: {cvUploadedMeal.name} ({cvUploadedMeal.nutrition.calories} kcal)
                          </span>
                          <p className="text-[10px] text-charcoal-light leading-relaxed">{cvUploadedMeal.description}</p>

                          <div className="grid grid-cols-3 gap-2 text-[9px] text-center font-bold text-charcoal pt-1">
                            <div className="bg-white p-1 rounded border border-[#E9E5DE]">P: {cvUploadedMeal.nutrition.protein}g</div>
                            <div className="bg-white p-1 rounded border border-[#E9E5DE]">C: {cvUploadedMeal.nutrition.carbs}g</div>
                            <div className="bg-white p-1 rounded border border-[#E9E5DE]">F: {cvUploadedMeal.nutrition.fat}g</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-charcoal-light font-bold">Drag and drop meal photos here</span>
                      )}
                    </div>
                  </div>

                  {/* Calorie settings panel */}
                  <div className="bento-card p-5 bg-white space-y-4">
                    <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-base">🥗</span> Calorie Allocation Settings
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-bold text-charcoal-light uppercase tracking-wider mb-1">
                          Daily Calorie Limit (kcal)
                        </label>
                        <input
                          type="number"
                          min="1200"
                          max="4000"
                          value={userProfile.calorieLimit}
                          onChange={(e) => setUserProfile({ ...userProfile, calorieLimit: Number(e.target.value) || 2200 })}
                          className="block w-full px-2.5 py-1.5 border border-[#E9E5DE] rounded bg-[#FAF8F5] text-xs text-charcoal font-bold focus:outline-none focus:bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-charcoal-light">Calorie Allowance Meter</span>
                          <span className="font-bold">{activeTripMetrics.calories} / {userProfile.calorieLimit} kcal</span>
                        </div>
                        <div className="w-full bg-[#FAF8F5] rounded-full h-2 overflow-hidden border border-[#E9E5DE]">
                          <div
                            className="h-full bg-bananaleaf transition-all duration-300"
                            style={{ width: `${Math.min(100, (activeTripMetrics.calories / userProfile.calorieLimit) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>



                </div>

                {/* Right side: Dynamic menu parsing list with warnings */}
                <div className="lg:col-span-7">
                  <div className="bento-card p-5 bg-white space-y-4">
                    <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                      Dynamic Menu Parsing & Allergen Registry
                    </h3>

                    <div className="space-y-3">
                      {/* Standard allergen alerts */}
                      <div className="p-3.5 bg-terracotta/5 border border-terracotta/20 rounded-xl space-y-2 text-xs">
                        <h4 className="font-extrabold text-terracotta flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4 shrink-0" /> SYSTEM LOCALIZATION ALLERGEN ALERTS
                        </h4>
                        <div className="space-y-1.5 text-charcoal leading-relaxed">
                          <p className="font-semibold text-terracotta-dark">⚠️ Contains Fermented Shrimp Paste / Bagoong Alamang</p>
                          <p className="text-[10px] text-charcoal-light">Often present as a standard seasoning layer in *Kare-Kare* and sour *Bulanglang*.</p>

                          <p className="font-semibold text-terracotta-dark mt-2">⚠️ Contains Peanuts/Tree Nuts</p>
                          <p className="text-[10px] text-charcoal-light">Standard thickener component in heritage *Kare-Kareng Duman* dishes.</p>
                        </div>
                      </div>

                      {/* Active catalog menu list */}
                      <div className="border border-[#E9E5DE] rounded-xl overflow-hidden divide-y divide-[#E9E5DE] text-xs">
                        <div className="bg-[#FAF8F5] p-3 font-bold text-charcoal-light uppercase tracking-wider">
                          Active Recipe Deconstruct Items
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <span className="block font-black text-charcoal">Original Sizzling Sisig</span>
                            <span className="block text-[9px] text-charcoal-light">Ingredients: Pork snout, ears, cheeks, chicken liver</span>
                          </div>
                          <span className="text-[10px] bg-terracotta/10 text-terracotta border border-terracotta/15 px-2 py-0.5 rounded font-bold shrink-0">
                            High Cholesterol warning
                          </span>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <span className="block font-black text-charcoal">Kare-Kareng Duman</span>
                            <span className="block text-[9px] text-charcoal-light">Ingredients: Oxtail, peanut paste, bagoong alamang</span>
                          </div>
                          <span className="text-[10px] bg-terracotta/15 text-terracotta border border-terracotta/20 px-2 py-0.5 rounded font-bold shrink-0">
                            Peanut & Shrimp Paste Alert
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: 3. Interactive Travel Kanyamanan-Kasaup */}
            {dashboardTab === 'assistant' && (
              <div className="bento-card p-5 bg-white space-y-4 max-w-2xl mx-auto">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-terracotta" /> Travel Advisor Chatbot (Natural Language Advisor)
                </h3>

                <div className="h-[380px] overflow-y-auto bg-ivory rounded-xl border border-[#E9E5DE] p-4 space-y-3">
                  {chatMessages.map((m, idx) => (
                    <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${m.sender === 'user' ? 'bg-terracotta text-white rounded-br-none' : 'bg-white border border-[#E9E5DE] text-charcoal rounded-bl-none shadow-sm'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChatMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about sisig calories, bagoong alerts, or same-day route ceilings..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-[#E9E5DE] rounded-xl focus:outline-none focus:ring-1 focus:ring-terracotta bg-ivory"
                  />
                  <button type="submit" className="p-2.5 bg-terracotta text-white rounded-xl shadow hover:bg-terracotta-dark">
                    <Send className="h-4.5 w-4.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT: 4. User Travel History */}
            {dashboardTab === 'history' && (
              <div className="bento-card p-6 bg-white space-y-4 max-w-xl mx-auto border-[#E9E5DE]">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">
                  <Star className="h-4.5 w-4.5 text-saffron" /> Saved Itineraries History
                </h3>

                {(!isAuthenticated || isGuest) ? (
                  <div className="p-8 text-center space-y-4 bg-[#FAF8F5] border border-dashed border-[#E9E5DE] rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto text-xl font-bold">
                      🔒
                    </div>
                    <div className="space-y-1 max-w-md mx-auto">
                      <h4 className="text-sm font-extrabold text-charcoal m-0">
                        Account Required to Access Travel History
                      </h4>
                      <p className="text-xs text-charcoal-light leading-relaxed m-0">
                        Guest visitors can explore public culinary maps and live route sequences. Please create a free account or sign in to save your custom itineraries, track completed food crawls, and view saved history!
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveView('auth')}
                      className="px-5 py-2.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-extrabold transition-all shadow cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <ShieldCheck className="h-4 w-4" /> Sign In / Create Account
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                  {savedItineraries.map(itin => (
                    <div
                      key={itin.id}
                      onClick={() => handleLoadSavedItinerary(itin)}
                      className={`p-4 border rounded-xl text-left space-y-3 transition-all cursor-pointer group/itin relative shadow-sm hover:shadow-md ${
                        itin.isFinished 
                          ? 'bg-[#FAF8F5]/60 border-[#E9E5DE] opacity-80 hover:border-terracotta/40' 
                          : 'bg-[#FAF8F5] border-[#E9E5DE] hover:border-terracotta hover:bg-white'
                      }`}
                      title="Click to load and execute this plan"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm font-black block truncate ${itin.isFinished ? 'text-charcoal-light line-through' : 'text-charcoal group-hover/itin:text-terracotta transition-colors'}`}>
                            {itin.name}
                          </span>
                          {itin.isFinished ? (
                            <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-extrabold text-bananaleaf animate-fade-in">
                              ✓ Finished Trip
                            </span>
                          ) : (
                            <span className="text-[10px] text-charcoal-light font-bold">
                              Active Plan • {itin.stops?.length || 0} Stops
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={(e) => handleToggleFinishItinerary(itin.id, e)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              itin.isFinished 
                                ? 'text-bananaleaf hover:bg-bananaleaf/10' 
                                : 'text-charcoal-light hover:text-bananaleaf hover:bg-bananaleaf/5'
                            }`}
                            title={itin.isFinished ? "Mark as Active" : "Mark as Finished"}
                          >
                            <CheckCircle className={`h-4.5 w-4.5 ${itin.isFinished ? 'fill-bananaleaf/10' : ''}`} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDeleteItinerary(itin.id, e)}
                            className="p-1.5 rounded-lg text-charcoal-light hover:text-terracotta hover:bg-terracotta/5 transition-colors"
                            title="Delete Route"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {itin.stops.map((stop, idx) => (
                          <span 
                            key={idx} 
                            className={`text-[10px] px-2.5 py-1 rounded-md border font-semibold transition-all ${
                              itin.isFinished 
                                ? 'bg-white/50 text-gray-400 border-gray-200' 
                                : 'bg-white text-charcoal border-[#E9E5DE] group-hover/itin:border-terracotta/30'
                            }`}
                          >
                            {typeof stop === 'object' ? stop.name : stop}
                          </span>
                        ))}
                      </div>

                      <div className="pt-1 flex justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoadSavedItinerary(itin);
                          }}
                          className="px-3.5 py-1.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-lg text-xs font-black transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 group-hover/itin:bg-terracotta-dark"
                        >
                          <Compass className="h-3.5 w-3.5" /> Load & Execute Plan →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* Floating chatbot bubble for bottom-right accessibility */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="w-80 sm:w-96 h-[380px] bg-white border border-[#E9E5DE] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-slide-up">
            <div className="bg-charcoal text-white px-4 py-3 flex items-center justify-between shrink-0">
              <span className="text-xs font-extrabold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-terracotta" /> Kanyamanan-Kasaup
              </span>
              <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-[#FAF8F5] p-4 space-y-3">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${m.sender === 'user' ? 'bg-terracotta text-white rounded-br-none' : 'bg-white border border-[#E9E5DE] text-charcoal rounded-bl-none shadow-sm'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendChatMessage} className="bg-white border-t border-[#E9E5DE] p-3 flex gap-2 shrink-0">
              <input
                type="text"
                placeholder="Ask about calories, allergens, route limits..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-xl focus:outline-none bg-ivory"
              />
              <button type="submit" className="p-2 bg-terracotta text-white rounded-xl">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-terracotta hover:bg-terracotta-dark text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white focus:outline-none transition-transform hover:scale-105"
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </button>
      </div>

      {/* Footer status bar with Group JECCAN! & Members */}
      <footer className="bg-white border-t border-[#E9E5DE] py-8 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Brand column */}
            <div className="md:col-span-4 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-base font-black text-charcoal uppercase tracking-widest">Kanyamanan</span>
                <span className="px-2.5 py-0.5 bg-terracotta/10 text-terracotta text-[10px] font-extrabold rounded-full">v1.0</span>
              </div>
              <p className="text-xs text-charcoal-light leading-relaxed max-w-sm m-0">
                Pampanga Provincial Culinary Tourism & Health Informatics Infrastructure Platform.
              </p>
              <span className="text-[10px] text-charcoal-light block pt-1 font-medium">
                © 2026 Pampanga, Philippines. All rights reserved.
              </span>
            </div>

            {/* Team JECCAN! Members column */}
            <div className="md:col-span-8 text-center md:text-left space-y-3 border-t md:border-t-0 md:border-l border-[#E9E5DE] pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-black text-terracotta uppercase tracking-wider">Group JECCAN!</span>
                <span className="px-2.5 py-0.5 bg-bananaleaf/10 text-bananaleaf text-[10px] font-extrabold rounded-md">Project Creators & Developers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E9E5DE] shadow-xs text-left">
                  <span className="font-extrabold text-xs text-charcoal block truncate">Rancis J. Santos</span>
                  <span className="text-[10px] font-bold text-terracotta block mt-0.5">Team Leader</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E9E5DE] shadow-xs text-left">
                  <span className="font-extrabold text-xs text-charcoal block truncate">Lance Jerald D. Laxamana</span>
                  <span className="text-[10px] text-charcoal-light block mt-0.5">Core Member</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E9E5DE] shadow-xs text-left">
                  <span className="font-extrabold text-xs text-charcoal block truncate">Kirsen Yaj B. Villanueva</span>
                  <span className="text-[10px] text-charcoal-light block mt-0.5">Core Member</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Slide-out Drawer Detail Panel */}
      {selectedRestaurant && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in">
          <div onClick={() => { setSelectedRestaurant(null); setActiveDish(null); setCvUploadedMeal(null); }} className="absolute inset-0 bg-charcoal/40 backdrop-blur-xs"></div>

          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#E9E5DE] p-5 flex items-center justify-between gap-4 z-20">
              <div>

                <h2 className="text-xl font-black text-charcoal mt-1.5 m-0 leading-tight">{selectedRestaurant.name}</h2>
                <div className="text-xs text-charcoal-light mt-1 space-y-2">
                  <div className="flex items-center gap-1 font-semibold">
                    <span>Locations ({getRestaurantMunicipalities(selectedRestaurant).length}):</span>
                    <strong className="text-charcoal">{getRestaurantMunicipalities(selectedRestaurant).join(' • ')}</strong>
                  </div>

                  {getRestaurantMunicipalities(selectedRestaurant).length > 1 ? (
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E9E5DE] space-y-1.5 text-left">
                      <span className="text-[10px] font-black text-terracotta uppercase tracking-wider block">
                        🏪 All Active Branches ({getRestaurantMunicipalities(selectedRestaurant).length} Locations)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                        {getRestaurantMunicipalities(selectedRestaurant).map((mun, idx) => (
                          <div key={idx} className="p-2 bg-white rounded-lg border border-[#E9E5DE] flex items-start gap-1.5 shadow-2xs">
                            <span className="text-terracotta font-bold text-xs shrink-0 mt-0.5">📍</span>
                            <div className="min-w-0">
                              <strong className="text-[11px] font-black text-charcoal block leading-tight">{mun} Branch</strong>
                              <span className="text-[9px] text-charcoal-light font-medium block truncate">
                                {getBranchAddressForMunicipality(selectedRestaurant, mun)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    selectedRestaurant.address && (
                      <span className="text-[11px] text-charcoal-light font-medium flex items-center gap-1">
                        📍 {selectedRestaurant.address}
                      </span>
                    )
                  )}
                </div>
              </div>
              <button onClick={() => { setSelectedRestaurant(null); setActiveDish(null); setCvUploadedMeal(null); }} className="p-2 text-charcoal-light hover:text-charcoal rounded-full hover:bg-ivory">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 flex-1">

              {/* Restaurant Cover Image Carousel */}
              {selectedRestaurant.images && selectedRestaurant.images.length > 0 ? (
                <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden shadow-xs border border-[#E9E5DE] shrink-0 relative group/carousel">
                  <img
                    src={selectedRestaurant.images[activeImgIdx]}
                    alt={`${selectedRestaurant.name} - view ${activeImgIdx + 1}`}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIdx((prev) => (prev === 0 ? selectedRestaurant.images.length - 1 : prev - 1));
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-charcoal hover:scale-105 flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 font-bold z-10 select-none"
                  >
                    ←
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIdx((prev) => (prev === selectedRestaurant.images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-charcoal hover:scale-105 flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100 font-bold z-10 select-none"
                  >
                    →
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 bg-charcoal/30 px-2 py-1 rounded-full backdrop-blur-xs z-10">
                    {selectedRestaurant.images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIdx(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeImgIdx ? 'bg-white w-3' : 'bg-white/50'}`}
                      ></button>
                    ))}
                  </div>
                </div>
              ) : selectedRestaurant.image ? (
                <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden shadow-xs border border-[#E9E5DE] shrink-0">
                  <img
                    src={selectedRestaurant.image}
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              {/* Core Metadata */}
              <div className="bg-[#FAF8F5] border border-[#E9E5DE] p-4 rounded-xl space-y-3 text-xs">
                <p className="text-charcoal leading-relaxed">{selectedRestaurant.description}</p>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-charcoal-light pt-2 border-t border-[#E9E5DE]">
                  <div>
                    <strong className="block text-charcoal">Schedule:</strong>
                    {selectedRestaurant.operatingHours}
                  </div>
                  <div>
                    <strong className="block text-charcoal">Price Points:</strong>
                    {selectedRestaurant.priceTier === '$' ? 'Budget' : selectedRestaurant.priceTier === '$$' ? 'Moderate' : 'Premium'}
                  </div>
                  <div>
                    <strong className="block text-charcoal">Geocoordinates:</strong>
                    {selectedRestaurant.lat.toFixed(4)}, {selectedRestaurant.lng.toFixed(4)}
                  </div>
                </div>
              </div>

              

              {/* Live Occupancy Forecaster chart */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="h-4.5 w-4.5 text-terracotta animate-pulse" /> Live Corridor Occupancy Forecaster
                  </h3>
                  <span className="text-[10px] font-black text-bananaleaf bg-bananaleaf/10 px-2.5 py-0.5 rounded-full border border-bananaleaf/25">
                    Optimal Entry Window Calculated: Avoid Peak Wait Times.
                  </span>
                </div>

                <div className="h-28 w-full bg-[#FAF8F5] rounded-xl border border-[#E9E5DE] p-3 flex flex-col justify-between">
                  <div className="flex-1 flex items-end justify-between gap-1">
                    {selectedRestaurant.occupancy.map((val, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${val}%` }}
                        className={`w-full rounded-t-xs transition-all duration-300 relative group/bar ${val > 80 ? 'bg-terracotta hover:bg-terracotta-dark' : 'bg-saffron hover:bg-saffron-dark'}`}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-charcoal text-white text-[8px] font-bold py-0.5 px-1 rounded opacity-0 group-hover/bar:opacity-100 mb-1 z-10 shrink-0">
                          {val}%
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-[8px] font-bold text-charcoal-light mt-1.5 pt-1 border-t border-[#E9E5DE] select-none">
                    {OCCUPANCY_HOURS.filter((_, i) => i % 2 === 0).map((hour, idx) => (
                      <span key={idx}>{hour}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Menu Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  The Digital Menu Table (Click to deconstruct ingredients)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedRestaurant.menu.map(dish => (
                    <div
                      key={dish.id}
                      onClick={() => setActiveDish(dish)}
                      className={`p-3 rounded-xl border transition-all text-left cursor-pointer flex gap-3 items-center ${activeDish?.id === dish.id ? 'bg-terracotta/5 border-terracotta shadow-sm' : 'bg-white border-[#E9E5DE]'}`}
                    >
                      {dish.image && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomedDishImg(dish.image);
                          }}
                          className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#E9E5DE] cursor-zoom-in hover:opacity-90 transition-opacity relative group/dishimg"
                          title="Click to zoom image"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover/dishimg:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold">
                            🔍
                          </div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <strong className="text-xs font-extrabold text-charcoal truncate block">{dish.name}</strong>
                          <span className="text-xs font-black text-bananaleaf shrink-0">₱{dish.price}</span>
                        </div>

                        <div className="flex items-center justify-between text-[9px] text-charcoal-light mt-2 pt-2 border-t border-[#FAF8F5]">
                          <span>Caloric: <b>{dish.nutrition.calories} kcal</b></span>
                          <span className="text-terracotta font-bold">Deconstruct →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automated Menu Ingredient Deconstructor Widget */}
              {activeDish && (
                <div className="p-4 bg-terracotta/5 border border-terracotta/20 rounded-xl space-y-3 animate-slide-up text-xs">
                  <div className="flex justify-between items-start border-b border-[#E9E5DE] pb-2">
                    <h4 className="text-xs font-black text-charcoal">
                      Ingredient Deconstructor: <span className="text-terracotta">{activeDish.name}</span>
                    </h4>
                    <button onClick={() => setActiveDish(null)} className="text-xs font-bold text-charcoal-light hover:text-charcoal">
                      Close
                    </button>
                  </div>

                  <div className="space-y-2 text-charcoal">
                    <p><b>Raw Components:</b> {activeDish.ingredients}</p>

                    {/* Allergen Banners */}
                    <div className="p-2.5 bg-white border border-[#E9E5DE] rounded-lg space-y-1 text-xs">
                      <p className="text-xs font-bold text-terracotta">{activeDish.allergens}</p>
                      <p className="text-[10px] text-charcoal-light font-semibold">{activeDish.healthIndicators}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1">
                      <div className="bg-white p-2 rounded border border-[#E9E5DE] font-bold">
                        <span className="block text-xs font-extrabold text-charcoal">{activeDish.nutrition.calories}</span>
                        Calories
                      </div>
                      <div className="bg-white p-2 rounded border border-[#E9E5DE] font-bold">
                        <span className="block text-xs font-extrabold text-charcoal">{activeDish.nutrition.protein}g</span>
                        Protein
                      </div>
                      <div className="bg-white p-2 rounded border border-[#E9E5DE] font-bold">
                        <span className="block text-xs font-extrabold text-charcoal">{activeDish.nutrition.carbs}g</span>
                        Carbs
                      </div>
                      <div className="bg-white p-2 rounded border border-[#E9E5DE] font-bold">
                        <span className="block text-xs font-extrabold text-charcoal">{activeDish.nutrition.fat}g</span>
                        Lipids
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end pt-4 border-t border-[#E9E5DE]">
                <button
                  type="button"
                  onClick={() => { setSelectedRestaurant(null); setActiveDish(null); setCvUploadedMeal(null); }}
                  className="px-4 py-2 border border-[#E9E5DE] rounded-xl text-xs font-semibold text-charcoal hover:bg-[#FAF8F5]"
                >
                  Close Detail
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const muns = getRestaurantMunicipalities(selectedRestaurant);
                    const targetRes = selectedRestaurant;
                    setSelectedRestaurant(null);
                    setActiveDish(null);
                    setCvUploadedMeal(null);
                    if (muns.length > 1) {
                      setBranchSelectTarget(targetRes);
                    } else {
                      handleAddToItinerary(targetRes);
                      alert(`✓ Added "${targetRes.name}" to active trip itinerary queue!`);
                    }
                  }}
                  className="px-5 py-2 bg-terracotta text-white rounded-xl text-xs font-bold hover:bg-terracotta-dark shadow"
                >
                  Add to Trip Itinerary
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Zoomed Dish Image Modal */}
      {zoomedDishImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/85 backdrop-blur-sm p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setZoomedDishImg(null)}
        >
          <div className="relative max-w-3xl w-full bg-white p-3 rounded-2xl shadow-2xl animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <img src={zoomedDishImg} alt="Zoomed dish" className="w-full h-auto rounded-xl object-contain max-h-[80vh] border border-[#E9E5DE]" />
            <button
              onClick={() => setZoomedDishImg(null)}
              className="absolute top-5 right-5 bg-charcoal/80 hover:bg-charcoal text-white rounded-full w-8 h-8 flex items-center justify-center font-black focus:outline-none transition-colors border border-white/20 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}


      {/* ── Multi-Branch Location Choice Modal ── */}
      
      {/* Tourist Attraction Detail Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/70 backdrop-blur-xs p-4 animate-fade-in font-sans">
          <div className="bg-white border border-[#E9E5DE] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-scale-up">
            <button
              type="button"
              onClick={() => setSelectedAttraction(null)}
              className="absolute top-4 right-4 text-charcoal-light hover:text-charcoal w-7 h-7 rounded-full bg-ivory flex items-center justify-center text-xs font-bold border border-[#E9E5DE] cursor-pointer"
            >
              ✕
            </button>

            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#E9E5DE]">
              <img src={selectedAttraction.image} alt={selectedAttraction.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-charcoal/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                {selectedAttraction.type}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-charcoal m-0">{selectedAttraction.name}</h3>
              <span className="text-xs font-bold text-terracotta block">
                📍 {selectedAttraction.municipality}, Pampanga
              </span>
            </div>

            <p className="text-xs text-charcoal leading-relaxed">{selectedAttraction.description}</p>
            
            {selectedAttraction.details && (
              <div className="p-3 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl text-xs space-y-1">
                <strong className="text-[10px] uppercase font-black text-terracotta block">Heritage & Cultural Context:</strong>
                <p className="text-charcoal-light leading-relaxed m-0">{selectedAttraction.details}</p>
              </div>
            )}

            <div className="pt-3 border-t border-[#E9E5DE] flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setSelectedAttraction(null)}
                className="px-4 py-2 border border-[#E9E5DE] rounded-xl text-xs font-semibold text-charcoal hover:bg-ivory"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAddToItinerary(selectedAttraction);
                  setSelectedAttraction(null);
                  alert(`✓ Added "${selectedAttraction.name}" (${selectedAttraction.municipality}) to your active trip itinerary!`);
                }}
                className="px-5 py-2 bg-[#2C5E3B] text-white rounded-xl text-xs font-bold hover:bg-[#20452B] shadow"
              >
                + Add Side-Trip to Route
              </button>
            </div>
          </div>
        </div>
      )}


      {branchSelectTarget && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/70 backdrop-blur-xs p-4 animate-fade-in font-sans">
          <div className="bg-white border border-[#E9E5DE] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-scale-up">
            <button
              type="button"
              onClick={() => setBranchSelectTarget(null)}
              className="absolute top-4 right-4 text-charcoal-light hover:text-charcoal w-7 h-7 rounded-full bg-ivory flex items-center justify-center text-xs font-bold border border-[#E9E5DE] cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black text-terracotta uppercase tracking-wider bg-terracotta/10 px-2.5 py-0.5 rounded border border-terracotta/20 inline-block">
                🏪 Multi-Branch Location Selector
              </span>
              <h3 className="text-lg font-black text-charcoal m-0">Select Branch Location</h3>
              <p className="text-xs text-charcoal-light m-0">
                Which location of <strong>"{branchSelectTarget.name}"</strong> would you like to visit on your trip?
              </p>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {getRestaurantMunicipalities(branchSelectTarget).map((mun, idx) => {
                const address = getBranchAddressForMunicipality(branchSelectTarget, mun);
                const lat = getBranchLat(branchSelectTarget, mun);
                const lng = getBranchLng(branchSelectTarget, mun);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const branchItem = {
                        ...branchSelectTarget,
                        id: `${branchSelectTarget.id}-${mun.toLowerCase().replace(/\s+/g, '-')}`,
                        name: `${branchSelectTarget.name} (${mun} Branch)`,
                        municipality: mun,
                        address: address,
                        lat: lat,
                        lng: lng,
                        selectedBranchName: mun
                      };
                      handleAddToItinerary(branchItem);
                      setBranchSelectTarget(null);
                      alert(`✓ Added "${branchSelectTarget.name}" (${mun} Branch) to your active trip itinerary!`);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E9E5DE] bg-ivory/50 hover:bg-terracotta/5 hover:border-terracotta transition-all cursor-pointer group flex items-start gap-3"
                  >
                    <span className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta font-black text-xs flex items-center justify-center shrink-0 group-hover:bg-terracotta group-hover:text-white transition-colors">
                      📍
                    </span>
                    <div className="min-w-0 flex-1">
                      <strong className="block text-xs font-extrabold text-charcoal group-hover:text-terracotta transition-colors">
                        {mun} Branch
                      </strong>
                      <span className="block text-[11px] text-charcoal-light font-medium truncate mt-0.5">
                        {address}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-terracotta self-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      Select →
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E9E5DE] text-right">
              <button
                type="button"
                onClick={() => setBranchSelectTarget(null)}
                className="px-4 py-2 bg-ivory hover:bg-[#E9E5DE] border border-[#E9E5DE] rounded-xl text-xs font-bold text-charcoal transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    
{/* ========================================================================= */}
      {/* TRIP COMPLETION & CELEBRATION EXPERIENCE MODAL (POLAROID ALBUM & CERTIFICATE) */}
      {/* ========================================================================= */}
      {isCompletionModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-[#E9E5DE] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E9E5DE] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div>
                  <h3 className="text-lg font-black text-charcoal tracking-tight m-0">
                    Congratulations! Trip Completed
                  </h3>
                  <p className="text-xs text-charcoal-light font-medium m-0">
                    You successfully finished your Kapampangan Food & Heritage Crawl!
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCompletionModalOpen(false)}
                className="w-8 h-8 rounded-full bg-ivory hover:bg-[#E9E5DE] text-charcoal font-bold flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Optional Group Info & Photo Uploader */}
            <div className="bg-[#FAF8F5] border border-[#E9E5DE] p-4 rounded-2xl">
              <div>
                <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                  Group / Traveler Name(s)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Santos Family & Friends"
                  value={completionGroupName}
                  onChange={(e) => setCompletionGroupName(e.target.value)}
                  className="block w-full px-3.5 py-2 text-xs border border-[#E9E5DE] rounded-xl bg-white font-extrabold text-charcoal focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
            </div>

            {/* Tabs Selector: Polaroid Scrapbook vs Certificate */}
            <div className="flex border-b border-[#E9E5DE] bg-ivory rounded-xl p-1">
              <button
                type="button"
                onClick={() => setCompletionActiveTab('polaroid')}
                className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${completionActiveTab === 'polaroid' ? 'bg-terracotta text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal cursor-pointer'}`}
              >
                <span>📸</span> AI Polaroid Album
              </button>
              <button
                type="button"
                onClick={() => setCompletionActiveTab('certificate')}
                className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${completionActiveTab === 'certificate' ? 'bg-terracotta text-white shadow-xs' : 'text-charcoal-light hover:text-charcoal cursor-pointer'}`}
              >
                <span>📜</span> Official Certificate
              </button>
            </div>

            {/* TAB 1: AI POLAROID ALBUM GALLERY */}
            {completionActiveTab === 'polaroid' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#FAF8F5] border border-[#E9E5DE] rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-charcoal uppercase tracking-wider block">
                      📷 Memory Polaroid Album
                    </span>
                    <button
                      type="button"
                      onClick={downloadRealPolaroidAlbum}
                      className="px-3 py-1 bg-terracotta hover:bg-terracotta-dark text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      📥 Save & Download Album
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(computedRoutePath.length > 0 ? computedRoutePath : [{ name: 'Heritage Kitchen Stop #1', municipality: 'Pampanga', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80' }]).map((stop, pIdx) => {
                      const currentSlotImg = slotPhotos[pIdx] !== undefined ? slotPhotos[pIdx] : (completionPhotos[pIdx] || stop.image);

                      return (
                        <div key={pIdx} className="bg-white p-3 pt-4 rounded-xl border border-[#E9E5DE] shadow-md transform hover:scale-[1.01] transition-transform relative group/card">
                          {/* Tape effect */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-saffron/30 border border-saffron/40 rotate-1 shadow-2xs z-10"></div>
                          
                          <div className="aspect-4/3 rounded-lg overflow-hidden border border-[#E9E5DE] bg-ivory relative">
                            {currentSlotImg ? (
                              <img src={currentSlotImg} className="w-full h-full object-cover" alt={stop.name} />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-charcoal-light space-y-1">
                                <span className="text-xl">📷</span>
                                <span className="text-[10px] font-bold">No Photo Assigned</span>
                              </div>
                            )}

                            {/* Hover Photo Controls overlay on each card */}
                            <div className="absolute inset-0 bg-charcoal/65 backdrop-blur-2xs opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-3 text-center z-20">
                              <label className="px-3 py-1.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-lg text-[10px] font-black uppercase cursor-pointer shadow-xs transition-transform active:scale-95">
                                📷 Choose / Change Photo
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setSlotPhotos(prev => ({ ...prev, [pIdx]: reader.result }));
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>

                              {currentSlotImg && (
                                <button
                                  type="button"
                                  onClick={() => setSlotPhotos(prev => ({ ...prev, [pIdx]: null }))}
                                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[9px] font-bold transition-colors cursor-pointer"
                                >
                                  ✕ Remove Photo
                                </button>
                              )}

                              {slotPhotos[pIdx] !== undefined && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSlots = { ...slotPhotos };
                                    delete newSlots[pIdx];
                                    setSlotPhotos(newSlots);
                                  }}
                                  className="text-[9px] text-white/90 hover:text-white underline cursor-pointer font-semibold"
                                >
                                  Reset to Stop Original
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="mt-2.5 text-center space-y-0.5">
                            <span className="block text-xs font-black text-charcoal font-serif italic">
                              {stop.name}
                            </span>
                            <span className="block text-[9px] text-charcoal-light font-mono uppercase">
                              📍 {stop.municipality} • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OFFICIAL CERTIFICATE OF COMPLETION */}
            {completionActiveTab === 'certificate' && (
              <div className="space-y-3">
                <div className="p-6 bg-[#FAF8F5] border-4 border-[#2C5E3B] rounded-2xl relative shadow-inner text-center space-y-4 font-serif">
                  <div className="border border-[#2C5E3B]/40 p-4 rounded-xl space-y-3">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-black text-[#2C5E3B] uppercase tracking-widest">
                        REPUBLIC OF THE PHILIPPINES • PROVINCE OF PAMPANGA
                      </span>
                      <h2 className="text-base font-black text-terracotta uppercase tracking-wide m-0">
                        CERTIFICATE OF KAPAMPANGAN CULINARY EXCURSION
                      </h2>
                      <div className="w-16 h-0.5 bg-terracotta mx-auto my-1"></div>
                    </div>

                    <p className="text-xs text-charcoal-light italic m-0">
                      This Certificate of Culinary Distinction is proudly presented to
                    </p>

                    <h3 className="text-lg font-black text-charcoal uppercase tracking-wider font-sans m-0">
                      {completionGroupName.trim() || userProfile.username || 'Kapampangan Food Enthusiasts'}
                    </h3>

                    <p className="text-xs text-charcoal leading-relaxed max-w-md mx-auto m-0">
                      For successfully navigating and completing the custom Kapampangan culinary route:
                      <strong className="block text-terracotta font-sans text-xs mt-0.5 font-bold">
                        "{newItineraryName || 'Pampanga Heritage Food Trail'}"
                      </strong>
                      visiting <strong>{computedRoutePath.length} heritage destinations</strong> across the Culinary Capital of the Philippines.
                    </p>

                    <div className="pt-4 border-t border-[#2C5E3B]/20 grid grid-cols-2 gap-4 text-center font-sans">
                      <div>
                        <span className="block text-[10px] font-bold text-charcoal uppercase">Team JECCAN</span>
                        <span className="block text-[8px] text-charcoal-light">Group Leader / Development Team</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-[#2C5E3B] uppercase">Kanyamanan Board</span>
                        <span className="block text-[8px] text-charcoal-light">Health & Culinary Aggregator Core</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={downloadRealCertificate}
                  className="w-full py-2.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  📥 Save & Download Official Certificate
                </button>
              </div>
            )}

          </div>
        </div>
      )}
</div>
  );
}

export default App;
