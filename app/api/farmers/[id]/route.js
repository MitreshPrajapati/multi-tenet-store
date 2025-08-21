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

export async function DELETE(req, { params: { id } }) {
    try {
        const isExists = await db.user.findUnique({
            where: {
                id
            }
        })
        console.log(isExists);
        if (!isExists) {
            return NextResponse.json({
                data: null,
                message: "Farmer not found",
            }, { status: 404 })
        }
        const deletedfarmer = await db.user.delete({
            where: {
                id: isExists.id
            }
        })

        return NextResponse.json({
            message: "Farmer deleted",
            data: deletedfarmer
        })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Delete Farmer",
            error: error
        }, { status: 500 })
    }
}

export async function PUT(req, { params: { id } }) {
    try {
        const { userId,
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
            notes, } = await req.json();

        const isExists = await db.farmerProfile.findUnique({
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
        });

        return NextResponse.json(updateFarmerProfile);

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch farmer profile",
            error: error
        }, { status: 500 })
    }
}