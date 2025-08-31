"use client";
import { useEffect, useState } from "react";
import { getChallenges } from "../lib/endpoints/challenge";
import ChallengeCard from "../components/ChallengeCard";
import { Challenge } from "./interface.challenges";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getChallenges();

        setChallenges(data.challenges);
      } catch (err) {
        console.error("❌ فشل جلب التحديات", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        ⏳ جاري التحميل...
      </div>
    );

  if (challenges.length === 0)
    return <div className="p-6 text-white">⚠️ لا يوجد تحديات متاحة حالياً</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">🧩 جميع التحديات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
    </div>
  );
}
