"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getChallengeById } from "@/app/lib/endpoints/challenge";
import { Challenge } from "../interface.challenges";
import { participateInChallenge } from "@/app/lib/endpoints/participations";

export default function ChallengeDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("يجب تسجيل الدخول أولاً");
      router.push("/login"); // توجيه المستخدم إلى صفحة تسجيل الدخول
      return;
    }

    if (!submission && !submissionUrl) {
      alert("يرجى تقديم حل نصي أو رابط للحل");
      return;
    }

    setIsSubmitting(true);
    try {
      await participateInChallenge(id, {
        userId,
        submission,
        submissionUrl,
      });
      alert("✅ تم إرسال الحل بنجاح");

      setChallenge((prev) =>
        prev
          ? { ...prev, participantsCount: (prev.participantsCount ?? 0) + 1 }
          : prev
      );

      setSubmission("");
      setSubmissionUrl("");
    } catch (err) {
      console.error("❌ فشل إرسال الحل", err);
      alert("❌ فشل إرسال الحل، يرجى المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>⏳ جاري تحميل بيانات التحدي...</p>
        </div>
      </div>
    );

  if (!challenge)
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">⚠️</p>
          <p>التحدي غير موجود أو تم حذفه</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            العودة للخلف
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-400 hover:text-white mb-4"
      >
        <svg
          className="w-5 h-5 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        العودة
      </button>

      <h1 className="text-3xl font-bold">{challenge.title}</h1>
      <p className="text-gray-300 text-lg">{challenge.description}</p>

      <div className="flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1 rounded bg-gray-800">{challenge.type}</span>
        <span className="px-3 py-1 rounded bg-blue-900">
          {challenge.points} نقطة
        </span>
        <span className="px-3 py-1 rounded bg-green-900">
          👥 {challenge.participantsCount} مشارك
        </span>
      </div>

      <div className="text-gray-400 text-sm">
        <div className="flex items-center mb-1">
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          يبدأ: {new Date(challenge.startAt as string).toLocaleString()}
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          ينتهي: {new Date(challenge.endAt as string).toLocaleString()}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-800 p-6 rounded-lg"
      >
        <h2 className="text-xl font-semibold">تقديم الحل</h2>

        <div>
          <label className="block text-gray-300 mb-1">
            الحل النصي (اختياري)
          </label>
          <textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="اكتب الكود أو الحل هنا..."
            rows={5}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">
            رابط الحل (اختياري)
          </label>
          <input
            type="url"
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="مثال: https://github.com/username/solution"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || (!submission && !submissionUrl)}
          className={`px-6 py-3 rounded-lg text-white font-medium ${
            isSubmitting || (!submission && !submissionUrl)
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              جاري الإرسال...
            </span>
          ) : (
            "إرسال الحل"
          )}
        </button>

        {!userId && (
          <p className="text-yellow-400 text-sm">
            ملاحظة: يجب تسجيل الدخول قبل إرسال الحل
          </p>
        )}
      </form>
    </div>
  );
}
