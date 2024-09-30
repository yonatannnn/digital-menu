import { collection } from "firebase/firestore";
import { firestore } from "./config/firebase";

// Firestore references
export const ItemCollectionRef = collection(firestore, "items");
export const categoryCollectionRef = collection(firestore, "categories");
export const ingredientCollectionRef = collection(firestore, "ingredients");
