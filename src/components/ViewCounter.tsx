import React from 'react';

interface ViewCounterProps {
  count: number;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ count }) => {
  return (
    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-sm">
      {count.toLocaleString()} views
    </div>
  );
};

export default ViewCounter;