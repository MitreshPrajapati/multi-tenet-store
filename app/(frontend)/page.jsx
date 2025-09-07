import CategoryList from "@/components/fe/CategoryList";
import CommunityTraining from "@/components/fe/CommunityTraning";
import Hero from "@/components/fe/Hero";
import MarketList from "@/components/fe/MarketList";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const categoriesData = await getData("categories");
  const categories = categoriesData?.filter((category) => {
    return category.products.length > 1;
  });

  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />

      {categories?.map((category, index) => {
        if (category.products.length) {
          return (
            <div className="py-8" key={index}>
              <CategoryList category={category} />
            </div>
          );
        }
      })}

      <CommunityTraining />
      <h2 className="text-4xl text-center">Welcome to e-comm</h2>

      <Link href="/register-farmer" className="my-4 underline text-blue-500">
        Become a farmer / Vendor / Supplier
      </Link>
    </div>
  );
};

export default Home;
