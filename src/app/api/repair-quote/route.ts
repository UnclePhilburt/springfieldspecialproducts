import { NextResponse } from "next/server";
import { sendNotificationEmail, formatFormRow, wrapEmailHtml } from "@/lib/brevo";
import { isSpam } from "@/lib/antispam";

export async function POST(request: Request) {
  const data = await request.json();

  if (isSpam(data)) {
    return NextResponse.json({ success: true }); // silent reject
  }

  const rows = [
    formatFormRow("Name", data.name),
    formatFormRow("Email", data.email),
    formatFormRow("Phone", data.phone),
    formatFormRow("Item Type", data.itemType),
    formatFormRow("Description", data.description),
  ].join("");

  try {
    await sendNotificationEmail({
      subject: "New Repair Quote Request",
      htmlContent: wrapEmailHtml("Repair Quote Request", rows),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
