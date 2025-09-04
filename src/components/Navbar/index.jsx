"use client";

import Link from "next/link";

import IconComponent from "@/components/IconComponent/IconComponent";

const Navbar = ({ user = "John", toggleSidebar, sidebarOpen }) => {
  return (
    <div className="bg-primary flex h-[58px] w-full items-center justify-between px-7 text-white">
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-md p-2 text-white transition-all duration-200 hover:bg-primary-800 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <IconComponent
            src="/icons/nav/hamburger.svg"
            alt="Toggle Menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Icon links */}
      <div className="ml-auto flex items-center space-x-[14px]">
        <Link href="/home" className="flex items-center">
          <IconComponent
            src="/icons/nav/home.svg"
            alt="Home"
            width={20}
            height={20}
          />
        </Link>
        <Link href="/messages" className="flex items-center">
          <IconComponent
            src="/icons/nav/mail.svg"
            alt="Messages"
            width={20}
            height={20}
          />
        </Link>
        <Link href="/notifications" className="flex items-center pr-4">
          <IconComponent
            src="/icons/nav/notif.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
        </Link>

        {/* User profile */}
        <div className="flex cursor-pointer items-center space-x-1">
          <div className="flex items-center">
            <IconComponent
              src="/icons/nav/user.svg"
              alt="User Profile"
              width={24}
              height={24}
              color="white"
            />
            <span className="ml-2">{user}</span>
          </div>
          <IconComponent
            src="/icons/nav/chevron.svg"
            alt="Dropdown"
            width={24}
            height={24}
            color="white"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
