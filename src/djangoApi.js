// Django REST Framework API Client for Kanyamanan
export const DJANGO_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DJANGO_API_URL) || (
  typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? 'https://kanyamanan-backend.vercel.app/api'
    : 'http://127.0.0.1:8000/api'
);

/**
 * Fetch all restaurants from Django REST API
 */
export const fetchDjangoRestaurants = async () => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || null);
  } catch (err) {
    console.warn("Django REST API offline or unreachable, using local fallback:", err);
    return null;
  }
};

/**
 * Save / Update a restaurant in Django REST API
 */
export const updateDjangoRestaurant = async (restaurantId, restaurantData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/${restaurantId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django restaurant update warning:", err);
    return false;
  }
};

/**
 * Create a new restaurant in Django REST API
 */
export const createDjangoRestaurant = async (restaurantData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django restaurant creation warning:", err);
    return false;
  }
};

/**
 * Delete a restaurant in Django REST API
 */
export const deleteDjangoRestaurant = async (restaurantId) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/${restaurantId}/`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn("Django restaurant deletion warning:", err);
    return false;
  }
};

/**
 * Authenticate User (Super Admin or Merchant) via Django
 */
export const loginViaDjango = async (username, password, loginType = 'merchant') => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, loginType })
    });
    if (!res.ok) return { authenticated: false, error: 'Invalid Credentials' };
    return await res.json();
  } catch (err) {
    console.warn("Django login warning:", err);
    return null;
  }
};

/**
 * Register Tourist Account in Django
 */
export const registerTouristInDjango = async (username, email, password) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/auth/register-tourist/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (!res.ok) return false;
    return await res.json();
  } catch (err) {
    console.warn("Django tourist registration warning:", err);
    return false;
  }
};

/**
 * Fetch Tourist Saved Itineraries from Django
 */
export const fetchDjangoUserItineraries = async (userAccountKey) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/itineraries/?userAccountKey=${encodeURIComponent(userAccountKey)}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || null);
  } catch (err) {
    console.warn("Django itineraries fetch warning:", err);
    return null;
  }
};

/**
 * Save Tourist Itinerary to Django
 */
export const saveDjangoUserItinerary = async (userAccountKey, itineraryObj) => {
  try {
    const payload = {
      id: itineraryObj.id || `trail-${Date.now()}`,
      userAccountKey: userAccountKey,
      name: itineraryObj.name,
      stops: itineraryObj.stops || [],
      isFinished: Boolean(itineraryObj.isFinished)
    };
    const res = await fetch(`${DJANGO_BASE_URL}/itineraries/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django itinerary save warning:", err);
    return false;
  }
};

/**
 * Fetch Change Requests from Django REST API
 */
export const fetchDjangoChangeRequests = async () => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/change-requests/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || null);
  } catch (err) {
    console.warn("Django change requests fetch warning:", err);
    return null;
  }
};

/**
 * Submit a Change Request to Django REST API
 */
export const createDjangoChangeRequest = async (changeReqData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/change-requests/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changeReqData)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django change request create warning:", err);
    return false;
  }
};

/**
 * Update a Change Request status in Django REST API
 */
export const updateDjangoChangeRequest = async (requestId, changeReqData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/change-requests/${requestId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changeReqData)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django change request update warning:", err);
    return false;
  }
};
