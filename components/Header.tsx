
import React from 'react';
import type { User } from '../types.ts';
import { UserIcon } from './IconComponents.tsx';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Foro Anonimo</h1>
        {currentUser && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <UserIcon className="w-6 h-6" />
              <span className="font-medium">{currentUser.username}</span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
