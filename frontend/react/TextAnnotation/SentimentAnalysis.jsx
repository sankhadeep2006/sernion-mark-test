import React from "react";

// NOTE: This is a UI-only conversion. Full annotation logic and file handling should be implemented with useState/useEffect for a complete tool.
const SentimentAnalysis = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Sentiment Analysis</h1>
        <textarea className="w-full border border-gray-300 rounded-lg p-4 text-base mb-4 resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Paste or type your text here..."></textarea>
        <div className="flex flex-col gap-4 mt-4">
          <button className="w-full py-3 px-5 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors">Positive</button>
          <button className="w-full py-3 px-5 bg-yellow-400 text-gray-900 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors">Neutral</button>
          <button className="w-full py-3 px-5 bg-red-500 text-white rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors">Negative</button>
        </div>
        <button className="w-full mt-8 py-3 px-5 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors">Save Annotation</button>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
