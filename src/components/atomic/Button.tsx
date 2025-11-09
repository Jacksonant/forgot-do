import "./Button.css";

interface ButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export const Button = ({
  type = "button",
  onClick,
  disabled,
  children,
  fullWidth,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`modal-button ${fullWidth ? "full-width" : ""}`}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      role="button"
    >
      {children}
    </button>
  );
};
