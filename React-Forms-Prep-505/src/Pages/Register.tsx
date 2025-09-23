import React from "react";
import { useForm } from "react-hook-form";

type RegisterForm = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  address: string;
  isAgree: boolean;
};

const initialFormState = {
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  address: "",
  isAgree: false,
};

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterForm>(initialFormState);

  function onRegister(data: RegisterForm) {
    console.log(data);
  }

  return (
    <div>
      <div className="w-[100%] my-4 mx-auto p-4 rounded-xl flex flex-col bg-gray-200 md:w-[80%] lg:w-[40%]">
        <h2 className="text-center text-xl font-bold mb-4">Register</h2>
        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex flex-col gap-4"
        >
          <section className="w-[100%] flex justify-between gap-4">
            <input
              {...register("firstName")}
              className="w-[inherit] p-2 bg-gray-100"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
            <input
              {...register("lastName")}
              className="w-[inherit] p-2 bg-gray-100"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
          </section>
          <section className="w-[100%] flex justify-between gap-4">
            <select
              {...register("gender")}
              name="gender"
              id="gender"
              className="w-[inherit] p-2 bg-gray-100"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <input
              {...register("dob")}
              className="w-[inherit] p-2 bg-gray-100"
              type="date"
              name="dob"
              id="dob"
              placeholder="DOB"
            />
          </section>
          <section className="w-[100%] ">
            <textarea
              {...register("address")}
              className="w-[inherit] p-2 bg-gray-100"
              name="address"
              id="address"
              placeholder="Address"
            ></textarea>
          </section>
          <section>
            <input {...register("isAgree")} type="checkbox" className="p-2" />{" "}
            Agree
          </section>
          <section>
            <button className="py-4 px-6 bg-gray-700 text-gray-200 rounded-xl">
              Register
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Register;
