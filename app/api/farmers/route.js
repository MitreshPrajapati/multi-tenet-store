import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const {
            userId,
            name,
            email,
            phone,
            farmerCode,
            profileImageUrl,
            physicalAddress,
            landSize,
            mainCrop,
            isActive,
            products,
            contactPerson,
            contactPersonPhone,
            paymentTerms,
            notes,
        } = await req.json();
        const newFarmer = await db.farmerProfile.create({
            data: {
                userId,
                name,
                email,
                phone,
                farmerCode,
                profileImageUrl,
                physicalAddress,
                landSize: parseFloat(landSize),
                mainCrop,
                isActive,
                products,
                contactPerson,
                contactPersonPhone,
                paymentTerms,
                notes,
            }
        })
        // conosle.log(newFarmer);
        return NextResponse.json(newFarmer)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new Farmer",
            error: error
        }, { status: 500 })
    }
}


export async function GET(req) {
    try {
        const profiles = await db.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                role: "FARMER"
            },
            include: {
                farmerProfile: true,
            }
        });
        return NextResponse.json(profiles);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch farmer profiles",
            error: error
        }, { status: 500 })
    }
}