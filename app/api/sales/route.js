import db from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function GET(req) {
    try {
        const sales = await db.sale.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(sales);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch sales.",
            error: error
        }, { status: 500 })
    }
}