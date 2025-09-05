/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@/app/dashboard/interface.user";
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
  const { id: _ignore, ...updateData } = data;
  const res = await axios.patch(`${userUrl}/${id}`, updateData, {
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
