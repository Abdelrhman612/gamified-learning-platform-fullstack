import axios from "axios";
import { geminiUrl } from "../api";

export const sendMessageToGemini = async (
  prompt: string,
  sessionId?: string
) => {
  const res = await axios.post(
    geminiUrl,
    { prompt, sessionId },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return res.data;
};
