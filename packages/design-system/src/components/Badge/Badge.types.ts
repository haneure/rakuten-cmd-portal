import { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeAnimation = 'none' | 'pulse' | 'ripple' | 'glow' | 'bounce';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * The visual variant of the badge
     */
    variant?: BadgeVariant;

    /**
     * The size of the badge
     * @default 'md'
     */
    size?: BadgeSize;

    /**
     * If true, badge will have a dot indicator
     * @default false
     */
    dot?: boolean;

    /**
     * Animation style for the dot indicator
     * @default 'none'
     */
    animation?: BadgeAnimation;

    /**
     * Badge content
     */
    children: ReactNode;
}