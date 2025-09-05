import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type = "text",
  placeholder,
  register,
  errors,
  label,
  id,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(id)}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none pr-10 text-sm md:text-base
          disabled:cursor-not-allowed ${
            errors?.[id]
              ? "border-red-500 focus:ring-1 focus:ring-red-400"
              : "border-gray-300 focus:ring-1 focus:ring-blue-300"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {errors?.[id] && (
        <small className="text-red-500 text-xs">{errors[id].message}</small>
      )}
    </div>
  );
};

export default Input;
