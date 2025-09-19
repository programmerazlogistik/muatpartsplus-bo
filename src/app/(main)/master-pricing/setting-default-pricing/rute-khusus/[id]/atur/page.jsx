"use client";

import { useParams } from "next/navigation";

import AturDefaultPricingRuteKhususContainer from "@/container/SettingDefaultPricing/AturDefaultPricingRuteKhususContainer";

export default function AturDefaultPricingRuteKhususPage() {
  const params = useParams();
  const { id } = params;

  return <AturDefaultPricingRuteKhususContainer id={id} />;
}
