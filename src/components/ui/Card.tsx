import type { CardProps } from '../../types/dashboard.types';

const PADDING: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3.5',
  md: 'p-4',
  lg: 'p-5',
};

const VARIANT: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-white border border-slate-200 shadow-sm',
  flat: 'bg-white border border-slate-200',
  interactive:
    'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 ' +
    'transition-all duration-200 cursor-pointer active:scale-[0.99]',
};

/**
 * Shared rounded/soft-shadow card surface used by the tool grid, session
 * cards, chat cards and the recent-chats list.
 */
export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-xl ${VARIANT[variant]} ${PADDING[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
