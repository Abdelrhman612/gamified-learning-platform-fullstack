"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../interface.user";
import { Challenge } from "@/app/challenges/interface.challenges";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  updateChallenge,
} from "@/app/lib/endpoints/challenge";
import { ChallengeForm } from "@/app/components/ChallengeForm";
import { deleteUser, getUsers, updateUser } from "@/app/lib/endpoints/user";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(
    null
  );
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "challenges">(
    "challenges"
  );
  const [showForm, setShowForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const challengesData = await getChallenges();
        setUsers(usersData);
        setChallenges(challengesData.challenges);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleSubmit = async (data: Partial<Challenge>) => {
    try {
      if (editingChallenge) {
        await updateChallenge(editingChallenge.id, data as Challenge);
        setEditingChallenge(null);
      } else {
        await createChallenge(data as Challenge);
      }

      const updatedChallenges = await getChallenges();
      setChallenges(updatedChallenges.challenges);
      setShowForm(false);

      alert(
        editingChallenge
          ? "✅ تم تعديل التحدي بنجاح"
          : "✅ تم إضافة التحدي بنجاح"
      );
    } catch (err) {
      console.error("❌ فشل الإضافة/التعديل", err);
      alert("حدث خطأ أثناء حفظ التحدي، تحقق من البيانات وحاول مرة أخرى.");
    }
  };

  const handleUserSubmit = async (userData: Partial<User>) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData as User);
        setEditingUser(null);
        alert("✅ تم تعديل المستخدم بنجاح");
      }

      // إعادة تحميل بيانات المستخدمين
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      setShowUserForm(false);
    } catch (err) {
      console.error("❌ فشل تعديل المستخدم", err);
      alert("حدث خطأ أثناء تعديل المستخدم، تحقق من البيانات وحاول مرة أخرى.");
    }
  };

  const handleEdit = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleCancel: () => void = () => {
    setEditingChallenge(null);
    setShowForm(false);
  };

  const handleCancelUser: () => void = () => {
    setEditingUser(null);
    setShowUserForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا التحدي؟")) return;
    try {
      await deleteChallenge(id);
      setChallenges(challenges.filter((c) => c.id !== id));
      alert("✅ تم حذف التحدي بنجاح");
    } catch (err) {
      console.error("❌ فشل الحذف", err);
      alert("حدث خطأ أثناء حذف التحدي.");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      alert("✅ تم حذف المستخدم بنجاح");
    } catch (err) {
      console.error("❌ فشل حذف المستخدم", err);
      alert("حدث خطأ أثناء حذف المستخدم.");
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>⏳ جاري التحميل...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <header className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold">لوحة تحكم الأدمن</h1>
        <p className="text-gray-400">إدارة المستخدمين والتحديات في النظام</p>
      </header>

      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "challenges"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("challenges")}
        >
          التحديات
        </button>
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "users"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("users")}
        >
          المستخدمين
        </button>
      </div>

      {activeTab === "challenges" && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">إدارة التحديات</h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center"
              >
                <span>+ إضافة تحدي جديد</span>
              </button>
            )}
          </div>

          {showForm && (
            <div className="bg-gray-900 p-6 rounded-xl mb-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">
                  {editingChallenge ? "تعديل التحدي" : "إضافة تحدي جديد"}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <ChallengeForm
                initialData={editingChallenge}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}

          <div className="grid gap-4">
            {challenges.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-xl">
                <p className="text-gray-400">لا توجد تحديات مضافة حتى الآن</p>
              </div>
            ) : (
              challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-gray-900 p-4 rounded-xl border border-gray-800"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">
                          {challenge.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            challenge.type === "daily"
                              ? "bg-green-900 text-green-300"
                              : "bg-purple-900 text-purple-300"
                          }`}
                        >
                          {challenge.type === "daily" ? "يومي" : "أسبوعي"}
                        </span>
                        <span className="bg-yellow-900 text-yellow-300 px-2 py-1 text-xs rounded-full">
                          {challenge.points} نقاط
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                        <div>
                          <span className="text-gray-500">البداية: </span>
                          {new Date(challenge.startAt as string).toLocaleString(
                            "ar-SA"
                          )}
                        </div>
                        <div>
                          <span className="text-gray-500">النهاية: </span>
                          {new Date(challenge.endAt as string).toLocaleString(
                            "ar-SA"
                          )}
                        </div>
                      </div>

                      {challenge.description && (
                        <p className="mt-2 text-gray-400 text-sm">
                          {challenge.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(challenge)}
                        className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(challenge.id)}
                        className="bg-red-900 hover:bg-red-800 px-3 py-2 rounded-lg text-sm flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}
      {activeTab === "users" && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">إدارة المستخدمين</h2>
          </div>

          {showUserForm && editingUser && (
            <div className="bg-gray-900 p-6 rounded-xl mb-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">تعديل المستخدم</h3>
                <button
                  onClick={handleCancelUser}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    الاسم
                  </label>
                  <input
                    type="text"
                    defaultValue={editingUser.name}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    defaultValue={editingUser.email}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    الدور
                  </label>
                  <select
                    defaultValue={editingUser.role}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as "admin" | "user",
                      })
                    }
                  >
                    <option value="user">مستخدم</option>
                    <option value="admin">مشرف</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    النقاط
                  </label>
                  <input
                    type="number"
                    defaultValue={editingUser.points}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        points: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={handleCancelUser}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => handleUserSubmit(editingUser)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                  >
                    حفظ التعديلات
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <div className="grid grid-cols-5 p-4 bg-gray-800 font-medium">
              <div>الاسم</div>
              <div>البريد الإلكتروني</div>
              <div>الدور</div>
              <div>النقاط</div>
              <div>الإجراءات</div>
            </div>

            <div className="divide-y divide-gray-800">
              {users.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    لا يوجد مستخدمين مسجلين حتى الآن
                  </p>
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-5 p-4 hover:bg-gray-850 items-center"
                  >
                    <div className="truncate">{user.name}</div>
                    <div className="truncate text-blue-400">{user.email}</div>
                    <div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-900 text-purple-300"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {user.role === "admin" ? "مشرف" : "مستخدم"}
                      </span>
                    </div>
                    <div className="text-yellow-400">{user.points} نقطة</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-900 hover:bg-red-800 px-3 py-1 rounded-lg text-sm flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        حذف
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
