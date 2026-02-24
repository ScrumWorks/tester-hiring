"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/features/auth/api";
import { Button } from "@/components/Button";

const NAV_ITEMS = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/account", label: "Account" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={isMenuOpen}
        aria-controls="sidebar-nav"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? (
          <span className="text-xl" aria-hidden>×</span>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <nav
        id="sidebar-nav"
        aria-label="Settings"
        className={`fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r border-gray-200 bg-white pt-16 transition-transform md:translate-x-0 md:pt-4 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center border-b border-gray-100 px-4 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ama-logo.png"
            alt="Amateri"
            className="h-10 w-auto object-contain"
          />
        </div>
        <ul className="flex-1 space-y-1 p-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-gray-100 p-4">
          <Button
            variant="secondary"
            type="button"
            onClick={handleLogout}
            className="w-full justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            Log out
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          aria-hidden
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
