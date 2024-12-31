import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient mb-4">
          flexify.buzz
        </h1>
        <p className="text-gray-300 text-xl mb-8">
          A private bio service for your online presence
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/@str"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-400 rounded-lg text-white transition-colors flex items-center gap-2"
          >
            View Example <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;