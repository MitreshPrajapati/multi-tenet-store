import {
  AlignJustify,
  Bell,
  LayoutDashboard,
  LogOut,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcherBtn from "../ThemeSwitcherBtn";

const Navbar = ({ setShowSidebar, showSidebar }) => {
  return (
    <nav
      className={"flex items-center justify-between bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 h-20 px-8 py-4 w-full fixed md:w-[calc(100%-256px)] top-0 right-0 z-10  shadow-md shadow-slate-300 dark:shadow-slate-900"
      }
      // className={
      //   showSidebar
      //     ? "flex items-center justify-between w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 h-20 px-8 py-4 fixed top-0 right-0 z-10  max-md:pr-40 md:pr-[16rem] shadow-lg shadow-slate-300 dark:shadow-slate-900"
      //     : "flex items-center justify-between bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 h-20 px-8 py-4 fixed top-0 w-full  right-0 z-10 max-md:pr-40 md:pr-[16rem] shadow-lg shadow-slate-300 dark:shadow-slate-900"
      // }
    >
      {/* Icon */}
      <button
        className=" text-lime-600 dark:text-slate-100 pt-2"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <AlignJustify />
      </button>

      {/* Right Part */}
      <div className="flex space-x-3 pt-2">
        <ThemeSwitcherBtn />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="relative inline-flex items-center p-2 text-sm font-medium text-center text-slate-950 dark:text-white bg-transpatent rounded-full  focus:outline-none"
            >
              <Bell className="" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-transparent rounded-full -top-1 -end-1 ">
                20
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4 pr-8">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Image
                  src="/profile.jpg"
                  alt="profile"
                  height={40}
                  width={40}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col space-y-1">
                  <p>Lorem ipsum dolor, sit amet</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-red-700 text-white rounded-full">
                      Stock Out
                    </p>
                    <p>Dec 12 2024 - 12:40PM</p>
                  </div>
                </div>
                <button>
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Image
                  src="/profile.jpg"
                  alt="profile"
                  height={40}
                  width={40}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col space-y-1">
                  <p>Lorem ipsum dolor, sit amet</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-red-700 text-white rounded-full">
                      Stock Out
                    </p>
                    <p>Dec 12 2024 - 12:40PM</p>
                  </div>
                </div>
                <button>
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Image
                  src="/profile.jpg"
                  alt="profile"
                  height={40}
                  width={40}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col space-y-1">
                  <p>Lorem ipsum dolor, sit amet</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-red-700 text-white rounded-full">
                      Stock Out
                    </p>
                    <p>Dec 12 2024 - 12:40PM</p>
                  </div>
                </div>
                <button>
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>
              <Image
                src="/profile.jpg"
                alt="profile"
                height={40}
                width={40}
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4 pr-8">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <LayoutDashboard className="mr-2 w-4 h-4 rounded-lg" />
                <span>Dashboard</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <Settings className="mr-2 w-4 h-4 rounded-lg" />
                <span>Edit Profile</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <LogOut className="mr-2 w-4 h-4 rounded-lg" />
                <span>Logout</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
