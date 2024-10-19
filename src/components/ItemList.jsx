import React, { useEffect } from 'react';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/itemSlice';


// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItems } from '../redux/itemSlice';

const ItemList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items); // Access the items array from the store
    const status = useSelector((state) => state.items.status); // Access the status of the fetch request
    const error = useSelector((state) => state.items.error); // Access any error in case of failure

    // Fetch the items when the component mounts
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchItems());
        }
    }, [dispatch, status]);

    // Show loading status while fetching items
    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    // Handle errors if fetching items failed
    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {items.map((item) => (
                console.log(item),
                <Item item={item} />
            ))}
        </div>
    );
};

export default ItemList;
