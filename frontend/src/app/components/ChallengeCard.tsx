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
  return (
    <Link href={`/challenges/${id}`}>
      <div className="bg-black border border-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-800 transition space-y-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>

        <div className="flex gap-2 text-xs text-gray-400">
          <span className="px-2 py-1 rounded bg-gray-700">{type}</span>
          <span className="px-2 py-1 rounded bg-gray-700">{points} نقطة</span>
        </div>

        <div className="text-xs text-gray-500">
          📅 {new Date(startAt as string).toLocaleDateString()} -{" "}
          {new Date(endAt as string).toLocaleDateString()}
        </div>

        <div className="text-xs text-gray-400">
          👥 {participantsCount} مشارك
        </div>
      </div>
    </Link>
  );
}
