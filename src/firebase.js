import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

// Firebase configuration from environment variables or demo fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

export const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
};

let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } catch (error) {
    console.warn("Firebase initialization error:", error);
  }
}

export { db };

/**
 * Realtime listener for change requests collection
 */
export const subscribeToChangeRequests = (onData, onError) => {
  if (!db) return () => {};
  try {
    const q = collection(db, 'change_requests');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = [];
      snapshot.forEach((docSnap) => {
        requests.push({ id: docSnap.id, ...docSnap.data() });
      });
      onData(requests);
    }, (err) => {
      console.warn("Firestore change requests listener error:", err);
      if (onError) onError(err);
    });
    return unsubscribe;
  } catch (err) {
    console.warn("Error subscribing to change requests:", err);
    return () => {};
  }
};

/**
 * Save / Create a new change request in Firestore
 */
export const saveChangeRequestToCloud = async (reqObj) => {
  if (!db || !reqObj || !reqObj.id) return false;
  try {
    const docRef = doc(db, 'change_requests', reqObj.id);
    await setDoc(docRef, reqObj, { merge: true });
    return true;
  } catch (err) {
    console.error("Firestore save change request error:", err);
    return false;
  }
};

/**
 * Update status or fields of a change request in Firestore
 */
export const updateChangeRequestInCloud = async (reqId, updateData) => {
  if (!db || !reqId) return false;
  try {
    const docRef = doc(db, 'change_requests', reqId);
    await updateDoc(docRef, updateData);
    return true;
  } catch (err) {
    console.error("Firestore update change request error:", err);
    return false;
  }
};

/**
 * Realtime listener for restaurants collection
 */
export const subscribeToRestaurants = (onData, onError) => {
  if (!db) return () => {};
  try {
    const q = collection(db, 'restaurants');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) return;
      const list = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      onData(list);
    }, (err) => {
      console.warn("Firestore restaurants listener error:", err);
      if (onError) onError(err);
    });
    return unsubscribe;
  } catch (err) {
    console.warn("Error subscribing to restaurants:", err);
    return () => {};
  }
};

/**
 * Save restaurant to Firestore
 */
export const saveRestaurantToCloud = async (restaurantObj) => {
  if (!db || !restaurantObj || !restaurantObj.id) return false;
  try {
    const docRef = doc(db, 'restaurants', restaurantObj.id);
    await setDoc(docRef, restaurantObj, { merge: true });
    return true;
  } catch (err) {
    console.error("Firestore save restaurant error:", err);
    return false;
  }
};

/**
 * Delete restaurant from Firestore
 */
export const deleteRestaurantFromCloud = async (restaurantId) => {
  if (!db || !restaurantId) return false;
  try {
    const docRef = doc(db, 'restaurants', restaurantId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("Firestore delete restaurant error:", err);
    return false;
  }
};
