import '../styles/Item.css';

const Item = (props) => {
    const { item } = props;

    const ingredientsString = item.ingredients?.join(', ');
    return (
        <div id='outer-container'>
            <div id='inner-container'>
                <img src={item.imageUrl} alt={item.title} id="item-image"/>
                <div id="item-detail">
                    <h3 id='item-title'>{item.name}</h3>
                    <p id="ingredients">{ingredientsString}</p>
                    <p id="price">{item.price} Birr</p>
                </div>
            </div>
        </div>
    );
}

export default Item;