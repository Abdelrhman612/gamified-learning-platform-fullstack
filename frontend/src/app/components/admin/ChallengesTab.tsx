"use client";
import { useState } from "react";
import { Challenge } from "@/app/challenges/interface.challenges";
import ChallengeCard from "./ChallengeCard";
import ChallengeFormModal from "./ChallengeFormModal";

interface ChallengesTabProps {
  challenges: Challenge[];
  onCreateChallenge: (data: Partial<Challenge>) => Promise<void>;
  onUpdateChallenge: (id: string, data: Partial<Challenge>) => Promise<void>;
  onDeleteChallenge: (id: string) => Promise<void>;
}

export default function ChallengesTab({
  challenges,
  onCreateChallenge,
  onUpdateChallenge,
  onDeleteChallenge,
}: ChallengesTabProps) {
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Partial<Challenge>) => {
    if (editingChallenge) {
      await onUpdateChallenge(editingChallenge.id, data);
      setEditingChallenge(null);
    } else {
      await onCreateChallenge(data);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingChallenge(null);
    setShowForm(false);
  };

  const handleEdit = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setShowForm(true);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">إدارة التحديات</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center"
          >
            <span>+ إضافة تحدي جديد</span>
          </button>
        )}
      </div>

      {showForm && (
        <ChallengeFormModal
          editingChallenge={editingChallenge}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="grid gap-4">
        {challenges.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-xl">
            <p className="text-gray-400">لا توجد تحديات مضافة حتى الآن</p>
          </div>
        ) : (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onEdit={handleEdit}
              onDelete={onDeleteChallenge}
            />
          ))
        )}
      </div>
    </section>
  );
}
