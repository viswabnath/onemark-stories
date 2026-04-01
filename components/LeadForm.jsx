/**
 * components/LeadForm.jsx
 *
 * Structured enquiry form — captures name, event type, date, budget, and
 * message. On submit it POSTs to /api/enquiry (which forwards to WhatsApp
 * via a wa.me deep-link redirect) AND stores the lead in localStorage so
 * you can see it in the console / hook up a backend later.
 *
 * Drop into ClosingCTA, Pricing, or anywhere you want to replace a bare
 * WhatsApp button with something that captures data first.
 */
import { useState } from "react";

const WA_NUMBER = "919392704742";

const EVENT_TYPES = [
  "Wedding",
  "Birthday / Milestone",
  "Corporate Event",
  "Movie / Music Launch",
  "Portfolio",
  "Other",
];

const BUDGETS = [
  "Spark — ₹2,999 ($35)",
  "Bloom — ₹6,499 ($75)",
  "Legacy — ₹9,999 ($125)",
  "Not sure yet",
];

export default function LeadForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    // Build WhatsApp message
    const lines = [
      `Hi OneMark Stories! 👋 I'd like to enquire about a custom experience.`,
      ``,
      `*Name:* ${form.name}`,
      `*Event Type:* ${form.eventType}`,
      `*Event Date:* ${form.eventDate || "TBD"}`,
      `*Package:* ${form.budget}`,
      `*Phone:* ${form.phone || "—"}`,
      ``,
      `*Message:*`,
      form.message || "(none)",
    ];
    const waText = encodeURIComponent(lines.join("\n"));
    const waUrl  = `https://wa.me/${WA_NUMBER}?text=${waText}`;

    // Store lead locally (replace with a real API call / Google Sheet webhook)
    try {
      const leads = JSON.parse(localStorage.getItem("om_leads") || "[]");
      leads.push({ ...form, submittedAt: new Date().toISOString() });
      localStorage.setItem("om_leads", JSON.stringify(leads));
    } catch (_) { /* storage unavailable */ }

    // Small artificial delay so the button doesn't flash
    await new Promise((r) => setTimeout(r, 600));

    setStatus("done");
    onSuccess?.();

    // Open WhatsApp in new tab after a short success moment
    setTimeout(() => window.open(waUrl, "_blank", "noopener,noreferrer"), 800);
  }

  if (status === "done") {
    return (
      <div className="lead-form lead-form--success">
        <div className="lead-form__success-icon">✓</div>
        <h3 className="lead-form__success-title">We&rsquo;ve got your details!</h3>
        <p className="lead-form__success-body">
          Opening WhatsApp so we can continue the conversation&hellip;
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form__row">
        <div className="lead-form__field">
          <label className="lead-form__label" htmlFor="lf-name">Your name *</label>
          <input
            id="lf-name"
            className="lead-form__input"
            type="text"
            placeholder="Priya Sharma"
            value={form.name}
            onChange={set("name")}
            required
          />
        </div>
        <div className="lead-form__field">
          <label className="lead-form__label" htmlFor="lf-phone">WhatsApp number</label>
          <input
            id="lf-phone"
            className="lead-form__input"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={set("phone")}
          />
        </div>
      </div>

      <div className="lead-form__row">
        <div className="lead-form__field">
          <label className="lead-form__label" htmlFor="lf-type">Event type *</label>
          <select
            id="lf-type"
            className="lead-form__input lead-form__select"
            value={form.eventType}
            onChange={set("eventType")}
            required
          >
            <option value="" disabled>Select&hellip;</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="lead-form__field">
          <label className="lead-form__label" htmlFor="lf-date">Event date</label>
          <input
            id="lf-date"
            className="lead-form__input"
            type="date"
            value={form.eventDate}
            onChange={set("eventDate")}
          />
        </div>
      </div>

      <div className="lead-form__field">
        <label className="lead-form__label" htmlFor="lf-budget">Package you&rsquo;re considering *</label>
        <select
          id="lf-budget"
          className="lead-form__input lead-form__select"
          value={form.budget}
          onChange={set("budget")}
          required
        >
          <option value="" disabled>Select&hellip;</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="lead-form__field">
        <label className="lead-form__label" htmlFor="lf-msg">Tell us about your event</label>
        <textarea
          id="lf-msg"
          className="lead-form__input lead-form__textarea"
          placeholder="Venue, guest count, special requirements&hellip;"
          rows={3}
          value={form.message}
          onChange={set("message")}
        />
      </div>

      <button
        type="submit"
        className="lead-form__submit whatsapp-btn"
        disabled={status === "sending"}
        data-hover
      >
        {status === "sending" ? (
          "Sending…"
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Send Enquiry via WhatsApp
          </>
        )}
      </button>

      <p className="lead-form__privacy">
        Your details are only used to prepare your quote. We&rsquo;ll never spam you.
      </p>
    </form>
  );
}