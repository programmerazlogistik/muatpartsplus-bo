"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetRegular } from "@/services/masterpricing/settingdefaultpricing/getRegular";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

import { validateRequiredDropdowns } from "@/lib/utils/valibot";

import { IconComponent } from "@/components";

import RoutePricingSection from "./RoutePricingSection";

const NonRuteKhusus = ({ onFormChange }) => {
  const router = useRouter();
  const { data, error, isLoading } = useGetRegular();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isNavigationModalOpen, setIsNavigationModalOpen] = useState(false);
  const [routesData, setRoutesData] = useState([]);
  const [dropdownValues, setDropdownValues] = useState({});
  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [openStates, setOpenStates] = useState({}); // Track open state for each collapsible
  const [showAll, setShowAll] = useState(false); // Track if all should be shown

  // Process API data when it's available
  useEffect(() => {
    if (data?.data?.Data?.routes) {
      setRoutesData(data?.data?.Data?.routes);

      // Initialize dropdown values based on API data
      const initialDropdownValues = {};
      const initialOpenStates = {};
      data.data.Data.routes.forEach((route) => {
        // Set initial open state to false for all
        initialOpenStates[route.routePricingId] = false;
        route.truckTypes.forEach((truckType) => {
          const key = `${route.routePricingId}-${truckType.truckTypeId}`;
          initialDropdownValues[key] = truckType.typePricingId || "";
        });
      });
      setDropdownValues(initialDropdownValues);
      setOpenStates(initialOpenStates);
    }
  }, [data]);

  // Check if form has any values
  useEffect(() => {
    const hasValues = Object.values(dropdownValues).some(
      (value) => value !== ""
    );
    setHasUnsavedChanges(hasValues);
    // Notify parent component about form changes
    if (onFormChange) {
      onFormChange(hasValues);
    }
  }, [dropdownValues, onFormChange]);

  // Handle browser back/refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSimpanClick = (e) => {
    e.stopPropagation();

    // Validate dropdowns - create required fields based on routes and truck types
    const requiredFields = [];
    routesData.forEach((route) => {
      route.truckTypes.forEach((truckType) => {
        requiredFields.push(`${route.routePricingId}-${truckType.truckTypeId}`);
      });
    });

    const validationErrors = validateRequiredDropdowns(
      dropdownValues,
      requiredFields
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    setIsSaveModalOpen(true);
  };

  const handleConfirmSimpan = () => {
    // In a real app, you would save the data here
    // For now, we'll just show the success modal
    setIsSaveModalOpen(false);
    setIsSuccessModalOpen(true);
    setHasUnsavedChanges(false);
    // Notify parent that form is now saved
    if (onFormChange) {
      onFormChange(false);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleDropdownChange = (key, value) => {
    setDropdownValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear error for this field when user selects a value
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // Handle navigation away with confirmation
  const handleNavigationAttempt = (path) => {
    if (hasUnsavedChanges) {
      setIsNavigationModalOpen(true);
    } else {
      if (path) {
        router.push(path);
      } else {
        router.back();
      }
    }
  };

  const handleConfirmNavigation = () => {
    setIsNavigationModalOpen(false);
    setHasUnsavedChanges(false);
    // Notify parent that form changes are discarded
    if (onFormChange) {
      onFormChange(false);
    }
    // In a real app, you would navigate to the target page
    // For now, we'll just go back as an example
    router.back();
  };

  const handleCancelNavigation = () => {
    setIsNavigationModalOpen(false);
  };

  // Toggle all collapsibles open/closed
  const handleToggleAll = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);

    const newOpenStates = {};
    routesData.forEach((route) => {
      newOpenStates[route.routePricingId] = newShowAll;
    });

    setOpenStates(newOpenStates);
  };

  // Toggle individual collapsible
  const handleToggleCollapsible = (routePricingId) => {
    setOpenStates((prev) => ({
      ...prev,
      [routePricingId]: !prev[routePricingId],
    }));

    // If we're closing one while in "show all" mode, exit show all mode
    if (showAll && openStates[routePricingId]) {
      setShowAll(false);
    }
    // If we're opening the last closed one while all others are open, enter show all mode
    else if (!showAll && !openStates[routePricingId]) {
      const allOthersOpen = routesData
        .filter((route) => route.routePricingId !== routePricingId)
        .every((route) => openStates[route.routePricingId]);
      if (allOthersOpen) {
        setShowAll(true);
      }
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <form className="flex flex-col gap-y-5">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleToggleAll}
          className="rounded-md border border-gray-100 p-2 text-xs font-semibold shadow-sm"
        >
          Tampilkan Semua
        </button>
      </div>

      {/* Collapsible Sections */}
      {routesData.length > 0 ? (
        routesData.map((route) => (
          <RoutePricingSection
            key={route.routePricingId}
            route={route}
            dropdownValues={dropdownValues}
            errors={errors}
            openStates={openStates}
            handleDropdownChange={handleDropdownChange}
            handleToggleCollapsible={handleToggleCollapsible}
          />
        ))
      ) : (
        <div className="mt-3 flex items-center justify-center gap-2">
          <IconComponent src="/icons/search.svg" />
          <span className="text-sm font-semibold text-[#868686]">
            {" "}
            Belum ada data rute pricing
          </span>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          variant="muatparts-primary"
          onClick={handleSimpanClick}
          type="button"
          disabled={routesData.length === 0}
        >
          Simpan
        </Button>
      </div>

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        setIsOpen={setIsSaveModalOpen}
        title={{ text: "Pemberitahuan" }}
        description={{ text: "Apakah Anda yakin ingin menyimpan data?" }}
        confirm={{
          text: "Simpan",
          onClick: handleConfirmSimpan,
        }}
        cancel={{
          text: "Batal",
        }}
      />

      {/* Success Notification Modal */}
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        title={{ text: "Pemberitahuan" }}
        description={{ text: "Data berhasil disimpan." }}
        withCancel={false}
        withButtons={false}
      />

      {/* Navigation Confirmation Modal */}
      <ConfirmationModal
        isOpen={isNavigationModalOpen}
        setIsOpen={setIsNavigationModalOpen}
        title={{ text: "Warning" }}
        description={{
          text: "Apakah kamu yakin ingin berpindah halaman?<br/>Data yang telah diisi tidak akan disimpan",
        }}
        cancel={{
          text: "Batal",
          onClick: handleCancelNavigation,
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmNavigation,
        }}
      />
    </form>
  );
};

export default NonRuteKhusus;
