import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import styles from "./Card.module.css";
import { CardProps } from "./Card.types";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      clickable = false,
      hoverable = false,
      onClick,
      children,
      header,
      footer,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const hasHeaderOrFooter = !!header || !!footer;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        clickable &&
        onClick &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault(); // Prevent scrolling on Space key
        onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          styles.card,
          styles[variant],
          styles[`padding-${padding}`],
          clickable && styles.clickable,
          hoverable && styles.hoverable,
          fullWidth && styles.fullWidth,
          className
        )}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {header && (
          <div
            className={cn(
              styles.header,
              padding !== "none" && styles[`headerPadding-${padding}`]
            )}
          >
            {header}
          </div>
        )}

        <div
          className={cn(
            styles.body,
            hasHeaderOrFooter &&
              padding !== "none" &&
              styles[`bodyPadding-${padding}`]
          )}
        >
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              styles.footer,
              padding !== "none" && styles[`footerPadding-${padding}`]
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
