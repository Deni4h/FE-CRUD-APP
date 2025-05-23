import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId === null) {
      await axios.post("http://localhost:5000/api/items", form);
    } else {
      await axios.put(`http://localhost:5000/api/items/${editId}`, form);
      setEditId(null);
    }
    setForm({ name: "", description: "" });
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-indigo-100 to-blue-50 flex flex-col items-center justify-start overflow-y-auto px-4 py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">🌟 CRUD App</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            className="w-full border border-blue-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter item name..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            className="w-full border border-blue-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter item description..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <button
            className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
              editId === null
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {editId === null ? "➕ Add Item" : "✏️ Update Item"}
          </button>
        </form>

        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="flex flex-row mt-2 md:mt-0 space-x-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
