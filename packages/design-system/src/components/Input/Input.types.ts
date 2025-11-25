import { InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'error' | 'success';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The size of the input
   * @default 'md'
   */
  size?: InputSize;

  /**
   * The visual variant of the input
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * The type of input
   * @default 'text'
   */
  type?: InputType;

  /**
   * Label text displayed above the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message displayed below the input (overrides helperText when present)
   */
  error?: string;

  /**
   * Success message displayed below the input
   */
  success?: string;

  /**
   * Icon or element to display on the left side of the input
   */
  prefixIcon?: React.ReactNode;

  /**
   * Icon or element to display on the right side of the input
   */
  suffixIcon?: React.ReactNode;

  /**
   * Whether the input is in a loading state
   */
  isLoading?: boolean;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Whether to show the required asterisk in the label
   * @default true
   */
  showRequiredAsterisk?: boolean;

  /**
   * Full width input
   * @default false
   */
  fullWidth?: boolean;
}
