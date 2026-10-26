"use client";
import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import "./Footer.css";
export default function Footer() {
  const { t } = useStore();
  return (
    <footer id="footer" className="site-footer">
      <div>
        <Link className="footer-brand" href="/homepage">
          Exclusive<span>.</span>
        </Link>
        <h3>{t.footer}</h3>
        <p>support@exclusive.example</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <Link href="/homepage">{t.home}</Link>
        <Link href="/contact">{t.contact}</Link>\n<Link href="/about">{t.about}</Link>\n<Link href="/favorites">{t.wishlist}</Link>
        <Link href="/basket">{t.cart}</Link>
      </div>
      <div>
        <h4>Customer Service</h4>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>FAQ</p>
      </div>
      <div>
        <h4>Download App</h4>
        <p>Save more with app exclusive offers.</p>
        <div className="app-badges">
        <span>App Store</span>
        <span>Google Play</span>
        </div>
      </div>
      <div className="copyright">
      © Copyright Exclusive 2026. All rights reserved.
      </div>
    </footer>
  );
}
