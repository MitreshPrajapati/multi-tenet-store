"use client";

import { Modal } from "flowbite-react";
import {
  CircleHelp,
  CornerDownLeft,
  Headphones,
  MessageCircle,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const [openModal, setOpenModal] = useState(false);

  const helpModalBody = [
    {
      icon: <Headphones className="w-6 h-6 text-green-800" />,
      text: "Call: 9876543210",
      href:"/",
    },
    {
      icon: <Truck className="w-6 h-6 text-green-800" />,
      text: "Track Orders",
      href:"/",
    },
    {
      icon: <CornerDownLeft className="w-6 h-6 text-green-800" />,
      text: "Returns & Refund",
      href:"/",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-800" />,
      text: "Chat with us",
      href:"/",
    },
  ];

  return (
    <>
      <button
        className="flex items-center space-x-1 text-gray-800 dark:text-slate-50"
        onClick={() => setOpenModal(true)}
      >
        <CircleHelp />
        <span>Help</span>
      </button>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          Need Help with Our Shopping, Talk to our Help Desk.
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6">
            {helpModalBody.map((item, index) => (
              <Link
                href={item.href}
                className="flex items-center space-x-2 text-gray-800 dark:text-slate-50"
              >
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-green-100">
                  {item.icon}
                </div>
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
