
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "./StoreProvider";
export default function Protected({ children }) {
  const { user, ready, t } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);
  if (!ready || !user) {
    return (
      <main className="loading-screen">
        {t.secure}
      </main>
    );
  }
  return children;
}