import Image from "next/image";
import Link from "next/link";

export default function MenuLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/75 backdrop-blur-md">
      {/* Loader */}
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* حلقه چرخان */}
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#4B2C5E]/40 border-t-[#4B2C5E] shadow-[0_6px_14px_rgba(75,44,94,0.18)]" />

        {/* لوگو */}
        <div className="relative w-22 h-22 rounded-full bg-white shadow-[0_0px_18px_rgba(0,0,0,0.3)] flex items-center justify-center">
          <Image src="/Logo.png" alt="Logo" fill className="object-contain" priority />
        </div>
      </div>

      {/* متن لودر */}
      <p className="mt-8 text-lg font-bold text-[#4B2C5E] animate-pulse tracking-wide">
        Menü yükleniyor...
      </p>

      {/* متن پایین ثابت با لینک و قلب */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <p className="text-sm font-medium text-[#4B2C5E]/60 flex items-center gap-1 select-none">
          Kalpten yapıldı
          <span className="text-red-500 animate-pulse">❤</span>
          <Link
            href="https://carozamani.com"
            target="_blank"
            className="underline hover:text-purple-600 transition-colors"
          >
            carozamani
          </Link>
          tarafından
        </p>
      </div>
    </div>
  );
}
