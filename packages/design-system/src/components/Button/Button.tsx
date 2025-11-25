import { cn } from "@/utils/cn";
import React, { forwardRef, KeyboardEvent } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!isDisabled) {
          event.currentTarget.click();
        }
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          {
            [styles.loading]: loading,
            [styles.fullWidth]: fullWidth,
          },
          className
        )}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className={styles.spinner} aria-label="Loading">
            <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
              <circle
                className={styles.spinnerCircle}
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="3"
              />
            </svg>
          </span>
        )}

        {!loading && leftIcon && (
          <span className={styles.leftIcon} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <span className={styles.content}>{children}</span>

        {!loading && rightIcon && (
          <span className={styles.rightIcon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
