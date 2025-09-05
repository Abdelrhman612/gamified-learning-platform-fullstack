"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUp } from "../lib/endpoints/auth";
import { getHubCallbackurl } from "../lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ كلمة المرور غير متطابقة");
      return;
    }
    try {
      await SignUp({ name, email, password });
      alert("✅ تم إنشاء الحساب بنجاح");
      router.push("/login");
    } catch (err) {
      console.log(err);
      alert("❌ فشل إنشاء الحساب");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>

        {/* Form */}
        <form className="space-y-4 mb-6" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            إنشاء حساب
          </button>
        </form>

        <div className="flex items-center gap-2 mb-6">
          <hr className="flex-grow border-gray-700" />
          <span className="text-gray-500 text-sm">أو</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* GitHub SignUp */}
        <button
          type="button"
          onClick={() => {
            window.location.href = getHubCallbackurl;
          }}
          className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 .297c-6.63 0-12 5.373-12 12 
              0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
              0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
              -.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 
              1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 
              3.492.997.108-.776.417-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.93 
              0-1.31.467-2.38 1.235-3.22-.135-.304-.54-1.524.105-3.176 
              0 0 1.005-.322 3.3 1.23a11.48 11.48 0 013.003-.404 
              c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 
              3.285-1.23.645 1.652.24 2.872.12 3.176.765.84 
              1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 
              0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 
              22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"
              clipRule="evenodd"
            />
          </svg>
          إنشاء حساب عبر GitHub
        </button>

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
