import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps {
  /**
   * Controls the visibility of the modal
   */
  isOpen: boolean;

  /**
   * Callback fired when the modal requests to be closed
   * (e.g., when clicking the backdrop or pressing ESC)
   */
  onClose: () => void;

  /**
   * The size of the modal
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Modal title displayed in the header
   */
  title?: ReactNode;

  /**
   * Main content of the modal
   */
  children?: ReactNode;

  /**
   * Optional footer content (typically buttons)
   */
  footer?: ReactNode;

  /**
   * Whether clicking the backdrop closes the modal
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing ESC closes the modal
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Whether to show the close button in the header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Additional CSS class name for the modal container
   */
  className?: string;

  /**
   * ARIA label for the modal
   */
  ariaLabel?: string;

  /**
   * ID of the element that describes the modal
   */
  ariaDescribedby?: string;
}
