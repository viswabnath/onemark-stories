/**
 * components/LeadForm.jsx — Minimal 2-field lead capture.
 * Name + WhatsApp number → opens a pre-filled WhatsApp chat.
 * Everything else (event type, date, budget) happens in the conversation.
 */
import { useState } from "react";

const WA_NUMBER = "918331978532";

export default function LeadForm({ onSuccess }) {
  const [name,   setName]   = useState("");
  const [phone,  setPhone]  = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus("sending");

    const msg = [
      `Hi OneMark Stories! 👋`,
      ``,
      `My name is *${name.trim()}* and I'd love to get a custom digital experience made.`,
      phone.trim() ? `My WhatsApp number: *${phone.trim()}*` : "",
      ``,
      `Can we talk?`,
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

    try {
      const leads = JSON.parse(localStorage.getItem("om_leads") || "[]");
      leads.push({ name: name.trim(), phone: phone.trim(), submittedAt: new Date().toISOString() });
      localStorage.setItem("om_leads", JSON.stringify(leads));
    } catch (_) {}

    await new Promise((r) => setTimeout(r, 500));
    setStatus("done");
    onSuccess?.();
    setTimeout(() => window.open(waUrl, "_blank", "noopener,noreferrer"), 700);
  }

  if (status === "done") {
    return (
      <div className="lead-form lead-form--success">
        <div className="lead-form__success-icon">✓</div>
        <h3 className="lead-form__success-title">Opening WhatsApp&hellip;</h3>
        <p className="lead-form__success-body">We&rsquo;ll get back to you within hours.</p>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className="lead-form__field">
          <label className="lead-form__label" htmlFor="lf-phone">WhatsApp number</label>
          <input
            id="lf-phone"
            className="lead-form__input"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </div>
      </div>

      <button
        type="submit"
        className="lead-form__submit whatsapp-btn"
        disabled={status === "sending"}
        data-hover
      >
        {status === "sending" ? "Opening WhatsApp…" : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start on WhatsApp
          </>
        )}
      </button>

      <p className="lead-form__privacy">
        We&rsquo;ll only use your details to prepare your quote.
      </p>
    </form>
  );
}
