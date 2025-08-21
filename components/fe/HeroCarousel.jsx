"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";

const HeroCarousel = ({ banners }) => {

  const isInfinite = banners.length > 1 ? true : false;
  var settings = {
    dots: true,
    infinite: isInfinite,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
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
        // className=""
      >
        {
          banners?.map((banner, index) => (
          // sliderRef = slider;
           <Link href={banner?.link || "/"} key={banner.slug+index}>
              <Image
                src={banner.imageUrl || "/slider-1.jpg"}
                width={712}
                height={500}
                className="w-full h-auto my-auto"
                alt={banner.title}
              />
            </Link>
          ))}
      </Slider>

      <div className="absolute w-full top-[40%] flex justify-between items-center">
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

export default HeroCarousel;
