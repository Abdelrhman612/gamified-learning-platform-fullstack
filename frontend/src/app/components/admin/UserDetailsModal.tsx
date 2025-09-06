"use client";

import { User } from "@/app/lib/user.interface";

interface UserDetailsModalProps {
  viewingUser: User;
  onClose: () => void;
  onEditUser: (user: User) => void;
}

export default function UserDetailsModal({
  viewingUser,
  onClose,
  onEditUser,
}: UserDetailsModalProps) {
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
        className={`w-20 h-20 ${randomColor} rounded-full flex items-center justify-center text-2xl font-bold text-white`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl mb-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">تفاصيل المستخدم</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">{getAvatarUrl(viewingUser.name)}</div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">الاسم</p>
            <p className="font-medium">{viewingUser.name}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">البريد الإلكتروني</p>
            <p className="font-medium text-blue-400">{viewingUser.email}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">الدور</p>
            <span
              className={`px-2 py-1 rounded text-xs ${
                viewingUser.role === "admin"
                  ? "bg-purple-900/40 text-purple-300"
                  : "bg-blue-900/40 text-blue-300"
              }`}
            >
              {viewingUser.role === "admin" ? "مشرف" : "مستخدم"}
            </span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">النقاط</p>
            <p className="font-medium text-yellow-400">
              {viewingUser.points} نقطة
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg md:col-span-2">
            <p className="text-gray-400 text-sm">معرف المستخدم</p>
            <p className="font-medium text-gray-300">{viewingUser.id}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={() => {
            onClose();
            onEditUser(viewingUser);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          تعديل المستخدم
        </button>
      </div>
    </div>
  );
}
