"use client";

import { redirect } from "next/navigation";

import { useGetMasterPricingSettingFormulaPricing } from "@/services/masterpricing/setting-formula-pricing/getMasterPricingSettingFormulaPricing";
import {
  useGetMasterPricingSettingFormulaPricingHistory,
  useGetMasterPricingSettingFormulaPricingHistoryWithParams,
} from "@/services/masterpricing/setting-formula-pricing/getMasterPricingSettingFormulaPricingHistory";

import PageTitle from "@/components/PageTitle/PageTitle";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Table/Table";

import SettingRumusPricingHistoryContainer from "@/container/SettingRumusPricing/SettingRumusPricingHistoryContainer";

import { DataTableBO } from "@/components";

export default function HistorySettingRumusPricing() {
  // Mock data for the history table

  return <SettingRumusPricingHistoryContainer />;
}
