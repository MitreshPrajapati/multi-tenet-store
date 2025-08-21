import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, description, logoUrl, slug, isActive, categoryIds } = await req.json();
        const isExistingMarket = await db.market.findUnique({
            where: {
                slug,
            }
        });

        if (isExistingMarket) {
            return NextResponse.json({
                data: null,
                message: "Market already exists"
            }, { status: 409 })

        }
        // conosle.log(title, description, logoUrl, slug, isActive, categoryIds);
        const newMarket = await db.market.create({
            data: {
                title, description, logoUrl, slug, isActive, categoryIds
            }
        })
        
        return NextResponse.json(newMarket)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new Market",
            error: error
        }, { status: 500 })
    }
}


export async function GET(req) {
    try {
        const markets = await db.market.findMany({
            orderBy:{
                createdAt:"desc",
            },
           
        });
        return NextResponse.json(markets);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch markets.",
            error: error
        }, { status: 500 })
    }
}