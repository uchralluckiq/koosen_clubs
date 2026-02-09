import './App.css'
import { useState } from "react";
import MainPage from './mainPageComponents/MainPage';
import MainClubPage from './clubPageComponents/MainClubPage';
import AdminPage from './admin/AdminPage';
import { AuthProvider } from './login/AuthContext';
import { clubs as initialClubs } from './assets/clubs.js';

export default function App() {
  const [clubs, setClubs] = useState(initialClubs);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const selectedClub = clubs.find((c) => c.id === selectedClubId);

  const handleClubUpdate = (clubId, updates) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, ...updates } : c))
    );
  };

  return (
    <AuthProvider>
      <div className="overflow-hidden h-screen relative text-gray-200 bg-[#000814]">
        {showAdmin ? (
          <AdminPage onBack={() => setShowAdmin(false)} />
        ) : selectedClub ? (
          <MainClubPage
            club={selectedClub}
            onBack={() => setSelectedClubId(null)}
            onAdminClick={() => setShowAdmin(true)}
            onClubUpdate={handleClubUpdate}
          />
        ) : (
          <MainPage
            clubs={clubs}
            onClubSelect={(club) => setSelectedClubId(club?.id)}
            onAdminClick={() => setShowAdmin(true)}
            onClubUpdate={handleClubUpdate}
          />
        )}
      </div>
    </AuthProvider>
  )
}
