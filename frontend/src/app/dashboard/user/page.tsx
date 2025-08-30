"use client";
import { useEffect, useState } from "react";
import { GetMe, Logout } from "../../lib/endpoints";
import { useRouter } from "next/navigation";
import { User } from "../interface.user";

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        ⏳ جاري التحميل...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-lg bg-black border border-gray-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">لوحة التحكم</h1>

        <div className="space-y-4">
          <p>
            <span className="font-semibold">👤 الاسم:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">📧 البريد:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">🔑 الدور:</span> {user.role}
          </p>
          <p>
            <span className="font-semibold">🌟 نقاطك:</span> {user.points}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
