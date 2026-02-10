import React, { useState } from "react";
import Navbar from "../mainPageComponents/Navbar";
import Login from "../login/Login";
import { useAuth } from "../login/AuthContext";
import { getTypeFromId } from "../assets/filters.js";

const EditButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-1.5 rounded-lg text-gray-400 hover:text-[#ff9f1c] hover:bg-white/10 transition-colors"
    aria-label="Edit"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  </button>
);

const MainClubPage = ({ club, onBack, onAdminClick, onClubUpdate }) => {
  const { user } = useAuth();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [clubData, setClubData] = useState(club);
  const [editingField, setEditingField] = useState(null);
  const [pendingMemberIds, setPendingMemberIds] = useState(club.pendingMemberIds || []);
  const [newMemberId, setNewMemberId] = useState("");
  const [newPendingId, setNewPendingId] = useState("");
  const [activeTab, setActiveTab] = useState("info");

  const isLeader = user?.id === club.leaderId;

  const formatTime = ([hour, minute]) =>
    `${hour}:${minute.toString().padStart(2, "0")}`;

  const handleSave = (field, value) => {
    const updates = { [field]: value };
    setClubData((prev) => ({ ...prev, ...updates }));
    onClubUpdate?.(club.id, updates);
    setEditingField(null);
  };

  const handleAddMember = () => {
    const id = newMemberId.trim();
    if (!id || clubData.memberIds.includes(id)) return;
    if (clubData.memberIds.length >= clubData.maximumMember) return;
    const newMemberIds = [...clubData.memberIds, id];
    setClubData((prev) => ({ ...prev, memberIds: newMemberIds }));
    onClubUpdate?.(club.id, { memberIds: newMemberIds });
    setNewMemberId("");
  };

  const handleAddToPending = () => {
    const id = newPendingId.trim();
    if (!id || pendingMemberIds.includes(id) || clubData.memberIds.includes(id)) return;
    const newPending = [...pendingMemberIds, id];
    setPendingMemberIds(newPending);
    onClubUpdate?.(club.id, { pendingMemberIds: newPending });
    setNewPendingId("");
  };

  const handleAcceptMember = (memberId) => {
    if (clubData.memberIds.length >= clubData.maximumMember) return;
    const newMemberIds = [...clubData.memberIds, memberId];
    const newPending = pendingMemberIds.filter((id) => id !== memberId);
    setClubData((prev) => ({ ...prev, memberIds: newMemberIds }));
    setPendingMemberIds(newPending);
    onClubUpdate?.(club.id, { memberIds: newMemberIds, pendingMemberIds: newPending });
  };

  const handleRejectMember = (memberId) => {
    const newPending = pendingMemberIds.filter((id) => id !== memberId);
    setPendingMemberIds(newPending);
    onClubUpdate?.(club.id, { pendingMemberIds: newPending });
  };

  const handleRemoveMember = (memberId) => {
    if (memberId === clubData.leaderId) return;
    const newMemberIds = clubData.memberIds.filter((id) => id !== memberId);
    setClubData((prev) => ({ ...prev, memberIds: newMemberIds }));
    onClubUpdate?.(club.id, { memberIds: newMemberIds });
  };

  if (!club) return null;

  const clubType = getTypeFromId(club.id);

  return (
    <div className="w-full h-full relative flex flex-row mx-auto">
      <Navbar
        isOpen={isNavbarOpen}
        onClose={() => setIsNavbarOpen(false)}
        onLoginClick={() => setIsLoginOpen(true)}
        onAdminClick={onAdminClick}
      />

      <main className="flex flex-col w-full h-full relative z-10">
        <button
          onClick={() => setIsNavbarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#d07900] hover:bg-[#ff9f1c] text-white transition-colors shadow-lg"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button
          onClick={onBack}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Буцах
        </button>

        <div className="h-full px-3 sm:px-5 pt-14 sm:pt-6 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <img src={clubData.image} alt={clubData.name} className="w-full h-40 sm:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6" />
              <h1 className="text-2xl sm:text-3xl font-bold">{clubData.name}</h1>
              {clubType && (
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#d07900]/30 text-[#ff9f1c] text-sm capitalize">
                  {clubType}
                </span>
              )}
            </div>

            {/* Tabs: Info and (for leader) Member Management */}
            <div className="flex gap-4 mb-6 border-b border-gray-600">
              <button
                onClick={() => setActiveTab("info")}
                className={`pb-2 px-1 font-medium transition-colors ${
                  activeTab === "info" ? "text-[#ff9f1c] border-b-2 border-[#ff9f1c]" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Клубийн мэдээлэл
              </button>
              {isLeader && (
                <button
                  onClick={() => setActiveTab("members")}
                  className={`pb-2 px-1 font-medium transition-colors ${
                    activeTab === "members" ? "text-[#ff9f1c] border-b-2 border-[#ff9f1c]" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Гишүүдийн менежмент
                  {pendingMemberIds.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-[#ff9f1c] text-black rounded-full">
                      {pendingMemberIds.length}
                    </span>
                  )}
                </button>
              )}
            </div>

            {activeTab === "info" && (
              <div className="space-y-6">
                {/* About */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">Тухай</h2>
                    {isLeader && (
                      editingField === "explanation" ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("explanation", document.getElementById("edit-explanation")?.value || clubData.explanation)} className="text-sm text-[#ff9f1c]">Хадгалах</button>
                          <button onClick={() => setEditingField(null)} className="text-sm text-gray-400">Цуцлах</button>
                        </div>
                      ) : (
                        <EditButton onClick={() => setEditingField("explanation")} />
                      )
                    )}
                  </div>
                  {editingField === "explanation" ? (
                    <textarea
                      id="edit-explanation"
                      defaultValue={clubData.explanation}
                      className="w-full rounded-lg bg-gray-700/50 text-white px-4 py-2 min-h-[100px]"
                    />
                  ) : (
                    <p className="text-gray-300">{clubData.explanation}</p>
                  )}
                </div>

                {/* Goal */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">Зорилго</h2>
                    {isLeader && (
                      editingField === "goal" ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("goal", document.getElementById("edit-goal")?.value || clubData.goal)} className="text-sm text-[#ff9f1c]">Хадгалах</button>
                          <button onClick={() => setEditingField(null)} className="text-sm text-gray-400">Цуцлах</button>
                        </div>
                      ) : (
                        <EditButton onClick={() => setEditingField("goal")} />
                      )
                    )}
                  </div>
                  {editingField === "goal" ? (
                    <textarea
                      id="edit-goal"
                      defaultValue={clubData.goal}
                      className="w-full rounded-lg bg-gray-700/50 text-white px-4 py-2 min-h-[80px]"
                    />
                  ) : (
                    <p className="text-gray-300">{clubData.goal}</p>
                  )}
                </div>

                {/* Schedule */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">Цагийн хуваарь</h2>
                    {isLeader && (
                      editingField === "schedule" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const daysInput = document.getElementById("edit-days")?.value || "";
                              const timeInput = document.getElementById("edit-time")?.value || "";
                              const whatDayOfWeek = daysInput.split(",").map((d) => d.trim()).filter(Boolean);
                              const [from, until] = timeInput.split("-").map((t) => t.trim());
                              const parseTime = (s) => {
                                const [h, m] = (s || "0:00").split(":").map(Number);
                                return [h || 0, m || 0];
                              };
                              const updates = {
                                whatDayOfWeek,
                                fromWhatTime: parseTime(from),
                                untilWhatTime: parseTime(until),
                              };
                              setClubData((prev) => ({ ...prev, ...updates }));
                              onClubUpdate?.(club.id, updates);
                              setEditingField(null);
                            }}
                            className="text-sm text-[#ff9f1c]"
                          >
                            Хадгалах
                          </button>
                          <button onClick={() => setEditingField(null)} className="text-sm text-gray-400">Цуцлах</button>
                        </div>
                      ) : (
                        <EditButton onClick={() => setEditingField("schedule")} />
                      )
                    )}
                  </div>
                  {editingField === "schedule" ? (
                    <div className="space-y-2">
                      <input
                        id="edit-days"
                        defaultValue={clubData.whatDayOfWeek.join(", ")}
                        placeholder="Өдрүүд (таслалаар тусгаарласан)"
                        className="w-full rounded-lg bg-gray-700/50 text-white px-4 py-2"
                      />
                      <input
                        id="edit-time"
                        defaultValue={`${formatTime(clubData.fromWhatTime)} - ${formatTime(clubData.untilWhatTime)}`}
                        placeholder="жишээ: 16:00 - 18:00"
                        className="w-full rounded-lg bg-gray-700/50 text-white px-4 py-2"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-300">
                        <span className="font-medium">Хичээллэх өдрүүд:</span> {clubData.whatDayOfWeek.join(", ")}
                      </p>
                      <p className="text-gray-300 mt-1">
                        <span className="font-medium">Хичээллэх цаг:</span> {formatTime(clubData.fromWhatTime)} – {formatTime(clubData.untilWhatTime)}
                      </p>
                    </>
                  )}
                </div>

                {/* Eligibility */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">Зөвшөөрөгдсөн курс/мэргэжил</h2>
                    {isLeader && (
                      editingField === "eligibility" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const yearsInput = document.getElementById("edit-years")?.value || "";
                              const classesInput = document.getElementById("edit-classes")?.value || "";
                              const allowedCollegeYear = yearsInput.split(",").map((y) => y.trim()).filter(Boolean);
                              const allowedEngineerClass = classesInput.split(",").map((c) => c.trim()).filter(Boolean);
                              const updates = { allowedCollegeYear, allowedEngineerClass };
                              setClubData((prev) => ({ ...prev, ...updates }));
                              onClubUpdate?.(club.id, updates);
                              setEditingField(null);
                            }}
                            className="text-sm text-[#ff9f1c]"
                          >
                            Хадгалах
                          </button>
                          <button onClick={() => setEditingField(null)} className="text-sm text-gray-400">Цуцлах</button>
                        </div>
                      ) : (
                        <EditButton onClick={() => setEditingField("eligibility")} />
                      )
                    )}
                  </div>
                  {editingField === "eligibility" ? (
                    <div className="space-y-2">
                      <input
                        id="edit-years"
                        defaultValue={clubData.allowedCollegeYear.join(", ")}
                        placeholder="Курс (таслалаар тусгаарласан)"
                        className="w-full rounded-lg bg-gray-700/50 text-white px-4 py-2"
                      />
                      <input
                        id="edit-classes"
                        defaultValue={clubData.allowedEngineerClass.join(", ")}
                        placeholder="Мэргэжил (таслалаар тусгаарласан)"
                        className="w-full rounded-lg bg-gray-700/50 text-white px-4 py-2"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-300">
                        <span className="font-medium">Курс:</span> {clubData.allowedCollegeYear.join(", ")} курс
                      </p>
                      <p className="text-gray-300 mt-1">
                        <span className="font-medium">Мэргэжил:</span> {clubData.allowedEngineerClass.join(", ")}
                      </p>
                    </>
                  )}
                </div>

                {/* Members (read-only in info tab) */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">Гишүүдийн жагсаалт</h2>
                    {isLeader && <EditButton onClick={() => setActiveTab("members")} />}
                  </div>
                  <p className="text-gray-300">
                    {clubData.memberIds.length} / {clubData.maximumMember} гишүүн
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    <span className="font-medium">Клубын ахлагчийн ID:</span> {clubData.leaderId}
                  </p>
                  {clubData.memberIds.length > 0 && (
                    <div className="mt-3 text-sm text-gray-400">
                      <span className="font-medium">Гишүүдийн ID:</span> {clubData.memberIds.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "members" && isLeader && (
              <div className="space-y-6">
                {/* Add member */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-3">Гишүүн нэмэх</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMemberId}
                      onChange={(e) => setNewMemberId(e.target.value)}
                      placeholder="Гишүүний ID-г нэмэх"
                      className="flex-1 rounded-lg bg-gray-700/50 text-white px-4 py-2"
                    />
                    <button
                      onClick={handleAddMember}
                      disabled={clubData.memberIds.length >= clubData.maximumMember || !newMemberId.trim()}
                      className="px-4 py-2 rounded-lg bg-[#d07900] hover:bg-[#ff9f1c] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +Гишүүнийг нэмэх
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {clubData.memberIds.length} / {clubData.maximumMember} гишүүн
                  </p>
                </div>

                {/* Pending (Accept members) */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-3">Гишүүдийн хүсэлтийг зөвшөөрөх</h2>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newPendingId}
                      onChange={(e) => setNewPendingId(e.target.value)}
                      placeholder="Гишүүний ID-г хүсэлтэнд нэмэх"
                      className="flex-1 rounded-lg bg-gray-700/50 text-white px-4 py-2"
                    />
                    <button
                      onClick={handleAddToPending}
                      disabled={!newPendingId.trim()}
                      className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +Хүсэлт рүү нэмэх
                    </button>
                  </div>
                  {pendingMemberIds.length === 0 ? (
                    <p className="text-gray-400 text-sm">Хүлээгдэж байгаа хүсэлт байхгүй</p>
                  ) : (
                    <ul className="space-y-2">
                      {pendingMemberIds.map((memberId) => (
                        <li key={memberId} className="flex items-center justify-between bg-gray-700/30 rounded-lg px-4 py-2">
                          <span>{memberId}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAcceptMember(memberId)}
                              disabled={clubData.memberIds.length >= clubData.maximumMember}
                              className="text-sm text-green-400 hover:text-green-300 disabled:opacity-50"
                            >
                              Зөвшөөрөх
                            </button>
                            <button onClick={() => handleRejectMember(memberId)} className="text-sm text-red-400 hover:text-red-300">
                              Цуцлах
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Current members */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-3">Гишүүдийн жагсаалт</h2>
                  {clubData.memberIds.length === 0 ? (
                    <p className="text-gray-400 text-sm">Одоогоор гишүүн байхгүй</p>
                  ) : (
                    <ul className="space-y-2">
                      {clubData.memberIds.map((memberId) => (
                        <li key={memberId} className="flex items-center justify-between bg-gray-700/30 rounded-lg px-4 py-2">
                          <span>
                            {memberId}
                            {memberId === clubData.leaderId && (
                              <span className="ml-2 text-xs text-[#ff9f1c]">(Ахлагч)</span>
                            )}
                          </span>
                          {memberId !== clubData.leaderId && (
                            <button
                              onClick={() => handleRemoveMember(memberId)}
                              className="text-sm text-red-400 hover:text-red-300"
                            >
                              Хасах
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {!isLeader && (
              <button className="mt-8 w-full max-w-md mx-auto block bg-[#d07900] text-white py-3 rounded-xl hover:bg-[#ff9f1c] transition font-medium">
                Клубд орох
              </button>
            )}

            <div className="h-8" />
          </div>
        </div>

        <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </main>
    </div>
  );
};

export default MainClubPage;
