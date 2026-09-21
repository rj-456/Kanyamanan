// Zero-Config Real-Time Cloud Synchronization Engine
// Connects all devices (phones, laptops, tablets) without requiring any API keys or account setup.

const CLOUD_MASTER_ID = 'ff8081819ff5b110019ffeddada5176b';
const CLOUD_ENDPOINT = `https://api.restful-api.dev/objects/${CLOUD_MASTER_ID}`;
const LOCAL_STORAGE_KEY = 'kanyamanan_pending_approvals_db';

/**
 * Fetch the latest change requests list from the shared cloud
 */
export const fetchCloudChangeRequests = async () => {
  try {
    const res = await fetch(CLOUD_ENDPOINT, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data && Array.isArray(json.data.requests)) {
      return json.data.requests;
    }
    return null;
  } catch (err) {
    console.warn("Cloud sync fetch warning (using local fallback):", err);
    return null;
  }
};

/**
 * Push the full change requests list to the shared cloud
 */
export const pushCloudChangeRequests = async (requestsArray) => {
  if (!Array.isArray(requestsArray)) return false;
  try {
    const payload = {
      name: 'kanyamanan_master_change_requests_v1',
      data: {
        version: 1,
        lastUpdated: new Date().toISOString(),
        requests: requestsArray
      }
    };
    const res = await fetch(CLOUD_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.warn("Cloud sync push warning:", err);
    return false;
  }
};

/**
 * Start automated real-time background sync loop
 * Polls the cloud every 4 seconds and triggers on window focus
 */
export const startCloudSync = (onDataReceived) => {
  let isSubscribed = true;
  let lastDataHash = '';

  const sync = async () => {
    if (!isSubscribed) return;
    const remoteRequests = await fetchCloudChangeRequests();
    if (remoteRequests && isSubscribed) {
      const currentHash = JSON.stringify(remoteRequests);
      if (currentHash !== lastDataHash) {
        lastDataHash = currentHash;
        // Update local storage and notify callback
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, currentHash);
        } catch (e) {}
        onDataReceived(remoteRequests);
      }
    }
  };

  // Initial immediate sync
  sync();

  // Periodic polling interval (every 4 seconds)
  const intervalId = setInterval(sync, 4000);

  // Sync immediately when user switches tabs or wakes device
  const onFocus = () => sync();
  window.addEventListener('focus', onFocus);
  window.addEventListener('online', onFocus);

  return () => {
    isSubscribed = false;
    clearInterval(intervalId);
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('online', onFocus);
  };
};

// ==========================================
// REAL-TIME CLOUD REVIEWS SYNCHRONIZATION
// ==========================================

const CLOUD_REVIEWS_MASTER_ID = 'ff808181a09d98f701a0be1d57855071';
const CLOUD_REVIEWS_ENDPOINT = `https://api.restful-api.dev/objects/${CLOUD_REVIEWS_MASTER_ID}`;

/**
 * Fetch all verified customer reviews from the shared cloud
 */
export const fetchCloudReviews = async () => {
  try {
    const res = await fetch(CLOUD_REVIEWS_ENDPOINT, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data && Array.isArray(json.data.reviews)) {
      return json.data.reviews;
    }
    return null;
  } catch (err) {
    console.warn("Cloud reviews fetch warning (using local fallback):", err);
    return null;
  }
};

/**
 * Push verified reviews list to the shared cloud
 */
export const pushCloudReviews = async (reviewsArray) => {
  if (!Array.isArray(reviewsArray)) return false;
  try {
    const payload = {
      name: 'kanyamanan_master_reviews_v1',
      data: {
        version: 1,
        lastUpdated: new Date().toISOString(),
        reviews: reviewsArray
      }
    };
    const res = await fetch(CLOUD_REVIEWS_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.warn("Cloud reviews push warning:", err);
    return false;
  }
};

/**
 * Start automated real-time background reviews sync loop
 * Polls the cloud every 4 seconds and triggers on window focus / tab switch
 */
export const startCloudReviewsSync = (onReviewsReceived) => {
  let isSubscribed = true;
  let lastReviewsHash = '';

  const sync = async () => {
    if (!isSubscribed) return;
    const remoteReviews = await fetchCloudReviews();
    if (remoteReviews && isSubscribed) {
      const currentHash = JSON.stringify(remoteReviews);
      if (currentHash !== lastReviewsHash) {
        lastReviewsHash = currentHash;
        onReviewsReceived(remoteReviews);
      }
    }
  };

  // Initial immediate sync
  sync();

  // Periodic polling interval (every 4 seconds)
  const intervalId = setInterval(sync, 4000);

  // Sync immediately when user switches tabs or wakes device
  const onFocus = () => sync();
  window.addEventListener('focus', onFocus);
  window.addEventListener('online', onFocus);

  return () => {
    isSubscribed = false;
    clearInterval(intervalId);
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('online', onFocus);
  };
};

