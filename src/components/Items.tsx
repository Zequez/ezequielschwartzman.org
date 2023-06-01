/*
You are a web component builder; I want you to build a web component:
- UI framework is React
- Language is TypeScript
- Styling done with Tailwind classes
- Use native fetch API
- Name of component is "Items"
- Fetch a list of items from "/data.json" endpoint
    - Data format is {items: ["item1", "item2", "etc"]}
- Whenever the list changes, it should submit the data to /data.json as a POST request
- Add the necessary callbacks for updating, deleting and adding items
- Rendering:
    - Displays the list of items
        - Each item element has:
            - Input to change the item value
            - X button that deletes it
    - Component to add items (input and button on the same line)
       - Input for the item value
          - On pressing enter it should also submit
       - Button to submit
- Export component as default
- Notes:
  - Remember onKeyPress is deprecated on React, use onKeyDown
  - Remember to use the functional form when changing the items state
*/
import React, { useState, useEffect } from "react";

const Items: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [passphrase, setPassphrase] = useState(
    localStorage.getItem("passphrase") || ""
  );

  useEffect(() => {
    localStorage.setItem("passphrase", passphrase);
  }, [passphrase]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const saveItems = async (items: string[]) => {
    try {
      await fetch("/data.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Admin-Passphrase": passphrase,
        },
        body: JSON.stringify({ items }),
      });
    } catch (error) {
      console.error("Error saving items:", error);
    }
  };

  const addItem = () => {
    if (newItem.trim() !== "") {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveItems(updatedItems);
      setNewItem("");
    }
  };

  const updateItem = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="mb-4">
        Experiment where the items here are submitted to a Vercel serverless
        function that then makes a commit the the Github repository and triggers
        a redeploy.
      </div>
      <div className="mb-4">
        <div className="opacity-50 mb-1">Admin passphrase</div>
        <input
          placeholder="Passphrase"
          value={passphrase}
          type="password"
          onChange={(ev) => setPassphrase(ev.target.value)}
          className="bg-white text-black/70 rounded-md p-2 w-full shadow-inset border border-black/10 text-lg"
        />
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-stretch mb-1 text-black/70">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="bg-white text-black/70 rounded-md p-2 w-full shadow-inset border border-black/10 text-lg rounded-r-none"
            />
            <button
              onClick={() => deleteItem(index)}
              className="bg-red-500 text-white rounded rounded-l-none border border-black/10 px-4 py-1 text-xl hover:bg-red-400"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <div className="flex space-x-2 mt-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-white text-black/70 rounded-md p-2 w-full shadow-inset border border-black/10 text-lg"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-400 text-white rounded px-6 py-1 uppercase "
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Items;
