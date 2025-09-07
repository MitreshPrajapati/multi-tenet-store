import { Info } from "lucide-react";
import React from "react";

const VerifyEmail = () => {
  return (
    <div className="max-w-2xl mx-auto min-h-screen">
      <div
        id="alert-additional-content-2"
        className="mt-10 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <div className="flex items-center">
          <Info className="shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Email Sent Verify your account.
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          We have sent a verification email to your registered email address.
          Please check your inbox and click on the verification link to activate
          your account.
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
