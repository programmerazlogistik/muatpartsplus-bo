"use client";

import { useState } from "react";

import Button from "@/components/Button/Button";
import PageTitle from "@/components/PageTitle/PageTitle";

import { cn } from "@/lib/utils";

import { IconComponent } from "@/components";

import NonRuteKhusus from "./NonRuteKhusus";
import RuteKhusus from "./RuteKhusus";

const SettingDefaultPricingContainer = () => {
  const [activeTab, setActiveTab] = useState("nonRuteKhusus"); // default tab
  const [data, setData] = useState(false);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between">
        <PageTitle withBack={false}>Setting Default Pricing</PageTitle>
        <Button variant="muatparts-primary" disabled={true}>
          <span className="pt-0.5 text-xs font-semibold">
            Lihat History Perubahan
          </span>
        </Button>
      </div>

      {/* Tabs */}
      {data ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          <IconComponent src="/icons/search.svg" />
          <span className="text-sm font-semibold text-[#868686]">
            {" "}
            Belum ada data rute pricing
          </span>
        </div>
      ) : (
        <div>
          <div className="mt-3 flex w-full items-center">
            <div className="flex gap-0">
              <Button
                variant={
                  activeTab === "nonRuteKhusus"
                    ? "muatparts-primary"
                    : "muatparts-primary-secondary"
                }
                className={cn(
                  "min-w-[200px] rounded-[4px] rounded-r-none px-6 py-2 text-sm font-semibold",
                  activeTab === "nonRuteKhusus"
                    ? "z-10"
                    : "border-[#868686] text-[#868686] hover:bg-neutral-100"
                )}
                onClick={() => handleTabChange("nonRuteKhusus")}
              >
                Non Rute Khusus
              </Button>
              <Button
                variant={
                  activeTab === "ruteKhusus"
                    ? "muatparts-primary"
                    : "muatparts-primary-secondary"
                }
                className={cn(
                  "-ml-px min-w-[200px] rounded-[4px] rounded-l-none px-6 py-2 text-sm font-semibold",
                  activeTab === "ruteKhusus"
                    ? "z-10 border-[#0066FF] text-white"
                    : "border-[#868686] text-[#868686] hover:bg-neutral-100"
                )}
                onClick={() => handleTabChange("ruteKhusus")}
              >
                Rute Khusus
              </Button>
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-5">
            {activeTab === "nonRuteKhusus" && <NonRuteKhusus />}
            {activeTab === "ruteKhusus" && <RuteKhusus />}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingDefaultPricingContainer;
