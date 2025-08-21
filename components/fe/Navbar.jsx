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
// import { useTheme } from "next-themes";

const Navbar = () => {
  //   const { theme } = useTheme();
  return (
    <div className="bg-white dark:bg-slate-700 w-full ">
      <div className="flex item-center justify-between py-3 max-w-7xl mx-auto px-8 gap-8">
        <Link href="/">
          <Image src={darklogo} alt="logo" className="w-30" />
        </Link>
        <div className="flex-grow">
          <SearchForm />
        </div>

        <ThemeSwitcherBtn />

        <div className="flex gap-4">
          <Link
            href="/login"
            className="flex items-center space-x-1 text-gray-800 dark:text-slate-50"
          >
            <User />
            <span>Login</span>
          </Link>

          <HelpModal />

          <CartCount />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
