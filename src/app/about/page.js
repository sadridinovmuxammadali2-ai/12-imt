"use client";
import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import Protected from "@/components/store/Protected";
import "./about.css";
export default function About() {
  const { t } = useStore();
  return (
    <Protected>
      <main className="container about-page">
      <div className="breadcrumbs">  
      </div>
      <section className="about-intro">
        <div>
          <h1>{t.about}</h1>
          <p>
            Exclusive — your convenient online shopping
            destination. We bring together quality products,
            simple shopping and helpful customer service.
          </p>
          <p>
            Our goal is to make finding the products you need
            easy, enjoyable and reliable.
          </p>
          <Link className="primary-btn" href="/homepage">
            {t.shopNow}
          </Link>
        </div>
      </section>
      <div className="about-stats">
        <div>
          <b>10k+</b>
          <span>Happy customers</span>
        </div>
        <div>
          <b>2k+</b>
          <span>Products available</span>
        </div>
        <div>
          <b>24/7</b>
          <span>Customer support</span>
        </div>
      </div>
      </main>
    </Protected>
  );
}