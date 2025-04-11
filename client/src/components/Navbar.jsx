import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onNavSelect }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { label: 'Overview', key: 'overview' },
    { label: 'Leetcode', key: 'leetcode' },
    { label: 'Codechef', key: 'codechef' },
    { label: 'Codeforces', key: 'codeforces' },
    { label: 'Github', key: 'github' },
    { label: 'Linkedin', key: 'linkedin' },
  ];

  const renderLink = ({ label, key }, isMobile = false) => (
    <a
      key={key}
      onClick={() => {
        onNavSelect(key);
        if (isMobile) toggleMobileMenu();
      }}
      className={`cursor-pointer ${label === 'Overview' ? 'text-blue-400 font-semibold' : 'text-gray-300'
        } hover:text-blue-300 block ${isMobile ? 'w-full text-left' : ''
        } text-lg transition-colors duration-200`}
    >
      {label}
    </a>
  );

  return (
    <nav className="w-full border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left side: Back to Analyze */}
        <Link
          to="/analyze"
          className="text-xl font-bold text-blue-400 hover:text-blue-300 transition duration-200"
        >
          Back to Analyze
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-blue-300 focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                // Close icon
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29a1 1 0 10-1.42 1.42L10.83 12l-5.12 5.12a1 1 0 001.42 1.42L12 14.83l4.88 4.88a1 1 0 001.42-1.42L13.17 12l5.13-5.29z"
                />
              ) : (
                // Hamburger icon
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 110 2H4a1 1 0 010-2zm0 6h16a1 1 0 110 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-6">
          {navLinks.map((link) => renderLink(link))}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-700">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => renderLink(link, true))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
