import { Challenge } from "@/app/challenges/interface.challenges";
import Link from "next/link";

interface ChallengeCardProps {
  challenge: Challenge;
  onEdit: (challenge: Challenge) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function ChallengeCard({
  challenge,
  onEdit,
  onDelete,
}: ChallengeCardProps) {
  return (
    <div
      key={challenge.id}
      className="bg-gray-900 p-4 rounded-xl border border-gray-800"
    >
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{challenge.title}</h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                challenge.type === "daily"
                  ? "bg-green-900 text-green-300"
                  : "bg-purple-900 text-purple-300"
              }`}
            >
              {challenge.type === "daily" ? "يومي" : "أسبوعي"}
            </span>
            <span className="bg-yellow-900 text-yellow-300 px-2 py-1 text-xs rounded-full">
              {challenge.points} نقاط
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
            <div>
              <span className="text-gray-500">البداية: </span>
              {new Date(challenge.startAt as string).toLocaleString("ar-SA")}
            </div>
            <div>
              <span className="text-gray-500">النهاية: </span>
              {new Date(challenge.endAt as string).toLocaleString("ar-SA")}
            </div>
          </div>

          {challenge.description && (
            <p className="mt-2 text-gray-400 text-sm">
              {challenge.description}
            </p>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onEdit(challenge)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            تعديل
          </button>
          <button
            onClick={() => onDelete(challenge.id)}
            className="bg-red-900 hover:bg-red-800 px-3 py-2 rounded-lg text-sm flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            حذف
          </button>
          <Link
            className="bg-green-700 hover:bg-green-800 px-3 py-2 rounded-lg text-sm flex items-center"
            href={`/challenges-participations/${challenge.id}/participations`}
          >
            <button>المشاركات</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
