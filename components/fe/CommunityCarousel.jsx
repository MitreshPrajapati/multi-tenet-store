"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useRef } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CommunityCarousel = ({ trainings }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className="relative">
      <Slider
        arrows={false}
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
        // className="relative"
      >
        {trainings &&
          trainings?.map((training, index) => (
            <div className="px-4">
              <div className="rounded-lg shadow-md overflow-hidden">
                <Link
                  key={index}
                  href="/"
                  className=""
                >
                  <Image
                    src={training.imageUrl || "/profile.jpg"}
                    alt={training.slug}
                    width={556}
                    height={556}
                    className=" w-full h-48 object-cover my-auto bg-slate-50  "
                  />
                </Link>

                <div className="flex flex-col p-2">
                  <h2 className="text-slate-800 mt-2 text-left text-xl font-semibold">
                    {training.title}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {training.description}
                  </p>
                  <div className="w-full flex justify-between items-center mt-6 mb-2">
                    <button className="bg-green-500 hover:bg-green-600 transition-all delay-100 text-white rounded-lg py-2 px-4">
                      Read more
                    </button>
                    <h2 className="text-slate-800">Talk to Consultant</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
      <div className="absolute w-full top-[35%] flex justify-between items-center">
        <button
          className="p-4 bg-slate-600 opacity-50 hover:opacity-80 transition-all delay-100 rounded-full text-slate-50"
          onClick={previous}
        >
          <ChevronLeft className="text-white font-bold" />
        </button>
        <button
          className="p-4 bg-slate-600 opacity-50 hover:opacity-80 transition-all delay-100 rounded-full text-slate-50"
          onClick={next}
        >
          <ChevronRight className="text-white font-bold" />
        </button>
      </div>
    </div>
  );
};

export default CommunityCarousel;
