const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "";
const FROM_EMAIL = "noreply@springfieldspecialproducts.com";
const FROM_NAME = "Springfield Special Products";

interface SendEmailOptions {
  subject: string;
  htmlContent: string;
}

export async function sendNotificationEmail({ subject, htmlContent }: SendEmailOptions) {
  if (!BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not set — skipping email");
    return;
  }
  if (!NOTIFICATION_EMAIL) {
    console.warn("NOTIFICATION_EMAIL not set — skipping email");
    return;
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: NOTIFICATION_EMAIL }],
      subject,
      htmlContent,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Brevo email failed:", res.status, err);
    throw new Error(`Brevo email failed: ${res.status}`);
  }
}

export function formatFormRow(label: string, value: string | undefined) {
  if (!value) return "";
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#111827;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`;
}

export function wrapEmailHtml(title: string, rows: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#1f2937;padding:20px 24px">
      <h1 style="margin:0;color:#facc15;font-size:18px">${escapeHtml(title)}</h1>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse">
        ${rows}
      </table>
    </div>
    <div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#6b7280">Sent from springfieldspecialproducts.com</p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
