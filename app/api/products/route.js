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
                imageUrl: productData.productImages[0] || null,
                productImages: productData.productImages,
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
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get('sort');
    const categoryId = searchParams.get('categoryId');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const pageSize = searchParams.get('pageSize') || 2;
    const page = searchParams.get('page') || 1;

    console.log("categoryId", categoryId, searchParams)
    let where = {
        categoryId
    };
    let products = {};

    if (min && max) {
        where.salePrice = {
            gte: parseFloat(min),
            lte: parseFloat(max)
        }
    } else if (max) {
        where.salePrice = {
            lte: parseFloat(max)
        }
    } else if (min) {
        where.salePrice = {
            gte: parseFloat(min)
        }
    }

    try {
        if (categoryId && page) {
            if (sort) {
                products = await db.product.findMany({
                    orderBy: {
                        salePrice: sort === "asc" ? "asc" : "desc",
                    },
                    where,
                    skip: (parseInt(page) - 1) * parseInt(pageSize),
                    take: parseInt(pageSize),
                });
            } else {
                products = await db.product.findMany({
                    where,
                    skip: (parseInt(page) - 1) * parseInt(pageSize),
                    take: parseInt(pageSize),
                    orderBy: {
                        createdAt: "desc",
                    }
                });
            }
        }

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch products.",
            error: error
        }, { status: 500 })
    }
}