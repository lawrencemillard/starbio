import { useState, useEffect } from 'react';

interface DiscordStatusData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
}

export function useDiscordStatus(userId: string) {
  const [status, setStatus] = useState<DiscordStatusData | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://discord.com/api/v9/users/${userId}/profile`);
        const data = await response.json();
        setStatus({ discord_status: data.user.presence.status });
      } catch (error) {
        console.error('Error fetching Discord status:', error);
      }
    };

    fetchStatus();
  }, [userId]);

  return { status };
}
