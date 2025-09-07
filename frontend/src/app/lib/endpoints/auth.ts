import axios from "axios";
import { meUrl, signInUrl, signUpUrl } from "../api";
import { SignInData, SignUpData } from "../auth.interface";

export const SignIn = async ({ email, password }: SignInData) => {
  const res = await axios.post(signInUrl, { email, password });
  const token = res.data.token;
  const userId = res.data.id;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  return {
    token,
    userId,
  };
};
export const SignUp = async ({ name, email, password }: SignUpData) => {
  try {
    const res = await axios.post(signUpUrl, { name, email, password });

    if (res.data && res.data.token) {
      const token = res.data.token;
      localStorage.setItem("token", token);
      return token;
    } else {
      throw new Error("No token received from server");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Registration failed");
    } else if (error instanceof axios.AxiosError) {
      throw new Error("No response from server. Check your connection.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const GetMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(meUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
