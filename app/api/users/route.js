import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(req) {
    try {
        const { name, email, password, role } = await req.json();

        const isExistingUser = await db.user.findUnique({
            where: {
                email
            }
        })

        if (isExistingUser) {
            return NextResponse.json({
                data: null,
                message: 'User already exists'
            }, { status: 409 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.user.create({
            data: {
                name,
                email,
                role,
                password: hashedPassword
            }
        })

        console.log(user);
        return NextResponse.json({
            data: user,
            message: 'User created successfully',
        }, { status: 201 })


    } catch (error) {
        return NextResponse.json({
            error,
            message: "Failed to create a user.",
        }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const users = await db.user.findMany({
            orderBy:{
                createdAt:"desc",
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch coupon",
            error: error
        }, { status: 500 })
    }
}