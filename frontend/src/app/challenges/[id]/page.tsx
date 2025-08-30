"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getChallengeById } from "@/app/lib/endpoints";
import { Challenge } from "../interface.challenges";

export default function ChallengeDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data = await getChallengeById(id);
        setChallenge(data);
      } catch (err) {
        console.error("❌ فشل جلب بيانات التحدي", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchChallenge();
  }, [id]);

  if (loading) return <p className="p-6">⏳ جاري التحميل...</p>;
  if (!challenge) return <p className="p-6">⚠️ التحدي غير موجود</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">{challenge.title}</h1>
      <p className="text-gray-300">{challenge.description}</p>

      <div className="flex gap-2 text-sm">
        <span className="px-3 py-1 rounded bg-gray-800">{challenge.type}</span>
        <span className="px-3 py-1 rounded bg-gray-800">
          {challenge.points} نقطة
        </span>
      </div>

      <div className="text-gray-400 text-sm">
        📅 {new Date(challenge.startAt).toLocaleString()} →{" "}
        {new Date(challenge.endAt).toLocaleString()}
      </div>

      <div className="text-gray-400">
        👥 {challenge.participantsCount} مشارك
      </div>
    </div>
  );
}
