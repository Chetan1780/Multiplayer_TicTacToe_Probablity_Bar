import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Board from './Components/Board';
import Bar from './Components/Bar';

const socket = io("http://localhost:3000"); 

function App() {
  const { roomId } = useParams(); 
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X'); 
  const [playerSymbol, setPlayerSymbol] = useState(null); 
  const [prob, setProb] = useState({ xWin: 0, oWin: 0, draw: 0 });
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    socket.emit('join', roomId);

    socket.on('init', ({ symbol }) => {
      setPlayerSymbol(symbol);
    });

    socket.on('state', (game) => {
      setBoard(game.board);
      setTurn(game.turn);
      setPlayerCount(game.playerCount || 0);
      const probResult = calculateProb(game.board, game.turn);
      setProb(probResult);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleClick = (index) => {
    if (playerSymbol !== turn || board[index]) return;
    socket.emit('move', { roomId, index });
  };

  const handleReset = () => {
    socket.emit('reset',roomId);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  function calculateProb(board, turn) {
    const result = simulate(board, turn);
    const total = result.x + result.o + result.draw;
    return {
      xWin: result.x / total || 0,
      oWin: result.o / total || 0,
      draw: result.draw / total || 0,
    };
  }

  function simulate(board, turn) {
    const winner = calculateWinner(board);
    if (winner === 'X') return { x: 1, o: 0, draw: 0 };
    if (winner === 'O') return { x: 0, o: 1, draw: 0 };
    if (board.every(Boolean)) return { x: 0, o: 0, draw: 1 };

    const outcomes = { x: 0, o: 0, draw: 0 };
    board.forEach((square, idx) => {
      if (!square) {
        const newBoard = [...board];
        newBoard[idx] = turn;
        const nextTurn = turn === 'X' ? 'O' : 'X';
        const result = simulate(newBoard, nextTurn);
        outcomes.x += result.x;
        outcomes.o += result.o;
        outcomes.draw += result.draw;
      }
    });
    return outcomes;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-2">Tic-Tac-Toe</h1>
      <p className="text-md mb-1">You are playing as: <strong>{playerSymbol || "..."}</strong></p>
      {playerCount < 2 && <p className="text-sm text-gray-500 italic mb-2">Waiting for an opponent to join...</p>}
      <Board board={board} onClick={handleClick} />
      <button
        className='mt-6 p-2 transition-all hover:scale-105 duration-200 bg-blue-400 rounded-xl outline-none hover:bg-blue-500 hover:text-white'
        onClick={handleReset}
      >
        Reset
      </button>
      <Bar prob={prob} />
      <p className="text-xs mt-4 text-gray-500">Share this link to play: <code>{window.location.href}</code></p>
    </div>
  );
}

export default App;
