import './App.css'
import { useState } from "react";
import MainPage from './mainPageComponents/MainPage';
import MainClubPage from './clubPageComponents/MainClubPage';
import AdminPage from './admin/AdminPage';
import { AuthProvider } from './login/AuthContext';
import { clubs as initialClubs } from './assets/clubs.js';
import Img from './assets/club_images/image.png';

export default function App() {
  const [clubs, setClubs] = useState(initialClubs);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [clubRequests, setClubRequests] = useState([]);

  const selectedClub = clubs.find((c) => c.id === selectedClubId);

  const handleClubUpdate = (clubId, updates) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, ...updates } : c))
    );
  };

  const handleNewClubRequest = (request) => {
    setClubRequests((prev) => [...prev, request]);
  };

  const handleApproveRequest = (requestId) => {
    setClubRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "approved" } : r))
    );

    const request = clubRequests.find((r) => r.id === requestId);
    if (request) {
      const newClub = {
        id: `te${clubs.length + 1}`,
        name: request.clubName,
        explanation: request.explanation,
        goal: request.goal,
        maximumMember: request.maximumMember,
        allowedCollegeYear: ["1", "2", "3", "4", "5"],
        allowedEngineerClass: ["1", "2", "3", "4", "5"],
        image: Img,
        leaderId: request.requestedById,
        memberIds: [request.requestedById],
        whatDayOfWeek: request.whatDayOfWeek,
        fromWhatTime: request.fromWhatTime,
        untilWhatTime: request.untilWhatTime,
      };
      setClubs((prev) => [...prev, newClub]);
    }
  };

  const handleRejectRequest = (requestId) => {
    setClubRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "rejected" } : r))
    );
  };

  return (
    <AuthProvider>
      <div className="overflow-hidden h-screen relative text-gray-200 bg-[#000814]">
        {showAdmin ? (
          <AdminPage
            onBack={() => setShowAdmin(false)}
            clubRequests={clubRequests}
            onApproveRequest={handleApproveRequest}
            onRejectRequest={handleRejectRequest}
          />
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
            onNewClubRequest={handleNewClubRequest}
          />
        )}
      </div>
    </AuthProvider>
  )
}
