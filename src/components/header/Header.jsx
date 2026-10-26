"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import "./Header.css";

export default function Header() {
  const {
    t,
    user,
    wishlist,
    cart,
    language,
    setLanguage,
    logout,
  } = useStore();

  const path = usePathname();
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchText(params.get("search") || "");
    setProfileOpen(false);
  }, [path]);

  const submitSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    router.push(
      `/homepage${query ? `?search=${encodeURIComponent(query)}` : ""}`
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      router.replace("/login");
    } catch (error) {
      console.error("Logout xatosi:", error);
    }
  };

  const homeLink = user ? "/homepage" : "/login";

  return (
    <header className="site-header">
      <Link className="brand" href={homeLink}>
        Exclusive<span>.</span>
      </Link>

      <nav className="main-nav">
        <Link
          className={path === "/homepage" ? "active" : ""}
          href={homeLink}
        >
          {t?.home || "Home"}
        </Link>

        <Link href={user ? "/contact" : "/login"}>
          {t?.contact || "Contact"}
        </Link>

        <Link href={user ? "/about" : "/login"}>
          {t?.about || "About"}
        </Link>

        {!user && (
          <Link href="/signup">
            {t?.signup || "Sign Up"}
          </Link>
        )}
      </nav>

      <div className="header-actions">
        <form className="search-box" onSubmit={submitSearch}>
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={t?.search || "Search products..."}
            aria-label="Search products"
          />

          <button
            className="search-submit"
            type="submit"
            aria-label="Search"
          >
            🔍
          </button>
        </form>

        <button
          type="button"
          className="icon-action"
          aria-label="Wishlist"
          onClick={() =>
            router.push(user ? "/favorites" : "/login")
          }
        >
          ♡
          {wishlist?.length > 0 && (
            <i>{wishlist.length}</i>
          )}
        </button>

        <button
          type="button"
          className="icon-action"
          aria-label="Cart"
          onClick={() =>
            router.push(user ? "/basket" : "/login")
          }
        >
          🛒
          {cart?.length > 0 && (
            <i>
              {cart.reduce(
                (total, item) =>
                  total + (Number(item.quantity) || 1),
                0
              )}
            </i>
          )}
        </button>

        <select
          aria-label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="uz">O'zbek</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>

        {user && (
          <div className="profile-wrap">
            <button
              type="button"
              className="profile-button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-expanded={profileOpen}
              aria-label="Account menu"
            >
              ☰
            </button>

            {profileOpen && (
              <div className="profile-menu">
                <Link
                  href="/account"
                  onClick={() => setProfileOpen(false)}
                >
                  Manage My Account
                </Link>

                <Link
                  href="/basket"
                  onClick={() => setProfileOpen(false)}
                >
                  My Order
                </Link>

                <Link
                  href="/basket"
                  onClick={() => setProfileOpen(false)}
                >
                  My Cancellations
                </Link>

                <Link
                  href="/favorites"
                  onClick={() => setProfileOpen(false)}
                >
                  My Reviews
                </Link>

                <button type="button" onClick={handleLogout}>
                  {t?.logout || "Log Out"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
