import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const productData = await req.json();
        console.log("product route", productData)
        const existingProduct = await db.product.findUnique({
            where: {
                slug: productData.slug,
            }
        })

        if (existingProduct) {
            return NextResponse.json({
                data: null,
                message: "Product already exists",
            }, { status: 409 })
        }
        

        const newProduct = await db.product.create({
            data: {
                title: productData.title,
                slug: productData.slug,
                imageUrl: productData.imageUrl,
                description: productData.description,
                isActive: productData.isActive,
                sku: productData.sku,
                barcode: productData.barcode,
                productCode: productData.productCode,
                unit: productData.unit,
                
                productPrice: parseFloat(productData.productPrice),
                salePrice: parseFloat(productData.salePrice),
                wholesalePrice: parseFloat(productData.wholesalePrice),
                wholesaleQuantity: parseInt(productData.wholesaleQuantity),
                productStock: parseInt(productData.productStock),
                quantity: parseInt(productData.quantity),
                tags: productData.tags,
                
                categoryId: productData.categoryId,
                userId: productData.farmerId,
                
                isWholesale: productData.isWholesale,
            }
        })

        return NextResponse.json(newProduct)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new product",
            error: error
        }, { status: 500 })
    }
}



export async function GET(req) {
    try {
        const products = await db.product.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch products.",
            error: error
        }, { status: 500 })
    }
}