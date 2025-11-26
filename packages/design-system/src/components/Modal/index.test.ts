import type { ModalProps, ModalSize } from './index';
import { Modal } from './index';

describe('Modal exports', () => {
  it('should export Modal component', () => {
    expect(Modal).toBeDefined();
  });

  it('should export Modal types', () => {
    const props: Partial<ModalProps> = {
      isOpen: true,
      onClose: () => {},
      size: 'md' as ModalSize,
    };
    expect(props).toBeDefined();
  });
});
