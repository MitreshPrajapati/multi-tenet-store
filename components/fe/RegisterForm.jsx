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

export default function RegisterForm({ role = "USER" }) {
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
      console.log(data);
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
        toast.success("User Created Successfully");
        reset();

        if (role === "USER") {
          router.push("/");
        } else if (role === "FARMER") {
          router.push(`/onboarding/${responseData.data.id}`);
        }
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
        label=""
        register={register}
        errors={errors}
        name="role"
        // disabled={true}
        type="hidden"
        defaultValue={role}
        className="mb-3"
      />
      <TextInput
        label="Full Name"
        register={register}
        errors={errors}
        name="name"
        type="text"
        className="mb-3"
      />
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
        title="Register"
        loadingButtonTitle="Creating account..."
      />

      <div className="flex items-center ">
        <div className="w-full bg-slate-500 h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-slate-500 h-[1px]"></div>
      </div>

      {/* <div className="">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full text-slate-950 bg-white hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center flex items-center dark:focus:ring-slate-100 me-2 mb-4 border border-slate-200"
        >
          <FaGoogle className="mr-2 text-red-600 w-4 h-4" />
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="w-full justify-center text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          
          <FaGithub className="mr-2 w-4 h-4" />
          Sign up with Github
        </button>
      </div> */}

      <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
