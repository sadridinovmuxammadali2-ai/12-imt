"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store/StoreProvider";
import "./auth.css";
export default function Signup() {
  const { t, register, googleLogin } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(name.trim(), email.trim(), password);
      router.push("/homepage");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Bu email oldin royxatdan otgan. Login qiling.");
      } else if (err.code === "auth/invalid-email") {
        setError("Email manzili notogri.");
      } else if (err.code === "auth/weak-password") {
        setError("Parol kamida 6 ta belgidan iborat bolishi kerak.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Internet aloqasini tekshiring.");
      } else {
        setError("Ro‘yxatdan otishda xatolik yuz berdi.");
      }
    } finally {
      setBusy(false);
    }
  }
  async function handleGoogle() {
    setError("");
    setBusy(true);
    try {
      await googleLogin();
      router.push("/homepage");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Google orqali royxatdan otish bekor qilindi.");
      } else {
        setError(err.message || "Google orqali kirishda xatolik yuz berdi.");
      }
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="form-page">
      <div className="auth-art">
        <img src="/image1.png" alt="Signup illustration" />
      </div>
      <form className="auth-form" onSubmit={submit}>
        <h1>{t.create}</h1>
        <p>Enter your details below</p>
        <input
          required
          type="text"
          placeholder={t.name}
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        <input
          required
          type="email"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <input
          required
          minLength={6}
          type="password"
          placeholder={t.password + " (min. 6)"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        {error && <div className="error-text">{error}</div>}
        <button
          type="submit"
          className="primary-btn"
          disabled={busy}>
          {busy ? "Kutilmoqda..." : t.create}
        </button>
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogle}
          disabled={busy}>
          <b>G</b> Sign up with Google
        </button>
        <div className="auth-switch">
          {t.haveAccount}{" "}
          <Link href="/login">{t.login}</Link>
        </div>
      </form>
    </main>
  );
}