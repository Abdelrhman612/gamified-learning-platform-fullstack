import Link from "next/link";
import { Challenge } from "../challenges/interface.challenges";

export default function ChallengeCard({
  id,
  title,
  description,
  type,
  startAt,
  endAt,
  points,
  participantsCount,
}: Challenge) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "frontend":
        return "bg-blue-100 text-blue-800";
      case "backend":
        return "bg-green-100 text-green-800";
      case "fullstack":
        return "bg-purple-100 text-purple-800";
      case "ui/ux":
        return "bg-pink-100 text-pink-800";
      case "mobile":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link href={`/challenges/${id}`}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 space-y-4 transform hover:-translate-y-1">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
              type
            )}`}
          >
            {type}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
            {points} نقطة
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {new Date(startAt as string).toLocaleDateString("ar-SA")} -{" "}
            {new Date(endAt as string).toLocaleDateString("ar-SA")}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{participantsCount} مشارك</span>
          </div>

          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            ابدأ التحدي →
          </span>
        </div>
      </div>
    </Link>
  );
}
