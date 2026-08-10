import type { Metadata } from "next";
import { Vazirmatn, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { StoreHydration } from "@/components/layout/store-hydration";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "بوتیک ۱۳ | Boutique13 - فروشگاه پوشاک لوکس",
  description: "بوتیک ۱۳، فروشگاه پوشاک لوکس و دست‌ساز. کیفیت پارچه، الگوی اختصاصی، تولید محدود. تیشرت، شلوار، کفش و اکسسوری مردانه.",
  keywords: ["بوتیک ۱۳", "Boutique13", "پوشاک مردانه", "تیشرت", "شلوار", "کفش", "اکسسوری", "فروشگاه لباس"],
  authors: [{ name: "Boutique13" }],
  icons: {
    icon: "/images/logo.jpg",
  },
  openGraph: {
    title: "بوتیک ۱۳ | Boutique13",
    description: "فروشگاه پوشاک لوکس و دست‌ساز",
    siteName: "Boutique13",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <StoreHydration />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <Toaster />
      </body>
    </html>
  );
}
