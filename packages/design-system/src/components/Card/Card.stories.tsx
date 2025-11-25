import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    clickable: {
      control: "boolean",
    },
    hoverable: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Card Title</h3>
        <p style={{ margin: 0, color: "#6b7280" }}>
          This is a simple card with default styling.
        </p>
      </div>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3 style={{ margin: 0 }}>Card Header</h3>,
    children: (
      <p style={{ margin: 0 }}>
        This card has a header and footer section separated by borders.
      </p>
    ),
    footer: (
      <div
        style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
      >
        <button
          style={{ padding: "0.5rem 1rem" }}
          onClick={() => alert("Cancelled!")}
        >
          Cancel
        </button>
        <button
          style={{ padding: "0.5rem 1rem" }}
          onClick={() => alert("Saved!")}
        >
          Save
        </button>
      </div>
    ),
  },
};

// Variants
export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Outlined Card</h3>
        <p style={{ margin: 0 }}>This card has a thicker border.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Elevated Card</h3>
        <p style={{ margin: 0 }}>
          This card has a subtle shadow for elevation.
        </p>
      </div>
    ),
  },
};

// Padding Options
export const SmallPadding: Story = {
  args: {
    padding: "sm",
    children: <p style={{ margin: 0 }}>Card with small padding</p>,
  },
};

export const MediumPadding: Story = {
  args: {
    padding: "md",
    children: <p style={{ margin: 0 }}>Card with medium padding (default)</p>,
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    children: <p style={{ margin: 0 }}>Card with large padding</p>,
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    children: (
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Mountain landscape"
        style={{
          width: "300px",
          height: "200px",
          objectFit: "cover",
          display: "block",
        }}
      />
    ),
  },
};

// Interactive States
export const Clickable: Story = {
  args: {
    clickable: true,
    children: (
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Clickable Card</h3>
        <p style={{ margin: 0 }}>Click me or press Enter/Space when focused!</p>
      </div>
    ),
    onClick: () => alert("Card clicked!"),
  },
};

export const WithOnClick: Story = {
  args: {
    clickable: true,
    children: (
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Card with onClick</h3>
        <p style={{ margin: 0 }}>
          Check the Actions panel below when you click this card
        </p>
      </div>
    ),
  },
  argTypes: {
    onClick: { action: "clicked" }, // This logs to Storybook Actions panel
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Hoverable Card</h3>
        <p style={{ margin: 0 }}>Hover over this card to see the effect.</p>
      </div>
    ),
  },
};

// Complex Examples
export const ProductCard: Story = {
  args: {
    variant: "elevated",
    padding: "none",
    hoverable: true,
    children: (
      <>
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          alt="Product"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div style={{ padding: "1rem" }}>
          <h3 style={{ margin: "0 0 0.5rem 0" }}>Wireless Headphones</h3>
          <p style={{ margin: "0 0 1rem 0", color: "#6b7280" }}>
            Premium sound quality with noise cancellation
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>$299</span>
            <button
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f43f5e",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                alert("Added to cart!");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </>
    ),
  },
};

export const UserProfileCard: Story = {
  args: {
    variant: "outlined",
    header: (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#f43f5e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          JD
        </div>
        <div>
          <h3 style={{ margin: 0 }}>John Doe</h3>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
            Software Engineer
          </p>
        </div>
      </div>
    ),
    children: (
      <div>
        <p style={{ margin: "0 0 1rem 0", color: "#374151" }}>
          Passionate about creating beautiful and functional user interfaces.
          Love working with React and TypeScript.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>1.2k</div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Followers
            </div>
          </div>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>48</div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Projects
            </div>
          </div>
        </div>
      </div>
    ),
    footer: (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
          onClick={() => alert("Message sent!")}
        >
          Message
        </button>
        <button
          style={{
            flex: 1,
            padding: "0.5rem",
            backgroundColor: "#f43f5e",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
          onClick={() => alert("Followed!")}
        >
          Follow
        </button>
      </div>
    ),
  },
};

export const NotificationCard: Story = {
  args: {
    variant: "default",
    padding: "md",
    clickable: true,
    children: (
      <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#f43f5e",
            marginTop: "0.5rem",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 0.25rem 0" }}>New message received</h4>
          <p
            style={{
              margin: "0 0 0.5rem 0",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            Sarah sent you a message about the project update
          </p>
          <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            2 minutes ago
          </span>
        </div>
      </div>
    ),
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Full Width Card</h3>
        <p style={{ margin: 0 }}>
          This card spans the full width of its container.
        </p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

// Comparison
export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Card variant="default" style={{ width: "200px" }}>
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Default</h4>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>Standard border</p>
      </Card>
      <Card variant="outlined" style={{ width: "200px" }}>
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Outlined</h4>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>Thicker border</p>
      </Card>
      <Card variant="elevated" style={{ width: "200px" }}>
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Elevated</h4>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>With shadow</p>
      </Card>
    </div>
  ),
};
