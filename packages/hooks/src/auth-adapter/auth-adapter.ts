export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  isLoggedIn: boolean;
  name?: string;
  email?: string;
  [key: string]: any;
}

export interface AuthMatrix {
  [key: string]: any;
}

export declare class AuthAdapter {
  // Primitive State Actions
  getToken(): Promise<AuthToken | null>;
  setToken(token: AuthToken): Promise<void>;
  clearToken(): Promise<void>;
  setUser(user: AuthUser): Promise<void>;
  setDataMatrix(matrix: AuthMatrix): Promise<void>;
  clearUser(): Promise<void>;

  // Primitive API/Platform Actions
  getSessionData(): Promise<{ user: AuthUser; matrix: AuthMatrix }>;
  revokeToken(refreshToken: string): Promise<void>;
  redirect(): void;

  // Orchestration Methods
  getSession(
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void>;
  logout(): Promise<void>;

  // State Selection Hooks
  useDataUser(): AuthUser | null;
  useDataMatrix(): AuthMatrix | null;
  useIsLoggedIn(dataUser: AuthUser | null): boolean;
}