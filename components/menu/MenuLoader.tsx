"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";

export default function MenuLoader() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Loader */}
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* حلقه چرخان */}
        <div
          className="absolute inset-0 animate-spin rounded-full"
          style={{
            borderWidth: "3px",
            borderColor: "var(--color-primary)/40",
            borderTopColor: "var(--color-primary)",
            boxShadow: "var(--shadow-md)",
          }}
        />

        {/* لوگو */}
        <div
          className="relative w-22 h-22 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--bg-surface-2)",
            boxShadow: "var(--shadow-lg)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <Image src="/Logo.png" alt="Logo" fill className="object-contain" priority />
        </div>
      </div>

      {/* متن لودر */}
      <Typography
        variant="h2"
        align="center"
        className="mt-8 animate-pulse tracking-wide"
        style={{ color: "var(--color-primary)" }}
      >
        Menü yükleniyor...
      </Typography>

      {/* متن پایین ثابت با لینک و قلب */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <Typography
          variant="caption"
          className="flex items-center gap-1 select-none"
          style={{ color: "var(--color-text-muted)" }}
        >
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
        </Typography>
      </div>
    </div>
  );
}
