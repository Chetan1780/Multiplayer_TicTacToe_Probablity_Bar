function Square({ value, onClick }) {
    return (
      <button
        className="w-20 h-20 cursor-pointer  text-3xl font-bold rounded-xl bg-white shadow-md border border-gray-300 hover:bg-gray-100 transition-all duration-200"
        onClick={onClick}
      >
        {value}
      </button>
    );
  }
  
  function Board({ board, onClick }) {
    return (
      <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl shadow-xl w-fit mx-auto">
        {board.map((value, i) => (
          <Square key={i} value={value} onClick={() => onClick(i)} />
        ))}
      </div>
    );
  }
  
  export default Board;
  