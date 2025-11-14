import Footer from "@/components/fe/Footer";
import Navbar from "@/components/fe/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <div className="sticky top-0 z-50 ">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-8 lg:px-0 ">{children}</div>
      <Footer />
    </div>
  );
}
