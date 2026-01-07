import { useState } from "react";
import { MenuItem } from "@/types/menu";

interface EditModalProps {
  item: MenuItem;
  onClose: () => void;
  onSave: (updatedData: { title: string; price: number }) => Promise<void>;
}

export default function EditModal({ item, onClose, onSave }: EditModalProps) {
  const [editingItem, setEditingItem] = useState({
    title: item.title,
    price: item.price,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSave(editingItem);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3 text-center">
          ویرایش محصول
        </h2>

        <div className="space-y-5">
          <div className="flex flex-col gap-1 text-right">
            <label className="text-sm font-bold text-gray-600">نام غذا</label>
            <input
              className="w-full border p-3 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={editingItem.title}
              onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1 text-right">
            <label className="text-sm font-bold text-gray-600">قیمت (تومان)</label>
            <input
              className="w-full border p-3 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition"
              type="number"
              value={editingItem.price}
              onChange={(e) => setEditingItem({ ...editingItem, price: +e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:bg-blue-300"
          >
            {loading ? "در حال ذخیره..." : "تایید و ذخیره"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}