import { getDoc , getDocs , addDoc } from "firebase/firestore";
import { CategoryCollectionRef } from "../constants";


export const getCategories = async () => {
    try {
        const categories = await getDocs(CategoryCollectionRef);
        const filteredData = categories.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        return filteredData;
    } catch (err) {
        console.log(err);
    }
}

export const getCategoryById = async (id) => {
    try {
        const categoryDoc = await getDoc(CategoryCollectionRef, id);
        if (categoryDoc.exists()) {
            return { id: categoryDoc.id, ...categoryDoc.data() };
        } else {
            throw new Error('No such document!');
        }
    } catch (err) {
        console.log(err);
    }
}

export const addCatagory = async (category) => {
    try {
        const categoryRef = await addDoc(CategoryCollectionRef, category);
        return categoryRef.id;
    } catch (err) {
        console.log(err);
    }
}