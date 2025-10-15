"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { IconComponent } from "@muatmuat/ui/IconComponent";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Vendor Domestik",
      icon: "/icons/nav/user.svg",
      href: "/vendor-domestik",
      expandable: true,
      children: [
        {
          name: "Register Vendor Baru",
          href: "/vendor-domestik/vendor-baru",
        },
        {
          name: "Vendor Terdaftar",
          href: "/vendor-domestik/vendor-terdaftar",
        },
        {
          name: "Vendor Nonaktif",
          href: "/vendor-domestik/vendor-nonaktif",
        },
      ],
    },
    {
      name: "Vendor International",
      icon: "/icons/nav/user.svg",
      href: "/vendor-international",
      expandable: true,
      children: [
        {
          name: "Register Vendor Baru",
          href: "/vendor-international/vendor-baru",
        },
        {
          name: "Vendor Terdaftar",
          href: "/vendor-international/vendor-terdaftar",
        },
        {
          name: "Vendor Nonaktif",
          href: "/vendor-international/vendor-nonaktif",
        },
      ],
    },
  ];

  // initialize expanded parents that are active
  const [expanded, setExpanded] = useState(() =>
    menuItems
      .filter(
        (it) =>
          Array.isArray(it.children) &&
          it.children.length > 0 &&
          (pathname === it.href || pathname.startsWith(`${it.href}/`))
      )
      .map((it) => it.href)
  );

  return (
    <div className="flex h-screen flex-col bg-[#002064] shadow-[2px_0px_16px_0px_#00000026]">
      <div className="mt-16 flex flex-grow flex-col overflow-y-auto px-[13px] py-2">
        {menuItems.map((item, index) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const isExpanded = expanded.includes(item.href);
          return (
            <div key={index}>
              {item.expandable ? (
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) =>
                      prev.includes(item.href)
                        ? prev.filter((p) => p !== item.href)
                        : [...prev, item.href]
                    )
                  }
                  aria-expanded={isExpanded}
                  className={`flex w-full items-center justify-between px-[10px] py-6 text-left transition-colors duration-200`}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <IconComponent
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        color={"white"}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {item.name}
                    </span>
                  </div>
                  <IconComponent
                    src="/icons/chevron-down.svg"
                    alt="Chevron Down"
                    width={20}
                    height={20}
                    color={"white"}
                    className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-[10px] py-2 transition-colors duration-200 ${
                    isActive ? "bg-[#007BFF]" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <IconComponent
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        color={"white"}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {item.name}
                    </span>
                  </div>
                </Link>
              )}
              {item.expandable && item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child, childIndex) => {
                    const isChildActive =
                      pathname === child.href ||
                      pathname.startsWith(`${child.href}/`);
                    return (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={`ml-5 flex items-center px-[10px] py-5 transition-colors duration-200 ${
                          isChildActive ? "bg-[#007BFF]" : ""
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold text-white">
                          <IconComponent
                            src="/icons/rec.svg"
                            alt="Chevron Right"
                            width={16}
                            height={16}
                            color={"white"}
                          />
                          {child.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
