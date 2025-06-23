import React, { useState } from 'react';

function ShareLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  return (
    <div className="relative inline-block mt-6">
      <button
        onClick={handleCopy}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Share this link to play:&nbsp;
        <code className="font-semibold text-blue-600">{window.location.href}</code>
      </button>

      {copied && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs rounded shadow-md animate-fade-in-out z-10">
          Copied!
        </div>
      )}
    </div>
  );
}

export default ShareLink;