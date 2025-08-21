import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, slug, imageUrl, description, isActive, content, categoryId } = await req.json();
        const isExistingTraining = await db.training.findUnique({
            where: {
                slug,
            }
        });

        if (isExistingTraining) {
            return NextResponse.json({
                data: null,
                message: "Training already exists"
            }, { status: 409 })

        }
        const newTraining = await db.training.create({
            data:{
                title,
                slug,
                categoryId,
                content,
                isActive,
                imageUrl,
                description,
            }
        })

        return NextResponse.json(newTraining)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new training",
            error: error
        }, { status: 500 })
    }
}


export async function GET(req) {
    try {
        const trainings = await db.training.findMany({
            orderBy:{
                createdAt:"desc",
            }
        });
        return NextResponse.json(trainings);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch trainings.",
            error: error
        }, { status: 500 })
    }
}