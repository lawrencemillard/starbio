import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/Profile';
import Home from './components/Home';
import { ProfileData } from './types/profile';

const profileData: ProfileData = {
  name: "starlite!",
  username: "str",
  bio: "no sir, i didnt pirate rust.",
  avatarUrl: "https://files.catbox.moe/3zy78z.jpg",
  frameUrl: "https://cdn.discordapp.com/avatar-decoration-presets/a_c3cffc19e9784f7d0b005eecdf1b566e.png",
  badges: ["@str", ":3"],
  discordId: "1187458786496086068",
  discordUsername: "tkzf",
  audioUrl: "https://files.catbox.moe/ep0zia.mp3"
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/@str" element={<Profile data={profileData} />} />
        <Route path="/:3" element={<Profile data={profileData} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;