import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Plane } from "lucide-react";

const ExamTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [isSetup, setIsSetup] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setIsSetup(true);
  };

  const handleSetTime = () => {
    const totalSeconds = inputHours * 3600 + inputMinutes * 60;
    setTime(totalSeconds);
    setTotalTime(totalSeconds);
    setIsSetup(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    if (totalTime === 0) return 0;
    return (totalTime - time) / totalTime;
  };

  if (isSetup) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Set Exam Time
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="hours"
                className="block text-sm font-medium text-white mb-1"
              >
                Hours
              </label>
              <input
                id="hours"
                type="number"
                min="0"
                max="23"
                value={inputHours}
                onChange={(e) => setInputHours(Number(e.target.value))}
                className="w-full text-xl p-2 border rounded-md bg-slate-700 text-white"
              />
            </div>
            <div>
              <label
                htmlFor="minutes"
                className="block text-sm font-medium text-white mb-1"
              >
                Minutes
              </label>
              <input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(Number(e.target.value))}
                className="w-full text-xl p-2 border rounded-md bg-slate-700 text-white"
              />
            </div>
          </div>
          <button
            onClick={handleSetTime}
            className="w-full text-xl px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();
  const rotation = progress * 360;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-[80vw] h-[80vw] max-w-[500px] max-h-[500px]">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 * (1 - progress)}
            transform="rotate(-90 50 50)"
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dy="0.3em"
            className="text-xl fill-white font-mono"
          >
            {formatTime(time)}
          </text>
        </svg>
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 1s linear",
          }}
        >
          <Plane
            className="text-yellow-400 absolute"
            size={60}
            style={{
              top: "2%",
              left: "45%",
              transform: "translate(-50%, -50%) rotate(42deg) translateY(-0px)",
            }}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button
          onClick={isRunning ? handlePause : handleStart}
          className="text-xl px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
        >
          {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="text-xl px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition flex items-center"
        >
          <RotateCcw className="mr-2" /> Reset
        </button>
      </div>
    </div>
  );
};

export default ExamTimer;
