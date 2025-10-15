"use client";

import { useRouter } from "next/navigation";

import { IconComponent } from "@muatmuat/ui/IconComponent";

import { cn } from "@/lib/utils";

const PageTitle = ({
  className,
  href = null,
  children,
  withBack = true,
  onClick = null,
  appearance = {
    iconClassName: "",
  },
  onBackClick = null,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "mb-4 flex items-center gap-3 text-xl font-semibold",
        className
      )}
    >
      {withBack && (
        <button
          className={appearance.iconClassName}
          onClick={onBackClick || handleBackClick}
        >
          <IconComponent
            src="/icons/arrow-left.svg"
            size={20}
            className={cn(appearance.iconClassName)}
          />
        </button>
      )}
      <h1>{children}</h1>
    </div>
  );
};

export default PageTitle;
