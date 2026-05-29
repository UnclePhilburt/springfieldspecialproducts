import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/brevo";

type CodyQuotePayload = {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  quoteSummary?: string;
  estimate?: string;
  product?: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as CodyQuotePayload;

  try {
    await sendNotificationEmail({
      subject: `Cody Quote${data.customerName ? ` - ${data.customerName}` : ""}`,
      htmlContent: buildCodyQuoteEmail(data),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function buildCodyQuoteEmail(data: CodyQuotePayload) {
  const detailRows = parseQuoteSummary(data.quoteSummary);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1f2937">
  <div style="display:none;max-height:0;overflow:hidden">A new quote from Cody's Click Quote Desk is ready to review.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f1ea;padding:28px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border:1px solid #e5dcc8;border-radius:14px;overflow:hidden;box-shadow:0 14px 32px rgba(31,41,55,0.10)">
          <tr>
            <td style="background:#111827;padding:26px 30px;border-bottom:5px solid #eab308">
              <div style="font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#facc15">Springfield Special Products</div>
              <h1 style="margin:8px 0 0;font-size:28px;line-height:1.15;color:#ffffff">New Cody Quote</h1>
              <p style="margin:10px 0 0;font-size:15px;line-height:1.5;color:#d1d5db">A custom tarp quote was built from the in-shop call desk.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 30px 14px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:18px;background:#fefce8;border:1px solid #fde68a;border-radius:12px">
                    <div style="font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#854d0e">Estimated Price</div>
                    <div style="margin-top:6px;font-size:38px;line-height:1;font-weight:900;color:#111827">${escapeHtml(data.estimate || "Not calculated")}</div>
                    <div style="margin-top:8px;font-size:13px;color:#713f12">Final quote can still change after measurements, photos, or shop review.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 30px 0">
              <h2 style="margin:0 0 12px;font-size:16px;color:#111827">Customer</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 8px">
                ${contactCardRow("Name", data.customerName)}
                ${contactCardRow("Phone", data.customerPhone)}
                ${contactCardRow("Email", data.customerEmail)}
                ${contactCardRow("Product", data.product)}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px 26px">
              <h2 style="margin:0 0 12px;font-size:16px;color:#111827">Quote Details</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
                ${detailRows.map((row, index) => detailCardRow(row.label, row.value, index)).join("")}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 30px;background:#f9fafb;border-top:1px solid #e5e7eb">
              <p style="margin:0;font-size:13px;line-height:1.5;color:#6b7280">Sent from Cody's Click Quote Desk on springfieldspecialproducts.com.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function parseQuoteSummary(summary: string | undefined) {
  if (!summary) return [{ label: "Quote details", value: "No details were included." }];

  return summary
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const splitIndex = line.indexOf(":");
      if (splitIndex === -1) return { label: "Note", value: line };
      return {
        label: line.slice(0, splitIndex),
        value: line.slice(splitIndex + 1).trim(),
      };
    });
}

function contactCardRow(label: string, value: string | undefined) {
  return `
    <tr>
      <td style="width:110px;padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;border-right:none;border-radius:10px 0 0 10px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:#6b7280">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;background:#ffffff;border:1px solid #e5e7eb;border-radius:0 10px 10px 0;font-size:15px;font-weight:700;color:#111827">${escapeHtml(value || "Not provided")}</td>
    </tr>`;
}

function detailCardRow(label: string, value: string, index: number) {
  const background = index % 2 === 0 ? "#ffffff" : "#f9fafb";
  return `
    <tr>
      <td style="width:42%;padding:12px 14px;background:${background};border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:800;color:#374151">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;background:${background};border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827">${escapeHtml(value)}</td>
    </tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
