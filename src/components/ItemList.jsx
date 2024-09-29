import React, { useEffect } from 'react';
import Item from './Item';

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItems } from '../redux/itemSlice';

const ItemList = () => {
    // const dispatch = useDispatch();
    // const items = useSelector((state) => state.items.items); // Access the items array from the store
    // const status = useSelector((state) => state.items.status); // Access the status of the fetch request
    // const error = useSelector((state) => state.items.error); // Access any error in case of failure

    // // Fetch the items when the component mounts
    // useEffect(() => {
    //     if (status === 'idle') {
    //         dispatch(fetchItems());
    //     }
    // }, [dispatch, status]);

    // // Show loading status while fetching items
    // if (status === 'loading') {
    //     return <p>Loading...</p>;
    // }

    // // Handle errors if fetching items failed
    // if (status === 'failed') {
    //     return <p>Error: {error}</p>;
    // }

    const items = [
        {
          id: 1,
          title: 'Spaghetti',
          ingredients: 'Ground beef patty, cheese slice, hamburger bun, lettuce, tomato, pickles, onions, ketchup, mustard, mayonnaise, salt, pepper.',
          price: 135.00,
          image: 'https://www.kitchensanctuary.com/wp-content/uploads/2024/02/Spaghetti-Vongole-tall-FS.jpg'
        },
        {
          id: 2,
          title: 'Chicken Burger',
          ingredients: 'Chicken breast, lettuce, tomato, mayonnaise, cheddar cheese, hamburger bun, pickles, onions, ketchup.',
          price: 145.00,
          image: 'https://www.kitchensanctuary.com/wp-content/uploads/2015/03/Roast-Chicken-brioche-tall.webp'
        },
        {
          id: 3,
          title: 'Veggie Wrap',
          ingredients: 'Grilled vegetables, hummus, spinach, cucumbers, tomatoes, whole wheat wrap, feta cheese.',
          price: 120.00,
          image: 'https://www.kitchensanctuary.com/wp-content/uploads/2021/03/Hunters-chicken-Tall-FS-37.webp'
        },
        {
          id: 4,
          title: 'Fish Tacos',
          ingredients: 'Grilled fish, cabbage, lime crema, avocado, corn tortilla, cilantro, salsa.',
          price: 160.00,
          image: 'https://www.kitchensanctuary.com/wp-content/uploads/2018/06/Crispy-Fish-Tacos-with-Pico-De-Gallo-Recipe-tall-FS.webp'
        },
        {
          id: 5,
          title: 'BBQ Pulled Pork Sandwich',
          ingredients: 'Pulled pork, BBQ sauce, coleslaw, pickles, hamburger bun, onions.',
          price: 150.00,
          image: 'https://www.kitchensanctuary.com/wp-content/uploads/2024/07/Pulled-Pork-on-BBQ-tall-FS.jpg'
        }
      ];

    return (
        <div>
            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemList;
