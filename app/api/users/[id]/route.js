import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    // console.log(id)
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
            select:{
                email:true,
                id:true,
                name:true,
                role: true,
                createdAt: true,
                profile: true,
            },
            // include: { profile: true }
        })
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch user",
            error: error
        }, { status: 500 })
    }
}