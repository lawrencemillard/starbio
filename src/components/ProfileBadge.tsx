import React from 'react';

interface ProfileBadgeProps {
  children: React.ReactNode;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({ children }) => {
  return (
    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
      {children}
    </span>
  );
}

export default ProfileBadge;