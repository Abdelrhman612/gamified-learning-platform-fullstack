"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getParticipationsByChallenge } from "@/app/lib/endpoints/participations";

interface Participation {
  id: string;
  submission: string;
  submissionUrl: string;
  awardedPoints: number;
  user: {
    name: string;
    email: string;
  };
  challenge: {
    title: string;
    points: number;
  };
}

export default function ChallengeParticipationsPage() {
  const { id } = useParams();
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await getParticipationsByChallenge(id as string);
        setParticipations(data);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">جاري التحميل...</div>
      </div>
    );

  if (error)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
        المشاركات في التحدي
      </h1>

      {participations.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-xl text-center shadow-lg">
          <p className="text-gray-400 text-lg">
            لا توجد مشاركات لهذا التحدي بعد.
          </p>
        </div>
      ) : (
        <>
          {/* 👇 عنوان التحدي */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white">
              {participations[0].challenge.title}
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900 text-blue-200">
                  <th className="p-4 text-right border-b border-blue-700">
                    المستخدم
                  </th>
                  <th className="p-4 text-right border-b border-blue-700">
                    البريد الإلكتروني
                  </th>
                  <th className="p-4 text-right border-b border-blue-700">
                    التسليم
                  </th>
                  <th className="p-4 text-right border-b border-blue-700">
                    النقاط الممنوحة
                  </th>
                  <th className="p-4 text-right border-b border-blue-700">
                    نقاط التحدي
                  </th>
                </tr>
              </thead>
              <tbody>
                {participations.map((p, index) => (
                  <tr
                    key={p.id}
                    className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}
                  >
                    <td className="p-4 border-b border-gray-700">
                      {p.user.name}
                    </td>
                    <td className="p-4 border-b border-gray-700">
                      {p.user.email}
                    </td>
                    <td className="p-4 border-b border-gray-700">
                      {p.submission ? (
                        p.submission
                      ) : p.submissionUrl ? (
                        <a
                          href={p.submissionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                          عرض التسليم
                        </a>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="p-4 border-b border-gray-700">
                      {p.awardedPoints}
                    </td>
                    <td className="p-4 border-b border-gray-700">
                      {p.challenge.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
