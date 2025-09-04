"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import IconComponent from "../IconComponent/IconComponent";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Master Pricing",
      icon: "/icons/Harga.svg",
      href: "/master-pricing",
    },
    {
      name: "Master Voucher",
      icon: "/icons/voucher.svg",
      href: "/master-voucher",
    },
  ];

  return (
    <div className="flex h-screen flex-col bg-white shadow-[2px_0px_16px_0px_#00000026]">
      {/* Logo */}
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
          <div className="-mt-1 text-center text-sm font-medium text-white">
            <p>BO GM Muatrans</p>
          </div>
        </Link>
      </div>

      {/* Menu items */}
      <div className="mt-4 flex flex-grow flex-col gap-[5px] overflow-y-auto px-[13px] py-2">
        {menuItems.map((item, index) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-[10px] py-2 transition-colors duration-200 ${
                isActive ? "bg-primary text-white" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  <IconComponent
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                    color={isActive ? "white" : "black"}
                  />
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>

              {!isActive && (
                <div className="!text-neutral-900">
                  <IconComponent
                    src="/icons/chevron-right.svg"
                    alt="Chevron Right"
                    width={24}
                    height={24}
                    color="black"
                    className="!text-neutral-900"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout button at the bottom */}
      {/* <div className="mt-auto border-t p-4">
        <Link href="/logout" className="flex items-center text-red-500">
          <div className="mr-3">
            <Image
              src="/icons/log-out.svg"
              alt="Logout"
              width={20}
              height={20}
            />
          </div>
          <span>Logout</span>
        </Link>
      </div> */}
    </div>
  );
};

export default Sidebar;
