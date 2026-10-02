import emailjs from "@emailjs/browser";

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Enter your EmailJS IDs below:
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // e.g., "service_abcdef"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g., "template_123456"
const EMAILJS_PUBLIC_KEY = "j4nGAr64wUmemrGcU"; // Your Public Key

// All 3 Team Nexus Creators who receive every registration notification
const TEAM_EMAILS = [
  { email: "kesgirgnaneshwar025@gmail.com", name: "GNANESHWAR" },
  { email: "ramsharma21144@gmail.com", name: "RAM SHARMA" },
  { email: "ganeshd.koyalkar34@gmail.com", name: "GANESH" },
];

export interface RegistrationData {
  registrantName: string;
  registrantEmail: string;
  registrantMobile: string;
  eventName: string;
  eventCategory: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
}

/**
 * Sends registration invoice/notification to all 3 team members immediately
 * after any participant registers for an event.
 */
export async function notifyTeamOnRegistration(data: RegistrationData): Promise<void> {
  const registrationId = `EVH-${Date.now().toString(36).toUpperCase()}`;
  const registrationTime = new Date().toLocaleString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  });

  // Check if EmailJS Service and Template are configured
  if (
    !EMAILJS_SERVICE_ID ||
    EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
    !EMAILJS_TEMPLATE_ID ||
    EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID"
  ) {
    console.info(
      "📧 [EventHub] EmailJS Notice: Service ID or Template ID not set yet in src/utils/emailService.ts.\n" +
      "Registration saved locally and invoice generated.",
      {
        registrationId,
        registrationTime,
        ...data,
        targetTeamEmails: TEAM_EMAILS.map((t) => t.email),
      }
    );
    return;
  }

  // Send an email to each of the 3 team members
  const sendPromises = TEAM_EMAILS.map((member) =>
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: member.email,
        to_name: member.name,
        registration_id: registrationId,
        registrant_name: data.registrantName,
        registrant_email: data.registrantEmail,
        registrant_mobile: data.registrantMobile,
        event_name: data.eventName,
        event_category: data.eventCategory,
        event_date: data.eventDate,
        event_time: data.eventTime,
        event_venue: data.eventVenue,
        registration_time: registrationTime,
      },
      EMAILJS_PUBLIC_KEY
    )
  );

  try {
    await Promise.all(sendPromises);
    console.info(
      `✅ [EventHub] Registration #${registrationId} email sent to all 3 team members.`
    );
  } catch (err) {
    console.error("⚠️ [EventHub] EmailJS send error:", err);
  }
}