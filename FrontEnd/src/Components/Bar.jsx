import React from 'react';

const Bar = ({ prob }) => {
  const xPercent = (prob.xWin * 100).toFixed(1);
  const oPercent = (prob.oWin * 100).toFixed(1);
  const drawPercent = (prob.draw * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-2 mt-6 w-full max-w-md">
      <div className="w-full">
        <div className="flex h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-blue-500 text-white text-sm font-semibold flex items-center justify-center transition-all duration-500"
            style={{ width: `${xPercent}%` }}
          >
            {xPercent > 5 && `${xPercent}%`}
          </div>
          <div
            className="bg-red-500 text-white text-sm font-semibold flex items-center justify-center transition-all duration-500"
            style={{ width: `${oPercent}%` }}
          >
            {oPercent > 5 && `${oPercent}%`}
          </div>
          <div
            className="bg-green-500 text-white text-sm font-semibold flex items-center justify-center transition-all duration-500"
            style={{ width: `${drawPercent}%` }}
          >
            {drawPercent > 5 && `${drawPercent}%`}
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-700 mt-1 px-1">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> X Wins</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full"></span> O Wins</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Draw</span>
      </div>
    </div>
  );
};

export default Bar;
