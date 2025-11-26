import { cn } from "@/utils/cn";
import styles from "./Badge.module.css";
import { BadgeProps } from "./Badge.types";

export const Badge = ({
  variant = "default",
  size = "md",
  dot = false,
  animation = "none",
  children,
  className,
  ...rest
}: BadgeProps) => {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[size],
        dot && styles.dot,
        className
      )}
      {...rest}
    >
      {dot && (
        <span
          className={cn(
            styles.dotIndicator,
            styles[`${variant}-dot`],
            animation !== "none" && styles[`dot-${animation}`]
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
