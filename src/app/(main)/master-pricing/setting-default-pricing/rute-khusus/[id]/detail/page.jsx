"use client";

import { useParams } from "next/navigation";

import DetailDefaultPricingRuteKhususContainer from "@/container/SettingDefaultPricing/DetailDefaultPricingRuteKhususContainer";

export default function DetailDefaultPricingRuteKhususPage() {
  const params = useParams();
  const { id } = params;

  return <DetailDefaultPricingRuteKhususContainer id={id} />;
}
