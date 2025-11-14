"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useRef } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MarketCarousel = ({ markets }) => {
  // console.log(markets);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    // slidesToShow: (markets?.length) > 6 ? 6 : (markets?.length),
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          // slidesToShow: markets.length > 3 ? 3 : markets.length,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          // slidesToShow: markets.length > 2 ? 2 : markets.length,
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
    <div className="relative w-full">
      <Slider
        arrows={false}
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
        className="relative"
      >
        {markets &&
          markets?.map((market, index) => (
            <div className="px-4 object-contain" key={index}>
              <Link
                href={`/market/${market.slug}`}
                className="block rounded-lg overflow-hidden hover:cursor-pointer "
              >
                <Image
                  src={market.logoUrl || "/vegetables.png"}
                  alt="vegetables"
                  width={556}
                  height={556}
                  className="block object-cover max-w-[120px] max-h-[120px] min-w-[120px] min-h-[120px] bg-slate-50 p-2 rounded-full m-auto"
                />
              </Link>
              <h2 className="text-slate-50 mt-2 text-center capitalize">
                {market.title}
              </h2>
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
          <ChevronRight className="text-white  font-bold" />
        </button>
      </div>
    </div>
  );
};

export default MarketCarousel;
