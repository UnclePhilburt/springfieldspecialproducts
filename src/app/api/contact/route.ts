import { NextResponse } from "next/server";
import { sendNotificationEmail, formatFormRow, wrapEmailHtml } from "@/lib/brevo";

export async function POST(request: Request) {
  const data = await request.json();

  const rows = [
    formatFormRow("Name", data.name),
    formatFormRow("Email", data.email),
    formatFormRow("Phone", data.phone),
    formatFormRow("Message", data.message),
  ].join("");

  try {
    await sendNotificationEmail({
      subject: "New Contact Form Submission",
      htmlContent: wrapEmailHtml("New Contact Message", rows),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
