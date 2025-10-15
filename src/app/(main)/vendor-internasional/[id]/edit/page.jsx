"use client";

import { useState } from "react";

import EditVendorInternationalContainer from "@/container/VendorInternasional/EditVendorInternationalContainer";
import EditVendorInternationalContractContainer from "@/container/VendorInternasional/EditVendorInternationalContractContainer";
import EditVendorInternationalLegalityContainer from "@/container/VendorInternasional/EditVendorInternationalLegalityContainer";

export default function Page() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  if (step === 1) {
    return (
      <EditVendorInternationalContainer onNext={handleNext} activeStep={step} />
    );
  } else if (step === 2) {
    return (
      <EditVendorInternationalLegalityContainer
        onPrevious={handlePrevious}
        onNext={handleNext}
        activeStep={step}
      />
    );
  } else if (step === 3) {
    return (
      <EditVendorInternationalContractContainer
        onPrevious={handlePrevious}
        onNext={handleNext}
        activeStep={step}
      />
    );
  }

  return null;
}
