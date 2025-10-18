import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params: { slug } }) {
    try {
        const category = await db.category.findUnique({
            where: {
                slug
            },
            include: {
                products: true
            }
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch category",
            error: error
        }, { status: 500 })
    }
}

// export async function DELETE(req, { params: { id } }) {
//     try {
//         const isExists = await db.category.findUnique({
//             where: {
//                 id
//             }
//         })
//         console.log(isExists);
//         if (!isExists) {
//             return NextResponse.json({
//                 data: null,
//                 message: "Category not found",
//             }, { status: 404 })
//         }
//         const deletedCategory = await db.category.delete({
//             where: {
//                 id: isExists.id
//             }
//         })

//         return NextResponse.json({
//             message: "Category deleted",
//             data: deletedCategory
//         }, { status: 200 })

//     } catch (error) {
//         return NextResponse.json({
//             message: "Failed to delete category",
//             error: error
//         }, { status: 500 })
//     }
// }

// export async function PUT(req, { params: { id } }) {
//     try {
//         const { title, slug, imageUrl, description, isActive } = await req.json();
//         const isExists = await db.category.findUnique({
//             where: {
//                 id,
//             }
//         })
//         if (!isExists) {
//             return NextResponse.json({
//                 message: "Category not found",
//                 data: null,
//             }, { status: 404 })
//         }
//         const updatedCategory = await db.category.update({
//             where: {
//                 id
//             },
//             data: {
//                 title, slug, description, isActive, imageUrl
//             }
//         });
//         return NextResponse.json(updatedCategory);
//     } catch (error) {
//         return NextResponse.json({
//             message: "Failed to fetch category",
//             error: error
//         }, { status: 500 })
//     }
// }