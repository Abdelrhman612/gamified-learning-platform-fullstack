import axios from "axios";
import { challengesUrl, meUrl, signInUrl, signUpUrl } from "./api";
import { SignInData, SignUpData } from "./endpoints.interface";

export const SignIn = async ({ email, password }: SignInData) => {
  const res = await axios.post(signInUrl, { email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
};
export const SignUp = async ({ name, email, password }: SignUpData) => {
  const res = await axios.post(signUpUrl, { name, email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
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
