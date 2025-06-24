import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaUserFriends, FaUserAlt } from 'react-icons/fa';

const Lobby = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  const handleLocalPlay = () => {
    navigate('/local'); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 text-gray-800">
      <div className="bg-white p-10 rounded-2xl shadow-xl shadow-fuchsia-300 flex flex-col items-center space-y-6 w-[90%] max-w-md">
        <h1 className="text-4xl font-bold text-blue-600">Tic-Tac-Toe</h1>
        <p className="text-center text-gray-500 text-md">
          Choose a mode to start playing
        </p>

        <button
          onClick={handleCreateRoom}
          className="w-full bg-blue-600 text-white py-3 rounded-full text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition cursor-pointer"
        >
          <FaUserFriends className="text-xl" />
          Play Online
        </button>

        <button
          onClick={handleLocalPlay}
          className="w-full bg-green-500 text-white py-3 rounded-full text-lg flex items-center justify-center gap-3 hover:bg-green-600 transition cursor-pointer"
        >
          <FaUserAlt className="text-xl" />
          Play Locally
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-12">Created by Chetan 🚀</p>
    </div>
  );
};

export default Lobby;
