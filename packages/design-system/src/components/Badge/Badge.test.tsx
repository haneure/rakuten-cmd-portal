import { render, screen } from "@/test-utils/test-utils";
import { Badge } from "./badge";

describe("Badge", () => {
  describe("Rendering", () => {
    it("renders badge with text", () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("renders with default variant and size", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.querySelector("span");
      expect(badge).toHaveClass("default", "md");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Badge className="custom-class">Badge</Badge>
      );
      expect(container.querySelector("span")).toHaveClass("custom-class");
    });

    it("renders with number content", () => {
      render(<Badge>42</Badge>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("renders with complex children", () => {
      render(
        <Badge>
          <span>Complex</span> <strong>Content</strong>
        </Badge>
      );
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
