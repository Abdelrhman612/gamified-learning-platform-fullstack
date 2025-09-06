"use client";

import { User } from "@/app/lib/user.interface";

interface UserFormModalProps {
  editingUser: User;
  onSubmit: (userData: Partial<User>) => Promise<void>;
  onCancel: () => void;
  setEditingUser: (user: User) => void;
}

export default function UserFormModal({
  editingUser,
  onSubmit,
  onCancel,
  setEditingUser,
}: UserFormModalProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl mb-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">تعديل المستخدم</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">الاسم</label>
          <input
            type="text"
            value={editingUser.name}
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
            value={editingUser.email}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">الدور</label>
          <select
            value={editingUser.role}
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
          <label className="block text-sm font-medium mb-1">النقاط</label>
          <input
            type="number"
            value={editingUser.points}
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
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            إلغاء
          </button>
          <button
            onClick={() => onSubmit(editingUser)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  );
}
