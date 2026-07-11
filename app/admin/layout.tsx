"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { checkAuth, logout } from "@/lib/admin-store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const authed = checkAuth();
    setAuthed(authed);
    setInit(true);
    if (!authed && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  if (!init) return null;

  if (!authed && pathname !== "/admin/login") return null;

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-base">
      <div className="mx-auto max-w-full px-4 sm:px-6 py-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/admin" className="font-display text-2xl text-navy">
            Admin
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/admin/listings" className="text-sm font-semibold text-navy hover:text-red whitespace-nowrap">
              Listings
            </Link>
            <Link href="/admin/gallery" className="text-sm font-semibold text-navy hover:text-red whitespace-nowrap">
              Gallery
            </Link>
            <button
              onClick={() => { logout(); router.push("/admin/login"); }}
              className="neu-btn px-4 py-2 text-sm font-semibold text-red"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
