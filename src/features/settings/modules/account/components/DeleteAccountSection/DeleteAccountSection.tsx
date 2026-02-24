"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/components/Toast";
import { deleteAccount } from "../../api";

export const DeleteAccountSection = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await deleteAccount();
      const data = await res.json();

      if (!res.ok) {
        showToast("error", data.error ?? "Failed to delete account");
        return;
      }

      showToast("success", "Account deleted successfully");
      setDialogOpen(false);
      router.push("/login");
      router.refresh();
    } catch {
      showToast("error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section aria-labelledby="delete-heading">
        <h2
          id="delete-heading"
          className="mb-4 text-lg font-medium text-gray-900"
        >
          Delete account
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          This action cannot be undone. All your data will be permanently
          removed.
        </p>
        <Button
          variant="danger"
          type="button"
          onClick={() => setDialogOpen(true)}
        >
          Delete account
        </Button>
      </section>

      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Delete account"
        confirmText="Delete account"
        requireTypedConfirmation="DELETE"
        isLoading={loading}
      >
        <p>
          Are you sure you want to delete your account? Type{" "}
          <strong>DELETE</strong> to confirm.
        </p>
      </ConfirmDialog>
    </>
  );
};
