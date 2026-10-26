"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import products from "@/app/products.json";
import { useStore } from "@/components/store/StoreProvider";
import ProductCard from "@/components/product/ProductCard";
import "./productdetail.css";
export default function ProductDetail() {
  const [id, setId] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    days: "03",
    hours: "23",
    minutes: "19",
    seconds: "56",
  });
  useEffect(() => {
    setId(Number(new URLSearchParams(window.location.search).get("id") || 1));
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let sec = parseInt(prev.seconds) - 1;
        if (sec >= 0) return { ...prev, seconds: sec < 10 ? `0${sec}` : `${sec}` };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const product = products.find((p) => p.id === id) || products[0];
  const { t, addCart, wishlist, toggleWish } = useStore();
  return (
      <main className="container product-detail-page">
        <div className="page-heading">
          <Link href="/homepage">
            {t.home}
          </Link>
          {" / "}
          <span>{product.name}</span>
        </div>
        <section className="detail-layout">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-info">
            <h1>{product.name}</h1>
            <div className="detail-rating">
              ★★★★★{" "}
              <span>
                ({product.reviews || 88} Reviews) | <span >In Stock</span>
              </span>
            </div>
            <div className="detail-price">${product.price}</div>
            <p>{product.description}</p>
            <div className="detail-buttons">
              <button className="primary-btn" onClick={() => addCart(product)}>
                {t.add || "Buy Now"}
              </button>
              <button
                className="secondary-btn"
                onClick={() => toggleWish(product)}>
                {wishlist.some((x) => x.id === product.id) ? "♥" : "♡"}
              </button>
            </div>
            <div className="detail-meta">
              <div>
                🚚 Free Delivery <br />
                <small>Enter your postal code for delivery availability.</small>
              </div>
              <div>
                🔄 Return Delivery <br />
                <small>Free 30 Days Delivery Returns.</small>
              </div>
            </div>
          </div>
        </section>
        <section className="product-section" style={{ marginTop: "60px" }}>
          <div className="section-kicker">
          </div>
          <div className="section-top">
            <h2 className="section-title">
              Related Items
            </h2>
          </div>
          <div className="product-grid">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/homepage">
              <button>
                View All Products
              </button>
            </Link>
          </div>
        </section>
      </main>
  );
}