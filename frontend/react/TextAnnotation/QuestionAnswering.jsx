import React from "react";

// NOTE: This is a UI-only conversion. Full annotation logic and file handling should be implemented with useState/useEffect for a complete tool.
const QuestionAnswering = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-8 pt-8 mb-7">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
          <div>
            <div className="text-2xl font-semibold text-gray-800">Text.txt</div>
            <div className="text-gray-500 text-sm mt-1">Question Answering</div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg cursor-pointer text-base flex items-center gap-2 hover:bg-gray-100">← Back to project</button>
          <button className="px-4 py-2 border border-gray-900 bg-gray-900 text-white rounded-lg cursor-pointer text-base flex items-center gap-2 hover:bg-gray-700">🔒 Save Annotation</button>
        </div>
      </div>
      {/* Main Centered Q&A Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="w-full max-w-3xl">
          <input type="text" placeholder="Question" className="w-full rounded border-2 border-gray-900 text-base px-4 py-6 mb-8 placeholder-gray-400 focus:outline-none" />
          <textarea placeholder="Answer" className="w-full rounded border-2 border-gray-900 text-base px-4 py-6 mb-8 h-[300px] resize-y placeholder-gray-400 focus:outline-none"></textarea>
          <button className="bg-blue-700 text-white px-8 py-2 rounded font-semibold text-base mb-3">Save Q&A</button>
          <div className="text-right text-sm text-gray-800 mt-2 mb-8">0/200 Q&amp;A pairs annotated</div>
        </div>
      </div>
      {/* Shortcuts bottom left */}
      <div className="fixed left-8 bottom-10">
        <div className="font-bold text-lg mb-3">Shortcuts</div>
        <div className="flex items-center gap-3 mb-2 shortcut-item cursor-pointer select-none">
          <div className="shortcut-key bg-gray-200 px-4 py-1 rounded text-base font-bold min-w-[36px] text-center">1</div>
          <span className="text-base">→ Question</span>
        </div>
        <div className="flex items-center gap-3 mb-2 shortcut-item cursor-pointer select-none">
          <div className="shortcut-key bg-gray-200 px-4 py-1 rounded text-base font-bold min-w-[36px] text-center">2</div>
          <span className="text-base">→ Answer</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswering;
