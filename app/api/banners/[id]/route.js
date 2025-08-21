import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
        const banner = await db.banner.findUnique({
            where: {
                id
            },
        });
        return NextResponse.json(banner);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch banner",
            error: error
        }, { status: 500 })
    }
}

export async function DELETE(req, { params: { id } }) {
    try {
        const isExists = await db.banner.findUnique({
            where: {
                id
            }
        })
        console.log(isExists);
        if (!isExists) {
            return NextResponse.json({
                data: null,
                message: "Banner not found",
            }, { status: 404 })
        }
        const deletedbanner = await db.banner.delete({
            where: {
                id: isExists.id
            }
        })

        return NextResponse.json({
            message: "Banner deleted",
            data: deletedbanner
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to delete banner",
            error: error
        }, { status: 500 })
    }
}

export async function PUT(req, { params: { id } }) {
    try {
        const { title, bannerLink, imageUrl, isActive } = await req.json();
        const isExists = await db.banner.findUnique({
            where: {
                id,
            }
        })
        if (!isExists) {
            return NextResponse.json({
                message: "Banner not found",
                data: null,
            }, { status: 404 })
        }
        const updatedBanner = await db.banner.update({
            where: {
                id
            },
            data: {
                title, bannerLink, imageUrl, isActive
            }
        });
        return NextResponse.json(updatedBanner);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch banner",
            error: error
        }, { status: 500 })
    }
}