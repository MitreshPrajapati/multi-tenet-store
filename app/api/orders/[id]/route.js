import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
        const order = await db.order.findUnique({
            where: {
                id
            },
            include: {
                orderItems: true
            }
        });
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch Order",
            error: error
        }, { status: 500 })
    }
}

export async function DELETE(req, { params: { id } }) {
    try {
        const isExists = await db.order.findUnique({
            where: {
                id
            }
        })
        console.log(isExists);
        if (!isExists) {
            return NextResponse.json({
                data: null,
                message: "Order not found",
            }, { status: 404 })
        }
        const deletedOrder = await db.order.delete({
            where: {
                id: isExists.id
            }
        })

        return NextResponse.json({
            message: "Order deleted",
            data: deletedOrder
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Delete Order",
            error: error
        }, { status: 500 })
    }
}

export async function PUT(req, { params: { id } }) {
    try {
        const { title, slug, imageUrl, description, isActive, content, categoryId } = await req.json();

        const isExists = await db.order.findUnique({
            where: {
                id,
            }
        })

        if (!isExists) {
            return NextResponse.json({
                message: "Order not found",
                data: null,
            }, { status: 404 })
        }

        const updateOrder = await db.order.update({
            where: {
                id
            },
            data: {
                title, slug, imageUrl, description, isActive, content, categoryId
            }
        });

        return NextResponse.json(updateOrder);

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch Order",
            error: error
        }, { status: 500 })
    }
}