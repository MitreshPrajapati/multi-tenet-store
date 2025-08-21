"use client";

import {
  Boxes,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  ScanSearch,
  SendToBack,
  Settings,
  Slack,
  Truck,
  User2,
  UserSquare2,
  Users,
  Warehouse,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sidebar = ({ showSidebar }) => {
  const pathname = usePathname();

  const catalogueLinks = [
    {
      title: "Products",
      icon: Boxes,
      link: "/dashboard/products",
    },
    {
      title: "Categories",
      icon: LayoutList,
      link: "/dashboard/categories",
    },
    // {
    //   title: "Attributes",
    //   icon: SendToBack,
    //   link: "/dashboard/attributes",
    // },
    {
      title: "Coupons",
      icon: ScanSearch,
      link: "/dashboard/coupons",
    },
    {
      title: "Store Banners",
      icon: MonitorPlay,
      link: "/dashboard/banners",
    },
  ];
  const sidebarLinks = [
    {
      title: "Customers",
      icon: User2,
      link: "/dashboard/customers",
    },
    {
      title: "Markets",
      icon: Warehouse,
      link: "/dashboard/markets",
    },
    {
      title: "Farmers",
      icon: UserSquare2,
      link: "/dashboard/farmers",
    },
    {
      title: "Orders",
      icon: Truck,
      link: "/dashboard/orders",
    },
    {
      title: "Our Staff",
      icon: Users,
      link: "/dashboard/staff",
    },
    {
      title: "Community",
      icon: Building2,
      link: "/dashboard/community",
    },
    {
      title: "Wallet",
      icon: CircleDollarSign,
      link: "/dashboard/wallet",
    },
    {
      title: "Settings",
      icon: Settings,
      link: "/dashboard/settings",
    },
    {
      title: "Online Store",
      icon: ExternalLink,
      link: "/",
    },
  ];

  const [openMenu, setOpenMenu] = useState(false);

  const { theme } = useTheme();
  return (
    <div
      className={
        showSidebar
          ? "sm:block bg-white dark:bg-slate-700 space-y-6 w-64 text-slate-800 dark:text-slate-50  fixed h-screen max-md:top-20 left-0 shadow-md z-20 "
          : "hidden md:block bg-white dark:bg-slate-700 space-y-6 w-64 h-screen text-slate-800 dark:text-slate-50  fixed  left-0 shadow-md z-20 "
      }
    >
      <Link href="/" className="mb-6 px-6 ml-6 py-4">
        {theme === "dark" ? (
          <div className="flex flex-col items-center">
            <h1 className="text-green-500 text-2xl font-bold text-left">
              NAKLI
            </h1>
            <h3 className="text-green-500 text-sm font-normal text-left mt-[-5px]">
              BAZAR <span className="text-md font-semibold">{"--->"}</span>
            </h3>
          </div>
        ) : (
          <Image
            src="/logo.svg"
            height={100}
            width={200}
            alt="logo"
            className="w-40 text-white mx-auto"
          />
        )}
      </Link>

      <div className="space-y-3 flex flex-col mt-12 lg:h-[calc(100vh-220px)] overflow-y-scroll scroll-smooth">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 px-6 py-2 border-l-4 border-green-500 "
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>

        <Collapsible>
          <CollapsibleTrigger onClick={() => setOpenMenu(!openMenu)}>
            <button className="flex items-center space-x-6 px-6 py-2  ">
              <div className="flex items-center space-x-3 ">
                <Slack />
                <span>Catalogue</span>
              </div>
              {openMenu ? <ChevronDown /> : <ChevronRight className="" />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 bg-slate-100 dark:bg-slate-800 py-4 px-3 mb-2 mx-4 rounded-lg">
            {catalogueLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={
                  pathname === item.link
                    ? "flex items-center space-x-3 py-2 text-sm text-green-500"
                    : "flex items-center space-x-3 py-2 text-sm"
                }
              >
                <item.icon />
                <span>{item.title}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {sidebarLinks?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={
              item.link === pathname
                ? "flex items-center space-x-3 px-6 py-2 border-l-4 border-green-600 text-green-500"
                : "flex items-center space-x-3 px-6 py-2"
            }
          >
            <item.icon />
            <span>{item?.title}</span>
          </Link>
        ))}

        {/* <div className="px-6 py-2">
          <button className="flex items-center space-x-3 px-6 py-2 bg-green-500 rounded-lg border-l-4 border-green-600 ">
            <LogOut className="text-white" />
            <span className="text-white">Logout</span>
          </button>
        </div> */}
      </div>
        <div className="px-6 pb-2">
          <button className="flex items-center space-x-3 px-6 py-2 bg-green-500 rounded-lg border-l-4 border-green-600 ">
            <LogOut className="text-white" />
            <span className="text-white">Logout</span>
          </button>
        </div>
    </div>
  );
};

export default Sidebar;
