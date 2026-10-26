
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store/StoreProvider";
import "./ProductCard.css";
export default function ProductCard({ product }) {
  const { t, wishlist, toggleWish, addCart } = useStore();
  const router = useRouter();
  const liked = wishlist.some((item) => item.id === product.id);
  const openProduct = () => {
    router.push(`/productdetail?id=${product.id}`);
  };
  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWish(product);
  };
  const handleAddCart = (e) => {
    e.stopPropagation();
    addCart(product);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      openProduct();
    }
  };
  return (
    <article
      className="product-card"
      onClick={openProduct}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}>
      <div className="product-image-wrap">
        <Link
          href={`/productdetail?id=${product.id}`}
          onClick={(e) => e.stopPropagation()}>
          <img
            src={product.image}
            alt={product.name}/>
        </Link>
        <button
          className={`wish-button ${liked ? "liked" : ""}`}
          aria-label="Like product"
          onClick={handleWishlist}
          type="button">
          {liked ? "♥" : "♡"}
        </button>
        <button
          className="quick-add"
          onClick={handleAddCart}
          type="button">
          {t.add}
        </button>
      </div>
      <Link
        className="product-name"
        href={`/productdetail?id=${product.id}`}
        onClick={(e) => e.stopPropagation()}>
        {product.name}
      </Link>
      <div className="product-prices">
        <strong>${product.price}</strong>
      </div>
      <div className="product-rating">
        <span>★★★★★</span>
        <small>({product.reviews})</small>
      </div>
    </article>
  );
}