import * as React from "react";

export interface LoadingStaticProps {}

/**
 * SSR / RSC Friendly Loading Component that always renders a full-screen loading overlay.
 * Perfect for server-side rendered applications, React Server Components, and Suspense boundaries.
 */
export default function LoadingStatic(): React.ReactElement {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur-md">
      <img
        src={"/img/loading-animation.webp"}
        width={100}
        height={100}
        alt="loading"
      />
    </div>
  );
}
