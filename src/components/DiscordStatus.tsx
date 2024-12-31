import React from 'react';
import { MessageSquare } from 'lucide-react';

interface DiscordStatusProps {
  username: string;
  status: any;
  profileUrl: string;
}

const DiscordStatus: React.FC<DiscordStatusProps> = ({ username, status, profileUrl }) => {
  const getStatusColor = () => {
    if (!status) return 'bg-gray-500';
    switch (status.discord_status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      case 'invisible': return 'bg-gray-500';
      case 'unknown': return 'bg-gray-500';
      case 'streaming': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <a
      href={`https://${profileUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 hover:bg-purple-500/10 transition-colors"
    >
      <MessageSquare className="w-5 h-5 text-purple-400" />
      <span className="text-gray-300">@{username}</span>
      <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} ml-auto`} />
    </a>
  );
}

export default DiscordStatus;
