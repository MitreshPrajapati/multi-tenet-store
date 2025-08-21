import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, slug, imageUrl, description, isActive, marketIds } = await req.json();
        const isExistingCategory = await db.category.findUnique({
            where: {
                slug,
            }
        });

        if (isExistingCategory) {
            return NextResponse.json({
                data: null,
                message: "Category already exists"
            }, { status: 409 })

        }
        const newCategory = await db.category.create({
            data: {
                title,
                slug,
                imageUrl,
                description,
                isActive,
                marketIds,
            }
        })
        return NextResponse.json(newCategory)

    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new category",
            error: error
        }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const categories = await db.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include:{
                products: true
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch category",
            error: error
        }, { status: 500 })
    }
}