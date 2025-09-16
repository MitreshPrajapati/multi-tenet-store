import db from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { checkoutFormData, cartItems: orderItems } = await req.json();

        const { userId, firstName, lastName, email, city, country, zipcode, phone, shippingCost, streetAddress, paymentMethod } = checkoutFormData;

        const newOrder = await db.order.create({
            data: {
                userId,
                firstName,
                lastName,
                email,
                phone,
                streetAddress,
                city,
                zipcode,
                country,
                shippingCost: parseFloat(shippingCost),
                paymentMethod,
            }
        })

        // create orderItems
        const newOrderItems = await prisma.orderItem.createMany({
            data: orderItems.map((item) => ({
                orderId: newOrder.id,
                productId: item.id,
                quantity: parseInt(item.quantity),
                price: parseFloat(item.salePrice)
            }))
        })

        return NextResponse.json(newOrder)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new order",
            error: error
        }, { status: 500 })
    }
}


export async function GET(req) {
    try {
        const orders = await db.order.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch orders.",
            error: error
        }, { status: 500 })
    }
}