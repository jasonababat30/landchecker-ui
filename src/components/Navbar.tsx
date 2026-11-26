"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "@/lib/auth-storage";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(getToken()));
  }, [pathname]);

  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
    router.push("/auth");
    router.refresh();
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="shrink-0 text-2xl font-bold tracking-tight text-emerald-700">
          Landchecker
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/"
            className={`text-sm ${
              pathname === "/"
                ? "font-semibold text-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Properties
          </Link>

          {isLoggedIn && (
            <>
              <Link
                href="/watchlist"
                className={`text-sm ${
                  pathname === "/watchlist"
                    ? "font-semibold text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                My Watchlist
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Log out
              </button>
            </>
          )}

          {!isLoggedIn && (
            <Link
              href="/auth"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
