import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { slug } }) {
    try {
        const product = await db.product.findUnique({
            where: {
                slug
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch product",
            error: error
        }, { status: 500 })
    }
}

// export async function DELETE(req, { params: { id } }) {
//     try {
//         const isExists = await db.product.findUnique({
//             where: {
//                 id
//             }
//         })
//         console.log(isExists);
//         if (!isExists) {
//             return NextResponse.json({
//                 data: null,
//                 message: "Product not found",
//             }, { status: 404 })
//         }
//         const deletedproduct = await db.product.delete({
//             where: {
//                 id: isExists.id
//             }
//         })

//         return NextResponse.json({
//             message: "Product deleted",
//             data: deletedproduct
//         }, { status: 200 })

//     } catch (error) {
//         return NextResponse.json({
//             message: "Failed to Delete Product",
//             error: error
//         }, { status: 500 })
//     }
// }

// export async function PUT(req, { params: { id } }) {
//     try {
//         const { title, slug,
//             descripton, imageUrl,
//             isActive, sku,
//             barcode, productCode,
//             unit, productPrice,
//             salePrice, isWholesale,
//             wholesalePrice, wholwsaleQuantity,
//             productStock, quantity,
//             tags, categoryId } = await req.json();

//         const isExists = await db.product.findUnique({
//             where: {
//                 id,
//             }
//         })

//         if (!isExists) {
//             return NextResponse.json({
//                 message: "Product not found",
//                 data: null,
//             }, { status: 404 })
//         }

//         const updatedProduct = await db.product.update({
//             where: {
//                 id
//             },
//             data: {
//                 title, slug,
//                 descripton, imageUrl,
//                 isActive, sku,
//                 barcode, productCode,
//                 unit, productPrice,
//                 salePrice, isWholesale,
//                 wholesalePrice, wholwsaleQuantity,
//                 productStock, quantity,
//                 tags, categoryId
//             }
//         });

//         return NextResponse.json(updatedProduct);

//     } catch (error) {
//         return NextResponse.json({
//             message: "Failed to fetch product",
//             error: error
//         }, { status: 500 })
//     }
// }