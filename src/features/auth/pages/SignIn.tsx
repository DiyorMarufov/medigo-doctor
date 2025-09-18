import { memo, useRef, type FormEvent } from "react";
import { useAuth } from "../services/useAuth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const phone = useRef<HTMLInputElement | null>(null);
  const { signIn } = useAuth();
  const { mutate: signInMutate, isPending, isError, error } = signIn;
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tel = `+998${phone.current?.value}`;
    signInMutate(
      { phone: tel },
      {
        onSuccess: () => {
          navigate("/otp", { state: tel });
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <div className="w-6 h-4 bg-gradient-to-b from-blue-500 via-yellow-400 to-green-500 rounded-sm"></div>
        <span className="text-sm font-medium">O‘zbekcha</span>
        <span className="text-gray-500 text-xs">▼</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-center text-lg font-medium text-gray-700">
          Telefon raqamingizni kiriting
        </h2>

        {isError && (
          <div className="text-red-500 text-center text-sm">
            {error?.response?.data?.error?.message}
          </div>
        )}

        <div className="flex items-center border-b-2 border-gray-300 focus-within:border-black text-xl font-medium py-2">
          <span className="mr-2">+998</span>
          <input
            ref={phone}
            type="number"
            className="flex-1 outline-none text-xl"
            placeholder="__ ___ __ __"
          />
        </div>

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
      </form>
    </div>
  );
};

export default memo(SignIn);

