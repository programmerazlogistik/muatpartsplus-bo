"use client";

import { useEffect, useState } from "react";

import { ChevronUp } from "lucide-react";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Checkbox from "@/components/Form/Checkbox";
import Input from "@/components/Form/Input";

import { useTranslation } from "@/hooks/use-translation";

import { cn } from "@/lib/utils";

import { IconComponent } from "@/components";

const MasterVoucherFilter = ({
  isOpen,
  onToggle,
  onApply,
  onReset,
  initialFilters,
  isExpired = false,
}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState(initialFilters || {});

  useEffect(() => {
    setFilters(initialFilters || {});
  }, [initialFilters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      [
        "discountMin",
        "discountMax",
        "minPurchase",
        "quotaMin",
        "quotaMax",
        "remainingQuotaMin",
        "remainingQuotaMax",
        "totalClaimMin",
        "totalClaimMax",
      ].includes(name)
    ) {
      const numericValue = value.replace(/[^0-9]/g, "");
      const formattedValue =
        new Intl.NumberFormat("id-ID").format(numericValue) || "";
      setFilters((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = ({ name, checked }) => {
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleReset = () => {
    const resetFilters = {};
    setFilters(resetFilters);
    if (onReset) {
      onReset(resetFilters);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(filters);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="mb-4 rounded-md bg-white">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            {t("MasterVoucher.filterTitle", {}, "Filter")}
          </h2>
          <button
            onClick={onToggle}
            className="text-primary flex items-center text-xs font-medium text-primary-700"
          >
            {t("MasterVoucher.hideButton", {}, "Sembunyikan")}
            <ChevronUp className="ml-1 h-5 w-5" />
          </button>
        </div>

        {/* Grid Filters */}
        <div className="grid w-fit grid-cols-1 gap-x-[68px] md:grid-cols-2">
          {/* Left Column */}
          <div className="flex max-w-[570px] flex-col gap-y-4">
            {/* Status */}
            {!isExpired && (
              <div className="grid grid-cols-3 items-center">
                <label className="font-regular col-span-1 text-xs">
                  {t("MasterVoucher.filter.status", {}, "Status")}
                </label>
                <div className="col-span-2 flex gap-4">
                  <Checkbox
                    name="status_active"
                    checked={!!filters.status_active}
                    onChange={({ checked }) =>
                      handleCheckboxChange({ name: "status_active", checked })
                    }
                  >
                    {t("MasterVoucher.filter.active", {}, "Aktif")}
                  </Checkbox>
                  <Checkbox
                    name="status_inactive"
                    checked={!!filters.status_inactive}
                    onChange={({ checked }) =>
                      handleCheckboxChange({ name: "status_inactive", checked })
                    }
                  >
                    {t("MasterVoucher.filter.inactive", {}, "Non Aktif")}
                  </Checkbox>
                </div>
              </div>
            )}

            {/* Jenis Diskon */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-regular col-span-1 text-xs">
                {t("MasterVoucher.filter.discountType", {}, "Jenis Diskon")}
              </label>
              <div className="col-span-2 flex gap-4">
                <Checkbox
                  name="discount_type_fixed"
                  checked={!!filters.discount_type_fixed}
                  onChange={({ checked }) =>
                    handleCheckboxChange({
                      name: "discount_type_fixed",
                      checked,
                    })
                  }
                >
                  Rp
                </Checkbox>
                <Checkbox
                  name="discount_type_percentage"
                  checked={!!filters.discount_type_percentage}
                  onChange={({ checked }) =>
                    handleCheckboxChange({
                      name: "discount_type_percentage",
                      checked,
                    })
                  }
                >
                  x %
                </Checkbox>
              </div>
            </div>

            {/* Diskon */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-regular col-span-1 text-xs">
                {t("MasterVoucher.filter.discount", {}, "Diskon")}
              </label>
              <div className="col-span-2 flex items-center gap-2">
                <Input
                  name="discountMin"
                  placeholder="Minimal"
                  value={filters.discountMin || ""}
                  onChange={handleInputChange}
                />
                <span className="text-xs">s/d</span>
                <Input
                  name="discountMax"
                  placeholder="Maksimal"
                  value={filters.discountMax || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Minimum Pembelian */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-regular col-span-1 text-xs">
                {t("MasterVoucher.filter.minPurchase", {}, "Minimum Pembelian")}
              </label>
              <div className="col-span-2">
                <Input
                  name="minPurchase"
                  placeholder="Minimal"
                  value={filters.minPurchase || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex max-w-[532px] flex-col gap-y-4">
            {/* Kuota Voucher */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-regular col-span-1 text-xs">
                Kuota Voucher
              </label>
              <div className="col-span-2 flex items-center gap-2">
                <Input
                  name="quotaMin"
                  placeholder="Minimal"
                  value={filters.quotaMin || ""}
                  onChange={handleInputChange}
                />
                <span className="text-xs">s/d</span>
                <Input
                  name="quotaMax"
                  placeholder="Maksimal"
                  value={filters.quotaMax || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Sisa Kuota */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-regular col-span-1 text-xs">
                Sisa Kuota
              </label>
              <div className="col-span-2 flex items-center gap-2">
                <Input
                  name="remainingQuotaMin"
                  placeholder="Minimal"
                  value={filters.remainingQuotaMin || ""}
                  onChange={handleInputChange}
                />
                <span className="text-xs">s/d</span>
                <Input
                  name="remainingQuotaMax"
                  placeholder="Maksimal"
                  value={filters.remainingQuotaMax || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Total Nilai Klaim */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-regular col-span-1 text-xs">
                Total Nilai Klaim
              </label>
              <div className="col-span-2 flex items-center gap-2">
                <Input
                  name="totalClaimMin"
                  placeholder="Minimal"
                  value={filters.totalClaimMin || ""}
                  onChange={handleInputChange}
                />
                <span className="text-xs">s/d</span>
                <Input
                  name="totalClaimMax"
                  placeholder="Maksimal"
                  value={filters.totalClaimMax || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Masa Berlaku */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-regular col-span-1 text-xs">
                Masa Berlaku
              </label>
              <div className="col-span-2 flex items-center gap-2">
                <DatePicker
                  value={filters.validFrom ? new Date(filters.validFrom) : null}
                  onChange={(date) =>
                    setFilters((prev) => ({
                      ...prev,
                      validFrom: date ? date.toISOString() : "",
                    }))
                  }
                  placeholder="Masa Berlaku Awal"
                />
                <span className="text-xs">s/d</span>
                <DatePicker
                  value={filters.validTo ? new Date(filters.validTo) : null}
                  onChange={(date) =>
                    setFilters((prev) => ({
                      ...prev,
                      validTo: date ? date.toISOString() : "",
                    }))
                  }
                  placeholder="Masa Berlaku Akhir"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex justify-end gap-[5px]">
          <Button
            variant="outline"
            className="border border-red-500 bg-white text-red-500 hover:bg-red-50"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button variant="muatparts-primary" onClick={handleApply}>
            Terapkan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MasterVoucherFilter;
