import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import EmailTemplate from "@/components/EmailTemplate";
import { render } from "@react-email/render";

export async function POST(req) {
    try {
        const { name, email, password, role } = await req.json();

        const isExistingUser = await db.user.findUnique({ where: { email } });
        if (isExistingUser) {
            return NextResponse.json(
                { data: null, message: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const rawToken = uuidv4();
        const token = base64url.encode(rawToken);

        const user = await db.user.create({
            data: {
                name,
                email,
                role,
                password: hashedPassword,
                verificationToken: token,
            },
        });

        // Send verification email if FARMER
        if (role === "FARMER") {
            const userId = user.id;
            const linkText = "Verify Account";
            const redirectUrl = `onboarding/${userId}?token=${token}`;
            const subject = `Account Verification - Multi-Ecommerce`;
            const description =
                ` Thank you, for Creating an Account with Us. We request you to click
            on the link Below in order to Complete your onboarding process.
            Thankyou.`;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            const emailHtml = await render(
                EmailTemplate({ name, redirectUrl, linkText, description })
            );

            const info = await transporter.sendMail({
                from: `"Multi-Ecommerce" <${process.env.SMTP_USER}>`,
                to: email,
                subject: subject,
                html: emailHtml,
            });

            console.log("Email sent:", info.messageId);
        }

        return NextResponse.json(
            { data: user, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to create a user.", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch users", error: error.message },
            { status: 500 }
        );
    }
}
