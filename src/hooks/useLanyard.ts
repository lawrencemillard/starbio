import { useState, useEffect } from 'react';

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  discord_user: {
    username: string;
    discriminator: string;
    avatar: string;
    public_flags: number;
  };
  activities: any[];
  listening_to_spotify: boolean;
  spotify: any;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

interface LanyardResponse {
  t: string;
  d: LanyardData;
}

export function useLanyard(userId: string) {
  const [status, setStatus] = useState<LanyardData | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeat: NodeJS.Timeout;

    const fetchInitialStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await response.json();
        setStatus(data.data);
      } catch (error) {
        console.error('Failed to fetch initial status:', error);
      }
    };

    const connect = () => {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.onopen = () => {
        // Subscribe to updates
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_ids: [userId]
          }
        }));

        // Start heartbeat
        heartbeat = setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }));
        }, 30000);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data) as LanyardResponse;
        if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
          setStatus(data.d);
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeat);
        // Attempt to reconnect after 5 seconds
        setTimeout(connect, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws.close();
      };
    };

    fetchInitialStatus();
    connect();

    return () => {
      clearInterval(heartbeat);
      if (ws) ws.close();
    };
  }, [userId]);

  return { status };
}
