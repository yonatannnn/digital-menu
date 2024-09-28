import { getDocs, getDoc, doc, query, where , addDoc } from 'firebase/firestore';
import { ItemCollectionRef } from '../constants';

export const getItems = async () => {
    try {
        const items = await getDocs(ItemCollectionRef);
        const filteredData = items.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        return filteredData;
    } catch (err) {
        console.log(err);
    }
}

export const getItemById = async (id) => {
    try {
        const itemDocRef = doc(ItemCollectionRef, id); 
        const itemDoc = await getDoc(itemDocRef);
        if (itemDoc.exists()) {
            return { id: itemDoc.id, ...itemDoc.data() };
        } else {
            throw new Error('No such document!');
        }
    } catch (err) {
        console.log(err);
    }
}


export const getItemsByCategory = async (category) => {
    try {
        const categoryQuery = query(ItemCollectionRef, where('category', '==', category));
        const items = await getDocs(categoryQuery);

        const filteredData = items.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        return filteredData;
    } catch (err) {
        console.log(err);
    }
}

export const addItem = async (item) => {
    try {
        const itemRef = await addDoc(ItemCollectionRef, item);
        return itemRef.id;
    } catch (err) {
        console.log(err);
    }
}

