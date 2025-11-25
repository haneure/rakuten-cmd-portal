import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { Card } from "./Card";

describe("Card", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<Card>Content</Card>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders children content", () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders header when provided", () => {
      render(<Card header="Card Header">Content</Card>);
      expect(screen.getByText("Card Header")).toBeInTheDocument();
    });

    it("renders footer when provided", () => {
      render(<Card footer="Card Footer">Content</Card>);
      expect(screen.getByText("Card Footer")).toBeInTheDocument();
    });

    it("renders header, body, and footer together", () => {
      render(
        <Card header="Header" footer="Footer">
          Body
        </Card>
      );
      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      const { container } = render(<Card variant="default">Content</Card>);
      expect(container.firstChild).toHaveClass("default");
    });

    it("renders outlined variant", () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      expect(container.firstChild).toHaveClass("outlined");
    });

    it("renders elevated variant", () => {
      const { container } = render(<Card variant="elevated">Content</Card>);
      expect(container.firstChild).toHaveClass("elevated");
    });

    it("uses default variant when not specified", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toHaveClass("default");
    });
  });

  describe("Padding", () => {
    it("applies none padding", () => {
      const { container } = render(<Card padding="none">Content</Card>);
      expect(container.firstChild).toHaveClass("padding-none");
    });

    it("applies small padding", () => {
      const { container } = render(<Card padding="sm">Content</Card>);
      expect(container.firstChild).toHaveClass("padding-sm");
    });

    it("applies medium padding by default", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toHaveClass("padding-md");
    });

    it("applies large padding", () => {
      const { container } = render(<Card padding="lg">Content</Card>);
      expect(container.firstChild).toHaveClass("padding-lg");
    });
  });

  describe("Interactive States", () => {
    it("applies clickable class when clickable", () => {
      const { container } = render(<Card clickable>Content</Card>);
      expect(container.firstChild).toHaveClass("clickable");
    });

    it("applies hoverable class when hoverable", () => {
      const { container } = render(<Card hoverable>Content</Card>);
      expect(container.firstChild).toHaveClass("hoverable");
    });

    it('sets role="button" when clickable', () => {
      const { container } = render(<Card clickable>Content</Card>);
      expect(container.firstChild).toHaveAttribute("role", "button");
    });

    it("sets tabIndex=0 when clickable", () => {
      const { container } = render(<Card clickable>Content</Card>);
      expect(container.firstChild).toHaveAttribute("tabIndex", "0");
    });

    it("does not set role when not clickable", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).not.toHaveAttribute("role");
    });

    it("does not set tabIndex when not clickable", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).not.toHaveAttribute("tabIndex");
    });
  });

  describe("User Interaction", () => {
    it("calls onClick handler when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      );

      await user.click(screen.getByText("Content"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard navigation when clickable", () => {
      const handleClick = jest.fn();
      const { container } = render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      card.focus();
      expect(card).toHaveFocus();
    });

    it("calls onClick for clickable card", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      );

      await user.click(screen.getByText("Content"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when clicked and clickable", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      );

      await user.click(screen.getByText("Content"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when not clickable", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Content</Card>);

      await user.click(screen.getByText("Content"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("calls onClick when Enter key is pressed and clickable", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      const { container } = render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      card.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when Space key is pressed and clickable", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      const { container } = render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      card.focus();
      await user.keyboard(" ");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick with keyboard when not clickable", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Content</Card>);

      await user.keyboard("{Enter}");
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Full Width", () => {
    it("applies fullWidth class when fullWidth is true", () => {
      const { container } = render(<Card fullWidth>Content</Card>);
      expect(container.firstChild).toHaveClass("fullWidth");
    });

    it("does not apply fullWidth class by default", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).not.toHaveClass("fullWidth");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to card element", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("can focus card via ref when clickable", () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Card ref={ref} clickable>
          Content
        </Card>
      );

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe("Custom Props", () => {
    it("passes through additional HTML attributes", () => {
      render(<Card data-testid="custom-card">Content</Card>);
      expect(screen.getByTestId("custom-card")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("merges custom className with component classes", () => {
      const { container } = render(
        <Card className="custom-class" variant="elevated">
          Content
        </Card>
      );
      expect(container.firstChild).toHaveClass("custom-class");
      expect(container.firstChild).toHaveClass("elevated");
    });
  });

  describe("Complex Layouts", () => {
    it("renders complex header content", () => {
      render(
        <Card
          header={
            <div>
              <h2>Title</h2>
              <span>Subtitle</span>
            </div>
          }
        >
          Content
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Subtitle")).toBeInTheDocument();
    });

    it("renders complex footer content", () => {
      render(
        <Card
          footer={
            <div>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          }
        >
          Content
        </Card>
      );

      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("renders complex body content", () => {
      render(
        <Card>
          <div>
            <h3>Section 1</h3>
            <p>Paragraph 1</p>
            <h3>Section 2</h3>
            <p>Paragraph 2</p>
          </div>
        </Card>
      );

      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper role when clickable", () => {
      const { container } = render(<Card clickable>Content</Card>);
      expect(container.firstChild).toHaveAttribute("role", "button");
    });

    it("is keyboard accessible when clickable", () => {
      const { container } = render(<Card clickable>Content</Card>);
      expect(container.firstChild).toHaveAttribute("tabIndex", "0");
    });

    it("does not have button role when not clickable", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).not.toHaveAttribute("role", "button");
    });
  });

  describe("CSS Classes", () => {
    it("applies correct padding class to header", () => {
      const { container } = render(
        <Card header="Header" padding="lg">
          Content
        </Card>
      );
      const header = container.querySelector(".header");
      expect(header).toHaveClass("headerPadding-lg");
    });

    it("applies correct padding class to footer", () => {
      const { container } = render(
        <Card footer="Footer" padding="sm">
          Content
        </Card>
      );
      const footer = container.querySelector(".footer");
      expect(footer).toHaveClass("footerPadding-sm");
    });

    it("applies body padding when header is present", () => {
      const { container } = render(
        <Card header="Header" padding="md">
          Content
        </Card>
      );
      const body = container.querySelector(".body");
      expect(body).toHaveClass("bodyPadding-md");
    });

    it("does not apply header padding when padding is none", () => {
      const { container } = render(
        <Card header="Header" padding="none">
          Content
        </Card>
      );
      const header = container.querySelector(".header");
      expect(header).not.toHaveClass("headerPadding-none");
    });
  });
});
