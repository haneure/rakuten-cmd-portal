/**
 * Option for Select component
 */
export interface SelectOption {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

/**
 * Select component size variants
 */
export type SelectSize = "sm" | "md" | "lg";

/**
 * Select component state variants
 */
export type SelectState = "default" | "error" | "success";

/**
 * Props for the Select component
 */
export interface SelectProps {
  /** Array of options to display */
  options: SelectOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Size variant */
  size?: SelectSize;
  /** Visual state variant */
  state?: SelectState;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
  /** Label for the select */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Custom className */
  className?: string;
  /** Name attribute for form submission */
  name?: string;
  /** ID for accessibility */
  id?: string;
  /** Enable search/filter functionality */
  searchable?: boolean;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Allow clearing the selection */
  clearable?: boolean;
}
