import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  location: string;
  education: string;
  occupation: string;
  income: string;
  literacyLevel: 'basic' | 'intermediate' | 'advanced';
  preferredLanguage: string;
  disabilities: string[];
}

interface UserContextType {
  profile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isProfileComplete: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  name: '',
  age: 0,
  gender: '',
  location: '',
  education: '',
  occupation: '',
  income: '',
  literacyLevel: 'intermediate',
  preferredLanguage: 'en',
  disabilities: []
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('easyaid-profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(defaultProfile);
    }
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    localStorage.setItem('easyaid-profile', JSON.stringify(updatedProfile));
  };

  const isProfileComplete = profile ? 
    !!(profile.name && profile.age && profile.location && profile.occupation) : false;

  return (
    <UserContext.Provider value={{ profile, updateProfile, isProfileComplete }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}