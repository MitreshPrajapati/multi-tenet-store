import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
        const market = await db.market.findUnique({
            where: {
                id
            },
        });
        return NextResponse.json(market);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch market",
            error: error
        }, { status: 500 })
    }
}

export async function DELETE(req, { params: { id } }) {
    try {
        const isExists = await db.market.findUnique({
            where: {
                id
            }
        })
        console.log(isExists);
        if (!isExists) {
            return NextResponse.json({
                data: null,
                message: "Market not found",
            }, { status: 404 })
        }
        const deletedmarket = await db.market.delete({
            where: {
                id: isExists.id
            }
        })

        return NextResponse.json({
            message: "Market deleted",
            data: deletedmarket
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Deleted Market",
            error: error
        }, { status: 500 })
    }
}