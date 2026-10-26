
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "@/app/i18n";
import { getFirebaseAuth, firebaseReady } from "@/app/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  addToCart as addCartAction,
  changeQty as changeQtyAction,
  removeFromCart,
  clearCart,
  setCart,
} from "@/redux/cartSlice";

import {
  toggleWish as toggleWishAction,
  setWishlist,
} from "@/redux/wishlistSlice";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const [language, setLanguage] = useState("uz");
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("shop-language");
      const savedUser = localStorage.getItem("shop-user");
      const savedCart = localStorage.getItem("shop-cart");
      const savedWishlist = localStorage.getItem("shop-wishlist");

      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const cartData = savedCart
        ? JSON.parse(savedCart).map((item) => ({
            ...item,
            qty: Math.max(1, Number(item.qty ?? item.quantity ?? 1)),
          }))
        : [];
      const wishlistData = savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

      dispatch(setCart(Array.isArray(cartData) ? cartData : []));
      dispatch(
        setWishlist(
          Array.isArray(wishlistData) ? wishlistData : []
        )
      );
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xato:", error);
    } finally {
      setReady(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem("shop-language", language);
      localStorage.setItem("shop-user", JSON.stringify(user));
      localStorage.setItem("shop-cart", JSON.stringify(cart));
      localStorage.setItem("shop-wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Ma'lumotlarni saqlashda xato:", error);
    }
  }, [ready, language, user, cart, wishlist]);

  const t = translations[language] || translations.uz;

  async function register(name, email, password) {
    const auth = getFirebaseAuth();

    if (!firebaseReady || !auth) {
      throw new Error("Firebase sozlamalarini tekshiring.");
    }

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    setUser({
      name: name || result.user.email.split("@")[0],
      email: result.user.email,
    });

    return result.user;
  }

  async function login(email, password) {
    const auth = getFirebaseAuth();

    if (!firebaseReady || !auth) {
      throw new Error("Firebase sozlamalarini tekshiring.");
    }

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    setUser({
      name:
        result.user.displayName ||
        result.user.email.split("@")[0],
      email: result.user.email,
    });

    return result.user;
  }

  async function googleLogin() {
    const auth = getFirebaseAuth();

    if (!firebaseReady || !auth) {
      throw new Error("Firebase sozlamalarini tekshiring.");
    }

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    setUser({
      name:
        result.user.displayName ||
        result.user.email.split("@")[0],
      email: result.user.email,
    });

    return result.user;
  }

  async function logout() {
    const auth = getFirebaseAuth();

    if (auth) {
      await signOut(auth);
    }

    setUser(null);
  }

  function toggleWish(product) {
    dispatch(toggleWishAction(product));
  }

  function addToCart(product) {
    dispatch(addCartAction(product));
  }

  function changeQty(id, qty) {
    dispatch(changeQtyAction({ id, qty }));
  }

  function removeCart(id) {
    dispatch(removeFromCart(id));
  }

  function emptyCart() {
    dispatch(clearCart());
  }

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        user,
        setUser,
        ready,
        wishlist,
        cart,
        register,
        login,
        googleLogin,
        logout,
        toggleWish,
        addToCart,
        addCart: addToCart,
        changeQty,
        removeCart,
        clearCart: emptyCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
