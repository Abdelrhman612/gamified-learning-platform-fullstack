import axios from "axios";
import { participationsUrl } from "../api";
import { ParticipationData } from "../participations.intrface";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// ✅ 1. User participate in a challenge
export const participateInChallenge = async (
  challengeId: string,
  participationData: ParticipationData
) => {
  const res = await axios.post(
    `${participationsUrl}/${challengeId}/participate`,
    participationData,
    { headers: getAuthHeaders() }
  );
  localStorage.getItem("userId");
  return res.data;
};

// ✅ 2. Get all participations in a challenge (admin only)
export const getParticipationsByChallenge = async (challengeId: string) => {
  const res = await axios.get(
    `${participationsUrl}/${challengeId}/participations`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// ✅ 3. Get all participations of a user
export const getParticipationsByUser = async (userId: string) => {
  const res = await axios.get(
    `${participationsUrl}/users/${userId}/participations`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// ✅ 4. Update a participation (admin only)
export const updateParticipation = async (
  participationId: string,
  updateData: Partial<ParticipationData> // 👈 update غالبًا مش هيتطلب كل الفيلدز
) => {
  const res = await axios.patch(
    `${participationsUrl}/participations/${participationId}`,
    updateData,
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// ✅ 5. Get a single participation by ID (admin only)
export const getParticipationById = async (participationId: string) => {
  const res = await axios.get(
    `${participationsUrl}/participations/${participationId}`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};
