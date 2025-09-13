"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LoadingStatic from "@/components/Loading/LoadingStatic";

import LoginContainer from "@/container/LoginContainer";

import { useTokenStore } from "@/store/AuthStore/tokenStore";

const LoginPage = () => {
  const router = useRouter();
  const { accessToken, isHydrated } = useTokenStore();

  useEffect(() => {
    if (isHydrated && accessToken) {
      router.replace("/");
    }
  }, [isHydrated, accessToken, router]);

  if (!isHydrated) {
    return <LoadingStatic />;
  }

  if (accessToken) {
    return null;
  }

  return <LoginContainer />;
};

export default LoginPage;
