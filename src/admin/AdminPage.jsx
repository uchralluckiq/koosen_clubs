import React, { useState, useEffect } from "react";
import Navbar from "../mainPageComponents/Navbar";
import Login from "../login/Login";

const ALLOW_CREATING_CLUB_KEY = "allowCreatingClub";

export function getAllowCreatingClub() {
  try {
    return localStorage.getItem(ALLOW_CREATING_CLUB_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAllowCreatingClub(value) {
  try {
    localStorage.setItem(ALLOW_CREATING_CLUB_KEY, value ? "true" : "false");
  } catch (e) {
    console.error("Failed to save setting:", e);
  }
}

const AdminPage = ({ onBack, clubRequests = [], onApproveRequest, onRejectRequest }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [allowCreatingClub, setAllowCreatingClubState] = useState(false);

  useEffect(() => {
    setAllowCreatingClubState(getAllowCreatingClub());
  }, []);

  const handleToggleAllowCreatingClub = (checked) => {
    setAllowCreatingClubState(checked);
    setAllowCreatingClub(checked);
  };

  const pendingRequests = clubRequests.filter((r) => r.status === "pending");
  const processedRequests = clubRequests.filter((r) => r.status !== "pending");

  const formatTime = ([hour, minute]) =>
    `${hour}:${minute.toString().padStart(2, "0")}`;

  return (
    <div className="w-full h-full relative flex flex-row mx-auto">
      <Navbar
        isOpen={isNavbarOpen}
        onClose={() => setIsNavbarOpen(false)}
        onLoginClick={() => setIsLoginOpen(true)}
        onAdminClick={() => {}}
      />

      <main className="flex flex-col w-full h-full relative z-10">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsNavbarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#d07900] hover:bg-[#ff9f1c] text-white transition-colors shadow-lg"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors text-sm sm:text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Буцах</span>
        </button>

        {/* Admin content */}
        <div className="h-full px-3 sm:px-5 pt-14 sm:pt-6 py-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Админ тохиргоо</h1>

            <div className="space-y-6">
              {/* Toggle section */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold">Клуб үүсгэхийг зөвшөөрөх</h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      Идэвхжүүлбэл хэрэглэгчид шинэ клуб үүсгэж болно
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={allowCreatingClub}
                      onChange={(e) => handleToggleAllowCreatingClub(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d07900]"></div>
                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-300">
                      {allowCreatingClub ? "Идэвхтэй" : "Идэвхгүй"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Pending club requests */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-base sm:text-lg font-semibold">Клуб нээх хүсэлтүүд</h2>
                  {pendingRequests.length > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-[#ff9f1c] text-black rounded-full font-medium">
                      {pendingRequests.length}
                    </span>
                  )}
                </div>

                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 mx-auto text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-400 text-sm">Хүлээгдэж байгаа хүсэлт байхгүй</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-gray-700/30 rounded-xl p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-white text-base">{request.clubName}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Хүсэлт гаргасан: {request.requestedBy} ({request.requestedById})
                            </p>
                          </div>
                        </div>

                        {request.explanation && (
                          <p className="text-sm text-gray-300 mb-2">
                            <span className="font-medium text-gray-200">Тайлбар:</span> {request.explanation}
                          </p>
                        )}
                        <p className="text-sm text-gray-300 mb-2">
                          <span className="font-medium text-gray-200">Зорилго:</span> {request.goal}
                        </p>
                        <div className="text-sm text-gray-400 mb-3">
                          <p>Дээд хязгаар: {request.maximumMember} гишүүн</p>
                          <p>Өдрүүд: {request.whatDayOfWeek.join(", ")}</p>
                          <p>Цаг: {formatTime(request.fromWhatTime)} - {formatTime(request.untilWhatTime)}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => onApproveRequest?.(request.id)}
                            className="flex-1 py-2 rounded-lg bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                          >
                            Зөвшөөрөх
                          </button>
                          <button
                            onClick={() => onRejectRequest?.(request.id)}
                            className="flex-1 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                          >
                            Татгалзах
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Processed requests */}
              {processedRequests.length > 0 && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold mb-4">Шийдвэрлэсэн хүсэлтүүд</h2>
                  <div className="space-y-3">
                    {processedRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between bg-gray-700/20 rounded-lg px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{request.clubName}</p>
                          <p className="text-xs text-gray-400">{request.requestedBy}</p>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                            request.status === "approved"
                              ? "bg-green-600/20 text-green-400"
                              : "bg-red-600/20 text-red-400"
                          }`}
                        >
                          {request.status === "approved" ? "Зөвшөөрсөн" : "Татгалзсан"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </main>
    </div>
  );
};

export default AdminPage;
