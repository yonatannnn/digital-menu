import '../styles/Item.css';

const Item = (props) => {
    const { item } = props;
    return (
        <div id='outer-container'>
            <div id='inner-container'>
                <img src={item.image} alt={item.title} id="item-image"/>
                <div id="item-detail">
                    <h3 id='item-title'>{item.title}</h3>
                    <p id="ingredients">{item.ingredients}</p>
                    <p id="price">{item.price} Birr</p>
                </div>
            </div>
        </div>
    );
}

export default Item;