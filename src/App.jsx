import { useState } from "react";
import "./App.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [data, setData] = useState([]);
  const handelSendData = (data) => {
    setData((prev) => {
      return [...prev, data];
    });
  };
  const handleDeletItem = (id) => {
    return setData((items) => items.filter((item) => item?.id !== id));
  };
  const handleToggleItem = (id) => {
    setData((items) => {
      return items?.map((item) =>
        item.id === id ? { ...item, packed: !item?.packed } : item
      );
    });
  };
  const handleClerList = () => {
    const confirmed = window.confirm("Are you sure want to delete all items?");

    confirmed && setData([]);
  };

  return (
    <div className="App">
      <Logo />
      <Form data={data} handelSendData={handelSendData} />
      <PackingList
        data={data}
        handleDeletItem={handleDeletItem}
        onToggleItems={handleToggleItem}
        handleClerList={handleClerList}
      />
      <State data={data} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ handelSendData }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    handelSendData(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need for your 🥰 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ data, handleDeletItem, onToggleItems, handleClerList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortItems;
  if (sortBy === "input") sortItems = data;
  if (sortBy === "description")
    sortItems = data.slice().sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  if (sortBy === "packed")
    sortItems = data
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortItems?.map((item) => {
          return (
            <Item
              item={item}
              key={item?.id}
              handleDeletItem={handleDeletItem}
              onToggleItems={onToggleItems}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => handleClerList()}> clear list</button>
      </div>
    </div>
  );
}

function Item({ item, data, handleDeletItem, onToggleItems }) {
  const { id, description, quantity, packed } = item;

  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={() => onToggleItems(id)}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => handleDeletItem(id)}>❌</button>
    </li>
  );
}
function State({ data }) {
  const numData = data.length;
  const numPacked = data?.filter((item) => item?.packed).length;
  const precentTag = Math.round((Number(numPacked) / Number(numData)) * 100);
  return (
    <footer className="stats">
      <em>
        {precentTag == 100
          ? "you got everything Ready to go✈"
          : `💼you have ${numData} items on your list, and you already packed
        ${numPacked} (${!precentTag ? "0" : precentTag}%)`}
      </em>
    </footer>
  );
}
