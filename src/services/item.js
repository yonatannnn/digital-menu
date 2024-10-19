import { getDocs, getDoc, doc, query, where, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { ItemCollectionRef } from '../constants'; // Ensure you have a Firebase storage reference
import { storage } from '../config/firebase';

export const uploadImage = async (file) => {
    try {
        const storageRef = ref(storage, `images/${file.name}`); // Path in Firebase Storage
        console.log(`Uploading file...${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (err) {
        console.error("Error uploading file: ", err);
        throw err;
    }
};

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

export const addItem = async (item, file) => {
    try {
        let imageUrl = '';
        
        if (file) {
            imageUrl = await uploadImage(file);
        }
        const itemData = { ...item, imageUrl };
        const itemRef = await addDoc(ItemCollectionRef, itemData);

        return itemRef.id;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const deleteItem = async (id) => {
    try {
        const itemDocRef = doc(ItemCollectionRef, id);
        await deleteDoc(itemDocRef);
        console.log(`Item with id ${id} deleted successfully.`);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateItem = async (id, updatedItem) => {
    try {
        const itemDocRef = doc(ItemCollectionRef, id);
        await updateDoc(itemDocRef, { price: updatedItem.price });

        console.log(`Item with id ${id} updated successfully.`);
    } catch (err) {
        console.log(err);
        throw err;
    }
};
