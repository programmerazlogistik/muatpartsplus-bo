import xior from "xior";

// Route configuration types
export type RouteMethod = "exact" | "startsWith" | "regex";

export interface PublicRoute {
  path: string | RegExp;
  method: RouteMethod;
}

// Token interface
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Axios configuration options
export interface CreateAxiosOptions {
  baseURL?: string;
  getToken?: () => AuthTokens;
  clearSession?: () => void;
  maintenanceRedirectTo?: string;
  publicRoutes?: PublicRoute[];
}

// Xior instance type (from xior package)
export interface XiorInstance {
  interceptors: any;
  get: (url: string, config?: any) => Promise<any>;
  post: (url: string, data?: any, config?: any) => Promise<any>;
  put: (url: string, data?: any, config?: any) => Promise<any>;
  patch: (url: string, data?: any, config?: any) => Promise<any>;
  delete: (url: string, config?: any) => Promise<any>;
  request: (config: any) => Promise<any>;
}

// Default public routes list
const LIST_PUBLIC_ROUTES: PublicRoute[] = [
  {
    path: "/",
    method: "exact",
  },
  {
    path: "/login",
    method: "exact",
  },
  // Example to check with regex
  // {
  //   // /orders/orderId/drivers/driverId/qr-code
  //   path: /^\/orders\/[^\/]+\/drivers\/[^\/]+\/qr-code$/,
  //   method: "regex",
  // },
];

/**
 * Creates a configured Xior (axios-like) instance with authentication and error handling.
 *
 * Features:
 * - Automatic token injection from getToken function
 * - 401/403 handling with session clearing and redirect
 * - 503 maintenance mode redirect
 * - Public routes that bypass authentication checks
 * - Request/response interceptors for centralized error handling
 *
 * @param options - Configuration options for the axios instance
 * @param options.baseURL - Base URL for all requests
 * @param options.getToken - Function to retrieve auth tokens
 * @param options.clearSession - Function to clear user session
 * @param options.maintenanceRedirectTo - URL to redirect for maintenance mode
 * @param options.publicRoutes - Routes that don't require authentication
 * @returns Configured Xior instance ready for making HTTP requests
 *
 * @example
 * ```typescript
 * import { createAxiosAdapter } from '@muatmuat/lib/axios-adapter';
 *
 * const api = createAxiosAdapter({
 *   baseURL: 'https://api.example.com',
 *   getToken: () => ({ accessToken: 'token', refreshToken: 'refresh' }),
 *   clearSession: () => localStorage.clear(),
 *   publicRoutes: [
 *     { path: '/login', method: 'exact' },
 *     { path: '/register', method: 'exact' }
 *   ]
 * });
 *
 * // Use the configured instance
 * const response = await api.get('/users');
 * ```
 */
export const createAxiosAdapter = ({
  baseURL = "/",
  getToken = () => ({ accessToken: "", refreshToken: "" }),
  clearSession = () => {},
  maintenanceRedirectTo = `${process.env.NEXT_PUBLIC_INTERNAL_WEB}sistem`,
  publicRoutes = LIST_PUBLIC_ROUTES,
}: CreateAxiosOptions = {}): XiorInstance => {
  const fetcher = xior.create({
    baseURL,
    timeout: 30000, // 30 seconds timeout
  });

  // Request interceptor - Add authentication tokens to all requests
  fetcher.interceptors.request.use(
    (config) => {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token?.accessToken}`;
      config.headers.refreshToken = token?.refreshToken;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Handle global error responses
  fetcher.interceptors.response.use(
    (response) => response,
    (error) => {
      // This function will be called for any status codes that fall outside the range of 2xx
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx.
        // This is where you'd typically handle 503 if the server sent a proper 503 response.
        if (error.response.status === 503) {
          console.warn(
            "Service Unavailable (503). Redirecting to maintenance page."
          );
          // Redirect the user to /maintenance
          window.location.replace(maintenanceRedirectTo);
        }
        // Handle other HTTP error codes (4xx, 5xx other than 503)
        if (error.response.status === 401 || error.response.status === 403) {
          clearSession();
          // If the user is not on the public routes, redirect to /sewaarmada
          const isPublicRoutes = publicRoutes.some((route) => {
            const pathname = window?.location?.pathname;
            if (!pathname) return false;

            switch (route.method) {
              case "exact":
                return pathname === route.path;
              case "startsWith":
                return pathname.startsWith(route.path as string);
              case "regex":
                return (
                  route.path instanceof RegExp && route.path.test(pathname)
                );
              default:
                return false;
            }
          });
          if (window?.location && !isPublicRoutes) {
            window.location.replace("/");
          }
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }

      // Always re-throw the error so it can be caught by individual API calls
      // unless you've explicitly handled it (like redirecting and preventing further resolution).
      return Promise.reject(error);
    }
  );

  return fetcher;
};