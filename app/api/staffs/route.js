import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, isActive, slud, imageUrl, dob, password, email, phone, physicalAddress, notes, nin } = await req.json();
        const newStaff = {
            title,
            slud,
            imageUrl,
            dob,
            password,
            email,
            phone,
            physicalAddress,
            notes,
            isActive,
            nin
        }

        return NextResponse.json(newStaff)
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create new staff",
            error: error
        }, { status: 500 })
    }
}