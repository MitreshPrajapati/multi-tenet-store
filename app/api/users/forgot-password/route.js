import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import EmailTemplate from "@/components/EmailTemplate";
import { render } from "@react-email/render";


export async function PUT(request) {
    try {
        //extract the data
        const { email } = await request.json();
        //Check if the user Already exists in the db
        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            return NextResponse.json(
                {
                    data: null,
                    message: `User Not Found`,
                },
                { status: 404 }
            );
        }
        //Generate Token
        // Generate a random UUID (version 4)
        const rawToken = uuidv4();
        console.log(rawToken);
        // Encode the token using Base64 URL-safe format
        const token = base64url.encode(rawToken);
        // Update a User in the DB
        // const updatedUser = await db.user.update({
        //   where: {
        //     email,
        //   },
        //   data: {
        //     passwordResetToken: token,
        //   },
        // });
        //Send an Email with the Token on the link as a search param

        const linkText = "Reset Password";
        const userId = existingUser.id;
        const name = existingUser.name;
        const redirectUrl = `reset-password?token=${token}&id=${userId}`;
        const description =
            "Click on the following link in order to reset your password. Thank you";
        const subject = "Password Reset - Multi-Ecommerce";
        console.log(userId, name, redirectUrl);


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
            from: `"Auth System" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            html: emailHtml,
        });


        console.log(info);

        //Upon Click redirect them to the login

        console.log(token);
        return NextResponse.json(
            {
                data: null,
                message: "User Updated Successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Server Error: Something went wrong",
            },
            { status: 500 }
        );
    }
}