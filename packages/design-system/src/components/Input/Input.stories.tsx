import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "error", "success"],
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    showRequiredAsterisk: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "john_doe",
    helperText: "Choose a unique username",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Input",
    placeholder: "Small size...",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    label: "Medium Input",
    placeholder: "Medium size...",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Input",
    placeholder: "Large size...",
  },
};

// Validation States
export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    value: "invalid-email",
    error: "Please enter a valid email address",
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Email",
    type: "email",
    value: "user@example.com",
    success: "Email is available!",
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
  },
};

export const RequiredWithoutAsterisk: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
    showRequiredAsterisk: false,
  },
};

// States
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    value: "Disabled value",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: "Loading",
    placeholder: "Checking availability...",
    value: "username123",
    isLoading: true,
  },
};

// With Icons
export const WithPrefixIcon: Story = {
  args: {
    label: "Search",
    type: "search",
    placeholder: "Search...",
    prefixIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    ),
  },
};

export const WithSuffixIcon: Story = {
  args: {
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
    suffixIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
      </svg>
    ),
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Amount",
    type: "number",
    placeholder: "0.00",
    prefixIcon: <span>$</span>,
    suffixIcon: <span>USD</span>,
  },
};

// Input Types
export const EmailInput: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    helperText: "We will never share your email",
  },
};

export const PasswordInput: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter secure password",
    helperText: "Must be at least 8 characters",
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "18",
    min: 0,
    max: 120,
  },
};

export const TelephoneInput: Story = {
  args: {
    label: "Phone Number",
    type: "tel",
    placeholder: "+1 (555) 123-4567",
  },
};

export const URLInput: Story = {
  args: {
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
  },
};

export const SearchInput: Story = {
  args: {
    label: "Search",
    type: "search",
    placeholder: "Search products...",
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "Spans the full width",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

// Complex Example
export const ComplexExample: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@company.com",
    required: true,
    helperText: "Enter your work email",
    prefixIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
      </svg>
    ),
  },
};

// All Sizes Comparison
export const SizeComparison: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "300px",
      }}
    >
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

// All States Comparison
export const StateComparison: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "300px",
      }}
    >
      <Input label="Default" placeholder="Default state" />
      <Input label="Error" value="invalid" error="This field has an error" />
      <Input label="Success" value="valid@email.com" success="Looks good!" />
      <Input label="Disabled" value="Disabled" disabled />
      <Input label="Loading" value="Checking..." isLoading />
    </div>
  ),
};
