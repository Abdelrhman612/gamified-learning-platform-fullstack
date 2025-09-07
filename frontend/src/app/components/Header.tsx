"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              Gamified
            </Link>
          </div>

          {/* قائمة التنقل للشاشات المتوسطة والكبيرة */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 font-medium">
              الرئيسية
            </Link>
            <Link
              href="/challenges"
              className="hover:text-blue-400 font-medium"
            >
              التحديات
            </Link>
            <Link href="/about" className="hover:text-blue-400 font-medium">
              عن المنصة
            </Link>
            <Link
              href="/dashboard/admin"
              className="hover:text-blue-400 font-medium"
            >
              لوحة المشرف
            </Link>
            <Link
              href="/dashboard/user"
              className="hover:text-blue-400 font-medium"
            >
              لوحة المستخدم
            </Link>
            <Link href="/gemini" className="hover:text-blue-400 font-medium">
              🚀 Gemini Chat
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden sm:block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              تسجيل الدخول
            </Link>

            {/* زر القائمة للجوال */}
            <button
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للجوال */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 bg-gray-800 rounded-lg p-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="hover:text-blue-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                href="/challenges"
                className="hover:text-blue-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                التحديات
              </Link>
              <Link
                href="/about"
                className="hover:text-blue-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                عن المنصة
              </Link>
              <Link
                href="/dashboard/admin"
                className="hover:text-blue-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                لوحة المشرف
              </Link>
              <Link
                href="/dashboard/user"
                className="hover:text-blue-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                لوحة المستخدم
              </Link>
              <Link
                href="/gemini"
                className="hover:text-blue-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🚀 Gemini Chat
              </Link>
              <Link
                href="/login"
                className="mt-4 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                تسجيل الدخول
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
