import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
        const training = await db.training.findUnique({
            where: {
                id
            },
        });
        return NextResponse.json(training);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch training",
            error: error
        }, { status: 500 })
    }
}

export async function DELETE(req, { params: { id } }) {
    try {
        const isExists = await db.training.findUnique({
            where: {
                id
            }
        })
        console.log(isExists);
        if (!isExists) {
            return NextResponse.json({
                data: null,
                message: "training not found",
            }, { status: 404 })
        }
        const deletedtraining = await db.training.delete({
            where: {
                id: isExists.id
            }
        })

        return NextResponse.json({
            message: "training deleted",
            data: deletedtraining
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Delete training",
            error: error
        }, { status: 500 })
    }
}

export async function PUT(req, { params: { id } }) {
    try {
        const { title, slug, imageUrl, description, isActive, content, categoryId } = await req.json();

        const isExists = await db.training.findUnique({
            where: {
                id,
            }
        })

        if (!isExists) {
            return NextResponse.json({
                message: "Training not found",
                data: null,
            }, { status: 404 })
        }

        const updateTraining = await db.training.update({
            where: {
                id
            },
            data: {
                title, slug, imageUrl, description, isActive, content, categoryId
            }
        });

        return NextResponse.json(updateTraining);

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch training",
            error: error
        }, { status: 500 })
    }
}