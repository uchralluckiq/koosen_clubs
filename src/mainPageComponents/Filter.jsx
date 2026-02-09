import React, { useEffect, useState } from "react";
import { clubs } from "../assets/clubs.js"

//       {/* 2 main leads to login page if not logged in */}

//       <button>myClubs</button> {/* after clicking this, add button shows up */}

//       <button>myParticipatingClub</button>
      

export default function Filter({ filters, setFilters }) {
  return (
    // bg-gradient-to-b from-[#f2e9e4] via-[#c9ada7] to-[#9a8c98] rounded-full
    // bg-white/50 backdrop-blur-md
    // shadow-sm rounded-4xl
    <div className="flex w-full px-4 sm:px-6 lg:px-10 pt-14 pb-4 sm:pt-6 sm:pb-6 lg:pt-6 justify-center">
      <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-center items-center flex-wrap">
        <select
          className="rounded-2xl py-2 px-3 sm:px-4 bg-gray-800 text-sm sm:text-base min-w-0"
          value={filters.year || ""}
          onChange={(e) =>
            setFilters({ ...filters, year: e.target.value ? Number(e.target.value) : "" })
          }
        >
          <option value="">Курс</option>
          <option value="1">1-р</option>
          <option value="2">2-р</option>
          <option value="3">3-р</option>
          <option value="4">4-р</option>
          <option value="5">5-р</option>
        </select>

        <select
          className="rounded-2xl py-2 px-3 sm:px-4 bg-gray-800 text-sm sm:text-base min-w-0"
          value={filters.class || ""}
          onChange={(e) =>
            setFilters({ ...filters, class: e.target.value })
          }
        >
          <option value="">Мэргэжил</option>
          <option value="1">Барилга</option>
          <option value="2">Механик</option>
          <option value="3">Цахилгаан</option>
          <option value="4">Био</option>
          <option value="5">Компьютер</option>
        </select>

        <select
          className="rounded-2xl py-2 px-3 sm:px-4 bg-gray-800 text-sm sm:text-base min-w-0"
          value={filters.type || ""}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        >
          <option value="">Төрөл</option>
          <option value="contest">Тэмцээн</option>
          <option value="sport">Спорт</option>
          <option value="art">Урлаг</option>
          <option value="education">Боловсрол</option>
        </select>
      </div>
    </div>
  );
}
