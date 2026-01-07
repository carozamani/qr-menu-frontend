export default function AdminHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">پنل مدیریت رستوران</h1>
      <button onClick={onLogout} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow-md">
        خروج از حساب
      </button>
    </div>
  );
}