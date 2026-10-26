
"use client";
import { useStore } from "@/components/store/StoreProvider";
import Protected from "@/components/store/Protected";
import Link from "next/link";
export default function Account() {
  const { user, t } = useStore();
  return (
    <Protected>
      <main>
        <h1>{t.account || "Manage My Account"}</h1>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <Link className="primary-btn" href="/basket">
          {t.cart}
        </Link>
      </main>
    </Protected>
  );
}