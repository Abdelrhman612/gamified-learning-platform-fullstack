"use client";
import { useState } from "react";

import UserDetailsModal from "./UserDetailsModal";
import { User } from "@/app/dashboard/interface.user";
import UserFormModal from "./UserFormModal";
import UsersTable from "./UsersTable";

interface UsersTabProps {
  id: string;
  users: User[];
  onUpdateUser: (id: string, data: Partial<User>) => Promise<void>;
  onDeleteUser: (id: string) => Promise<void>;
  onViewUser: (id: string) => Promise<User>;
}

export default function UsersTab({
  id,
  users,
  onUpdateUser,
  onDeleteUser,
  onViewUser,
}: UsersTabProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleUserSubmit = async (userData: Partial<User>) => {
    if (editingUser) {
      await onUpdateUser(id, userData);
      setEditingUser(null);
      setShowUserForm(false);
    }
  };

  const handleCancelUser = () => {
    setEditingUser(null);
    setShowUserForm(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleViewUser = async (id: string) => {
    try {
      const user = await onViewUser(id);
      setViewingUser(user);
      setShowUserDetails(true);
    } catch (err) {
      console.error("❌ فشل جلب بيانات المستخدم", err);
      alert("حدث خطأ أثناء جلب بيانات المستخدم.");
    }
  };

  const handleCloseUserDetails = () => {
    setViewingUser(null);
    setShowUserDetails(false);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">إدارة المستخدمين</h2>
      </div>

      {showUserForm && editingUser && (
        <UserFormModal
          editingUser={editingUser}
          onSubmit={handleUserSubmit}
          onCancel={handleCancelUser}
          setEditingUser={setEditingUser}
        />
      )}

      {showUserDetails && viewingUser && (
        <UserDetailsModal
          viewingUser={viewingUser}
          onClose={handleCloseUserDetails}
          onEditUser={handleEditUser}
        />
      )}

      <UsersTable
        users={users}
        onViewUser={handleViewUser}
        onEditUser={handleEditUser}
        onDeleteUser={onDeleteUser}
      />
    </section>
  );
}
