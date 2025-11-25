import { fireEvent, render, screen } from "@/test-utils/test-utils";
import { createRef } from "react";
import { Button } from "./Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders button with text", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("renders with default variant and size", () => {
      const { container } = render(<Button>Button</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("primary", "md");
    });

    it('renders with default type="button"', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Button className="custom-class">Button</Button>
      );
      expect(container.querySelector("button")).toHaveClass("custom-class");
    });

    it("renders with custom props", () => {
      render(
        <Button data-testid="custom-button" id="btn-1">
          Button
        </Button>
      );
      expect(screen.getByTestId("custom-button")).toHaveAttribute(
        "id",
        "btn-1"
      );
    });
  });

  describe("Variants", () => {
    it.each([
      ["primary", "primary"],
      ["secondary", "secondary"],
      ["outline", "outline"],
      ["ghost", "ghost"],
      ["danger", "danger"],
      ["link", "link"],
    ] as const)("renders %s variant correctly", (variantName, className) => {
      const { container } = render(
        <Button variant={variantName}>Button</Button>
      );
      expect(container.querySelector("button")).toHaveClass(className);
    });
  });

  describe("Sizes", () => {
    it.each([
      ["sm", "sm"],
      ["md", "md"],
      ["lg", "lg"],
    ] as const)("renders %s size correctly", (sizeName, className) => {
      const { container } = render(<Button size={sizeName}>Button</Button>);
      expect(container.querySelector("button")).toHaveClass(className);
    });
  });

  describe("States", () => {
    it("disables button when disabled prop is true", () => {
      render(<Button disabled>Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("shows loading spinner when loading", () => {
      render(<Button loading>Button</Button>);
      expect(screen.getByLabelText("Loading")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("applies fullWidth class when fullWidth is true", () => {
      const { container } = render(<Button fullWidth>Button</Button>);
      expect(container.querySelector("button")).toHaveClass("fullWidth");
    });

    it("disables button when loading even if disabled is false", () => {
      render(
        <Button loading disabled={false}>
          Button
        </Button>
      );
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("Icons", () => {
    it("renders left icon", () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">←</span>}>
          Button
        </Button>
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders right icon", () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          Button
        </Button>
      );
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("renders both left and right icons", () => {
      render(
        <Button
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Button
        </Button>
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("hides icons when loading", () => {
      const { rerender } = render(
        <Button
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Button
        </Button>
      );

      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();

      rerender(
        <Button
          loading
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Button
        </Button>
      );

      expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    });

    it("applies aria-hidden to icons", () => {
      const { container } = render(
        <Button leftIcon={<span>←</span>} rightIcon={<span>→</span>}>
          Button
        </Button>
      );
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons).toHaveLength(2);
    });
  });

  describe("Interactions - Click", () => {
    it("calls onClick when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Button
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", () => {
      const handleClick = jest.fn();
      render(
        <Button loading onClick={handleClick}>
          Button
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("receives event object in onClick", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("Keyboard Interactions", () => {
    it("triggers click on Enter key", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("triggers click on Space key", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: " ", code: "Space" });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not trigger click on other keys", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "a", code: "KeyA" });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not trigger click on Enter when disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not trigger click on Space when loading", () => {
      const handleClick = jest.fn();
      render(
        <Button loading onClick={handleClick}>
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: " ", code: "Space" });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("calls custom onKeyDown handler", () => {
      const handleKeyDown = jest.fn();
      render(<Button onKeyDown={handleKeyDown}>Button</Button>);

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "a", code: "KeyA" });

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("calls both custom onKeyDown and triggers click on Enter", () => {
      const handleClick = jest.fn();
      const handleKeyDown = jest.fn();
      render(
        <Button onClick={handleClick} onKeyDown={handleKeyDown}>
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("prevents default on Enter key", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
      });
      const preventDefaultSpy = jest.spyOn(event, "preventDefault");

      button.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("prevents default on Space key", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, "preventDefault");

      button.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has correct button role", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      render(
        <>
          <Button aria-describedby="btn-desc">Button</Button>
          <span id="btn-desc">Button description</span>
        </>
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-describedby",
        "btn-desc"
      );
    });

    it("has aria-busy when loading", () => {
      render(<Button loading>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("has aria-disabled when disabled", () => {
      render(<Button disabled>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("does not have aria-busy when not loading", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "false");
    });

    it("is keyboard focusable", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("is not focusable when disabled", () => {
      render(<Button disabled>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      expect(button).not.toHaveFocus();
    });
  });

  describe("Forwarded Ref", () => {
    it("forwards ref to button element", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe("BUTTON");
    });

    it("allows ref methods to be called", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined onClick gracefully", () => {
      render(<Button>Button</Button>);

      expect(() => {
        fireEvent.click(screen.getByRole("button"));
      }).not.toThrow();
    });

    it("handles undefined onKeyDown gracefully", () => {
      render(<Button>Button</Button>);

      expect(() => {
        fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
      }).not.toThrow();
    });

    it("renders without icons", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("handles empty children", () => {
      render(<Button>{""}</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders complex children", () => {
      render(
        <Button>
          <span>Complex</span> <strong>Content</strong>
        </Button>
      );
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
