"use client";
import { useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import Protected from "@/components/store/Protected";
import "./contact.css";
export default function Contact() {
  const { t } = useStore();
  const [sent, setSent] = useState(false);
  return (
    <Protected>
      <main className="container contact-page">
        <div className="contact-layout">
          <aside className="contact-card">
            <section>
              <h3>
                <span>☎</span> {t.callUs || "Call To Us"}
              </h3>
              <p>
                We are available 24/7, 7 days a week.
              </p>
              <p>Phone: +998953444404</p>
            </section>
            <hr />

            <section>
              <h3>
                <span>✉</span> {t.writeUs || "Write To Us"}
              </h3>
              <p>
                Fill out our form and we will contact you
                within 24 hours.
              </p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </section>
          </aside>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="contact-inputs">
              <input
                required
                placeholder="Your Name *"/>
              <input
                required
                type="email"
                placeholder="Your Email *"/>

              <input
                required
                type="tel"
                placeholder="Your Phone *"/>
            </div>

            <textarea
              required
              placeholder="Your Message"/>
            {sent && (
              <p className="success-message">
                Your message has been sent!
              </p>
            )}
            <button type="submit" className="primary-btn">
              {sent ? "Sent" : "Send Message"}
            </button>
          </form>
        </div>
      </main>
    </Protected>
  );
}
