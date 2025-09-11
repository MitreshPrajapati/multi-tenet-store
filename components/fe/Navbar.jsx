"use client";
import Link from "next/link";
import React from "react";
import { SearchForm } from "./SearchForm";
import Image from "next/image";
import logo from "../../public/logo.svg";
import darklogo from "../../public/darklogo.svg";

import { ShoppingCart, User } from "lucide-react";
import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import HelpModal from "./HelpModal";
import CartCount from "./CartCount";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { UserAvatar } from "../be/UserAvatar";
// import { useTheme } from "next-themes";

const Navbar = () => {
  const { data: session, status } = useSession();
  //   const { theme } = useTheme();
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="bg-white dark:bg-slate-700 w-full ">
      <div className="flex item-center justify-between py-3 max-w-7xl mx-auto px-8 gap-8">
        <Link href="/">
          <Image src={darklogo} alt="logo" className="w-30" />
        </Link>

        <div className="flex-grow">
          <SearchForm />
        </div>

        <div className="flex gap-8 justify-between items-center">
          {status === "unauthenticated" ? (
            <Link
              href="/login"
              className="flex items-center space-x-1 text-gray-800 dark:text-slate-50"
            >
              <User />
              <span>Login</span>
            </Link>
          ) : (
            <UserAvatar user={session?.user} />
          )}

          <HelpModal />

          <CartCount />

          <ThemeSwitcherBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
