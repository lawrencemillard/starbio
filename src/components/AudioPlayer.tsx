import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(value || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(prev => !prev);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(prev => !prev);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const time = (parseInt(e.target.value) / 100) * audio.duration;
      audio.currentTime = time;
      setProgress(parseInt(e.target.value));
    }
  };

  return (
    <div className="bg-purple-900/30 rounded-xl p-4">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 hover:bg-purple-400 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #a855f7 ${progress}%, #581c87 ${progress}%)`,
            }}
          />
        </div>

        <button
          onClick={toggleMute}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-800/50 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-purple-300" />
          ) : (
            <Volume2 className="w-5 h-5 text-purple-300" />
          )}
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;
