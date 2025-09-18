import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";

const Pending = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="container min-h-screen flex flex-col items-center justify-center px-6 bg-white text-center">
      <img
        src="https://img.icons8.com/fluency/96/task.png"
        alt="submitted"
        className="mb-4"
      />

      <h2 className="text-lg font-semibold mb-2">
        Siz barcha ma’lumotlarni topshirdingiz
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Hujjatlar va ma’lumotlarni tekshiramiz va sizga imkon qadar tezroq javob
        beramiz.
      </p>

      <p className="text-4xl font-bold tracking-widest mb-6">
        {formatTime(time)}
      </p>

      <p className="text-sm text-gray-600 mb-10">
        Savollaringiz bormi?{" "}
        <a href="tel:+998901234567" className="text-blue-600 underline">
          Operator bilan bog‘lanish
        </a>
      </p>

      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={() => navigate("/")}
          className="flex-1 border border-gray-300 rounded-xl py-3 text-gray-700 cursor-pointer hover:opacity-80"
        >
          Yopish
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex-1 bg-blue-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 cursor-pointer hover:opacity-80"
        >
          <RotateCcw size={18} /> Yangilash
        </button>
      </div>
    </div>
  );
};

export default memo(Pending);
