import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title: "Gamified Platform",
  description: "منصة تحديات تعليمية تفاعلية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
