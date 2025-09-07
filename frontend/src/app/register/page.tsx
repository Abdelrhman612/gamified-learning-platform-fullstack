"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUp } from "../lib/endpoints/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !email || !password) {
      alert("❌ يرجى ملء جميع الحقول");
      return;
    }

    if (password.length < 6) {
      alert("❌ كلمة المرور يجب أن  6 أحرف");
      return;
    }
    try {
      SignUp({ name, email, password });
      alert("✅ تم إنشاء الحساب بنجاح");
      router.push("/login");
    } catch (err) {
      console.error("خطأ في التسجيل:", err);
      alert("❌ فشل إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>

        <form className="space-y-4 mb-6" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-6">
          لديك حساب بالفعل؟
          <Link href="/login" className="text-blue-400 hover:underline">
            سجل دخولك
          </Link>
        </p>
      </div>
    </div>
  );
}
