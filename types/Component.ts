// Alert
export type AlertVariant = "success" | "error" | "loading";

export type AlertMode = "box" | "toast";

export interface AlertProps {
  variant?: AlertVariant;
  mode?: AlertMode;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  autoClose?: number;
}

export interface ToastAlert {
  message: string;
  status: AlertVariant;
}

// Button
export type VariantType = "primary" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

// Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: VariantType;
  fullWidth?: boolean;
  error?: string | null;
}

// Modal
export interface ModalProps {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

// Select
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: VariantType
  fullWidth?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}
