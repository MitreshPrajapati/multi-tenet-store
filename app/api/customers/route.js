
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const profiles = await db.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                OR: [
                    { role: "USER" },
                    { role: "FARMER" }
                ]
            },
            include: {
                profile: true,
            }
        });
        return NextResponse.json(profiles);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch users profiles",
            error: error
        }, { status: 500 })
    }
}

