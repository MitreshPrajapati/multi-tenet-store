import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
        const coupon = await db.coupon.findUnique({
            where: {
                id
            },
        });
        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch coupon",
            error: error
        }, { status: 500 })
    }
}

export async function DELETE(req, { params: { id } }) {
    try {
        const isExists = await db.coupon.findUnique({
            where: {
                id
            }
        })
        console.log(isExists);
        if (!isExists) {
            return NextResponse.json({
                data: null,
                message: "Coupon not found",
            }, { status: 404 })
        }
        const deletedcoupon = await db.coupon.delete({
            where: {
                id: isExists.id
            }
        })

        return NextResponse.json({
            message: "Coupon deleted",
            data: deletedcoupon
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Delete Coupon",
            error: error
        }, { status: 500 })
    }
}

export async function PUT(req, { params: { id } }) {
    try {
        const { title, couponCode, expiryDate, percent, isActive } = await req.json();
        const isExists = await db.coupon.findUnique({
            where: {
                id,
            }
        })
        if (!isExists) {
            return NextResponse.json({
                message: "Coupon not found",
                data: null,
            }, { status: 404 })
        }
        const updatedCoupon = await db.coupon.update({
            where: {
                id
            },
            data: {
                title,
                couponCode,
                percent: Number(percent),
                expiryDate,
                isActive,
            }
        });
        return NextResponse.json(updatedCoupon);

    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new coupon",
            error: error
        }, { status: 500 })
    }

}