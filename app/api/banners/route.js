
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, bannerLink, imageUrl, isActive } = await req.json();

        const newBanner = await db.Banner.create({
            data: {
                title,
                bannerLink,
                imageUrl,
                isActive,
            }
        })

        return NextResponse.json(newBanner)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new banner",
            error: error
        }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const banners = await db.banner.findMany({
            orderBy:{
                createdAt:"desc",
            }
        });
        return NextResponse.json(banners);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch banners",
            error: error
        }, { status: 500 })
    }
}