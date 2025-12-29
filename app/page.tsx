"use client"

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [menu, setMenu] = useState([]);

  const fetchMenu = () => {
    axios.get("http://localhost:3000/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>منوی رستوران</h1>

      {menu.map(item => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
          <h2>{item.title}</h2>
          <p>قیمت: {item.price} تومان</p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button onClick={fetchMenu}>رفرش منو</button>
      </div>
    </div>
  );
}
