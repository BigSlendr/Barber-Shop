import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { activeShop } from "@/config/shops";
import { sendAllBookingNotifications } from "@/lib/notifications";

/**
 * POST /api/book
 *
 * Accepts a booking submission, validates required fields, and fires notifications:
 *   - SMS to the barber via Twilio (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER)
 *   - Confirmation email to the customer via Resend (RESEND_API_KEY)
 *   - Notification email to the barber via Resend
 *
 * Required body: barberId, serviceId, date (YYYY-MM-DD), time (HH:mm), name, phone, email
 * Optional body: notes
 */
export async function POST(request: Request) {
  let payload: Record<string, string>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { barberId, serviceId, date, time, name, phone, email } = payload;

  if (!barberId || !serviceId || !date || !time || !name || !phone || !email) {
    return NextResponse.json(
      { error: "Missing required fields: barberId, serviceId, date, time, name, phone, email" },
      { status: 400 }
    );
  }

  const barber = activeShop.barbers.find((b) => b.id === barberId);
  const service = activeShop.services.find((s) => s.id === serviceId);

  if (!barber) return NextResponse.json({ error: "Barber not found" }, { status: 404 });
  if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  const bookingId = randomUUID().slice(0, 8).toUpperCase();
  const appointmentDate = dayjs(`${date}T${time}`).format("dddd, MMMM D, YYYY");
  const appointmentTime = dayjs(`${date}T${time}`).format("h:mm A");

  const notifConfig = activeShop.notifications;
  const fromAddress =
    notifConfig?.resend?.fromAddress ??
    process.env.RESEND_FROM_ADDRESS ??
    `bookings@${activeShop.slug}.com`;
  const fromName = notifConfig?.resend?.fromName ?? activeShop.shopName;

  await sendAllBookingNotifications({
    bookingId,
    customerName: name,
    customerEmail: email,
    customerPhone: phone,
    barberName: barber.name,
    barberPhone: barber.phone,
    barberEmail: undefined,
    serviceName: service.name,
    serviceDurationMins: service.durationMins,
    appointmentDate,
    appointmentTime,
    shopName: activeShop.shopName,
    shopAddress: `${activeShop.address}, ${activeShop.city}, ${activeShop.state} ${activeShop.postalCode}`,
    shopPhone: activeShop.phone,
    fromAddress,
    fromName
  });

  return NextResponse.json({
    ok: true,
    bookingId,
    message: `Booking confirmed! You will receive a confirmation email at ${email}. Your barber ${barber.name} has been notified.`
  });
}
