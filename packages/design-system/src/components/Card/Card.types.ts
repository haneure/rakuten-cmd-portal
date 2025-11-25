import { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The visual variant of the card
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Padding inside the card
   * @default 'md'
   */
  padding?: CardPadding;

  /**
   * Whether the card is clickable/interactive
   */
  clickable?: boolean;

  /**
   * onClick event handler for clickable cards
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Whether to show hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Content to render in the card
   */
  children: ReactNode;

  /**
   * Optional header content
   */
  header?: ReactNode;

  /**
   * Optional footer content
   */
  footer?: ReactNode;

  /**
   * Full width card
   * @default false
   */
  fullWidth?: boolean;
}
