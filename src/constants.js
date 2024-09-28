import { collection } from "firebase/firestore";
import { firestore } from "./config/firebase";

export const ItemCollectionRef = collection(firestore , "items")
export const categoryCollectionRef = collection(firestore, "categories")