"use client";

import React from "react";
import OrderSummaryForm from "./StepForms/Summary";
import { useSelector } from "react-redux";
import BasicInformationForm from "./StepForms/BasicInformation";
import AdditionalInformationForm from "./StepForms/AdditionalInformation";
import FarmDetailsForm from "./StepForms/FarmDetailsForm";

export default function StepForm({farmerId}) {
  const currentStep = useSelector((store) => store?.onboarding?.currentStep);

  const renderFormByStep = (step) => {
    if (step === 1) {
      return <BasicInformationForm />;
    } else if (step === 2) {
      return <FarmDetailsForm />;
    } else if (step === 3) {
      return <AdditionalInformationForm />;
    } else if (step === 4) {
      return <OrderSummaryForm farmerId={farmerId} />;
    }
  };
  return <div>{renderFormByStep(currentStep)}</div>;
}
