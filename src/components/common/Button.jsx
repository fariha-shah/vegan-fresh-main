// src/components/common/Button.jsx
// Reusable button matching the Vegan Fresh design system.
// variant: 'primary' | 'outline' | 'shop' (orange pill from navbar)
// size: 'sm' | 'md' | 'lg'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
}) {
  const baseClass =
    variant === 'shop'
      ? 'btn-shop'
      : variant === 'outline'
        ? 'btn-outline'
        : 'btn-primary';

  const sizeStyles = {
    sm: { padding: '8px 18px', fontSize: '13px' },
    md: {},
    lg: { padding: '16px 40px', fontSize: '16px' },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className}`}
      style={{
        ...sizeStyles[size],
        width: fullWidth ? '100%' : 'auto',
        justifyContent: 'center',
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      )}
      {children}
    </button>
  );
}
