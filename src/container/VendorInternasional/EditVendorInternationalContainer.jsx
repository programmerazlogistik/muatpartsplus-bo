"use client";

import { useState } from "react";

import { IconComponent } from "@muatmuat/ui/IconComponent";

import EditVendorInternationalAccountContainer from "./EditVendorInternationalAccountContainer";
import EditVendorInternationalContractContainer from "./EditVendorInternationalContractContainer";
import EditVendorInternationalLegalityContainer from "./EditVendorInternationalLegalityContainer";
import StepBreadcrumb from "./StepBreadcrumb";

/**
 * Main container component that manages the multi-step vendor editing process
 * Handles navigation between Account Info, Legality, and Contract steps
 */
const EditVendorInternationalContainer = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    accountData: null,
    legalityData: null,
    contractData: null,
  });

  const breadcrumbSteps = ["Informasi Akun", "Legalitas", "Kontrak"];

  /**
   * Handle navigation to next step
   * Also stores form data from current step
   */
  const handleNext = (stepData = null) => {
    // Store data from current step
    if (stepData) {
      switch (activeStep) {
        case 1:
          setFormData((prev) => ({ ...prev, accountData: stepData }));
          break;
        case 2:
          setFormData((prev) => ({ ...prev, legalityData: stepData }));
          break;
        case 3:
          setFormData((prev) => ({ ...prev, contractData: stepData }));
          break;
      }
    }

    // Navigate to next step or handle final save
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      handleFinalSave();
    }
  };

  /**
   * Handle navigation to previous step
   */
  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  /**
   * Handle final save when all steps are completed
   */
  const handleFinalSave = () => {
    console.log("Final save - all data:", formData);

    // Here you would typically:
    // 1. Validate all form data
    // 2. Call API to save vendor information
    // 3. Show success message
    // 4. Redirect to vendor list or detail page

    alert("Vendor data saved successfully!");

    // Example: redirect to vendor list
    // router.push('/vendors/international');
  };

  /**
   * Render the appropriate step component based on activeStep
   */
  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <EditVendorInternationalAccountContainer
            onNext={handleNext}
            activeStep={activeStep}
            initialData={formData.accountData}
          />
        );
      case 2:
        return (
          <EditVendorInternationalLegalityContainer
            onPrevious={handlePrevious}
            onNext={handleNext}
            activeStep={activeStep}
            initialData={formData.legalityData}
          />
        );
      case 3:
        return (
          <EditVendorInternationalContractContainer
            onPrevious={handlePrevious}
            onNext={handleNext}
            activeStep={activeStep}
            initialData={formData.contractData}
          />
        );
      default:
        return (
          <EditVendorInternationalAccountContainer
            onNext={handleNext}
            activeStep={activeStep}
            initialData={formData.accountData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center px-8 py-5">
        <IconComponent
          src="/icons/arrow-left.svg"
          alt="Back"
          className="mr-4 cursor-pointer"
        />
        <h1 className="text-xl font-bold text-neutral-900">
          Ubah Vendor International
        </h1>
      </div>
      {/* Breadcrumb */}
      <div className="flex items-center justify-center">
        <StepBreadcrumb
          data={breadcrumbSteps}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
      </div>

      {/* Progress indicator (optional) */}
      <div className="hidden">
        <div className="flex items-center justify-center bg-white py-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center ${activeStep >= 1 ? "text-primary-600" : "text-gray-400"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 1 ? "bg-primary-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="ml-2">Account</span>
            </div>

            <div
              className={`h-1 w-8 ${activeStep > 1 ? "bg-primary-600" : "bg-gray-200"}`}
            ></div>

            <div
              className={`flex items-center ${activeStep >= 2 ? "text-primary-600" : "text-gray-400"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 2 ? "bg-primary-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="ml-2">Legality</span>
            </div>

            <div
              className={`h-1 w-8 ${activeStep > 2 ? "bg-primary-600" : "bg-gray-200"}`}
            ></div>

            <div
              className={`flex items-center ${activeStep >= 3 ? "text-primary-600" : "text-gray-400"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activeStep >= 3 ? "bg-primary-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="ml-2">Contract</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      {renderCurrentStep()}
    </div>
  );
};

export default EditVendorInternationalContainer;
