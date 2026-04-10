/**
 * lib/notifications.ts
 *
 * Handles all outbound notifications triggered by a new booking:
 *   1. SMS to the barber via Twilio (requires twilio npm package)
 *   2. HTML confirmation email to the customer via Resend
 *   3. HTML notification email to the barber via Resend
 *
 * All functions fail gracefully — a notification error will never block
 * the booking confirmation response returned to the customer.
 *
 * Required env vars (set in .env.local):
 *   TWILIO_ACCOUNT_SID   — Twilio account SID
 *   TWILIO_AUTH_TOKEN    — Twilio auth token
 *   TWILIO_FROM_NUMBER   — Twilio phone number in E.164 format (e.g. +18005551234)
 *   RESEND_API_KEY       — Resend API key
 *   RESEND_FROM_ADDRESS  — Verified sender address (e.g. bookings@yourdomain.com)
 */

export type BookingNotificationPayload = {
  /** Booking confirmation ID (UUID or short ID) */
  bookingId: string;
  /** Customer's full name */
  customerName: string;
  /** Customer's email address */
  customerEmail: string;
  /** Customer's phone number */
  customerPhone: string;
  /** Barber's display name */
  barberName: string;
  /** Barber's phone number in E.164 format (for SMS) — undefined skips SMS */
  barberPhone?: string;
  /** Barber's email address — undefined skips barber email */
  barberEmail?: string;
  /** Name of the service booked */
  serviceName: string;
  /** Duration of the service in minutes */
  serviceDurationMins: number;
  /** Appointment date string (e.g. "Saturday, April 12, 2026") */
  appointmentDate: string;
  /** Appointment time string (e.g. "2:30 PM") */
  appointmentTime: string;
  /** Shop name */
  shopName: string;
  /** Shop address */
  shopAddress: string;
  /** Shop phone number */
  shopPhone: string;
  /** Resend from address (e.g. "bookings@yourdomain.com") */
  fromAddress: string;
  /** Resend from name (e.g. "Elite Barber Studio") */
  fromName: string;
};

// ---------------------------------------------------------------------------
// SMS — Twilio
// ---------------------------------------------------------------------------

/**
 * Sends an SMS to the barber notifying them of a new booking.
 * Requires: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER
 */
export async function sendBarberSms(payload: BookingNotificationPayload): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) {
    console.warn("[notifications] Twilio env vars not set — skipping SMS.");
    return;
  }

  if (!payload.barberPhone) {
    console.warn("[notifications] Barber has no phone number — skipping SMS.");
    return;
  }

  const message =
    `📅 New booking at ${payload.shopName}!\n` +
    `Client: ${payload.customerName} (${payload.customerPhone})\n` +
    `Service: ${payload.serviceName} (${payload.serviceDurationMins} min)\n` +
    `When: ${payload.appointmentDate} at ${payload.appointmentTime}\n` +
    `Booking ID: ${payload.bookingId}`;

  try {
    // Dynamic import so the build doesn't fail if twilio is not installed
    const twilio = await import("twilio").then((m) => m.default ?? m);
    const client = twilio(sid, token);
    await client.messages.create({
      body: message,
      from,
      to: payload.barberPhone
    });
    console.log(`[notifications] SMS sent to barber ${payload.barberName} at ${payload.barberPhone}`);
  } catch (err) {
    console.error("[notifications] Failed to send barber SMS:", err);
  }
}

// ---------------------------------------------------------------------------
// Email — Resend
// ---------------------------------------------------------------------------

/** Builds the shared HTML email shell */
function buildEmailHtml(title: string, bodyHtml: string, accentColor = "#c8102e"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#161616;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:${accentColor};padding:24px 32px;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#fff;letter-spacing:0.04em;">${title}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;font-size:12px;color:#9ca3af;">This is an automated message. Please do not reply directly to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Builds a detail row for the booking summary table */
function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;font-size:13px;color:#9ca3af;width:140px;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:#f5f5f5;font-weight:500;">${value}</td>
  </tr>`;
}

/**
 * Sends a booking confirmation email to the customer.
 * Requires: RESEND_API_KEY
 */
export async function sendCustomerConfirmationEmail(payload: BookingNotificationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[notifications] RESEND_API_KEY not set — skipping customer email.");
    return;
  }

  const bodyHtml = `
    <p style="margin:0 0 8px;font-size:18px;font-weight:600;color:#f5f5f5;">You're booked, ${payload.customerName.split(" ")[0]}! ✂️</p>
    <p style="margin:0 0 24px;font-size:14px;color:#9ca3af;">Here's a summary of your upcoming appointment at ${payload.shopName}.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(255,255,255,0.08);margin-bottom:24px;">
      ${detailRow("Barber", payload.barberName)}
      ${detailRow("Service", payload.serviceName)}
      ${detailRow("Duration", `${payload.serviceDurationMins} min`)}
      ${detailRow("Date", payload.appointmentDate)}
      ${detailRow("Time", payload.appointmentTime)}
      ${detailRow("Location", payload.shopAddress)}
    </table>
    <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;">Need to cancel or reschedule? Call us at <a href="tel:${payload.shopPhone}" style="color:#c8102e;text-decoration:none;">${payload.shopPhone}</a> at least 12 hours before your appointment.</p>
    <p style="margin:0;font-size:13px;color:#9ca3af;">Booking reference: <span style="color:#f5f5f5;font-family:monospace;">${payload.bookingId}</span></p>
  `;

  const html = buildEmailHtml(`Booking Confirmed — ${payload.shopName}`, bodyHtml);

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${payload.fromName} <${payload.fromAddress}>`,
      to: payload.customerEmail,
      subject: `Your appointment is confirmed — ${payload.appointmentDate} at ${payload.appointmentTime}`,
      html
    });
    console.log(`[notifications] Confirmation email sent to customer ${payload.customerEmail}`);
  } catch (err) {
    console.error("[notifications] Failed to send customer confirmation email:", err);
  }
}

/**
 * Sends a new booking notification email to the barber.
 * Requires: RESEND_API_KEY
 */
export async function sendBarberNotificationEmail(payload: BookingNotificationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[notifications] RESEND_API_KEY not set — skipping barber email.");
    return;
  }

  if (!payload.barberEmail) {
    console.warn("[notifications] Barber has no email address — skipping barber email.");
    return;
  }

  const bodyHtml = `
    <p style="margin:0 0 8px;font-size:18px;font-weight:600;color:#f5f5f5;">New booking, ${payload.barberName}! 📅</p>
    <p style="margin:0 0 24px;font-size:14px;color:#9ca3af;">A client has booked an appointment with you.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(255,255,255,0.08);margin-bottom:24px;">
      ${detailRow("Client", payload.customerName)}
      ${detailRow("Client phone", payload.customerPhone)}
      ${detailRow("Client email", payload.customerEmail)}
      ${detailRow("Service", payload.serviceName)}
      ${detailRow("Duration", `${payload.serviceDurationMins} min`)}
      ${detailRow("Date", payload.appointmentDate)}
      ${detailRow("Time", payload.appointmentTime)}
    </table>
    <p style="margin:0;font-size:13px;color:#9ca3af;">Booking reference: <span style="color:#f5f5f5;font-family:monospace;">${payload.bookingId}</span></p>
  `;

  const html = buildEmailHtml(`New Booking — ${payload.customerName}`, bodyHtml);

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${payload.fromName} <${payload.fromAddress}>`,
      to: payload.barberEmail,
      subject: `New booking: ${payload.customerName} — ${payload.appointmentDate} at ${payload.appointmentTime}`,
      html
    });
    console.log(`[notifications] Notification email sent to barber ${payload.barberEmail}`);
  } catch (err) {
    console.error("[notifications] Failed to send barber notification email:", err);
  }
}

/**
 * Fires all three notification channels in parallel.
 * Individual failures are caught and logged — they never throw.
 */
export async function sendAllBookingNotifications(payload: BookingNotificationPayload): Promise<void> {
  await Promise.allSettled([
    sendBarberSms(payload),
    sendCustomerConfirmationEmail(payload),
    sendBarberNotificationEmail(payload)
  ]);
}
