"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store/StoreProvider";
import "../signup/auth.css";
export default function Login() {
  const { t, login, googleLogin } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email.trim(), password);
      router.push("/homepage");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Email yoki parol noto'giri!");
      } else if (err.code === "auth/too-many-requests") {
        setError("Juda ko'p urinish. Keyinroq qayta urinib ko'ring.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Internet aloqasini tekshiring.");
      } else {
        setError(err.message || "Kirishda xatolik yuz berdi.");
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
        setError("Google orqali kirish bekor qilindi.");
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
        <img src="/image1.png" alt="Login" />
      </div>
      <form className="auth-form" onSubmit={submit}>
        <h1>{t.login}</h1>
        <p>Welcome back! Please enter your details.</p>
        <input
          required
          type="email"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <input
          required
          type="password"
          placeholder={t.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        {error && <div className="error-text">{error}</div>}
        <button
          type="submit"
          className="primary-btn"
          disabled={busy}>
          {busy ? "Kutilmoqda..." : t.login}
        </button>
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogle}
          disabled={busy}>
          <b>G</b> Sign in with Google
        </button>
        <div className="auth-switch">
          {t.noAccount}{" "}
          <Link href="/signup">{t.signup}</Link>
        </div>
      </form>
    </main>
  );
}