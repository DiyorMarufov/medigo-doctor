import { memo, useRef, type FormEvent } from "react";
import { useAuth } from "../services/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";

const Otp = () => {
  const code = useRef<HTMLInputElement | null>(null);
  const { verifyOtp } = useAuth();
  const {
    mutate: verifyOtpMutate,
    isPending,
    isError,
    error,
  } = verifyOtp;
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyOtpMutate(
      { otp: code.current?.value || "", phone: state },
      {
        onSuccess: (res) => {
          if (res.AcsesToken) {
            dispatch(setToken(res.AcsesToken));
            navigate("/");
          } else {
            navigate("/upload-file", { state: res.data.id });
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 relative">
      {isError && (
        <div className="absolute top-6 w-[90%] max-w-sm bg-black text-white rounded-lg shadow-md flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <span className="text-red-500">⚠️</span>
            <span className="text-sm">
              {error?.response?.data?.error?.message ||
                "Tasdiqlash kodi xato kiritildi"}
            </span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-gray-300 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col items-center gap-6 mt-20"
      >
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-semibold">{state}</span>
          <span className="text-gray-500 text-sm cursor-pointer">✎</span>
        </div>

        <p className="text-gray-600 text-sm text-center">
          Raqamga tasdiqlash kodi yuborildi
        </p>

        <input
          ref={code}
          type="number"
          className={`text-2xl text-center font-bold tracking-widest outline-none w-40
            ${
              isError
                ? "text-red-600 border-b-2 border-red-600"
                : "text-black border-b-2 border-gray-300 focus:border-black"
            }`}
          placeholder="● ● ● ●"
        />

        <button
          disabled={isPending}
          className={`w-full py-3 rounded-lg text-white text-lg font-medium transition 
            ${
              isPending
                ? "bg-gray-300"
                : "bg-black hover:bg-gray-800 active:scale-[0.98]"
            }`}
        >
          {isPending ? "Kuting..." : "Davom etish"}
        </button>

        <button
          type="button"
          className="flex items-center space-x-2 text-blue-600 text-sm mt-4"
        >
          <span>Kodni qayta yuborish</span>
          <span className="bg-blue-600 text-white rounded-full p-1 text-xs">
            🔄
          </span>
        </button>
      </form>
    </div>
  );
};

export default memo(Otp);
