"use client";

// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../FormInput/SubmitButton";
import TextInput from "../FormInput/TextInput";
// import { makePostRequest } from "@/lib/apiRequest";
// import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  async function onSubmit(data) {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setLoading(false);
        toast.success("User Login Successfully");
        reset();

      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          // Handle other errors
          console.error("Server Error:", responseData.message);
          toast.error("Oops Something Went wrong");
        }
      }
      //  makePostRequest('api/user', data, reset, );
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <TextInput
        label="Email"
        register={register}
        errors={errors}
        name="email"
        type="email"
        className="mb-3"
      />
      <TextInput
        label="Password"
        register={register}
        errors={errors}
        name="password"
        type="password"
        className="mb-3"
      />
      <SubmitButton
        isLoading={loading}
        title="Login"
        loadingButtonTitle="Loging account..."
      />

      <div className="flex items-center ">
        <div className="w-full bg-slate-500 h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-slate-500 h-[1px]"></div>
      </div>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-4">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
