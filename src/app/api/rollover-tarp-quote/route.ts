import { NextResponse } from "next/server";
import { sendNotificationEmail, formatFormRow, wrapEmailHtml } from "@/lib/brevo";

export async function POST(request: Request) {
  const data = await request.json();

  const rows = [
    formatFormRow("Name", data.name),
    formatFormRow("Email", data.email),
    formatFormRow("Phone", data.phone),
    formatFormRow("Trailer Type", data.trailerType),
    formatFormRow("Trailer Length", data.trailerLength),
    formatFormRow("Trailer Width", data.trailerWidth),
    formatFormRow("System Brand/Model", data.systemBrand),
    formatFormRow("Vinyl Weight", data.vinylWeight),
    formatFormRow("Details", data.details),
  ].join("");

  try {
    await sendNotificationEmail({
      subject: "New Rollover Tarp Quote Request",
      htmlContent: wrapEmailHtml("Rollover Tarp Quote", rows),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
