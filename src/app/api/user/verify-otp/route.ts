// app/api/auth/verify-otp/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Validate the request body
    const body = await request.json();
    const { email, otp } = verifyOtpSchema.parse(body);

    // 2. Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." }, 
        { status: 404 }
      );
    }

    // 3. Check if the OTP is correct and not expired
    const isOtpValid = user.otp === otp;
    const isOtpExpired = new Date() > new Date(user.otpExpiry!);

    if (!isOtpValid) {
      return NextResponse.json(
        { message: "Invalid OTP provided." },
        { status: 400 }
      );
    }

    if (isOtpExpired) {
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // 4. Update the user to mark them as verified
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null, // Clear the OTP
        otpExpiry: null, // Clear the OTP expiry
      },
    });

    // 5. Return a success response
    return NextResponse.json(
      {
        message: "Email verified successfully!",
        success: true,
      },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.issues },
        { status: 400 }
      );
    }

    console.error("VERIFY_OTP_ERROR", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}