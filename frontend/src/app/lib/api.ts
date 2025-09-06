import { config } from "@/config";

export const signInUrl = `${config.apiUrl}/auth/sign-in`;
export const signUpUrl = `${config.apiUrl}/auth/sign-up`;
export const getHubCallbackurl = `${config.apiUrl}/auth/github/callback`;
export const userUrl = `${config.apiUrl}/user`;
export const meUrl = `${config.apiUrl}/auth/me`;
export const challengesUrl = `${config.apiUrl}/challenges`;
export const participationsUrl = `${config.apiUrl}/challenges-participations`;
export const geminiUrl = `${config.apiUrl}/gemini`;
