interface MenuFormProps {
  title: string; setTitle: (v: string) => void;
  price: number; setPrice: (v: number) => void;
  onAdd: () => void;
}

export default function MenuForm({ title, setTitle, price, setPrice, onAdd }: MenuFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-600">نام محصول</label>
        <input className="border p-2.5 rounded-lg text-black outline-none focus:ring-2 focus:ring-green-500"
          placeholder="مثلاً: پیتزا سیر و استیک" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-600">قیمت (تومان)</label>
        <input className="border p-2.5 rounded-lg text-black outline-none focus:ring-2 focus:ring-green-500"
          type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
      </div>
      <button onClick={onAdd} className="bg-green-600 text-white py-2.5 rounded-lg font-bold hover:bg-green-700 transition shadow-lg">
        افزودن به لیست
      </button>
    </div>
  );
}