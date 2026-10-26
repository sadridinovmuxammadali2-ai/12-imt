
"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import products from "@/app/products.json";
import ProductCard from "@/components/product/ProductCard";
import { useStore } from "@/components/store/StoreProvider";
import "./homepage.css";

export default function HomePage() {
  const { t } = useStore();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [slide, setSlide] = useState(0);

  const categories = [
    "All",
    "Electronics",
    "Gaming",
    "Fashion",
    "Home",
  ];

  const heroBrands = [
    "iPhone 14 Series",
    "Gaming Accessories",
    "Smart Electronics",
  ];

  const heroTitles = [
    "Up to 10% off Voucher",
    "Discover your next favorite",
    "Great products, great prices",
  ];

  const heroImages = [
    "/image1.png",
    "/image2.png",
    "/image.png",
  ];

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory("All");
  }, [searchParams]);

  const shown = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesSearch =
        !searchText ||
        [
          product.name,
          product.category,
          product.description || "",
          product.price,
          product.oldPrice,
        ].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(searchText)
        );

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  function clearSearch() {
    setSearch("");
    setCategory("All");
    window.history.replaceState(null, "", "/homepage");
  }

  function selectCategory(filter, searchText = "") {
    setCategory(filter);
    setSearch(searchText);

    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function nextSlide() {
    setSlide((current) => (current + 1) % heroImages.length);
  }

  function prevSlide() {
    setSlide((current) =>
      current === 0 ? heroImages.length - 1 : current - 1
    );
  }

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setSlide((current) => (current + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(sliderTimer);
  }, []);

  return (
    <main className="container homepage-page">

      <section className="home-hero">
        <div className="hero-copy">
          <div className="hero-brand">
            {heroBrands[slide]}
          </div>

          <h1>{heroTitles[slide]}</h1>

          <Link href="#products">
            {t.shopNow} →
          </Link>

          <div className="hero-dot">
            {heroImages.map((_, number) => (
              <button
                key={number}
                type="button"
                className={slide === number ? "active" : ""}
                aria-label={`Slide ${number + 1}`}
                onClick={() => setSlide(number)}
              />
            ))}
          </div>
        </div>

        <img
          key={heroImages[slide]}
          src={heroImages[slide]}
          alt={heroBrands[slide]}
          onError={(e) => {
            console.error("Rasm topilmadi:", e.currentTarget.src);
          }}
        />

        <div className="hero-controls">
          <button
            type="button"
            className="hero-next"
            aria-label="Previous slide"
            onClick={prevSlide}
          >
            ←
          </button>
          <button
            type="button"
            className="hero-next"
            aria-label="Next slide"
            onClick={nextSlide}
          >
            →
          </button>
        </div>
      </section>

      <section className="product-section">
        <div className="section-kicker">{t.today}</div>

        <div className="section-top">
          <h2 className="section-title">
            {search
              ? `${t.search.replace("...", "")}: ${search}`
              : t.popular}
          </h2>
        </div>

        <div className="home-categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-chip ${
                category === item ? "selected" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item === "All" ? t.categories : item}
            </button>
          ))}
        </div>

        <div id="products" className="product-grid">
          {(search.trim() || category !== "All"
            ? shown
            : shown.slice(0, 4)
          ).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {search.trim() && (
          <p className="search-results-note">
            {shown.length} ta mahsulot topildi
          </p>
        )}

        {shown.length === 0 && (
          <div className="no-search-results">
            <p>
              Hech narsa topilmadi: “{search}”.
              Boshqa mahsulot nomini yozib ko‘ring.
            </p>

            <button type="button" onClick={clearSearch}>
              Qidiruvni tozalash
            </button>
          </div>
        )}
      </section>

      <section className="browse-category-section">
        <div className="section-kicker">Categories</div>

        <div className="browse-category-heading">
          <h2 className="section-title">
            Browse By Category
          </h2>

          <div className="category-arrows">
            <button
              type="button"
              aria-label="Show all categories"
              onClick={() => {
                setCategory("All");
                setSearch("");
              }}
            >
              All
            </button>

            <button
              type="button"
              aria-label="Browse gaming"
              onClick={() => selectCategory("Gaming")}
            >
              Gaming
            </button>
          </div>
        </div>

        <div className="browse-category-grid">
          {[
            {
              name: "Phones",
              icon: "▯",
              filter: "Electronics",
              search: "",
            },
            {
              name: "Computers",
              icon: "▤",
              filter: "Electronics",
              search: "laptop",
            },
            {
              name: "SmartWatch",
              icon: "⌚",
              filter: "Electronics",
              search: "",
            },
            {
              name: "Camera",
              icon: "◎",
              filter: "Electronics",
              search: "camera",
            },
            {
              name: "HeadPhones",
              icon: "♫",
              filter: "Electronics",
              search: "",
            },
            {
              name: "Gaming",
              icon: "⌗",
              filter: "Gaming",
              search: "",
            },
          ].map((item) => (
            <button
              type="button"
              key={item.name}
              className={`browse-category-card ${
                category === item.filter &&
                item.name === "Gaming"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                selectCategory(item.filter, item.search)
              }>
              <span
                className="browse-category-icon"
                aria-hidden="true">
                {item.icon}
              </span>
            <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      {!search.trim() && category === "All" && (
        <section className="product-section">
          <div className="section-kicker">This Month</div>

          <h2 className="section-title">
            Best Selling Products
          </h2>

          <div className="product-grid">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}

      {!search.trim() && category === "All" && (
        <section className="product-section">
          <div className="section-kicker">Our Products</div>

          <h2 className="section-title">
            Explore Our Products
          </h2>

          <div className="product-grid">
            {products.slice(8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
