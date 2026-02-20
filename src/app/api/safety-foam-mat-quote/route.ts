import { NextResponse } from "next/server";
import { sendNotificationEmail, formatFormRow, wrapEmailHtml } from "@/lib/brevo";

export async function POST(request: Request) {
  const data = await request.json();

  const rows = [
    formatFormRow("Name", data.name),
    formatFormRow("Email", data.email),
    formatFormRow("Phone", data.phone),
    formatFormRow("Application", data.application),
    formatFormRow("Mat Length", data.matLength),
    formatFormRow("Mat Width", data.matWidth),
    formatFormRow("Thickness", data.thickness),
    formatFormRow("Quantity", data.quantity),
    formatFormRow("Vinyl Color", data.vinylColor),
    formatFormRow("Details", data.details),
  ].join("");

  try {
    await sendNotificationEmail({
      subject: "New Safety Foam Mat Quote Request",
      htmlContent: wrapEmailHtml("Safety Foam Mat Quote", rows),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
