// services/ingredient.js
import { getDoc, getDocs, addDoc } from "firebase/firestore";
import { ingredientCollectionRef } from "../constants";

export const getIngredients = async () => {
    try {
        const ingredients = await getDocs(ingredientCollectionRef);
        const filteredData = ingredients.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        return filteredData;
    } catch (err) {
        console.log(err);
    }
};

export const addIngredient = async (ingredient) => {
    try {
        const ingredientRef = await addDoc(ingredientCollectionRef, ingredient);
        return ingredientRef.id;
    } catch (err) {
        console.log(err);
    }
};
