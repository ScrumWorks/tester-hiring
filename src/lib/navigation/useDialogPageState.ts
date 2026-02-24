"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface UseDialogPageStateParams {
  /**
   * Page to return to when closing the modal (e.g. the parent section route).
   */
  parentPathname: string;
  /**
   * Pathname of the modal route.
   */
  modalPathname: string;
}

/**
 * Hook that manages modal state for route-based dialogs (parallel + intercepting routes).
 * Provides navigateBack for closing the modal after form success.
 */
export const useDialogPageState = (params: UseDialogPageStateParams) => {
  const { parentPathname, modalPathname } = params;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) return;
      router.push(parentPathname);
    },
    [router, parentPathname]
  );

  useEffect(() => {
    setOpen(pathname.startsWith(modalPathname) || pathname === modalPathname);
  }, [pathname, modalPathname]);

  const navigateBack = useCallback(() => {
    router.push(parentPathname);
  }, [router, parentPathname]);

  return {
    open,
    handleOpenChange,
    navigateBack,
  };
};
