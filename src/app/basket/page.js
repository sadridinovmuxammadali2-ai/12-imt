
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Protected from "@/components/store/Protected";
import { useStore } from "@/components/store/StoreProvider";
import "./basket.css";
export default function Cart() {
  const { cart, t, changeQty, removeCart, clearCart } = useStore();
   const router = useRouter();
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty ?? item.quantity ?? 1),
    0
  );
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 10;
  const total = subtotal + shipping;
  return (
    <Protected>
      <main className="container cart-page">
        <h1 className="page-heading">{t.cart}</h1>
        {cart.length === 0 ? (
  <div className="empty-state">
    <div className="empty-icon">🛒</div>
    <h2>{t.cart}</h2>
    <p>{t.emptyCart}</p>
    <Link className="primary-btn" href="/homepage">
    {t.browse}
    </Link>
    </div>
        ) : (
         <>
      <div className="cart-actions">
        <Link className="secondary-btn" href="/homepage">
        {t.continue}
        </Link>
        <button
        type="button"
        className="secondary-btn"
        onClick={clearCart}>
      {t.remove} all
      </button>
       </div>
<div className="cart-layout">
  <table className="cart-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>{t.price}</th>
        <th>{t.quantity}</th>
        <th>{t.total}</th>
       </tr>
       </thead>
       <tbody>
      {cart.map((item) => (
      <tr key={item.id}>
      <td>
       <div className="cart-product">
       <img
       src={item.image}
      alt={item.name} />
      <span>
      {item.name}
     <button
    type="button"
     onClick={() => removeCart(item.id)}>
      {t.remove}
     </button>
        </span>
          </div>
       </td>
     <td>${Number(item.price).toFixed(2)}</td>
     <td>
       <div className="qty-control">
         <button
    type="button"
    onClick={() =>
   changeQty(item.id, Number(item.qty ?? item.quantity ?? 1) - 1)
   }>
  -
  </button>
      <span>{item.qty ?? item.quantity ?? 1}</span>
        <button
           type="button"
            onClick={() =>
            changeQty(item.id, Number(item.qty ?? item.quantity ?? 1) + 1)}>
              +
           </button>
         </div>
       </td>
       <td>
         $
         {(Number(item.price) * Number(item.qty ?? item.quantity ?? 1)).toFixed(2)}
       </td>
     </tr>
    ))}
         </tbody>
           </table>
        <aside className="cart-summary">
          <h3>Cart Total</h3>
      <div className="summary-row">
       <span>Subtotal</span>
       <span>${subtotal.toFixed(2)}</span>
         </div>
       <div className="summary-row">
      <span>Shipping</span>
     <span>
    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
       </span>
        </div>
         <div className="summary-row">
           <b>{t.total}</b>
            <b>${total.toFixed(2)}</b>
                </div>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() =>
      alert(  "Buyurtma demo rejimida. To‘lov tizimi ulanmagan")
                  }>
                  Rasmiylashtirish
                </button>
              </aside>
            </div>
          </>
        )}
      </main>
    </Protected>
  );
}
