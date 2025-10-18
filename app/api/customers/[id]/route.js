import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
        const farmer = await db.user.findUnique({
            where: {
                id
            },
            include: {
                farmerProfile: true,
            }
        });
        return NextResponse.json(farmer);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch farmer",
            error: error
        }, { status: 500 })
    }
}

export async function PUT(req, { params: { id } }) {
    try {
        const { userId, } = await req.json();

        const isExists = await db.users.findUnique({
            where: {
                id,
            }
        })

        if (!isExists) {
            return NextResponse.json({
                message: "Farmer not found",
                data: null,
            }, { status: 404 })
        }

        const updateFarmerProfile = await db.farmerProfile.update({
            where: {
                id
            },
            data: {
                userId,

            }
        });

        return NextResponse.json(updateFarmerProfile);

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch farmer profile",
            error: error
        }, { status: 500 })
    }
}