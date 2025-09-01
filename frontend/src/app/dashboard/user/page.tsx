"use client";
import { useEffect, useState } from "react";
import { Logout } from "../../lib/endpoints/challenge";
import { useRouter } from "next/navigation";
import { User } from "../interface.user";
import { GetMe } from "@/app/lib/endpoints/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await GetMe();
        setUser(data);
      } catch (err) {
        console.error("❌ فشل جلب بيانات المستخدم", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    Logout();
    router.push("/login");
  };

  // إنشاء صورة افتراضية بناءً على اسم المستخدم
  const getAvatarUrl = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-green-500",
      "bg-yellow-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return (
      <div
        className={`w-24 h-24 ${randomColor} rounded-full flex items-center justify-center text-3xl font-bold text-white`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">⏳ جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            لوحة التحكم
          </h1>
          <p className="text-gray-400 mt-2">مرحباً بعودتك، {user.name}!</p>
        </header>

        <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl shadow-blue-900/10">
          {/* صورة المستخدم والمعلومات الأساسية */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-6 border-b border-gray-800">
            <div className="flex-shrink-0">{getAvatarUrl(user.name)}</div>

            <div className="text-center md:text-right flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-blue-400 mt-1">{user.email}</p>

              <div className="flex flex-wrap justify-center md:justify-end gap-3 mt-4">
                <span
                  className={`px-4 py-1 rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-900/40 text-purple-300"
                      : "bg-blue-900/40 text-blue-300"
                  } border ${
                    user.role === "admin"
                      ? "border-purple-700/30"
                      : "border-blue-700/30"
                  }`}
                >
                  {user.role === "admin" ? "👑 مشرف" : "👤 مستخدم"}
                </span>
                <span className="px-4 py-1 rounded-full bg-yellow-900/40 text-yellow-300 border border-yellow-700/30">
                  🌟 {user.points} نقطة
                </span>
              </div>
            </div>
          </div>

          {/* معلومات تفصيلية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl border border-gray-700 shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/20 p-3 rounded-xl mr-3 border border-blue-500/30">
                  <span className="text-2xl text-blue-400">👤</span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-300">
                    المعلومات الشخصية
                  </h2>
                  <p className="text-sm text-gray-500">تفاصيل حسابك</p>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="text-gray-400">الاسم الكامل</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="text-gray-400">البريد الإلكتروني</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">الدور</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-purple-900/40 text-purple-300"
                        : "bg-blue-900/40 text-blue-300"
                    }`}
                  >
                    {user.role === "admin" ? "مشرف" : "مستخدم"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl border border-gray-700 shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500/20 p-3 rounded-xl mr-3 border border-yellow-500/30">
                  <span className="text-2xl text-yellow-400">🏆</span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-300">الإنجازات</h2>
                  <p className="text-sm text-gray-500">نقاطك وتقدمك</p>
                </div>
              </div>
              <div className="text-center py-6">
                <div className="inline-flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <span className="text-gray-400 mt-2"> {user.points}</span>
                </div>
                <div className="mt-6 bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                    style={{ width: `${Math.min(user.points, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  تقدمك نحو الهدف القادم
                </p>
              </div>
            </div>
          </div>
          {/* زر تسجيل الخروج */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-red-900/20 hover:shadow-red-900/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            تسجيل الخروج
          </button>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© نظام التحديات. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  );
}
