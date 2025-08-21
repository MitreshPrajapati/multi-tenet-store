import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, couponCode, expiryDate, percent, isActive } = await req.json();

        const newCoupon = await db.coupon.create({
            data: {
                title,
                couponCode,
                percent: Number(percent),
                expiryDate,
                isActive,
            }
        })

        return NextResponse.json(newCoupon)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new coupon",
            error: error
        }, { status: 500 })
    }
}


export async function GET(req) {
    try {
        const coupons = await db.coupon.findMany({
            orderBy:{
                createdAt:"desc",
            }
        });
        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch coupon",
            error: error
        }, { status: 500 })
    }
}