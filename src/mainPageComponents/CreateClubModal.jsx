import React, { useState } from "react";
import { useAuth } from "../login/AuthContext";
import { getAllowCreatingClub } from "../admin/AdminPage";

export default function CreateClubModal({ isOpen, onClose, onSubmitRequest }) {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    explanation: "",
    goal: "",
    maximumMember: 15,
    whatDayOfWeek: [],
    fromWhatTime: "16:00",
    untilWhatTime: "18:00",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const allowCreating = getAllowCreatingClub();

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      whatDayOfWeek: prev.whatDayOfWeek.includes(day)
        ? prev.whatDayOfWeek.filter((d) => d !== day)
        : [...prev.whatDayOfWeek, day],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.goal.trim() || formData.whatDayOfWeek.length === 0) return;

    const parseTime = (timeStr) => {
      const [h, m] = timeStr.split(":").map(Number);
      return [h || 0, m || 0];
    };

    const request = {
      id: `req_${Date.now()}`,
      clubName: formData.name.trim(),
      explanation: formData.explanation.trim(),
      goal: formData.goal.trim(),
      maximumMember: Number(formData.maximumMember),
      whatDayOfWeek: formData.whatDayOfWeek,
      fromWhatTime: parseTime(formData.fromWhatTime),
      untilWhatTime: parseTime(formData.untilWhatTime),
      requestedBy: user?.name || "Unknown",
      requestedById: user?.id || "unknown",
      requestedAt: new Date().toISOString(),
      status: "pending",
    };

    onSubmitRequest(request);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      explanation: "",
      goal: "",
      maximumMember: 15,
      whatDayOfWeek: [],
      fromWhatTime: "16:00",
      untilWhatTime: "18:00",
    });
    onClose();
  };

  const days = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className="relative w-[92%] max-w-lg max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl bg-gray-800/95 backdrop-blur-md p-5 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isAuthenticated ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">Нэвтрэх шаардлагатай</h2>
            <p className="text-gray-400 text-sm">Клуб нээх хүсэлт илгээхийн тулд эхлээд нэвтэрнэ үү.</p>
          </div>
        ) : !allowCreating ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">Клуб нээх боломжгүй</h2>
            <p className="text-gray-400 text-sm">Одоогоор клуб үүсгэх нь хаалттай байна. Админтай холбогдоно уу.</p>
          </div>
        ) : submitted ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-[#ff9f1c] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">Хүсэлт илгээгдлээ</h2>
            <p className="text-gray-400 text-sm">Таны клуб нээх хүсэлт админд илгээгдлээ. Хүлээнэ үү.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6 pr-8">
              Клуб нээх хүсэлт
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Клубын нэр
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Жишээ: Програмчлалын клуб"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Тайлбар
                </label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  placeholder="Клубын тухай товч тайлбар"
                  rows={3}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Зорилго
                </label>
                <input
                  type="text"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="Клубын зорилго"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Гишүүдийн дээд хязгаар
                </label>
                <input
                  type="number"
                  min={5}
                  max={50}
                  value={formData.maximumMember}
                  onChange={(e) => setFormData({ ...formData, maximumMember: e.target.value })}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Хичээллэх өдрүүд
                </label>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        formData.whatDayOfWeek.includes(day)
                          ? "bg-[#d07900] text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Эхлэх цаг
                  </label>
                  <input
                    type="time"
                    value={formData.fromWhatTime}
                    onChange={(e) => setFormData({ ...formData, fromWhatTime: e.target.value })}
                    className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Дуусах цаг
                  </label>
                  <input
                    type="time"
                    value={formData.untilWhatTime}
                    onChange={(e) => setFormData({ ...formData, untilWhatTime: e.target.value })}
                    className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.name.trim() || !formData.goal.trim() || formData.whatDayOfWeek.length === 0}
                className="w-full rounded-lg bg-[#d07900] py-3 hover:bg-[#ff9f1c] transition text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                Хүсэлт илгээх
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
