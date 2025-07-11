import React, { useState, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("zg2uni");
  const videoRef = useRef(null);

  const convertText = (text, mode) => {
    if (!window.Rabbit) return text;
    return mode === "zg2uni"
      ? window.Rabbit.zg2uni(text)
      : window.Rabbit.uni2zg(text);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setOutput(convertText(value, mode));
  };

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    setOutput(convertText(input, newMode));
  };

  const handleSwap = () => {
    const newMode = mode === "zg2uni" ? "uni2zg" : "zg2uni";
    setMode(newMode);
    setInput(output);
    setOutput(input);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/mm.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Myanmar Font Converter
          </h1>
          <p className="text-lg text-indigo-200">
            Convert between Zawgyi and Unicode effortlessly
          </p>
        </div>

        <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="flex flex-wrap justify-between items-center p-6 bg-indigo-600">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <select
                value={mode}
                onChange={handleModeChange}
                className="px-4 py-3 rounded-lg bg-white text-gray-800 font-medium focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg"
              >
                <option value="zg2uni">Zawgyi to Unicode</option>
                <option value="uni2zg">Unicode to Zawgyi</option>
              </select>

              <button
                onClick={handleSwap}
                className="p-3 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition-colors"
                title="Swap conversion direction"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={handleClear}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-lg"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">
                {mode === "zg2uni" ? "Zawgyi Input" : "Unicode Input"}
              </label>
              <textarea
                rows={12}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg"
                placeholder="Enter Burmese text here..."
                value={input}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">
                {mode === "zg2uni" ? "Unicode Output" : "Zawgyi Output"}
              </label>
              <textarea
                rows={12}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:outline-none text-lg"
                placeholder="Converted text will appear here..."
                value={output}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
