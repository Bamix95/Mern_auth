import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginSchema } from "../utils/validationSchemas";
import Input from "../components/Input";
import { LoaderIcon } from "lucide-react";

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const isLoading = false;

  return (
    <section className="w-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-md w-full mx-auto px-4"
      >
        <div className="mt-4 space-y-3">
          <h1 className="text-center text-black font-semibold text-2xl md:text-2xl">
            Welcome Back!
          </h1>
          <p className="text-center text-gray-700 text-sm">
            Log in to access your account and continue where you left off
          </p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            id="email"
            placeholder="Enter Email..."
            label="Email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter Password..."
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-[#21242c] text-gray-50 outline-none rounded-lg cursor-pointer
            flex items-center justify-center active:opacity-90 active:scale-95 disabled:opacity-40 shadow-sm
            disabled:cursor-not-allowed hover:scale-105 hover:opacity-90 transition duration-300 ease-in-out"
          >
            {isLoading ? (
              <LoaderIcon className="text-gray-50 animate-spin" size={24} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1">
          <div className="w-full h-[2px] bg-gray-300" />
          <span className="text-sm text-gray-300">OR</span>
          <div className="w-full h-[2px] bg-gray-300" />
        </div>

        <button
          type="button"
          className="bg-transparent w-full px-6 py-2.5 text-black mt-6 border border-gray-300 rounded-lg
         cursor-pointer outline-none shadow-sm"
        >
          Continue with Google
        </button>

        <p className="text-sm mt-6 text-center text-gray-800">
          Don't have an account yet?{" "}
          <Link
            to="/authentication/sign-up"
            className="text-black hover:underline hover:underline-offset-2 transition-all duration-200 ease-in-out"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default SignIn;
