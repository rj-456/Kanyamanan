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
  OCCUPANCY_HOURS
} from './mockData';

function App() {
  // Hash Routing for administrative standalone page
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#/admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === '#/admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Consumer Views: 'homepage', 'auth', 'dashboard'
  const [activeView, setActiveView] = useState('homepage');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);

  // Dashboard Sub-Modules: 'planner', 'health', 'assistant', 'history'
  const [dashboardTab, setDashboardTab] = useState('planner');

  // Simulated dynamic toast/status state
  const [showToast, setShowToast] = useState(false);

  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    calorieLimit: 2200,
    budgetLimit: 1500
  });

  // Local state restaurants database
  const [restaurants, setRestaurants] = useState(PRESEEDED_RESTAURANTS);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCorridor, setSelectedCorridor] = useState('All');
  const [selectedMunicipality, setSelectedMunicipality] = useState('All');

  // Restaurant Drawer State
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [activeDish, setActiveDish] = useState(null);
  const [cvUploadedMeal, setCvUploadedMeal] = useState(null);
  const [isCVProcessing, setIsCVProcessing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Trip routing pipeline State
  const [activeTrip, setActiveTrip] = useState([]);
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
  const [roadRouteCoords, setRoadRouteCoords] = useState([]);

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
  const [merchantResId, setMerchantResId] = useState(PRESEEDED_RESTAURANTS[0].id);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginType, setAdminLoginType] = useState('superadmin'); // 'superadmin' or 'merchant'
  const [adminLoginUser, setAdminLoginUser] = useState('');
  const [adminLoginPass, setAdminLoginPass] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'appr-1',
      restaurantId: 'res-1',
      restaurantName: "Everybody's Cafe",
      submittedAt: 'Today, 10:30 AM',
      original: {
        operatingHours: "07:00 AM - 09:00 PM",
        priceTier: "$$"
      },
      changes: {
        operatingHours: "06:30 AM - 10:00 PM",
        priceTier: "$$$"
      }
    }
  ]);
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

  // OSRM Road Routing Fetch Effect
  useEffect(() => {
    if (computedRoutePath.length === 0) {
      setRoadRouteCoords([]);
      return;
    }

    const coords = [[userLocation.lng, userLocation.lat], ...computedRoutePath.map(r => [r.lng, r.lat])];
    const coordsString = coords.map(c => c.join(',')).join(';');

    fetch(`https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 'Ok' && data.routes && data.routes[0]) {
          const path = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]); // [lat, lng]
          setRoadRouteCoords(path);
        } else {
          setRoadRouteCoords([]);
        }
      })
      .catch(() => {
        setRoadRouteCoords([]);
      });
  }, [userLocation, computedRoutePath]);

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

  // Restaurant counts per municipality
  const municipalityCounts = useMemo(() => {
    const counts = {};
    MUNICIPALITIES.forEach(m => {
      counts[m] = restaurants.filter(r => r.municipality === m).length;
    });
    return counts;
  }, [restaurants]);

  // Filtered Restaurant Feed
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(res => {
      const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.menu.some(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCorridor = selectedCorridor === 'All' || res.corridor === selectedCorridor;
      const matchesMunicipality = selectedMunicipality === 'All' || res.municipality === selectedMunicipality;

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
    const matchedRestaurants = itin.stops.map(stopName => 
      restaurants.find(r => r.name === stopName)
    ).filter(Boolean);
    setActiveTrip(matchedRestaurants);
    setDashboardTab('planner');
    alert(`Loaded "${itin.name}" into active itinerary. You can now track your GPS or simulate navigation!`);
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
      if (adminLoginUser === 'admin' && adminLoginPass === 'admin123') {
        setAdminRole('superadmin');
        setIsAdminAuthenticated(true);
        setAdminLoginUser('');
        setAdminLoginPass('');
      } else {
        setAdminLoginError('Invalid Administrator credentials. (Use username "admin" and password "admin123")');
      }
    } else {
      if (adminLoginPass === 'merchant123') {
        const exists = restaurants.find(r => r.id === merchantResId);
        if (exists) {
          setAdminRole('merchant');
          setIsAdminAuthenticated(true);
          setAdminLoginUser('');
          setAdminLoginPass('');
        } else {
          setAdminLoginError('Selected restaurant is invalid or not registered.');
        }
      } else {
        setAdminLoginError('Invalid Merchant Passkey. (Use passkey "merchant123")');
      }
    }
  };

  const handleAdminFormChange = (e) => {
    const { name, value } = e.target;
    setAdminForm({ ...adminForm, [name]: value });
  };

  const startAdminEdit = (res) => {
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

  const handleSaveAdminListing = (e) => {
    e.preventDefault();
    if (!adminForm.name) return;

    const formattedMenu = adminDishes
      .filter(d => d.name.trim())
      .map((d, i) => ({
        id: 'menu-' + Date.now() + '-' + i,
        name: d.name,
        price: Number(d.price) || 100,
        ingredients: d.ingredients,
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
      if (adminRole === 'merchant') {
        const changes = {};
        const original = {};

        if (originalRes.operatingHours !== adminForm.operatingHours) {
          changes.operatingHours = adminForm.operatingHours;
          original.operatingHours = originalRes.operatingHours;
        }
        if (originalRes.priceTier !== adminForm.priceTier) {
          changes.priceTier = adminForm.priceTier;
          original.priceTier = originalRes.priceTier;
        }
        if (originalRes.description !== adminForm.description) {
          changes.description = adminForm.description;
          original.description = originalRes.description;
        }
        if (originalRes.address !== adminForm.address) {
          changes.address = adminForm.address;
          original.address = originalRes.address;
        }
        if (originalRes.image !== adminForm.image) {
          changes.image = adminForm.image;
          original.image = originalRes.image;
        }
        if (formattedMenu.length > 0) {
          changes.menu = formattedMenu.map(m => `${m.name} (₱${m.price})`).join(', ');
          original.menu = originalRes.menu.map(m => `${m.name} (₱${m.price})`).join(', ');
        }

        if (Object.keys(changes).length === 0) {
          alert("No changes detected in your profile settings.");
          setAdminEditingId(null);
          return;
        }

        const newApprovalRequest = {
          id: 'appr-' + Date.now(),
          restaurantId: originalRes.id,
          restaurantName: originalRes.name,
          submittedAt: 'Just now',
          original,
          changes,
          fullUpdatedRes: {
            ...originalRes,
            name: adminForm.name,
            municipality: adminForm.municipality,
            operatingHours: adminForm.operatingHours,
            priceTier: adminForm.priceTier,
            address: adminForm.address,
            image: adminForm.image || originalRes.image,
            images: adminForm.images && adminForm.images.length > 0 ? adminForm.images : originalRes.images || [],
            description: adminForm.description,
            menu: formattedMenu.length > 0 ? formattedMenu : originalRes.menu
          }
        };

        setPendingApprovals([newApprovalRequest, ...pendingApprovals]);
        setAdminEditingId(null);
        alert("Your profile modifications have been sent to the Admin Registry for vetting. Changes will go live once verified by the provincial administrator.");
        
        setAdminForm({
          name: '', municipality: 'City of San Fernando',
          operatingHours: '09:00 AM - 09:00 PM', priceTier: '$$',
          address: '', image: '', images: [], description: ''
        });
        setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);
        return;
      }

      setRestaurants(restaurants.map(res => {
        if (res.id === adminEditingId) {
          return {
            ...res,
            name: adminForm.name,
            municipality: adminForm.municipality,
            operatingHours: adminForm.operatingHours,
            priceTier: adminForm.priceTier,
            address: adminForm.address,
            image: adminForm.image || res.image,
            images: adminForm.images && adminForm.images.length > 0 ? adminForm.images : res.images || [],
            description: adminForm.description,
            menu: formattedMenu.length > 0 ? formattedMenu : res.menu
          };
        }
        return res;
      }));
      setAdminEditingId(null);
      alert("Restaurant listing updated successfully.");
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
      operatingHours: '09:00 AM - 09:00 PM', priceTier: '$$',
      address: '', image: '', images: [], description: ''
    });
    setAdminDishes([{ name: '', price: '', ingredients: '', allergens: '', calories: '', image: '' }]);
  };

  const deleteRestaurant = (id) => {
    if (confirm("Are you sure you want to remove this Pampanga Heritage listing?")) {
      setRestaurants(restaurants.filter(r => r.id !== id));
      setActiveTrip(activeTrip.filter(r => r.id !== id));
    }
  };

  const handleApproveApproval = (req) => {
    // If request contains fullUpdatedRes (from actual merchant updates)
    if (req.fullUpdatedRes) {
      setRestaurants(restaurants.map(res => {
        if (res.id === req.restaurantId) {
          return req.fullUpdatedRes;
        }
        return res;
      }));
    } else {
      // Preseeded mock approval change logic
      setRestaurants(restaurants.map(res => {
        if (res.id === req.restaurantId) {
          return {
            ...res,
            operatingHours: req.changes.operatingHours || res.operatingHours,
            priceTier: req.changes.priceTier || res.priceTier
          };
        }
        return res;
      }));
    }
    setPendingApprovals(pendingApprovals.filter(a => a.id !== req.id));
    alert(`Success: Merchant changes for "${req.restaurantName}" approved and published to the public feed.`);
  };

  const handleRejectApproval = (req) => {
    setPendingApprovals(pendingApprovals.filter(a => a.id !== req.id));
    alert(`Dismissed: Changes requested by "${req.restaurantName}" have been rejected and cleared.`);
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
                      Select Your Restaurant Listing
                    </label>
                    <select
                      value={merchantResId}
                      onChange={(e) => setMerchantResId(e.target.value)}
                      className="block w-full px-3.5 py-2.5 bg-charcoal border border-[#3E3E3E] rounded-xl text-xs text-white focus:outline-none"
                    >
                      {restaurants.map(res => (
                        <option key={res.id} value={res.id}>
                          🏪 {res.name} ({res.municipality})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Merchant Passkey
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
                    💡 Restaurant Owner Passkey: Choose your restaurant and enter passkey "merchant123"
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
                        operatingHours: '09:00 AM - 09:00 PM', priceTier: '$$',
                        address: '', image: '', images: [], description: ''
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
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="space-y-6">

              {/* Form panel */}
              {adminRole === 'merchant' && !adminEditingId ? (
                <div className="bento-card p-6 bg-white space-y-3 shadow-sm border-[#E9E5DE] text-center">
                  <span className="text-3xl block">🏪</span>
                  <h3 className="text-sm font-extrabold text-charcoal tracking-tight">
                    Merchant Owner Panel: {restaurants.find(r => r.id === merchantResId)?.name || "Your Restaurant"}
                  </h3>
                  <p className="text-xs text-charcoal-light max-w-md mx-auto leading-relaxed">
                    To modify operating hours, coordinates, price levels, or update your signature catalog dishes, click the <b>Edit</b> button in the database listing row below.
                  </p>
                </div>
              ) : (
                <div className="bento-card p-6 bg-white space-y-4 shadow-sm border-[#E9E5DE]">
                  <h3 className="text-sm font-extrabold text-charcoal tracking-tight flex items-center gap-2">
                    <Plus className="h-4.5 w-4.5 text-terracotta" />
                    {adminEditingId ? "Modify Registered Heritage Kitchen" : "Register New Heritage Kitchen"}
                  </h3>

                  <form onSubmit={handleSaveAdminListing} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                          Restaurant Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="ex. Everybody's Cafe"
                          name="name"
                          value={adminForm.name}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                          Municipality/City
                        </label>
                        <select
                          name="municipality"
                          value={adminForm.municipality}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory focus:outline-none"
                        >
                          {MUNICIPALITIES.map(mun => (
                            <option key={mun} value={mun}>{mun}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                          Upload Restaurant Photos (Required, Select 2-4)
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          required={!adminForm.images || adminForm.images.length === 0}
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
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory text-charcoal focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                        />
                        {adminForm.images && adminForm.images.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <div className="flex flex-wrap gap-2">
                              {adminForm.images.map((imgSrc, idx) => (
                                <div key={idx} className="relative w-12 h-12 shrink-0">
                                  <img src={imgSrc} className="w-full h-full rounded object-cover border border-[#E9E5DE] shadow-xs" alt={`Preview ${idx + 1}`} />
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
                              ✓ {adminForm.images.length} Photos Uploaded
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                          Operating Hours
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="08:00 AM - 08:00 PM"
                          name="operatingHours"
                          value={adminForm.operatingHours}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory"
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
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory"
                        >
                          <option value="$">$ (Budget)</option>
                          <option value="$$">$$ (Moderate)</option>
                          <option value="$$$">$$$ (Premium)</option>
                          <option value="$$$$">$$$$ (Fine Degustation)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                          Exact Address
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="ex. 123 MacArthur Highway, San Fernando"
                          name="address"
                          value={adminForm.address}
                          onChange={handleAdminFormChange}
                          className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory focus:outline-none focus:ring-1 focus:ring-terracotta focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        Culinary Description
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Describe the lineage, heritage, or cooking philosophy..."
                        name="description"
                        value={adminForm.description}
                        onChange={handleAdminFormChange}
                        className="block w-full px-3 py-1.5 text-xs border border-[#E9E5DE] rounded-lg bg-ivory"
                      />
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
                              required={!dish.image}
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

                  <div className="flex gap-2 justify-end">
                    {adminEditingId && (
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
                        className="px-4 py-2 border border-[#E9E5DE] rounded-xl text-xs font-semibold text-charcoal hover:bg-[#FAF8F5]"
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 py-2 bg-terracotta text-white rounded-xl text-xs font-bold hover:bg-terracotta-dark"
                    >
                      {adminEditingId ? "Update Listing" : "Register Listing"}
                    </button>
                  </div>
                </form>
              </div>
              )}

              {/* Super Admin Pending Approvals Queue */}
              {adminRole === 'superadmin' && pendingApprovals.length > 0 && (
                <div className="bento-card p-5 bg-white border border-[#E9E5DE] rounded-xl space-y-4 shadow-sm">
                  <h3 className="text-xs font-bold text-terracotta uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-4.5 w-4.5 text-terracotta animate-pulse" /> Pending Registry Approvals Queue ({pendingApprovals.length})
                  </h3>
                  <div className="space-y-3">
                    {pendingApprovals.map(req => (
                      <div key={req.id} className="p-4 bg-[#FAF8F5] border border-[#E9E5DE] rounded-xl text-xs space-y-3 animate-fade-in">
                        <div className="flex justify-between items-center border-b border-[#E9E5DE] pb-2">
                          <span className="font-extrabold text-charcoal text-sm">🏪 {req.restaurantName}</span>
                          <span className="text-[10px] text-charcoal-light font-medium uppercase tracking-wider">{req.submittedAt}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[9px] font-black text-charcoal-light uppercase mb-1">Current Published Profile</span>
                            <div className="space-y-1 bg-white border border-[#E9E5DE] p-2.5 rounded-lg text-charcoal-light leading-relaxed">
                              {Object.keys(req.original).map(key => (
                                <div key={key}>
                                  <strong>{key}:</strong> {req.original[key]}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="block text-[9px] font-black text-terracotta uppercase mb-1">Proposed Profile Changes</span>
                            <div className="space-y-1 bg-white border border-terracotta/20 p-2.5 rounded-lg text-charcoal font-semibold leading-relaxed">
                              {Object.keys(req.changes).map(key => (
                                <div key={key} className="flex gap-1.5 items-center">
                                  <span><strong>{key}:</strong></span>
                                  <span className="text-bananaleaf">{req.changes[key]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-1 border-t border-[#E9E5DE]">
                          <button
                            onClick={() => handleRejectApproval(req)}
                            className="px-3.5 py-1.5 border border-terracotta/20 text-terracotta font-extrabold rounded-lg hover:bg-terracotta/5 transition-colors"
                          >
                            Reject & Dismiss
                          </button>
                          <button
                            onClick={() => handleApproveApproval(req)}
                            className="px-4 py-1.5 bg-[#2C5E3B] hover:bg-[#20452B] text-white font-extrabold rounded-lg shadow-sm transition-colors"
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
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                    Heritage Kitchen Database Listings
                  </h3>

                  <div className="flex items-center gap-2 text-xs">
                    <span>Filter Location:</span>
                    <select
                      value={adminSelectedMunicipality}
                      onChange={(e) => setAdminSelectedMunicipality(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-ivory border border-[#E9E5DE]"
                    >
                      <option value="All">All Municipalities/Cities</option>
                      {MUNICIPALITIES.map(mun => (
                        <option key={mun} value={mun}>{mun}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto border border-[#E9E5DE] rounded-xl">
                  <table className="min-w-full divide-y divide-[#E9E5DE] text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-charcoal-light uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Kitchen/Restaurant</th>
                        <th className="px-4 py-3">Municipality/City</th>
                        <th className="px-4 py-3">Exact Address</th>
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
                          return adminSelectedMunicipality === 'All' || r.municipality === adminSelectedMunicipality;
                        })
                        .map(res => (
                          <tr key={res.id} className="hover:bg-ivory/40">
                            <td className="px-4 py-3 font-extrabold">{res.name}</td>
                            <td className="px-4 py-3">{res.municipality}</td>
                            <td className="px-4 py-3 text-charcoal-light text-[11px] font-semibold">{res.address}</td>
                            <td className="px-4 py-3 text-charcoal-light">{res.operatingHours}</td>
                            <td className="px-4 py-3 text-bananaleaf font-bold">{res.priceTier}</td>
                            <td className="px-4 py-3 text-right space-x-1 shrink-0">
                              <button
                                onClick={() => startAdminEdit(res)}
                                className="p-1.5 text-charcoal-light hover:text-terracotta rounded-lg hover:bg-terracotta/5 inline-flex"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              {adminRole !== 'merchant' && (
                                <button
                                  onClick={() => deleteRestaurant(res.id)}
                                  className="p-1.5 text-charcoal-light hover:text-terracotta rounded-lg hover:bg-terracotta/5 inline-flex"
                                >
                                  <Trash2 className="h-4 w-4" />
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

        </main>

        {/* Admin page footer */}
        <footer className="bg-charcoal text-white/60 py-6 mt-12 border-t border-charcoal-dark">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs">
            <span className="block font-black text-white uppercase tracking-wider">Kanyamanan Administrative Core</span>
            <span className="block mt-1">
              Authorized access only. Secure database access logs active.
            </span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta to-[#993A16] flex items-center justify-center shadow-md border border-white/10 shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {/* Palayok lid handle */}
                <path d="M11 6V4a1 1 0 0 1 2 0v2" stroke="#FAF8F5" strokeWidth="2" />
                {/* Palayok lid */}
                <path d="M5 8c0-2 4-3 7-3s7 1 7 3" stroke="#FAF8F5" strokeWidth="2" />
                {/* Palayok rim */}
                <ellipse cx="12" cy="8" rx="8" ry="1.5" fill="#A04020" stroke="#FAF8F5" strokeWidth="2" />
                {/* Palayok clay body */}
                <path d="M4 8.5c0 6 3 9 8 9s8-3 8-9" fill="#D95D39" stroke="#FAF8F5" strokeWidth="2" />
                {/* Cooking steam */}
                <path d="M9 3c.3-.5-.3-1 0-1.5M12 3c.3-.5-.3-1 0-1.5M15 3c.3-.5-.3-1 0-1.5" stroke="#E9C46A" strokeWidth="1.5" />
              </svg>
            </div>
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
                  My Food Trip Planner
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
            ) : (
              <button
                onClick={() => setActiveView('auth')}
                className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-xs font-bold rounded-xl shadow-sm text-white bg-terracotta hover:bg-terracotta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                Sign In / Register
              </button>
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
                            <div className="flex items-center gap-1 font-semibold text-charcoal-light">
                              <MapPin className="h-3.5 w-3.5 text-saffron shrink-0" />
                              <span>{res.municipality}</span>
                            </div>
                            <span className="text-xs font-bold text-terracotta flex items-center gap-0.5">
                              Open Drawer <ChevronRight className="h-3 w-3" />
                            </span>
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

                    {/* Active Itinerary List */}
                    <div>
                      <h4 className="text-[10px] font-black text-charcoal-light uppercase tracking-wider mb-2">
                        Active Route Nodes
                      </h4>
                      {activeTrip.length === 0 ? (
                        <div className="bg-[#FAF8F5] border border-dashed border-[#E9E5DE] p-6 rounded-xl text-center">
                          <p className="text-xs text-charcoal-light">No restaurants added yet.</p>
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
                                className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E9E5DE] flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-5 h-5 rounded-full bg-bananaleaf text-white text-[10px] font-bold flex items-center justify-center">
                                    {index + 1}
                                  </span>
                                  <div>
                                    <span className="block text-xs font-black text-charcoal">{res.name}</span>
                                    <span className="block text-[9px] text-charcoal-light font-semibold">
                                      {res.municipality} • {res.address}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFromItinerary(res.id)}
                                  className="p-1 text-charcoal-light hover:text-terracotta"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
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
              <div className="bento-card p-5 bg-white space-y-4 max-w-xl mx-auto">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">
                  <Star className="h-4.5 w-4.5 text-saffron" /> Saved Itineraries History
                </h3>

                <div className="space-y-3">
                  {savedItineraries.map(itin => (
                    <div
                      key={itin.id}
                      onClick={() => handleLoadSavedItinerary(itin)}
                      className={`p-4 border rounded-xl text-left space-y-2 transition-all cursor-pointer group/itin relative ${
                        itin.isFinished 
                          ? 'bg-[#FAF8F5]/60 border-[#E9E5DE] opacity-75' 
                          : 'bg-[#FAF8F5] border-[#E9E5DE] hover:border-terracotta/20 hover:bg-white'
                      }`}
                      title="Click to load and execute this plan"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs font-black block truncate ${itin.isFinished ? 'text-charcoal-light line-through' : 'text-charcoal group-hover/itin:text-terracotta transition-colors'}`}>
                            {itin.name}
                          </span>
                          {itin.isFinished ? (
                            <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-extrabold text-bananaleaf animate-fade-in">
                              ✓ Finished Trip
                            </span>
                          ) : (
                            <span className="text-[9px] text-charcoal-light font-bold">
                              Active Plan
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={(e) => handleToggleFinishItinerary(itin.id, e)}
                            className={`p-1 rounded transition-colors ${
                              itin.isFinished 
                                ? 'text-bananaleaf hover:bg-bananaleaf/10' 
                                : 'text-charcoal-light hover:text-bananaleaf hover:bg-bananaleaf/5'
                            }`}
                            title={itin.isFinished ? "Mark as Active" : "Mark as Finished"}
                          >
                            <CheckCircle className={`h-4 w-4 ${itin.isFinished ? 'fill-bananaleaf/10' : ''}`} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDeleteItinerary(itin.id, e)}
                            className="p-1 rounded text-charcoal-light hover:text-terracotta hover:bg-terracotta/5 transition-colors"
                            title="Delete Route"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {itin.stops.map((stop, idx) => (
                          <span key={idx} className={`text-[9px] px-2 py-0.5 rounded border border-[#E9E5DE] ${itin.isFinished ? 'bg-white/50 text-gray-400' : 'bg-white/90'}`}>
                            {stop}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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

      {/* Footer status bar with PWA & Admin Login */}
      <footer className="bg-white border-t border-[#E9E5DE] py-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-black text-charcoal uppercase tracking-wider block">Kanyamanan</span>
            <span className="text-[10px] text-charcoal-light block mt-0.5">
              © 2026 Pampanga, Philippines.
            </span>
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
                <p className="text-xs text-charcoal-light mt-0.5 flex flex-col gap-0.5">
                  <span>{selectedRestaurant.municipality}</span>
                  {selectedRestaurant.address && (
                    <span className="text-[11px] text-charcoal-light font-medium flex items-center gap-1 mt-0.5">
                      📍 {selectedRestaurant.address}
                    </span>
                  )}
                </p>
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
                    handleAddToItinerary(selectedRestaurant);
                    setSelectedRestaurant(null);
                    setActiveDish(null);
                    setCvUploadedMeal(null);
                    if (!isAuthenticated) {
                      alert("Note: Added to sandbox trail. To lock paths, please log in.");
                    } else {
                      alert(`Added ${selectedRestaurant.name} to active trip routing queue!`);
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

    </div>
  );
}

export default App;
