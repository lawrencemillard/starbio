import React from 'react';

interface ProfileImageProps {
  imageUrl: string;
  frameUrl: string;
  status: any;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, frameUrl, status }) => {
  const getStatusColor = () => {
    if (!status) return 'border-gray-500';
    switch (status.discord_status) {
      case 'online': return 'border-green-500';
      case 'idle': return 'border-yellow-500';
      case 'dnd': return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="relative inline-block">
      <img 
        src={imageUrl}
        alt="Profile"
        className={`w-32 h-32 rounded-full border-4 ${getStatusColor()} shadow-lg mx-auto`}
      />
      <img 
        src={frameUrl}
        alt="Frame"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default ProfileImage;
