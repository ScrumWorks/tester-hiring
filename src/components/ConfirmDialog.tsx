"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  requireTypedConfirmation?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  requireTypedConfirmation,
  isLoading = false,
  children,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [typedValue, setTypedValue] = useState("");
  const isConfirmed = !requireTypedConfirmation || typedValue === requireTypedConfirmation;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
      setTypedValue("");
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

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
      className="fixed inset-0 z-50 m-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl backdrop:bg-black/50"
      aria-labelledby="dialog-title"
      aria-modal="true"
      onClick={handleBackdropClick}
      onCancel={handleClose}
    >
      <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <h2 id="dialog-title" className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
        {children && <div className="text-gray-600">{children}</div>}
        {requireTypedConfirmation && (
          <Input
            label={`Type "${requireTypedConfirmation}" to confirm`}
            id="confirm-input"
            value={typedValue}
            onChange={(e) => setTypedValue(e.target.value)}
            placeholder={requireTypedConfirmation}
            autoComplete="off"
          />
        )}
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={!isConfirmed || isLoading}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
