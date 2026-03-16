import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Save to database using Prisma
    // const contactMessage = await prisma.contactMessage.create({
    //   data: {
    //     name,
    //     email,
    //     message,
    //   },
    // });

    console.log("Contact message received:", { name, email, message });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
