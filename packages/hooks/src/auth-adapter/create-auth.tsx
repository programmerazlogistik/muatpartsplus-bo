"use client";

import { useSearchParams } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthAdapter } from "./auth-adapter";

export interface AuthDataMatrix {
  [key: string]: any;
}

export interface AuthDataUser {
  name?: string;
  [key: string]: any;
}

export interface AuthData {
  dataMatrix: AuthDataMatrix | null;
  dataUser: AuthDataUser | null;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export interface AuthContextValue {
  isLoggedIn: boolean;
  dataUser: AuthDataUser | null;
  dataMatrix?: AuthDataMatrix | null; // Optional matrix data
  logout: () => Promise<void>;
}

/**
 * This context is now used *only* to pass the adapter instance
 * from the AuthProvider down to the useAuth hook.
 */
const AdapterContext = createContext<AuthAdapter | null>(null);

/**
 * Creates a reusable AuthProvider and useAuth hook.
 *
 * @param adapter - An instance of AuthAdapter.
 * @returns {{
 * AuthProvider: React.FC<{children: React.ReactNode}>,
 * useAuth: () => AuthContextValue
 * }}
 */
export const createAuth = (adapter: AuthAdapter) => {
  /**
   * The provider component. Its jobs are:
   * 1. Run the one-time session initialization.
   * 2. Provide the adapter instance to the rest of the app via context.
   */
  const AuthProvider = ({ children }: AuthenticationProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
      const initAuth = async () => {
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (accessToken && refreshToken) {
          await adapter.setToken({ accessToken, refreshToken });
          // Clean URL params directly in the component
          const url = new URL(window.location.href);
          url.searchParams.delete("accessToken");
          url.searchParams.delete("refreshToken");
          window.history.replaceState({}, "", url.toString());
        }

        const token = await adapter.getToken();
        if (!token?.accessToken) {
          setIsLoading(false);
          return;
        }

        // Delegate the entire session initialization to the adapter
        await adapter.getSession(setIsLoading);
      };

      initAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // adapter is a stable class instance

    return (
      <AdapterContext.Provider value={adapter}>
        {!isLoading ? children : null}
      </AdapterContext.Provider>
    );
  };

  /**
   * Hook to consume Authentication state and actions.
   * It gets the adapter from context and uses its hooks/methods.
   * @returns {AuthContextValue}
   */
  const useAuth = (): AuthContextValue => {
    const adapter = useContext(AdapterContext);
    if (adapter === null) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    // 1. Get state by calling the adapter's state hooks
    const dataUser = adapter.useDataUser();

    // 2. Get optional matrix data (may be null if adapter doesn't support it)
    const dataMatrix = adapter?.useDataMatrix?.() || null;

    // 3. Get derived state by calling the adapter's logic hook
    const isLoggedIn = adapter.useIsLoggedIn(dataUser);

    // 4. Get actions by calling the adapter's action methods
    const logout = useCallback(() => adapter.logout(), [adapter]);

    return { dataMatrix, dataUser, isLoggedIn, logout };
  };

  return { AuthProvider, useAuth };
};

export default createAuth;