"use client";

import Image from "next/image";
import Link from "next/link";

import { IconComponent } from "@muatmuat/ui/IconComponent";

const Navbar = ({ user = "Admin", toggleSidebar, sidebarOpen }) => {
  return (
    <div className="bg-primary sticky left-0 top-0 z-30 flex h-[58px] w-full w-screen items-center justify-between px-7 text-white">
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-md p-2 text-white transition-all duration-200 hover:bg-primary-800 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <IconComponent
            src="/icons/nav/fix-button.svg"
            alt="Toggle Menu"
            width={28}
            height={28}
          />
        </button>
        <div className="bg-primary flex h-[58px] items-center justify-center px-4">
          <Link href="/">
            <div className="flex flex-col items-center">
              <Image
                src="/svg/logo-muatmuat.svg"
                alt="MuatMuat Logo"
                width={120}
                height={32}
              />
            </div>
            <div className="-mt-2 text-center text-sm font-semibold text-white">
              <p>admin muatparts +</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Icon links */}
      <div className="ml-auto flex items-center space-x-[14px]">
        {/* User profile */}
        <div className="flex cursor-pointer items-center space-x-1 rounded-md bg-white px-4 py-2 text-[#176CF7] transition-all duration-200 hover:bg-gray-100">
          <div className="flex items-center">
            <span className="text-sm font-medium">{user}</span>
          </div>
          <IconComponent
            src="/icons/nav/chevron.svg"
            alt="Dropdown"
            width={8}
            height={8}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
