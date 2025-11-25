import { cn } from "@/utils/cn";
import { forwardRef, useId } from "react";
import styles from "./Input.module.css";
import { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      variant = "default",
      type = "text",
      label,
      helperText,
      error,
      success,
      prefixIcon,
      suffixIcon,
      isLoading,
      required,
      showRequiredAsterisk = true,
      fullWidth = false,
      className,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;

    // Determine the actual variant based on error/success states
    const effectiveVariant = error ? "error" : success ? "success" : variant;

    // Determine the message to display
    const message = error || success || helperText;

    return (
      <div
        className={cn(
          styles.container,
          fullWidth && styles.fullWidth,
          className
        )}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && showRequiredAsterisk && (
              <span className={styles.required} aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div
          className={cn(
            styles.inputWrapper,
            styles[size],
            styles[effectiveVariant]
          )}
        >
          {prefixIcon && (
            <span className={styles.prefixIcon} aria-hidden="true">
              {prefixIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled || isLoading}
            required={required}
            aria-invalid={!!error}
            aria-describedby={message ? helperId : undefined}
            className={cn(
              styles.input,
              prefixIcon && styles.hasPrefix,
              (suffixIcon || isLoading) && styles.hasSuffix
            )}
            {...props}
          />

          {isLoading && (
            <span className={styles.suffixIcon} aria-hidden="true">
              <span className={styles.spinner} />
            </span>
          )}

          {!isLoading && suffixIcon && (
            <span className={styles.suffixIcon} aria-hidden="true">
              {suffixIcon}
            </span>
          )}
        </div>

        {message && (
          <p
            id={helperId}
            className={cn(styles.message, styles[effectiveVariant])}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
