"use client";

import { useEffect, type RefObject } from "react";
import { lockDocumentScroll } from "./scroll-lock";

export function useModalDialog(
  open: boolean,
  dialogRef: RefObject<HTMLDialogElement | null>,
  {
    initialFocusRef,
    returnFocusRef,
  }: {
    initialFocusRef?: RefObject<HTMLElement | null>;
    returnFocusRef?: RefObject<HTMLElement | null>;
  } = {}
) {
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = returnFocusRef?.current ?? document.activeElement;
    const unlock = lockDocumentScroll(document);
    dialog.showModal();
    initialFocusRef?.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      unlock();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [open, dialogRef, initialFocusRef, returnFocusRef]);
}
