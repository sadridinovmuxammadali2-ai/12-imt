
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store/StoreProvider";
import Protected from "@/components/store/Protected";
import "./checkout.css";

export default function Checkout() {
  const { cart, clearCart, t } = useStore();
  const router = useRouter();

  const [payment, setPayment] = useState("cash");
  const [saved, setSaved] = useState(true);

  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * product.qty,
    0
  );

  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 10;
  const total = subtotal + shipping;

  function placeOrder(e) {
    e.preventDefault();

    alert("Buyurtmangiz qabul qilindi! (Demo)");

    clearCart();

    router.push("/homepage");
  }

  return (
    <Protected>
      <main className="container checkout-page">
        <div className="breadcrumbs">
          <Link href="/homepage">{t.home}</Link>
          {"/"}
          <Link href="/basket">{t.cart}</Link>
          {"/"}
          Checkout
        </div>
        <form className="checkout-grid" onSubmit={placeOrder}>
          <section>
            <h1>Billing Details</h1>
            <label>
              First Name*
              <input required />
            </label>
            <label>
              Company Name
              <input />
            </label>
            <label>
              Street Address*
              <input required />
            </label>
            <label>
              Apartment, floor, etc. (optional)
              <input />
            </label>
            <label>
              Town/City*
              <input required />
            </label>
            <label>
              Phone Number*
              <input required type="tel" />
            </label>
            <label>
              Email Address*
              <input required type="email" />
            </label>
            <label className="save-check">
              <input
                type="checkbox"
                checked={saved}
                onChange={(e) => setSaved(e.target.checked)}
              />
              Save this information for faster check-out
              next time
            </label>
          </section>
          <aside className="checkout-summary">
            {cart.map((product) => (
              <div
                className="checkout-product"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <span>
                  {product.name} × {product.qty}
                </span>

                <b>
                  ${(product.price * product.qty).toFixed(2)}
                </b>
              </div>
            ))}
            <div className="checkout-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="checkout-row">
              <span>Shipping:</span>
              <span>
                {shipping === 0
                  ? "Free"
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="checkout-row">
              <b>Total:</b>
              <b>${total.toFixed(2)}</b>
            </div>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={payment === "bank"}
                onChange={(e) => setPayment(e.target.value)}/>
              Bank transfer 💳 VISA Mastercard
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={payment === "cash"}
                onChange={(e) => setPayment(e.target.value)}/>
              Cash on delivery
            </label>
            <div className="coupon-row">
              <input placeholder="Coupon Code" />
              <button
                type="button"
                className="primary-btn"
                onClick={() =>
                  alert("Kupon hozircha mavjud emas.")
                }>
                Apply Coupon
              </button>
            </div>
            <button
              type="submit"
              className="primary-btn place-order"
              disabled={cart.length === 0}>
              Place Order
            </button>
          </aside>
        </form>
      </main>
    </Protected>
  );
}
