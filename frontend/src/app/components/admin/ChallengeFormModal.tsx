"use client";
import { Challenge } from "@/app/challenges/interface.challenges";
import { ChallengeForm } from "@/app/components/ChallengeForm";

interface ChallengeFormModalProps {
  editingChallenge: Challenge | null;
  onSubmit: (data: Partial<Challenge>) => Promise<void>;
  onCancel: () => void;
}

export default function ChallengeFormModal({
  editingChallenge,
  onSubmit,
  onCancel,
}: ChallengeFormModalProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl mb-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">
          {editingChallenge ? "تعديل التحدي" : "إضافة تحدي جديد"}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
      <ChallengeForm
        initialData={editingChallenge}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
}
