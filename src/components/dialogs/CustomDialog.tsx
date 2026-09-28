"use client";

import { useEffect, useState } from "react";

import useDialog from "@/store/useDialog";

const CustomDialog = () => {
  const {
    openDialog,
    title,
    description,
    submitButtonText,
    onSubmit,
    closeDialog,
  } = useDialog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    if (!openDialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openDialog]);

  if (!openDialog) return null;

  const handleClose = () => {
    setSubmissionError(null);
    closeDialog();
  };

  const handleSubmit = async () => {
    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      await onSubmit();
      handleClose();
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Unable to complete this action.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4">
      <div
        aria-labelledby="dialog-title"
        aria-modal="true"
        className="absolute inset-0 m-auto flex h-fit w-full max-w-xl flex-col"
        role="dialog"
      >
        <h2
          className="rounded-t-xl bg-indigo-600 p-5 text-center text-2xl font-bold"
          id="dialog-title"
        >
          {title}
        </h2>
        <div className="overflow-auto bg-indigo-200 px-5 py-4 text-gray-700">
          {description}
          {submissionError && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {submissionError}
            </p>
          )}
        </div>
        <div className="mt-auto flex justify-end gap-5 rounded-b-xl bg-indigo-600 px-5 py-3">
          <button
            className="rounded-md bg-transparent hover:bg-indigo-700 px-5 py-1 cursor-pointer"
            disabled={isSubmitting}
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-indigo-900 px-5 py-1 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer hover:bg-indigo-950"
            disabled={isSubmitting}
            onClick={handleSubmit}
            type="button"
          >
            {isSubmitting ? "Working..." : submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
