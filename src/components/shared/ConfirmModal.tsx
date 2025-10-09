import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm?: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  actions?: React.ReactNode; //  custom buttons or actions from parent
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative text-center">
        {/* Title */}
        {title && <h1 className="text-xl font-medium mb-4">{title}</h1>}

        {/* Message */}
        <p className="mb-2">{message}</p>

        {/* Actions (from parent) */}
        <div className="flex justify-end gap-2">
          {actions ? (
            actions
          ) : (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#6c5ce7] text-white rounded hover:bg-[#5e4bdb]"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
