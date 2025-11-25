import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { Input } from "./Input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(<Input helperText="This is a helper text" />);
      expect(screen.getByText("This is a helper text")).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("renders with success message", () => {
      render(<Input success="Looks good!" />);
      expect(screen.getByText("Looks good!")).toBeInTheDocument();
    });

    it("error message overrides helper text", () => {
      render(<Input helperText="Helper" error="Error message" />);
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });

    it("success message overrides helper text", () => {
      render(<Input helperText="Helper" success="Success message" />);
      expect(screen.getByText("Success message")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Required Field", () => {
    it("shows required asterisk when required", () => {
      render(<Input label="Email" required />);
      expect(screen.getByLabelText("required")).toBeInTheDocument();
    });

    it("hides required asterisk when showRequiredAsterisk is false", () => {
      render(<Input label="Email" required showRequiredAsterisk={false} />);
      expect(screen.queryByLabelText("required")).not.toBeInTheDocument();
    });

    it("applies required attribute to input", () => {
      render(<Input required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      const { container } = render(<Input size="sm" />);
      const wrapper = container.querySelector(".inputWrapper");
      expect(wrapper).toHaveClass("sm");
    });

    it("renders medium size by default", () => {
      const { container } = render(<Input />);
      const wrapper = container.querySelector(".inputWrapper");
      expect(wrapper).toHaveClass("md");
    });

    it("renders large size", () => {
      const { container } = render(<Input size="lg" />);
      const wrapper = container.querySelector(".inputWrapper");
      expect(wrapper).toHaveClass("lg");
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      const { container } = render(<Input variant="default" />);
      const wrapper = container.querySelector(".inputWrapper");
      expect(wrapper).toHaveClass("default");
    });

    it("renders error variant when error prop is provided", () => {
      const { container } = render(<Input error="Error" />);
      const wrapper = container.querySelector(".inputWrapper");
      expect(wrapper).toHaveClass("error");
    });

    it("renders success variant when success prop is provided", () => {
      const { container } = render(<Input success="Success" />);
      const wrapper = container.querySelector(".inputWrapper");
      expect(wrapper).toHaveClass("success");
    });

    it("error takes precedence over success", () => {
      const { container } = render(<Input error="Error" success="Success" />);
      const wrapper = container.querySelector(".inputWrapper");
      expect(wrapper).toHaveClass("error");
      expect(wrapper).not.toHaveClass("success");
    });
  });

  describe("Input Types", () => {
    it("renders text input by default", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("renders email input", () => {
      render(<Input type="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("renders password input", () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "password");
    });

    it("renders number input", () => {
      render(<Input type="number" />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
    });

    it("renders tel input", () => {
      render(<Input type="tel" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel");
    });

    it("renders url input", () => {
      render(<Input type="url" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "url");
    });

    it("renders search input", () => {
      render(<Input type="search" />);
      expect(screen.getByRole("searchbox")).toHaveAttribute("type", "search");
    });
  });

  describe("Disabled State", () => {
    it("disables input when disabled prop is true", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("disables input when isLoading is true", () => {
      render(<Input isLoading />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
  });

  describe("Loading State", () => {
    it("shows spinner when loading", () => {
      const { container } = render(<Input isLoading />);
      expect(container.querySelector(".spinner")).toBeInTheDocument();
    });

    it("hides suffixIcon when loading", () => {
      const { container } = render(
        <Input isLoading suffixIcon={<span>Icon</span>} />
      );
      expect(container.querySelector(".spinner")).toBeInTheDocument();
      expect(screen.queryByText("Icon")).not.toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("renders prefix icon", () => {
      render(<Input prefixIcon={<span>Prefix</span>} />);
      expect(screen.getByText("Prefix")).toBeInTheDocument();
    });

    it("renders suffix icon", () => {
      render(<Input suffixIcon={<span>Suffix</span>} />);
      expect(screen.getByText("Suffix")).toBeInTheDocument();
    });

    it("renders both prefix and suffix icons", () => {
      render(
        <Input
          prefixIcon={<span>Prefix</span>}
          suffixIcon={<span>Suffix</span>}
        />
      );
      expect(screen.getByText("Prefix")).toBeInTheDocument();
      expect(screen.getByText("Suffix")).toBeInTheDocument();
    });

    it("icons have aria-hidden attribute", () => {
      const { container } = render(
        <Input
          prefixIcon={<span>Prefix</span>}
          suffixIcon={<span>Suffix</span>}
        />
      );
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons).toHaveLength(2);
    });
  });

  describe("Full Width", () => {
    it("applies fullWidth class when fullWidth is true", () => {
      const { container } = render(<Input fullWidth />);
      expect(container.firstChild).toHaveClass("fullWidth");
    });

    it("does not apply fullWidth class by default", () => {
      const { container } = render(<Input />);
      expect(container.firstChild).not.toHaveClass("fullWidth");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input using htmlFor and id", () => {
      render(<Input label="Username" id="username-input" />);
      const input = screen.getByLabelText("Username");
      expect(input).toHaveAttribute("id", "username-input");
    });

    it("generates unique id when not provided", () => {
      render(
        <>
          <Input label="Input 1" />
          <Input label="Input 2" />
        </>
      );
      const input1 = screen.getByLabelText("Input 1");
      const input2 = screen.getByLabelText("Input 2");
      expect(input1.id).not.toBe(input2.id);
      expect(input1.id).toBeTruthy();
      expect(input2.id).toBeTruthy();
    });

    it("sets aria-invalid when error is present", () => {
      render(<Input error="Error" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("does not set aria-invalid when no error", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "false"
      );
    });

    it("associates message with input using aria-describedby", () => {
      render(<Input helperText="Helper text" id="test-input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "test-input-helper");
      expect(screen.getByText("Helper text")).toHaveAttribute(
        "id",
        "test-input-helper"
      );
    });

    it("does not set aria-describedby when no message", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).not.toHaveAttribute(
        "aria-describedby"
      );
    });
  });

  describe("User Interaction", () => {
    it("handles user input", async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole("textbox");

      await user.type(input, "Hello");
      expect(input).toHaveValue("Hello");
    });

    it("calls onChange handler", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole("textbox"), "A");
      expect(handleChange).toHaveBeenCalled();
    });

    it("calls onFocus handler", async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} />);

      await user.click(screen.getByRole("textbox"));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur handler", async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("does not allow input when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Input disabled onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue("");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe("INPUT");
    });

    it("can focus input via ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it("can get input value via ref", async () => {
      const user = userEvent.setup();
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      await user.type(screen.getByRole("textbox"), "test value");
      expect(ref.current?.value).toBe("test value");
    });
  });

  describe("Custom Props", () => {
    it("passes through additional HTML attributes", () => {
      render(<Input data-testid="custom-input" maxLength={10} />);
      const input = screen.getByTestId("custom-input");
      expect(input).toHaveAttribute("maxLength", "10");
    });

    it("applies custom className to container", () => {
      const { container } = render(<Input className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("supports min and max for number inputs", () => {
      render(<Input type="number" min={0} max={100} />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "100");
    });
  });

  describe("Value Control", () => {
    it("renders with value", () => {
      render(<Input value="test value" onChange={() => {}} />);
      expect(screen.getByRole("textbox")).toHaveValue("test value");
    });

    it("renders with defaultValue", () => {
      render(<Input defaultValue="default value" />);
      expect(screen.getByRole("textbox")).toHaveValue("default value");
    });
  });
});
