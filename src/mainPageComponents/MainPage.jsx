import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import Filter from "./Filter";
import ClubBlocks from "./ClubBlocks";
import Login from "../login/Login";
import { useAuth } from "../login/AuthContext.jsx";

// general admin can have different interface that shows:
// class time table, year plan, club time
// also there i can write algorithm that solves class time table

import {
  getTypeFromId,
  isYearAllowed,
  isClassAllowed
} from "../assets/filters.js";

function filterClubs(clubs, filters) {
  return clubs.filter((club) => {
    if (filters.year && !isYearAllowed(club, filters.year)) return false;
    if (filters.class && !isClassAllowed(club, filters.class)) return false;
    if (filters.type && getTypeFromId(club.id) !== filters.type) return false;
    return true;
  });
}

const MainPage = ({ clubs, onClubSelect, onAdminClick, onClubUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState({
    year: "",
    class: "",
    type: ""
  });
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const filteredClubs = filterClubs(clubs || [], filters);
  const onSeeClub = (club) => onClubSelect?.(club);

  return (
    <div className="
      w-full h-full relative
      flex flex-row mx-auto"
    >

      {/* Navbar */}
      <Navbar 
        isOpen={isNavbarOpen} 
        onClose={() => setIsNavbarOpen(false)}
        onLoginClick={() => setIsLoginOpen(true)}
        onAdminClick={onAdminClick}
      />

      {/* Main content area */}
      <main className="flex flex-col w-full h-full relative z-10">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsNavbarOpen(true)}
            className="
              lg:hidden
              fixed top-4 left-4 z-50
              p-2 rounded-lg
              bg-[#d07900] hover:bg-[#ff9f1c]
              text-white
              transition-colors
              shadow-lg
            "
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
          {/* Filter Section */}
          <Filter filters={filters} setFilters={setFilters}/>

          {/* Clubs Section */}
          <div className="h-9/10 px-5 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent overflow-y-auto">
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
              {filteredClubs.map((club) => (
                <ClubBlocks 
                  key={club.id} 
                  club={club} 
                  onSeeMore={onSeeClub}
                  onClubUpdate={onClubUpdate}
                />
              ))}
            </div>
            <div className="h-5"></div> {/* bottom spacing */}
          </div>

          {/* Login Overlay */}
          <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </main>
    </div>
  )
};

export default MainPage;