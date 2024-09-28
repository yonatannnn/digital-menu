import firestore from '../config/firebase';
import { getDocs } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { ItemCollectionRef } from '../constants';


export const  getItems = async () => {

    try {
        const items = getDocs(ItemCollectionRef)
    } catch (err) {
        console.log(err)
    }
    

}