import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Log for now — replace with email service (Resend, SendGrid, etc.) later
  console.log("Contact form submission:", data);

  return NextResponse.json({ success: true });
}
