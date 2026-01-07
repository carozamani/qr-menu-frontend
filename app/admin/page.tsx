"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/queries/menu";
import { MenuItem } from "@/types/menu";

// Import Components

import AdminHeader from "@/components/admin/AdminHeader";
import MenuForm from "@/components/admin/MenuForm";
import EditModal from "@/components/admin/EditModal";

export default function AdminPanel() {
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/admin/login");
    };
    checkUser();
    fetchItems();
  }, [router]);

  const fetchItems = async () => {
    const allItems = await getMenuItems();
    setItems(allItems);
  };

  const handleAdd = async () => {
    if (!title || price <= 0) return alert("اطلاعات نامعتبر");
    await createMenuItem({ title, price, is_active: true });
    setTitle(""); setPrice(0); setMessage("اضافه شد ✅");
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("حذف شود؟")) return;
    await deleteMenuItem(id);
    fetchItems();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 text-right" dir="rtl">
      <AdminHeader onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto">
        {message && <div className="mb-4 p-3 bg-white border-r-4 border-blue-500 rounded shadow-sm">{message}</div>}

        <MenuForm title={title} setTitle={setTitle} price={price} setPrice={setPrice} onAdd={handleAdd} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedItems.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col">
               <h2 className="text-xl font-bold mb-2">{item.title}</h2>
               <p className="text-green-600 font-bold mb-5">{item.price.toLocaleString()} تومان</p>
               <div className="mt-auto flex gap-2">
                 <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg">ویرایش</button>
                 <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-50 text-red-500 py-2 rounded-lg">حذف</button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && editingItem && (
        <EditModal 
          item={editingItem} 
          onClose={() => setIsModalOpen(false)} 
          onSave={async (updatedData) => {
            await updateMenuItem(editingItem.id, updatedData);
            setIsModalOpen(false);
            fetchItems();
          }} 
        />
      )}
    </main>
  );
}