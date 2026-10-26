
"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import Protected from "@/components/store/Protected";
import { useStore } from "@/components/store/StoreProvider";
import './favorites.css'

export default function Wishlist() {
  const { wishlist = [], t } = useStore();

  return (
    <Protected>
      <main className="container wishlist-page">
        <div className="page-heading">
          {t.wishlist}
          <span className="item-count"> ({wishlist.length})</span>
        </div>

        {wishlist.length > 0 ? (
          <>
            <div className="wishlist-toolbar">
              <span>
                {t.wishlist} ({wishlist.length})
              </span>

              <Link
                className="secondary-btn"
                href="/homepage"
              >
                {t.continue}
              </Link>
            </div>

            <div className="product-grid">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">♡</div>

            <h2>{t.wishlist}</h2>

            <p>{t.emptyWish}</p>

            <Link
              className="primary-btn"
              href="/homepage"
            >
              {t.browse}
            </Link>
          </div>
        )}
      </main>
    </Protected>
  );
}
