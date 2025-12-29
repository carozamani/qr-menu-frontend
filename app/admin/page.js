"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react"; // اصلاح وارد کردن کتابخانه

const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

export default function Admin() {
  const [menu, setMenu] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      fetchMenu();
    }
  }, [loggedIn]);

  const fetchMenu = () => {
    axios.get("http://localhost:3000/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setLoggedIn(true);
    } else {
      alert("نام کاربری یا رمز اشتباه است");
    }
  };

  const addItem = () => {
    axios.post("http://localhost:3000/menu", { title, price: parseInt(price) })
      .then(() => {
        setTitle("");
        setPrice("");
        fetchMenu();
      });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:3000/menu/${id}`)
      .then(() => fetchMenu());
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setPrice(item.price);
  };

  const saveEdit = () => {
    axios.put(`http://localhost:3000/menu/${editId}`, { title, price: parseInt(price) })
      .then(() => {
        setEditId(null);
        setTitle("");
        setPrice("");
        fetchMenu();
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <h2>ورود ادمین</h2>
          <input placeholder="نام کاربری" value={user} onChange={e => setUser(e.target.value)} />
          <input type="password" placeholder="رمز عبور" value={pass} onChange={e => setPass(e.target.value)} />
          <button type="submit">ورود</button>
        </form>
      ) : (
        <>
          <h1>پنل ادمین</h1>

          {/* فرم اضافه کردن آیتم جدید */}
          {!editId && (
            <div style={{ marginBottom: "20px" }}>
              <input placeholder="نام غذا" value={title} onChange={e => setTitle(e.target.value)} />
              <input placeholder="قیمت" value={price} onChange={e => setPrice(e.target.value)} />
              <button onClick={addItem}>اضافه کردن</button>
            </div>
          )}

          {/* لیست آیتم‌ها */}
          {menu.map(item => (
            <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <h2>{item.title}</h2>
              <p>قیمت: {item.price}</p>
              <button onClick={() => deleteItem(item.id)}>حذف</button>
              <button onClick={() => startEdit(item)}>ویرایش</button>
            </div>
          ))}

          {/* فرم ویرایش */}
          {editId && (
            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #aaa" }}>
              <h3>ویرایش آیتم</h3>
              <input placeholder="نام غذا" value={title} onChange={e => setTitle(e.target.value)} />
              <input placeholder="قیمت" value={price} onChange={e => setPrice(e.target.value)} />
              <button onClick={saveEdit}>ذخیره تغییرات</button>
              <button onClick={() => { setEditId(null); setTitle(""); setPrice(""); }}>لغو</button>
            </div>
          )}

          {/* نمایش QR Code */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <h3>QR Code منو</h3>
            <QRCodeCanvas value="http://localhost:3000" size={200} />
            <p>این QR Code را چاپ و به مشتری بدهید</p>
          </div>
        </>
      )}
    </div>
  );
}
