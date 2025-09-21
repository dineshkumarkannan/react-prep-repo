import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CodeBlock from "../Components/SyntaxHighlighter";

type loginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValue: {
      email: "",
      password: "",
    },
  });
  const [data, setData] = useState<loginForm>({ email: "", password: "" });

  const onSubmit = (data: loginForm) => {
    if (isValid) {
      setData(data);
    }
  };

  const onReset = () => {
    reset({ email: "", password: "" });
  };

  return (
    <div>
      <div className="w-[100%] my-4 mx-auto p-4 rounded-xl flex flex-col bg-gray-200 md:w-[80%] lg:w-[40%]">
        <h2 className="text-center text-xl font-bold mb-4">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4"
        >
          <section className="flex flex-col w-[100%] items-center">
            <input
              type="email"
              placeholder="enter email here..."
              {...register("email", { required: "email is required." })}
              className={
                "w-[100%] md:w-[80%] bg-gray-50 p-1 mx-auto text-center " +
                `${errors?.email ? "border-2 border-red-400" : ""}`
              }
            />
            <span className="text-red-400">
              {errors?.email && <>{errors.email.message}</>}
            </span>
          </section>
          <section className="flex flex-col w-[100%] items-center">
            <input
              type="password"
              placeholder="enter password here..."
              {...register("password", {
                required: "password is required.",
                minLength: { value: 6, message: "length should 6 char." },
              })}
              className={
                "w-[100%] md:w-[80%] bg-gray-50 p-1 mx-auto text-center " +
                `${errors?.password ? "border-2 border-red-400" : ""}`
              }
            />
            <span className="text-red-400">
              {errors?.password && <>{errors.password.message}</>}
            </span>
          </section>
          <div className="flex gap-2">
            <button
              type="submit"
              className="py-1 px-4 border-2 w-[fit-content]"
            >
              Login
            </button>
            {isValid && data.email && (
              <button
                onClick={() => onReset()}
                className="py-1 px-4 border-2 border-black w-[fit-content] bg-gray-600 text-white"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {isValid && data.email && (
        <div className="w-[80%] mx-auto md:w-[40%]">
          <div className="text-green-600">Successfully logged-in...</div>
          <CodeBlock code={JSON.stringify(data, null, 2)} language={JSON} />
        </div>
      )}
    </div>
  );
};

export default Login;
