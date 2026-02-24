"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

const RouteModalContext = createContext<{ onClose: () => void } | null>(null);

export function useRouteModalContext() {
  return useContext(RouteModalContext);
}

interface RouteModalProps {
  title: string;
  children: ReactNode;
}

export function RouteModal({ title, children }: RouteModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const contextValue = useMemo(() => ({ onClose: handleClose }), [handleClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="route-modal-title"
    >
      <div
        className="w-full max-w-xl rounded-2xl border-0 bg-white p-0 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
          <h2
            id="route-modal-title"
            className="text-xl font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="-m-2 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <RouteModalContext.Provider value={contextValue}>
          <div className="px-6 py-5">{children}</div>
        </RouteModalContext.Provider>
      </div>
    </div>
  );
}
