import React from 'react';
import { useLocation } from 'react-router-dom';

const SharePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const caption = queryParams.get('caption');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shared Caption</h1>
      <p className="text-lg">{caption}</p>
    </div>
  );
};

export default SharePage;
