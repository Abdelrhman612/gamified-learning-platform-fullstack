"use client";
import { useState, useEffect } from "react";
import { Challenge } from "../challenges/interface.challenges";

interface ChallengeFormProps {
  initialData?: Challenge | null;
  onSubmit: (data: Challenge) => void;
  onCancel?: () => void;
}

export const ChallengeForm: React.FC<ChallengeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [points, setPoints] = useState(0);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setType(initialData.type);
      setPoints(initialData.points);

      if (initialData.startAt) {
        const startDate = new Date(initialData.startAt);
        setStartAt(startDate.toISOString().slice(0, 16));
      }

      if (initialData.endAt) {
        const endDate = new Date(initialData.endAt);
        setEndAt(endDate.toISOString().slice(0, 16));
      }
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    const challengeData = {
      title,
      description,
      type,
      points,
      startAt: new Date(startAt).toISOString(),
      endAt: new Date(endAt).toISOString(),
    } as Challenge;

    onSubmit(challengeData);

    
    if (!initialData) {
      setTitle("");
      setDescription("");
      setType("");
      setPoints(0);
      setStartAt("");
      setEndAt("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl border border-gray-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-400 mb-2">عنوان التحدي</label>
          <input
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="أدخل عنوان التحدي"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">نوع التحدي</label>
          <select
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">اختر نوع التحدي</option>
            <option value="daily">تحدي يومي</option>
            <option value="weekly">تحدي أسبوعي</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 mb-2">وصف التحدي</label>
        <textarea
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
          placeholder="أدخل وصف التحدي"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-400 mb-2">عدد النقاط</label>
          <input
            type="number"
            min="0"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="عدد النقاط"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">تاريخ البداية</label>
          <input
            type="datetime-local"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">تاريخ النهاية</label>
          <input
            type="datetime-local"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            إلغاء
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          {initialData ? "تحديث التحدي" : "إضافة تحدي"}
        </button>
      </div>
    </form>
  );
};
