import React from "react";
import { useAuth } from "../login/AuthContext";

export default function ClubBlocks({ club, onSeeMore, onClubUpdate }) {
  const { user } = useAuth();

  const {
    name,
    explanation,
    goal,
    memberIds,
    maximumMember,
    whatDayOfWeek,
    fromWhatTime,
    untilWhatTime,
    pendingMemberIds = []
  } = club;

  const isMember = user && memberIds.includes(user.id);
  const isPending = user && pendingMemberIds.includes(user.id);

  const formatTime = ([hour, minute]) =>
    `${hour}:${minute.toString().padStart(2, "0")}`;

  const handleJoinClub = () => {
    if (!user || isMember || isPending) return;
    const newPending = [...pendingMemberIds, user.id];
    onClubUpdate?.(club.id, { pendingMemberIds: newPending });
  };

  return (
    // bg-gradient-to-b from-[#f2e9e4] via-[#c9ada7] to-[#9a8c98]
    <div className="p-5 hover:shadow-lg transition
      bg-white/10 backdrop-blur-md
      shadow-sm rounded-4xl flex flex-col justify-between
    ">
      <div className="flex flex-col gap-3">
        {/* Img */}
        <img
          src={club.image}
          alt={club.name}
          className="h-40 w-full object-cover rounded-2xl"
        />

        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{name}</h2>
          <span className="text-sm text-gray-500">
            {memberIds.length}/{maximumMember}
          </span>
        </div>

        {/* Content */}
        <p><span className="font-semibold">Зорилго:</span> {goal}</p>

        <div className="text-sm">
          <p>
            <span className="font-semibold">Цагийн хуваарь:</span>{" "}
            {whatDayOfWeek.join(", ")}
          </p>
          <p>
            {formatTime(fromWhatTime)} – {formatTime(untilWhatTime)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => onSeeMore?.(club)}
          className="flex-1 bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-500 transition"
        >
          Дэлгэрэнгүй
        </button>
        {!isMember && (
          isPending ? (
            <button disabled className="flex-1 bg-gray-600 text-gray-400 py-2 rounded-xl cursor-not-allowed">
              Илгээгдсэн
            </button>
          ) : (
            <button
              onClick={handleJoinClub}
              disabled={!user}
              className="flex-1 bg-[#d07900] text-white py-2 rounded-xl hover:bg-[#ff9f1c] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Клубд элсэх
            </button>
          )
        )}
      </div>
    </div>
  );
}
