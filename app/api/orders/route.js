import db from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function POST(req) {
    try {
        const { checkoutFormData, cartItems: orderItems } = await req.json();
        const { userId, firstName, lastName, email, city, country, zipcode, phone, shippingCost, streetAddress, paymentMethod } = checkoutFormData;

        // Create orderNumber function
        function generateOrderNumber(length) {
            const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let orderNumber = "";

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                orderNumber += characters.charAt(randomIndex);
            }

            return orderNumber;
        }

        // Use the Prisma transaction
        const result = await db.$transaction(async (prisma) => {
            // Create order and order items within the transaction
            const newOrder = await prisma.order.create({
                data: {
                    orderNumber: generateOrderNumber(8),
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
            });

            const newOrderItems = await prisma.orderItem.createMany({
                data: orderItems.map((item) => ({
                    orderId: newOrder.id,
                    productId: item.id,
                    vendorId: item.vendorId,

                    quantity: parseInt(item.quantity),
                    price: parseFloat(item.salePrice),
                    title: item.title,
                    imageUrl: item.imageUrl,
                })),
            });

            // Calculate total amount for each product and create a sale for each
            const sales = await Promise.all(
                orderItems.map(async (item) => {
                    const totalAmount = parseFloat(item.salePrice) * parseInt(item.quantity);

                    const newSale = await prisma.sale.create({
                        data: {
                            orderId: newOrder.id,
                            productId: item.id,
                            vendorId: item.vendorId,

                            productTitle: item.title,
                            productImage: item.imageUrl,
                            productQuantity: parseInt(item.quantity),
                            productPrice: parseFloat(item.salePrice),
                            total: parseFloat(totalAmount),
                        },
                    });

                    return newSale;
                })
            );

            return { newOrder, newOrderItems, sales };
        });

        console.log(result.newOrder, result.newOrderItems, result.sales);

        // Return the response
        return NextResponse.json({...result.newOrder});
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Failed to create order.",
            error: error
        }, { status: 500 })
    }
}

// export async function POST(req) {
//     try {
//         const { checkoutFormData, cartItems: orderItems } = await req.json();

//         const { userId, firstName, lastName, email, city, country, zipcode, phone, shippingCost, streetAddress, paymentMethod } = checkoutFormData;

//         // Create order number
//         function generateOrderNumber(length) {
//             const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//             let orderNumber = '';

//             for (let i = 0; i < length; i++) {
//                 const randomIndex = Math.floor(Math.random() * characters.length);
//                 orderNumber += characters.charAt(randomIndex);
//             }

//             return orderNumber;
//         }

//         const newOrder = await db.order.create({
//             data: {
//                 orderNumber: generateOrderNumber(8),
//                 userId,
//                 firstName,
//                 lastName,
//                 email,
//                 phone,
//                 streetAddress,
//                 city,
//                 zipcode,
//                 country,
//                 shippingCost: parseFloat(shippingCost),
//                 paymentMethod,
//             }
//         })




//         // create orderItems
//         const newOrderItems = await prisma.orderItem.createMany({
//             data: orderItems.map((item) => ({
//                 orderId: newOrder.id,
//                 productId: item.id,
//                 vendorId: item.vendorId,

//                 quantity: parseInt(item.quantity),
//                 price: parseFloat(item.salePrice),
//                 title: item.title,
//                 imageUrl: item.imageUrl,
//             }))
//         })

//         return NextResponse.json(newOrder)
//     } catch (error) {
//         return NextResponse.json({
//             message: "Failed to create new order",
//             error: error
//         }, { status: 500 })
//     }
// }


export async function GET(req) {
    try {
        const orders = await db.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                orderItems: true
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