import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-white"
        >
          منصة Gamified
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/challenges" className="hover:underline">
            التحديات
          </Link>
          <Link href="/dashboard/user" className="hover:underline">
            لوحة المستخدم
          </Link>
          <Link href="/dashboard/admin" className="hover:underline">
            لوحة الأدمن
          </Link>
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-lg border border-gray-600 hover:bg-gray-700"
          >
            تسجيل الدخول
          </Link>
        </nav>
      </div>
    </header>
  );
}
