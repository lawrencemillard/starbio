import React from 'react';
import { ProfileData } from '../types/profile';
import { useLanyard } from '../hooks/useLanyard';
import AudioPlayer from './AudioPlayer';
import DiscordStatus from './DiscordStatus';
import ProfileBadge from './ProfileBadge';
import ProfileImage from './ProfileImage';

interface ProfileProps {
  data: ProfileData;
}

const Profile: React.FC<ProfileProps> = ({ data }) => {
  const { status } = useLanyard(data.discordId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        {/* Profile Section */}
        <div className="relative p-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-full blur-xl" />
            <ProfileImage 
              imageUrl={data.avatarUrl}
              frameUrl={data.frameUrl}
              status={status}
            />
          </div>

          <h1 className="mt-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient">
            {data.name}
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2">
            {data.badges.map((badge, index) => (
              <ProfileBadge key={index}>{badge}</ProfileBadge>
            ))}
          </div>

          <p className="mt-4 text-gray-300 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl inline-block">
            {data.bio}
          </p>
        </div>

        {/* Audio Player */}
        <div className="px-8 pb-6">
          <AudioPlayer audioUrl={data.audioUrl} />
        </div>

        {/* Discord Status */}
        <div className="border-t border-white/10">
          <DiscordStatus 
            username={data.discordUsername}
            status={status}
            profileUrl={`discord.com/users/${data.discordId}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;