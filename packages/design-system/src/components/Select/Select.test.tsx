import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";
import { SelectOption } from "./Select.types";

const mockOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
];

const mockOptionsWithDisabled: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana", disabled: true },
  { value: "orange", label: "Orange" },
];

describe("Select", () => {
  describe("Rendering", () => {
    it("renders with placeholder", () => {
      render(<Select options={mockOptions} placeholder="Choose fruit" />);
      expect(screen.getByText("Choose fruit")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Select options={mockOptions} label="Favorite fruit" />);
      expect(screen.getByText("Favorite fruit")).toBeInTheDocument();
    });

    it("renders with required indicator", () => {
      render(<Select options={mockOptions} label="Required field" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(
        <Select
          options={mockOptions}
          helperText="Please select your favorite"
        />
      );
      expect(
        screen.getByText("Please select your favorite")
      ).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(<Select options={mockOptions} error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("renders with default value", () => {
      render(<Select options={mockOptions} value="banana" />);
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });
  });

  describe("Dropdown Interaction", () => {
    it("opens dropdown when trigger is clicked", async () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("displays all options when opened", async () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.getByText("Banana")).toBeInTheDocument();
        expect(screen.getByText("Orange")).toBeInTheDocument();
        expect(screen.getByText("Grape")).toBeInTheDocument();
      });
    });

    it("closes dropdown when clicking outside", async () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);
      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.mouseDown(document.body);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("closes dropdown after selecting an option", async () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);
      const option = screen.getByText("Apple");
      fireEvent.click(option);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });

  describe("Selection", () => {
    it("calls onChange when an option is selected", async () => {
      const handleChange = jest.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      const option = screen.getByText("Apple");
      fireEvent.click(option);

      expect(handleChange).toHaveBeenCalledWith("apple");
    });

    it("updates displayed value after selection", async () => {
      render(<Select options={mockOptions} placeholder="Choose" />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      const option = screen.getByText("Banana");
      fireEvent.click(option);

      await waitFor(() => {
        expect(screen.getByText("Banana")).toBeInTheDocument();
      });
    });

    it("does not select disabled options", async () => {
      const handleChange = jest.fn();
      render(
        <Select options={mockOptionsWithDisabled} onChange={handleChange} />
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      const disabledOption = screen.getByText("Banana");
      fireEvent.click(disabledOption);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("syncs with controlled value prop", () => {
      const { rerender } = render(
        <Select options={mockOptions} value="apple" />
      );
      expect(screen.getByText("Apple")).toBeInTheDocument();

      rerender(<Select options={mockOptions} value="orange" />);
      expect(screen.getByText("Orange")).toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("shows search input when searchable is true", async () => {
      render(<Select options={mockOptions} searchable />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      });
    });

    it("filters options based on search query", async () => {
      render(<Select options={mockOptions} searchable />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      const searchInput = await screen.findByPlaceholderText("Search...");
      await userEvent.type(searchInput, "app");

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.queryByText("Banana")).not.toBeInTheDocument();
        expect(screen.queryByText("Orange")).not.toBeInTheDocument();
      });
    });

    it("shows 'No results found' when search has no matches", async () => {
      render(<Select options={mockOptions} searchable />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      const searchInput = await screen.findByPlaceholderText("Search...");
      await userEvent.type(searchInput, "xyz");

      await waitFor(() => {
        expect(screen.getByText("No results found")).toBeInTheDocument();
      });
    });

    it("clears search query after selection", async () => {
      render(<Select options={mockOptions} searchable />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      const searchInput = await screen.findByPlaceholderText("Search...");
      await userEvent.type(searchInput, "app");

      const option = screen.getByText("Apple");
      fireEvent.click(option);

      // Reopen to check if search is cleared
      fireEvent.click(trigger);
      const newSearchInput = await screen.findByPlaceholderText("Search...");
      expect(newSearchInput).toHaveValue("");
    });

    it("uses custom search placeholder", async () => {
      render(
        <Select
          options={mockOptions}
          searchable
          searchPlaceholder="Type to filter..."
        />
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type to filter...")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Clear Functionality", () => {
    it("shows clear button when clearable and value is set", () => {
      render(<Select options={mockOptions} clearable value="apple" />);

      expect(screen.getByLabelText("Clear selection")).toBeInTheDocument();
    });

    it("does not show clear button when no value is selected", () => {
      render(<Select options={mockOptions} clearable />);

      expect(
        screen.queryByLabelText("Clear selection")
      ).not.toBeInTheDocument();
    });

    it("clears selection when clear button is clicked", async () => {
      const handleChange = jest.fn();
      render(
        <Select
          options={mockOptions}
          clearable
          value="apple"
          onChange={handleChange}
          placeholder="Choose"
        />
      );

      const clearButton = screen.getByLabelText("Clear selection");
      fireEvent.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith("");
      await waitFor(() => {
        expect(screen.getByText("Choose")).toBeInTheDocument();
      });
    });

    it("does not show clear button when disabled", () => {
      render(<Select options={mockOptions} clearable value="apple" disabled />);

      expect(
        screen.queryByLabelText("Clear selection")
      ).not.toBeInTheDocument();
    });

    it("does not open dropdown when clicking clear button", async () => {
      render(<Select options={mockOptions} clearable value="apple" />);

      const clearButton = screen.getByLabelText("Clear selection");
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      const { container } = render(<Select options={mockOptions} size="sm" />);
      const select = container.querySelector(".sm");
      expect(select).toBeInTheDocument();
    });

    it("renders medium size", () => {
      const { container } = render(<Select options={mockOptions} size="md" />);
      const select = container.querySelector(".md");
      expect(select).toBeInTheDocument();
    });

    it("renders large size", () => {
      const { container } = render(<Select options={mockOptions} size="lg" />);
      const select = container.querySelector(".lg");
      expect(select).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders error state", () => {
      const { container } = render(
        <Select options={mockOptions} error="Error message" />
      );
      const select = container.querySelector(".error");
      expect(select).toBeInTheDocument();
    });

    it("renders success state", () => {
      const { container } = render(
        <Select options={mockOptions} state="success" />
      );
      const select = container.querySelector(".success");
      expect(select).toBeInTheDocument();
    });

    it("error prop overrides state prop", () => {
      const { container } = render(
        <Select options={mockOptions} state="success" error="Error message" />
      );
      const select = container.querySelector(".error");
      expect(select).toBeInTheDocument();
      expect(container.querySelector(".success")).not.toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("does not open dropdown when disabled", () => {
      render(<Select options={mockOptions} disabled />);

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("applies disabled styles", () => {
      const { container } = render(<Select options={mockOptions} disabled />);
      const select = container.querySelector(".disabled");
      expect(select).toBeInTheDocument();
    });

    it("has disabled attribute on trigger button", () => {
      render(<Select options={mockOptions} disabled />);
      const trigger = screen.getByRole("button");
      expect(trigger).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes on trigger", () => {
      render(<Select options={mockOptions} id="test-select" />);
      const trigger = screen.getByRole("button");

      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("id", "test-select");
    });

    it("updates aria-expanded when opened", async () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("has correct ARIA attributes on options", async () => {
      render(<Select options={mockOptions} value="apple" />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      await waitFor(() => {
        const selectedOption = screen.getByText("Apple").closest("li");
        expect(selectedOption).toHaveAttribute("role", "option");
        expect(selectedOption).toHaveAttribute("aria-selected", "true");
      });
    });

    it("marks disabled options with aria-disabled", async () => {
      render(<Select options={mockOptionsWithDisabled} />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      await waitFor(() => {
        const disabledOption = screen.getByText("Banana").closest("li");
        expect(disabledOption).toHaveAttribute("aria-disabled", "true");
      });
    });

    it("associates label with select using id", () => {
      render(<Select options={mockOptions} label="Test label" id="test-id" />);
      const label = screen.getByText("Test label");
      expect(label).toHaveAttribute("for", "test-id");
    });
  });

  describe("Form Integration", () => {
    it("creates hidden input with name and value", () => {
      const { container } = render(
        <Select options={mockOptions} name="fruit" value="apple" />
      );
      const hiddenInput = container.querySelector(
        'input[type="hidden"]'
      ) as HTMLInputElement;

      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput.name).toBe("fruit");
      expect(hiddenInput.value).toBe("apple");
    });

    it("updates hidden input value on selection", async () => {
      const { container } = render(
        <Select options={mockOptions} name="fruit" />
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      const option = screen.getByText("Banana");
      fireEvent.click(option);

      await waitFor(() => {
        const hiddenInput = container.querySelector(
          'input[type="hidden"]'
        ) as HTMLInputElement;
        expect(hiddenInput.value).toBe("banana");
      });
    });
  });

  describe("Custom className", () => {
    it("applies custom className to container", () => {
      const { container } = render(
        <Select options={mockOptions} className="custom-class" />
      );
      const selectContainer = container.firstChild;
      expect(selectContainer).toHaveClass("custom-class");
    });
  });
});
