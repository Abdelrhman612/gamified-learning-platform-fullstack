import axios from "axios";
import { signInUrl, signUpUrl } from "../api";
import { SignInData, SignUpData } from "../endpoints.interface";

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
  const res = await axios.post(signUpUrl, { name, email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
};
