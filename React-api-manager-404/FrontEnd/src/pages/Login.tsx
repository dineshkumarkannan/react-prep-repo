import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/features/Auth/authThunk";
import { useNavigate } from "react-router-dom";

const initError = {
  name: "",
  password: "",
};

const Login = () => {
  const { error: apierror, loggedIn } = useSelector((state) => state?.auth);
  const [loginState, setLoginState] = useState({ name: "", password: "" });
  const [error, setError] = useState(initError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    setError(initError);
    const formData = new FormData(e.target);
    const username = formData.get("name");
    const password = formData.get("password");

    if (!username && !username?.trim()) {
      setError((prev) => ({ ...prev, name: "Name should be valid!" }));
    }
    if (!password && !password?.trim()) {
      setError((prev) => ({ ...prev, password: "Password should be valid!" }));
    }

    if (username && password) {
      dispatch(login({ username, password }));
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="bg-gray-200 w-[100%] md:w-[80%] lg:w-[40%] mx-auto mt-[5%] p-[1rem]">
      <form
        className="flex flex-col gap-5 justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <section className="flex justify-between text-center items-center">
          <label className="w-[20%]" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={loginState.name}
            onChange={(e) =>
              setLoginState((prev) => ({ ...prev, name: e.target.value }))
            }
            className={`bg-white p-[10px] w-[70%] border-2  ${
              error.name ? "border-amber-600" : "border-gray-300"
            }`}
          />
        </section>
        <section className="flex justify-between text-center items-center">
          <label className="w-[20%]" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginState.password}
            onChange={(e) =>
              setLoginState((prev) => ({ ...prev, password: e.target.value }))
            }
            className={`bg-white p-[10px] w-[70%] border-2  ${
              error.password ? "border-amber-600" : "border-gray-300"
            }`}
          />
        </section>
        <button className="w-[fit-content] py-3 px-4 border-1 bg-gray-500 text-white font-bold rounded-l mx-auto hover:bg-gray-600 hover:cursor-pointer">
          Submit
        </button>
      </form>
      {apierror && (
        <div className="mt-2 text-red-500 text-center">{apierror}</div>
      )}
    </div>
  );
};

export default Login;
