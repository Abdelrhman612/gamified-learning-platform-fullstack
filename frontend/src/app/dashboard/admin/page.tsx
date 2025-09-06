"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../lib/user.interface";
import { Challenge } from "@/app/challenges/interface.challenges";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  updateChallenge,
} from "@/app/lib/endpoints/challenge";
import {
  deleteUser,
  getUsers,
  updateUser,
  getUserById,
} from "@/app/lib/endpoints/user";
import ChallengesTab from "@/app/components/admin/ChallengesTab";
import UsersTab from "@/app/components/admin/UsersTab";
import Link from "next/link";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "challenges">(
    "challenges"
  );

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

  const handleCreateChallenge = async (data: Partial<Challenge>) => {
    try {
      await createChallenge(data as Challenge);
      const updatedChallenges = await getChallenges();
      setChallenges(updatedChallenges.challenges);
      alert("✅ تم إضافة التحدي بنجاح");
    } catch (err) {
      console.error("❌ فشل الإضافة", err);
      alert("حدث خطأ أثناء حفظ التحدي، تحقق من البيانات وحاول مرة أخرى.");
      throw err;
    }
  };

  const handleUpdateChallenge = async (
    id: string,
    data: Partial<Challenge>
  ) => {
    try {
      await updateChallenge(id, data as Challenge);
      const updatedChallenges = await getChallenges();
      setChallenges(updatedChallenges.challenges);
      alert("✅ تم تعديل التحدي بنجاح");
    } catch (err) {
      console.error("❌ فشل التعديل", err);
      alert("حدث خطأ أثناء تعديل التحدي، تحقق من البيانات وحاول مرة أخرى.");
      throw err;
    }
  };

  const handleDeleteChallenge = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا التحدي؟")) return;
    try {
      await deleteChallenge(id);
      setChallenges(challenges.filter((c) => c.id !== id));
      alert("✅ تم حذف التحدي بنجاح");
    } catch (err) {
      console.error("❌ فشل الحذف", err);
      alert("حدث خطأ أثناء حذف التحدي.");
      throw err;
    }
  };

  const handleUpdateUser = async (id: string, data: Partial<User>) => {
    try {
      await updateUser(id, data as User);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      alert("✅ تم تعديل المستخدم بنجاح");
    } catch (err) {
      console.error("❌ فشل تعديل المستخدم", err);
      alert("حدث خطأ أثناء تعديل المستخدم، تحقق من البيانات وحاول مرة أخرى.");
      throw err;
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
      throw err;
    }
  };

  const handleViewUser = async (id: string) => {
    try {
      return await getUserById(id);
    } catch (err) {
      console.error("❌ فشل جلب بيانات المستخدم", err);
      alert("حدث خطأ أثناء جلب بيانات المستخدم.");
      throw err;
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
        <h1 className="text-3xl font-bold">لوحة تحكم المشرف</h1>
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
        <Link
          href="/leaderboard"
          className="py-3 px-6 font-medium text-gray-400"
        >
          لوحة الصدارة
        </Link>
      </div>

      {activeTab === "challenges" && (
        <ChallengesTab
          challenges={challenges}
          onCreateChallenge={handleCreateChallenge}
          onUpdateChallenge={handleUpdateChallenge}
          onDeleteChallenge={handleDeleteChallenge}
        />
      )}

      {activeTab === "users" && (
        <UsersTab
          users={users}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          onViewUser={handleViewUser}
        />
      )}
    </div>
  );
}
