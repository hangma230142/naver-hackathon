import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const addProduct = () => {
    axios
      .post("http://localhost:4000/api/products", { name, description })
      .then((res) => setProducts([...products, res.data]));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">📦 Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.description}
          </li>
        ))}
      </ul>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>
    </div>
  );
}
