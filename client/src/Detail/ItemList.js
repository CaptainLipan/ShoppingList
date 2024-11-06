import { useContext } from "react";
import { DetailContext } from "./DetailProvider";
import Item from "./Item";
import  "../Styles/ItemList.css";
function ItemList() {
  const { data, handlerMap, showResolved, toggleShowResolved } =
    useContext(DetailContext);

  return (
    <div >
      ItemList <button onClick={() => handlerMap.addItem()}>add item</button>
      <button onClick={() => toggleShowResolved()}>
        {showResolved ? "not resolved only" : "all items"}
      </button>
      <div>
        {data.itemList.map((item) => (
          <Item key={item.id} data={item} handlerMap={handlerMap} />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
