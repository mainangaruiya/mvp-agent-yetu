import type { ButtonProps, ButtonSize, ButtonVariant } from '../../types/dashboard.types';

const BASE =
  'inline-flex items-center justify-center font-medium transition-all ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-blue text-white rounded-full shadow-xs hover:bg-blue-700 active:scale-95',
  secondary:
    'bg-white text-slate-700 border border-slate-200 rounded-lg shadow-xs ' +
    'hover:bg-slate-100 hover:border-slate-300',
  ghost: 'text-slate-500 rounded-lg hover:bg-slate-100 hover:text-slate-700',
  icon: 'text-slate-400 rounded-full hover:bg-slate-100 hover:text-slate-600',
  pill:
    'shrink-0 bg-white text-slate-700 border border-slate-200 rounded-lg shadow-xs ' +
    'gap-1 hover:bg-slate-100 hover:border-slate-300',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'text-xs px-2.5 py-1',
  md: 'text-[13px] px-3.5 py-2',
};

const ICON_SIZE: Record<ButtonSize, string> = {
  sm: 'p-1',
  md: 'p-1.5',
};

/** Shared button used for header actions, chat controls and prompt pills. */
export function Button({
  variant = 'secondary',
  size = 'sm',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const sizing = variant === 'icon' ? ICON_SIZE[size] : SIZE[size];
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANT[variant]} ${sizing} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
