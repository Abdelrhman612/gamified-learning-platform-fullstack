import Link from "next/link";

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Gamified
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-400 font-medium">
            الرئيسية
          </Link>
          <Link href="/challenges" className="hover:text-blue-400 font-medium">
            التحديات
          </Link>
          <Link href="/about" className="hover:text-blue-400 font-medium">
            عن المنصة
          </Link>
          <Link
            href="/dashboard/admin"
            className="hover:text-blue-400 font-medium"
          >
            لوحه المشرف
          </Link>
          <Link
            href="/dashboard/user"
            className="hover:text-blue-400 font-medium"
          >
            لوحه المستخدم
          </Link>
          <Link href="/gemini" className="hover:text-blue-400 font-medium">
            🚀 جرّب Gemini Chat
          </Link>
        </nav>
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          تسجيل الدخول
        </Link>
      </div>
    </header>
  );
}
