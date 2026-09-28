import type { ReactNode } from "react";
import { create } from "zustand";

type DialogOptions = {
  title: string;
  description: ReactNode;
  submitButtonText: string;
  onSubmit: () => void | Promise<void>;
};

type DialogState = DialogOptions & {
  openDialog: boolean;
  setDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
};

const useDialog = create<DialogState>((set) => ({
  openDialog: false,
  title: "Dialog Title",
  description: "",
  submitButtonText: "Submit",
  onSubmit: () => {},
  setDialog: (options) => set({ ...options, openDialog: true }),
  closeDialog: () => set({ openDialog: false }),
}));

export default useDialog;
