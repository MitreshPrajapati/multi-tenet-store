"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useRef } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Product from "./Product";

const CategoryCarousel = ({ products, isMarketPage = false }) => {
  const isInfinite = products.length > 1 ? true : false;
  var settings = {
    dots: true,
    infinite: isInfinite,
    speed: 500,
    slidesToShow: isMarketPage ? 3: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: isMarketPage ? 2:3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
        className="relative"
      >
        {products?.map((product, index) => (
          <div className="p-1" key={product.id}>
            {/* <div className="bg-white rounded-lg shadow overflow-hidden hover:bg-slate-50 transition-all delay-100">
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="bg-white cursor-pointer"
              >
                <Image
                  src={product.imageUrl || "/vegetables.png"}
                  alt={product.title}
                  width={556}
                  height={556}
                  className="w-full  h-48 object-contain"
                />
              </Link>

              <div className="flex flex-col p-4 bg-slate-50">
                <Link href={`/products/${product.slug}`}>
                  <h2 className="text-slate-800 dark:text-slate-800  text-left font-semibold text-lg">
                    {product.title}
                  </h2>
                </Link>

                <div className="flex justify-between  items-center gap-2  mt-4">
                  <span className="text-slate-800 dark:text-slate-800">
                    INR: {product.productPrice}
                  </span>
                  <div className="flex bg-green-500 space-x-2 rounded-md py-2 px-4 items-center hover:bg-green-600">
                    <ShoppingCart className="rounded-full w-6 h-6 text-white font-bold cursor-pointer" />
                    <span className="text-white">ADD</span>
                  </div>
                </div>
              </div>
            </div> */}
            <Product product={product} />
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

export default CategoryCarousel;
