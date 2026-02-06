import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Menu",
  description: "Dizayn ve Lezzet bir arada",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        {/* این کانتینر کل محتوا را در مانیتورهای بزرگ وسط‌چین نگه می‌دارد */}
        <div className="flex justify-center min-h-screen">
          {children}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          html { scroll-behavior: smooth; }
          body { overflow-x: hidden; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ` }} />
      </body>
    </html>
  );
}