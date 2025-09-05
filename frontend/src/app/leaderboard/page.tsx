"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@/app/dashboard/interface.user";
import { getUsers } from "../lib/endpoints/user";

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const userData = await getUsers();

      const sortedUsers = userData.sort((a, b) => b.points - a.points);

      setUsers(sortedUsers);
      setTopUsers(sortedUsers.slice(0, 10));
    } catch (err) {
      setError("فشل في تحميل بيانات المتصدرين");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">جاري تحميل المتصدرين...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-lg">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          لوحة المتصدرين 🏆
        </h1>
        <p className="text-gray-400 mt-2">أفضل اللاعبين حسب عدد النقاط</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700/30 text-center">
          <h3 className="text-lg font-semibold">إجمالي اللاعبين</h3>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700/30 text-center">
          <h3 className="text-lg font-semibold">أعلى نقاط</h3>
          <p className="text-2xl font-bold">
            {users.length > 0 ? users[0].points : 0}
          </p>
        </div>
        <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-700/30 text-center">
          <h3 className="text-lg font-semibold">المتوج بالمركز الأول</h3>
          <p className="text-xl font-bold">
            {users.length > 0 ? users[0].name : "لا يوجد"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">أفضل 10 متصدرين</h2>

        {topUsers.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">لا يوجد مستخدمين حتى الآن</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div
                key={user.id}
                className={`bg-gray-800 rounded-lg p-4 flex items-center justify-between ${
                  index === 0
                    ? "border-2 border-amber-400 shadow-lg shadow-amber-500/20"
                    : index === 1
                    ? "border-2 border-gray-300 shadow-lg shadow-gray-500/20"
                    : index === 2
                    ? "border-2 border-amber-700 shadow-lg shadow-amber-700/20"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                      index === 0
                        ? "bg-amber-400 text-gray-900"
                        : index === 1
                        ? "bg-gray-300 text-gray-900"
                        : index === 2
                        ? "bg-amber-700 text-white"
                        : "bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{user.name}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-amber-400">
                    {user.points}
                  </div>
                  <div className="text-sm text-gray-400">نقطة</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">جميع اللاعبين</h2>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-right">الترتيب</th>
                  <th className="px-4 py-3 text-right">الاسم</th>
                  <th className="px-4 py-3">النقاط</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-700 hover:bg-gray-750"
                  >
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block w-8 h-8 rounded-full flex items-center justify-center ${
                          index < 3 ? "font-bold" : ""
                        } ${
                          index === 0
                            ? "bg-amber-400 text-gray-900"
                            : index === 1
                            ? "bg-gray-300 text-gray-900"
                            : index === 2
                            ? "bg-amber-700 text-white"
                            : "bg-gray-700"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full">
                        {user.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          href="/challenges"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          ابدأ التحدي وارتقِ في التصنيف
        </Link>
      </div>
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>يمكن للجميع رؤية هذه الصفحة للتحفيز على المنافسة الصحية</p>
      </footer>
    </div>
  );
}
