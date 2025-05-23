import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar({ onNavSelect, selectedNavKey }) {
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

  const renderLink = ({ label, key }, isMobile = false) => {
    const isActive = selectedNavKey === key;

    return (
      <a
        key={key}
        onClick={() => {
          onNavSelect(key);
          if (isMobile) toggleMobileMenu();
        }}
        className={`cursor-pointer block text-lg transition-colors duration-200 
          ${isMobile ? 'w-full text-left' : ''}
          ${
            isActive
              ? 'text-blue-400 font-semibold border border-blue-400 rounded-xl px-3 py-1 bg-gray-800 shadow-md shadow-blue-400/30'
              : 'text-gray-300 hover:text-blue-300'
          }`}
      >
        {label}
      </a>
    );
  };

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left side: Logo + Back to Analyze */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-20 rounded-full"
            />
          </Link>
          <Link
            to="/analyze"
            className="text-xl font-bold text-blue-400 hover:text-blue-300 transition duration-200"
          >
            Back to Analyze
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-blue-300 focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29a1 1 0 10-1.42 1.42L10.83 12l-5.12 5.12a1 1 0 001.42 1.42L12 14.83l4.88 4.88a1 1 0 001.42-1.42L13.17 12l5.13-5.29z"
                />
              ) : (
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
        <div className="lg:hidden border-t border-gray-700 bg-gray-900">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => renderLink(link, true))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;