"use client";

import { Fragment } from "react";
import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import Button from "./Button";
import { ModalProps } from "@/types/Component";

export default function Modal({
  title,
  description,
  confirmLabel = "",
  cancelLabel = "",
  confirmDisabled = false,
  confirmLoading = false,
  children,
  onClose,
  onConfirm
}: ModalProps) {
  return (
    <Transition show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop transition */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Visible modal pane */}
            <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl transition-all">
              {/* Modal header */}
              {title && (
                <DialogTitle className="text-xl font-semibold text-[#A78BFA] mb-2">
                  {title}
                </DialogTitle>
              )}

              {/* Modal description */}
              {description && (
                <Description className="text-gray-600 mb-4">
                  {description}
                </Description>
              )}

              {/* Modal content */}
              <div className="mb-6">
                {children}
              </div>

              {/* Modal footer */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  {cancelLabel}
                </Button>

                <Button
                  variant="primary"
                  disabled={confirmDisabled || confirmLoading}
                  onClick={onConfirm}
                  loading={confirmLoading}
                >
                  {confirmLabel}
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
