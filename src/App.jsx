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

  return (
    <div className="App">
      <Logo />
      <Form data={data} handelSendData={handelSendData} />
      <PackingList
        data={data}
        handleDeletItem={handleDeletItem}
        onToggleItems={handleToggleItem}
      />
      <State />
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
function PackingList({ data, handleDeletItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {data?.map((item) => {
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
function State() {
  return (
    <footer className="stats">
      <em>💼you have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
