"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { Button } from "./Button";

interface FormModalContextValue {
  onClose: () => void;
}

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function useFormModalContext() {
  const ctx = useContext(FormModalContext);
  if (!ctx) return null;
  return ctx;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function FormModal({
  isOpen,
  onClose,
  title,
  children,
}: FormModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-full max-w-md rounded-2xl border-0 bg-white p-0 shadow-2xl [&::backdrop]:bg-black/40 [&::backdrop]:backdrop-blur-sm"
      aria-labelledby="form-modal-title"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onCancel={handleClose}
    >
      <FormModalContext.Provider value={{ onClose: handleClose }}>
        <div onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
            <h2
              id="form-modal-title"
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
          <div className="px-6 py-5">{children}</div>
        </div>
      </FormModalContext.Provider>
    </dialog>
  );
}
