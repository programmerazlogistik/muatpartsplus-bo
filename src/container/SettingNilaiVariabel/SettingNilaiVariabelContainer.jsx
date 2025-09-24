"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Import the route list service
import {
  transformRouteListToTableData,
  useGetRouteList,
} from "@/services/masterpricing/masterrute/getRouteList";
// Import the variable pricing service
import { useGetVariablePricing } from "@/services/masterpricing/settingnilaivariable/getVariablePricing";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import PageTitle from "@/components/PageTitle/PageTitle";

import { IconComponent } from "@/components";

import SettingNilaiVariabelTable from "./SettingNilaiVariabelTable";

export default function SettingNilaiVariabelContainer() {
  const router = useRouter();

  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingVariables, setUpdatingVariables] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedRouteId, setExpandedRouteId] = useState(null);
  const [openStates, setOpenStates] = useState({});
  const [routeSearchQueries, setRouteSearchQueries] = useState({});

  // Fetch route data using SWR
  const {
    data: routeData,
    error: routeError,
    isLoading: routeLoading,
    mutate,
  } = useGetRouteList({
    search: searchQuery,
    page: currentPage,
    limit: perPage,
  });

  // Fetch variable pricing data when a route is expanded
  const {
    data: variablePricingData,
    error: variablePricingError,
    isLoading: variablePricingLoading,
  } = useGetVariablePricing(expandedRouteId, {
    search: expandedRouteId ? routeSearchQueries[expandedRouteId] || "" : ""
  });

  // Transform route data to table format and then map to the format expected by the nilai variabel table
  const transformedData = routeData?.data?.Data
    ? transformRouteListToTableData(routeData.data.Data)
    : [];

  console.log("route data", routeData?.data?.Data);

  const mappedData = transformedData.map((route) => ({
    id: route.id,
    alias: route.alias, // Using route alias as the truck type identifier
    formula: null, // Placeholder: replace with actual formula data when available
    isActive: route.isActive,
    routeData: route,
  }));

  // Calculate pagination
  const totalItems = routeData?.data?.Pagination?.totalRecords ?? 0;

  // Show no data state when there's no data
  const showNoData = totalItems === 0 && !loading && !routeLoading;

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col gap-5">
        <PageTitle withBack={false} className="mb-0">
          Setting Nilai Variabel
        </PageTitle>
        <div className="flex items-center justify-center gap-2">
          <IconComponent src="/icons/error.svg" />
          <span className="text-sm font-semibold text-red-500">
            Error loading data: {error?.message ?? "Unknown error"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle withBack={false} className="mb-0">
        Setting Nilai Variabel
      </PageTitle>

      {showNoData ? (
        <div className="flex items-center justify-center gap-2">
          <IconComponent src="/icons/search.svg" />
          <span className="text-sm font-semibold text-[#868686]">
            Belum ada data rute pricing
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {mappedData.map((route) => (
            <Collapsible
              key={route.id}
              open={openStates[route.id] || false}
              onOpenChange={(open) => {
                setOpenStates((prev) => ({
                  ...prev,
                  [route.id]: open,
                }));

                if (open) {
                  setExpandedRouteId(route.id);
                  // Initialize search query for this route if it doesn't exist
                  if (!routeSearchQueries[route.id]) {
                    setRouteSearchQueries(prev => ({
                      ...prev,
                      [route.id]: ""
                    }));
                  }
                } else {
                  setExpandedRouteId(null);
                }
              }}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg !border-[#176CF7] bg-blue-100 p-4 text-blue-900">
                {({ open }) => (
                  <>
                    <span className="font-medium">{route.alias}</span>
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-5">
                {openStates[route.id] && (
                  <SettingNilaiVariabelTable
                    variablePricingData={variablePricingData?.data?.Data || []}
                    loading={variablePricingLoading}
                    error={variablePricingError}
                    updatingVariables={updatingVariables}
                    currentPage={currentPage}
                    totalItems={variablePricingData?.data?.Data?.length || 0}
                    perPage={perPage}
                    onSearch={(searchQuery) => {
                      setRouteSearchQueries(prev => ({
                        ...prev,
                        [route.id]: searchQuery
                      }));
                    }}
                  />
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}
