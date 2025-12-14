import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe("Rendering", () => {
    it("should not render when isOpen is false", () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("should render with title", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          Modal content
        </Modal>
      );

      expect(screen.getByText("Test Modal")).toBeInTheDocument();
    });

    it("should render with footer", () => {
      render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          footer={<button>Save</button>}
        >
          Modal content
        </Modal>
      );

      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("should render close button by default", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
    });

    it("should not render close button when showCloseButton is false", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} showCloseButton={false}>
          Modal content
        </Modal>
      );

      expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should apply sm size class", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} size="sm">
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("sm");
    });

    it("should apply md size class by default", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("md");
    });

    it("should apply lg size class", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} size="lg">
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("lg");
    });

    it("should apply full size class", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} size="full">
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("full");
    });
  });

  describe("Closing", () => {
    it("should call onClose when close button is clicked", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      const closeButton = screen.getByLabelText("Close modal");
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when backdrop is clicked", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      const backdrop = screen.getByRole("presentation");
      fireEvent.click(backdrop);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when modal content is clicked", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      const modalContent = screen.getByText("Modal content");
      fireEvent.click(modalContent);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should not call onClose when backdrop is clicked and closeOnBackdropClick is false", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} closeOnBackdropClick={false}>
          Modal content
        </Modal>
      );

      const backdrop = screen.getByRole("presentation");
      fireEvent.click(backdrop);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should call onClose when ESC key is pressed", async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    it("should not call onClose when ESC key is pressed and closeOnEsc is false", async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} closeOnEsc={false}>
          Modal content
        </Modal>
      );

      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });
  });

  describe("Accessibility", () => {
    it('should have role="dialog"', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("aria-modal", "true");
    });

    it("should use title as aria-label when title is string", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("aria-label", "Test Modal");
    });

    it("should use custom ariaLabel", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} ariaLabel="Custom label">
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("aria-label", "Custom label");
    });

    it("should have aria-describedby when provided", () => {
      render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          ariaDescribedby="modal-description"
        >
          <p id="modal-description">Modal content</p>
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("aria-describedby", "modal-description");
    });

    it("should be focusable", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Focus Management", () => {
    it("should focus modal when opened", async () => {
      const { rerender } = render(
        <Modal isOpen={false} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      rerender(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      await waitFor(() => {
        const modal = screen.getByRole("dialog");
        expect(modal).toHaveFocus();
      });
    });

    it("should trap focus within modal using Tab", async () => {
      const user = userEvent.setup();
      render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          footer={
            <>
              <button>Cancel</button>
              <button>Save</button>
            </>
          }
        >
          <input type="text" />
        </Modal>
      );

      const closeButton = screen.getByLabelText("Close modal");
      const input = screen.getByRole("textbox");
      const cancelButton = screen.getByText("Cancel");
      const saveButton = screen.getByText("Save");

      // Focus should start at close button
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      // Tab to input
      await user.tab();
      expect(input).toHaveFocus();

      // Tab to cancel button
      await user.tab();
      expect(cancelButton).toHaveFocus();

      // Tab to save button
      await user.tab();
      expect(saveButton).toHaveFocus();

      // Tab should wrap to close button
      await user.tab();
      expect(closeButton).toHaveFocus();
    });

    it("should trap focus within modal using Shift+Tab", async () => {
      const user = userEvent.setup();
      render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          footer={
            <>
              <button>Cancel</button>
              <button>Save</button>
            </>
          }
        >
          <input type="text" />
        </Modal>
      );

      const closeButton = screen.getByLabelText("Close modal");
      const saveButton = screen.getByText("Save");

      // Focus on close button
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      // Shift+Tab should wrap to last element (save button)
      await user.tab({ shift: true });
      expect(saveButton).toHaveFocus();
    });
  });

  describe("Body Scroll Lock", () => {
    it("should lock body scroll when modal is open", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should restore body scroll when modal is closed", () => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      expect(document.body.style.overflow).toBe("hidden");

      unmount();

      expect(document.body.style.overflow).not.toBe("hidden");
    });
  });

  describe("Custom className", () => {
    it("should apply custom className", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} className="custom-modal">
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("custom-modal");
    });
  });

  describe("Portal", () => {
    it("should render in document.body", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal.parentElement?.parentElement).toBe(document.body);
    });
  });
});
