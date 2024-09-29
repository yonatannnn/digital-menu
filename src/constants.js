import { collection } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import the Firebase Storage module
import { firestore } from "./config/firebase";

// Firestore references
export const ItemCollectionRef = collection(firestore, "items");
export const categoryCollectionRef = collection(firestore, "categories");

// Initialize Firebase Storage and create a reference
export const storage = getStorage(); // Initialize storage service from your Firebase app
