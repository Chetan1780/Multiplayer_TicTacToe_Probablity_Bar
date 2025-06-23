import { useEffect, useState } from 'react';
import Board from './Components/Board';
import Bar from './Components/Bar';

const initialBoard = Array(9).fill(null);

function LocalGame() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('X');
  const [prob, setProb] = useState({ xWin: 0, oWin: 0, draw: 0 });
  const [undo, setUndo] = useState([]);

  useEffect(() => {
    const probResult = calculateProb(board, turn);
    setProb(probResult);
  }, [board, turn]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    // Save current state before move
    setUndo((prev) => [...prev, { board: [...board], turn }]);

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleUndo = () => {
    if (undo.length === 0) return;

    const last = undo[undo.length - 1];
    setBoard(last.board);
    setTurn(last.turn);
    setUndo((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setTurn('X');
    setProb({ xWin: 0, oWin: 0, draw: 0 });
    setUndo([]);
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
    board.forEach((cell, idx) => {
      if (!cell) {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-y-4 text-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-2">Tic-Tac-Toe</h1>
      <Board board={board} onClick={handleClick} />
      <div className="flex gap-4">
        <button
          className="mt-6 p-2 transition-all hover:scale-105 duration-200 bg-blue-500 rounded-xl outline-none hover:bg-blue-600 cursor-pointer text-white"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          disabled={undo.length === 0}
          onClick={handleUndo}
          className={`mt-6 p-2 transition-all duration-200 rounded-xl outline-none text-white ${
            undo.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-red-500 hover:scale-105 hover:bg-red-600'
          }`}
        >
          Undo
        </button>
      </div>
      <Bar prob={prob} />
    </div>
  );
}

export default LocalGame;