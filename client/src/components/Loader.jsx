import React from 'react';

function Loader() {
  return (
    <div
      id="loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
    >
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full animate-spin gradient-border"></div>
        <div className="absolute inset-4 rounded-full bg-gray-900 shadow-inner"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-300 animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
}

export default Loader;
