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

const AdminPage = ({ onBack }) => {
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
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Буцах
        </button>

        {/* Admin content */}
        <div className="h-full px-5 py-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Админ тохиргоо</h1>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Клуб үүсгэхийг зөвшөөрөх</h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Идэвхжүүлбэл хэрэглэгчид шинэ клуб үүсгэж болно
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowCreatingClub}
                      onChange={(e) => handleToggleAllowCreatingClub(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d07900]"></div>
                    <span className="ml-3 text-sm text-gray-300">
                      {allowCreatingClub ? "Идэвхтэй" : "Идэвхгүй"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </main>
    </div>
  );
};

export default AdminPage;
