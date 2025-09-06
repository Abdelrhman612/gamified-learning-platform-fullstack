import axios from "axios";
import { challengesUrl } from "../api";
import { Challenge } from "../../challenges/interface.challenges";

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
  const { title, description, type, points, startAt, endAt } = data;
  const dataToSend = { title, description, type, points, startAt, endAt };
  const res = await axios.post(challengesUrl, dataToSend, {
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

export const deleteChallenge = async (id: string) => {
  const res = await axios.delete(`${challengesUrl}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};
