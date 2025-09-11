import { LayoutDashboard, LogOut, Settings } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import getInitials from "@/lib/generateInitials";

export const UserAvatar = ({ user = {} }) => {
  const router = useRouter();
  const { name, image } = user;

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button>
          {image ? (
            <Image
              src="/profile.jpg"
              alt="profile"
              height={200}
              width={200}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 p-2 flex justify-center items-center rounded-full object-cover bg-slate-600 shadow-md border border-slate-600">
              {getInitials(name)}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 px-4 pr-8">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/dashboard"} className="flex items-center space-x-2">
            <LayoutDashboard className="mr-2 w-4 h-4 rounded-lg" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/dashboard/profile"}
            className="flex items-center space-x-2"
          >
            <Settings className="mr-2 w-4 h-4 rounded-lg" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="mr-2 w-4 h-4 rounded-lg" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
