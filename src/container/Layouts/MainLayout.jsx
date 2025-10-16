"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { Toaster } from "@muatmuat/ui/Toaster";

import LoadingStatic from "@/components/Loading/LoadingStatic";

import Navbar from "@/container/Layouts/Navbar";
import Sidebar from "@/container/Layouts/Sidebar";

import useDevice from "@/hooks/use-device";

import { useResponsiveNavigation } from "@/lib/responsive-navigation";
import { StackManagerInitializer } from "@/lib/stack-manager";

import { useLoadingAction } from "@/store/Shared/loadingStore";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Suspense fallback={<LoadingStatic />}>
      <div className="grid min-h-screen grid-rows-[58px_1fr] overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div
          className={`absolute z-20 h-screen w-64 bg-white shadow-md transition-all duration-300 ${
            sidebarOpen ? "left-0" : "-left-64"
          }`}
        >
          <Sidebar />
        </div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        <main className="flex-1 overflow-y-auto bg-white p-[18px]">
          {children}
        </main>
      </div>
      <Toaster />
      <Script />
      <StackManagerInitializer />
    </Suspense>
  );
};

export default MainLayout;

const Script = () => {
  useDefaultTimeoutLoading();
  useResetNavigationOnDesktop();

  return null;
};

const useResetNavigationOnDesktop = () => {
  const router = useRouter();
  const { isMobile } = useDevice();
  const { replace: replaceNavigation } = useResponsiveNavigation();
  const searchParams = useSearchParams();
  const screenSearchParam = searchParams.get("screen");

  useEffect(() => {
    if (!screenSearchParam) return;
    if (!isMobile) {
      const currentSeach = new URLSearchParams(window.location.search);
      currentSeach.delete("screen");
      router.replace(`${window.location.pathname}?${currentSeach.toString()}`, {
        scroll: false,
      });
      replaceNavigation("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, screenSearchParam]);
};

const useDefaultTimeoutLoading = () => {
  const { setIsGlobalLoading } = useLoadingAction();
  const timer = useRef();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setIsGlobalLoading(false);
    }, 2000);

    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
