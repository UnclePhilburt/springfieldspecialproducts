import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Log for now — replace with email service later
  console.log("Repair quote submission:", data);

  return NextResponse.json({ success: true });
}
