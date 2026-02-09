import React, { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";

const NavItem = ({ label, disabled = false, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        text-left px-4 py-2 rounded-xl w-full 
        transition-all duration-200  
        ${disabled 
          ? "text-gray-400 cursor-not-allowed" 
          : "hover:bg-white/10 hover:text-gray-200 text-gray-400"}
      `}
    >
      {label}
    </button>
  );
};

// Helper to handle mobile close
const handleMobileClose = (onClose) => {
  // Check if we're on mobile (less than lg breakpoint which is 1024px)
  if (window.matchMedia('(max-width: 1023px)').matches) {
    onClose();
  }
};

const Navbar = ({ isOpen, onClose, onLoginClick, onAdminClick }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="
            fixed inset-0 bg-black/50 z-40
            lg:hidden
            transition-opacity duration-300
          "
          onClick={onClose}
        />
      )}

      <nav
        className={`
          fixed lg:static
          top-0 left-0
          w-64 lg:w-1/4
          h-full
          p-8 lg:mr-5
          flex flex-col justify-between
          bg-[#000814] lg:bg-transparent
          z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-xl lg:shadow-none
        `}
      >
        {/* TOP */}
        <div className="space-y-6 border-b border-gray-400 pb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Таны Мэдээлэл
            </h2>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="
                lg:hidden
                text-gray-400 hover:text-white
                p-2 rounded-lg
                hover:bg-white/10
                transition-colors
              "
              aria-label="Close menu"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 text-gray-200 space-y-2">
                <h1 className="font-semibold">{user?.name || "Хэрэглэгч"}</h1>
                {user?.collegeYear && user?.engineerClass && (
                  <h2 className="text-gray-200">
                    Анги: {user.collegeYear}-{user.engineerClass}
                  </h2>
                )}
                {user?.role === "admin" && (
                  <h2 className="text-xs text-[#ff9f1c]">Админ хэсэг</h2>
                )}
                <h3 className="text-xs text-gray-400">{user?.email}</h3>
              </div>
              <NavItem 
                label="Хариуцсан клуб" 
                onClick={() => handleMobileClose(onClose)}
              />
              <NavItem 
                label="Оролцдог клубүүд" 
                onClick={() => handleMobileClose(onClose)}
              />
              <NavItem 
                label="+ Шинээр клуб нээх" 
                onClick={() => handleMobileClose(onClose)}
              />
            </>
          ) : (
            <>
              {/* <NavItem 
                label="Login" 
                onClick={() => {
                  onLoginClick();
                  handleMobileClose(onClose);
                }}
              /> */}
              <button 
                onClick={() => {
                  onLoginClick();
                  handleMobileClose(onClose);
                }}
                className="rounded-lg bg-[#d07900] hover:bg-[#ff9f1c] w-full text-center py-3 text-white transition-colors">
                Нэвтрэх
              </button>
            </>
          )}
        </div>

        {/* MIDDLE - only visible when logged in */}
        {isAuthenticated && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase">
              Цагийн хуваарь
            </h3>

            <NavItem
              label="Цагийн хуваарь"
              onClick={() => handleMobileClose(onClose)}
            />
          </div>
        )}

        {/* BOTTOM - only visible when logged in */}
        {isAuthenticated && (
          <div className="space-y-2 border-t border-gray-400 pt-5">
            <h3 className="text-sm font-medium uppercase">
              Бусад
            </h3>

            {isAdmin && onAdminClick && (
              <NavItem
                label="Админ"
                onClick={() => {
                  onAdminClick();
                  handleMobileClose(onClose);
                }}
              />
            )}
            <NavItem 
              label="Санал хүсэлт" 
              onClick={() => handleMobileClose(onClose)}
            />
            <button 
              onClick={() => {
                logout();
                handleMobileClose(onClose);
              }}
              className="rounded-lg w-full text-left px-4 py-2 text-red-500 hover:bg-red-700 hover:text-white transition-colors">
              Гарах
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
