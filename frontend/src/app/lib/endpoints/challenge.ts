import axios from "axios";
import { challengesUrl, meUrl, userUrl } from "../api";
import { Challenge } from "../../challenges/interface.challenges";
import { User } from "../../dashboard/interface.user";

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  const res = await axios.get(userUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const GetMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(meUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const Logout = () => {
  localStorage.removeItem("token");
};

export const getChallenges = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(challengesUrl, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return {
    challenges: res.data,
    token,
  };
};
export const getChallengeById = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${challengesUrl}/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return res.data;
};
export const createChallenge = async (data: Challenge) => {
  const res = await axios.post(challengesUrl, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const updateChallenge = async (id: string, data: Challenge) => {
  const res = await axios.patch(`${challengesUrl}/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

// حذف تحدي
export const deleteChallenge = async (id: string) => {
  const res = await axios.delete(`${challengesUrl}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};
