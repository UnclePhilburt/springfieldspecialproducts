import { NextResponse } from "next/server";
import { sendNotificationEmail, formatFormRow, wrapEmailHtml } from "@/lib/brevo";
import { isSpam } from "@/lib/antispam";

export async function POST(request: Request) {
  const data = await request.json();

  if (isSpam(data)) {
    return NextResponse.json({ success: true }); // silent reject
  }

  // This route handles stock trailer covers, dump truck tarps,
  // agriculture tarps, and military quotes
  const categoryLabels: Record<string, string> = {
    "stock-trailer-cover": "Stock Trailer Cover",
    "dump-truck-tarp": "Dump Truck Tarp",
    "agriculture-tarp": "Agriculture Tarp",
    "military": "Military Procurement",
  };

  const label = categoryLabels[data.category] || data.category || "Trailer Cover";

  const rows = [
    formatFormRow("Category", label),
    formatFormRow("Name", data.name),
    formatFormRow("Email", data.email),
    formatFormRow("Phone", data.phone),
    // Military
    formatFormRow("Organization / Unit", data.organization),
    // Stock trailer
    formatFormRow("Trailer Make/Model", data.trailerMake),
    formatFormRow("Trailer Length", data.trailerLength),
    formatFormRow("Trailer Width", data.trailerWidth),
    formatFormRow("Trailer Height", data.trailerHeight),
    formatFormRow("Cover Type", data.coverType),
    formatFormRow("Nose Cover", data.noseCover),
    formatFormRow("End Gate", data.endGate),
    // Dump truck
    formatFormRow("Truck Type", data.truckType),
    formatFormRow("Bed Length", data.bedLength),
    formatFormRow("Bed Width", data.bedWidth),
    formatFormRow("Side Height", data.sideHeight),
    formatFormRow("Tarp System", data.tarpSystem),
    formatFormRow("What They Haul", data.hauling),
    // Agriculture
    formatFormRow("Tarp Type", data.tarpType),
    formatFormRow("Length", data.length),
    formatFormRow("Width", data.width),
    formatFormRow("What Covering", data.covering),
    formatFormRow("Indoor/Outdoor", data.indoorOutdoor),
    // Military / shared
    formatFormRow("Product Type", data.productType),
    formatFormRow("Quantity", data.quantity),
    formatFormRow("Dimensions", data.dimensions),
    formatFormRow("Vinyl Weight", data.vinylWeight),
    formatFormRow("Color", data.color),
    formatFormRow("Details", data.details),
  ].join("");

  try {
    await sendNotificationEmail({
      subject: `New Quote Request – ${label}`,
      htmlContent: wrapEmailHtml(`${label} Quote`, rows),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
