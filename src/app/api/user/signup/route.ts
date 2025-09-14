// app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sendOtpEmail } from "@/lib/mailer"; // We will create this helper next

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define a schema for input validation using Zod
const userSignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate the request body
    const body = await request.json();
    const { name, email, password } = userSignUpSchema.parse(body);

    // 2. Check if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // If user exists, return a 409 Conflict error
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // 3. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(new Date().getTime() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // 5. Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
      },
    });

    // 6. Send the OTP email
    await sendOtpEmail(email, otp);

    // 7. Return a success response
    return NextResponse.json(
      {
        message: "User registered successfully. Please check your email for the verification OTP.",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors from Zod
    if (error instanceof z.ZodError) {
  return NextResponse.json(
    { message: "Invalid input", errors: error.issues }, // ✅
    { status: 400 }
  );
}

    
    // Handle other errors
    console.error("SIGNUP_ERROR", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}