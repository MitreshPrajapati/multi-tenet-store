"use client";

import StepForm from "@/components/Onboarding/StepForm";
import Steps from "@/components/Onboarding/Steps";
import { ShoppingBag } from "lucide-react";
import React, { useState } from "react";

export default function page({params:{id}}) {
  const steps = [
    {
      id: 1,
      name: "Basic Information",
      fields: ["firstName", "lastName", "email"],
    },
    {
      id: 2,
      name: "Farm Details",
      fields: ["firstName", "lastName", "email"],
    },
    {
      id: 3,
      name: "Adittional Information",
      fields: ["firstName", "lastName", "email"],
    },
    {
      id: 4,
      name: "Summary",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen ">
      <div className="max-w-3xl mx-auto my-6 p-6 border  border-slate-700 rounded-lg ">
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow  sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  ">
     
          {/* FORM */}
          <StepForm farmerId={id} />
        </div>
      </div>
    </div>
  );
}
