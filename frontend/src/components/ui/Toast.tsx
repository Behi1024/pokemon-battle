import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  if (!visible) return null;

  const alertClass =
    type === "success" ? "alert-success" :
    type === "error"   ? "alert-error"   : "alert-info";

  return (
    <div className="toast toast-top toast-center z-50">
      <div className={`alert ${alertClass} shadow-lg gap-3 px-5 py-3`}>
        {type === "success" && (
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span className="font-semibold text-sm">{message}</span>
      </div>
    </div>
  );
}
