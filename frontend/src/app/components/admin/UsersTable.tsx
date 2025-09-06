import { User } from "@/app/lib/user.interface";

interface UsersTableProps {
  users: User[];
  onViewUser: (id: string) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

export default function UsersTable({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser,
}: UsersTableProps) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
      <div className="grid grid-cols-6 p-4 bg-gray-800 font-medium">
        <div>الاسم</div>
        <div>البريد الإلكتروني</div>
        <div>الدور</div>
        <div>النقاط</div>
        <div>الحالة</div>
        <div>الإجراءات</div>
      </div>

      <div className="divide-y divide-gray-800">
        {users.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">لا يوجد مستخدمين مسجلين حتى الآن</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-6 p-4 hover:bg-gray-850 items-center"
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
              <div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-300">
                  نشط
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onViewUser(user.id)}
                  className="bg-blue-900 hover:bg-blue-800 px-3 py-1 rounded-lg text-sm flex items-center"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  عرض
                </button>
                <button
                  onClick={() => onEditUser(user)}
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
                  onClick={() => onDeleteUser(user.id)}
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
  );
}
