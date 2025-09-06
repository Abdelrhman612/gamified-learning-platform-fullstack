import { User } from "@/app/lib/user.interface";
import axios from "axios";
import { userUrl } from "../api";

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  const res = await axios.get(userUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${userUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUser = async (id: string, data: User) => {
  const { name, email, role, points } = data;
  const dataToSend = { name, email, role, points };
  const res = await axios.patch(`${userUrl}/${id}`, dataToSend, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${userUrl}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};
