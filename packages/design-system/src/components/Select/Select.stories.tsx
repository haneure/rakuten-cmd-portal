import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { SelectOption } from "./Select.types";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options
const fruits: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const countries: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "jp", label: "Japan" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

// Basic stories
export const Default: Story = {
  args: {
    options: fruits,
    placeholder: "Select a fruit",
  },
};

export const WithLabel: Story = {
  args: {
    options: fruits,
    label: "Choose a fruit",
    placeholder: "Select one",
  },
};

export const Required: Story = {
  args: {
    options: fruits,
    label: "Favorite fruit",
    placeholder: "Select a fruit",
    required: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: fruits,
    label: "Favorite fruit",
    value: "banana",
  },
};

// Sizes
export const Small: Story = {
  args: {
    options: fruits,
    label: "Small select",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    options: fruits,
    label: "Medium select",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    options: fruits,
    label: "Large select",
    size: "lg",
  },
};

// States
export const ErrorState: Story = {
  args: {
    options: fruits,
    label: "Favorite fruit",
    state: "error",
    error: "Please select a fruit",
  },
};

export const SuccessState: Story = {
  args: {
    options: fruits,
    label: "Favorite fruit",
    state: "success",
    helperText: "Great choice!",
  },
};

export const WithHelperText: Story = {
  args: {
    options: fruits,
    label: "Favorite fruit",
    helperText: "Choose your favorite fruit from the list",
  },
};

export const Disabled: Story = {
  args: {
    options: fruits,
    label: "Disabled select",
    disabled: true,
    value: "apple",
  },
};

// With disabled options
export const DisabledOptions: Story = {
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana (Out of stock)", disabled: true },
      { value: "orange", label: "Orange" },
      { value: "grape", label: "Grape (Out of stock)", disabled: true },
      { value: "mango", label: "Mango" },
    ],
    label: "Available fruits",
  },
};

// Long list
export const LongList: Story = {
  args: {
    options: countries,
    label: "Select country",
    placeholder: "Choose a country",
  },
};

export const AllSizes = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "300px",
      }}
    >
      <Select options={fruits} label="Small" size="sm" />
      <Select options={fruits} label="Medium" size="md" />
      <Select options={fruits} label="Large" size="lg" />
    </div>
  ),
};

// Searchable
export const Searchable: Story = {
  args: {
    options: countries,
    label: "Select country",
    placeholder: "Choose a country",
    searchable: true,
    searchPlaceholder: "Search countries...",
  },
};

export const SearchableFruits: Story = {
  args: {
    options: fruits,
    label: "Search for a fruit",
    searchable: true,
  },
};

// Clearable
export const Clearable: Story = {
  args: {
    options: fruits,
    label: "Favorite fruit",
    placeholder: "Select a fruit",
    clearable: true,
    value: "banana",
  },
};

export const SearchableAndClearable: Story = {
  args: {
    options: countries,
    label: "Select country",
    searchable: true,
    clearable: true,
    value: "jp",
  },
};

// Real-world example
export const FullFeatured: Story = {
  args: {
    options: countries,
    label: "Country",
    placeholder: "Select your country",
    searchable: true,
    searchPlaceholder: "Type to search...",
    clearable: true,
    helperText: "Select the country where you reside",
    required: true,
  },
};
