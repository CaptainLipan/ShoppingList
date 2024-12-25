import { useContext } from "react";
import { DetailContext } from "./DetailProvider";
import Item from "./Item";
import  "../Styles/ItemList.css";
function ItemList() {
    const { data, handlerMap, showResolved, toggleShowResolved } = useContext(DetailContext);

    if (!data || !data.itemList) return <p>No items found.</p>;

    return (
        <div className="item-list-container">
            <button onClick={() => handlerMap.addItem()}>Add Item</button>
            <button onClick={() => toggleShowResolved()}>
                {showResolved ? "Show Unresolved Only" : "Show All Items"}
            </button>

            <div className="item-list">
                {data.itemList.map((item) => (
                    <Item key={item.id} data={item} handlerMap={handlerMap} />
                ))}
            </div>
        </div>
    );
}

export default ItemList;

