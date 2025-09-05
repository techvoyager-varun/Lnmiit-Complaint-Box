import React, { useEffect, useState } from 'react';
// Simple moon and sun icons for toggle
const MoonIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
);
const SunIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.05 6.05L4.64 4.64m12.02 0l-1.41 1.41M6.05 17.95l-1.41 1.41"/></svg>
);
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setMenuOpen(false);
  };

  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-primary">Campus Help Desk</h1>
          {user && (
            <span className="text-sm text-muted-foreground capitalize">
              {user.role} Dashboard
            </span>
          )}
        </div>
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" aria-label="Toggle dark mode" onClick={toggleDarkMode}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
          {user && (
            <>
              <span className="text-sm font-medium">{user.name}</span>
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleProfile}>
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>
            <Menu className="h-6 w-6" />
          </Button>
          {menuOpen && (
            <div className="absolute top-16 right-4 z-50 w-48 rounded-md shadow-lg bg-card border p-4 flex flex-col space-y-2 animate-in fade-in slide-in-from-top-2">
              <Button variant="ghost" size="sm" aria-label="Toggle dark mode" onClick={toggleDarkMode} className="justify-start">
                {darkMode ? <SunIcon /> : <MoonIcon />}<span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </Button>
              {user && <span className="text-sm font-medium px-2">{user.name}</span>}
              {user && (
                <>
                  <Button variant="ghost" size="sm" onClick={handleProfile} className="justify-start">
                    <User className="h-4 w-4 mr-2" /> Profile
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start">
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};