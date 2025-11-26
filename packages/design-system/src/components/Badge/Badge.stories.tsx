import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the badge",
    },
    dot: {
      control: "boolean",
      description: "Shows a dot indicator",
    },
    animation: {
      control: "select",
      options: ["none", "pulse", "ripple", "glow", "bounce"],
      description: "Animation style for the dot indicator",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Badge",
    variant: "primary",
  },
};

export const Success: Story = {
  args: {
    children: "Success Badge",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Badge",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Badge",
    variant: "danger",
  },
};

export const Info: Story = {
  args: {
    children: "Info Badge",
    variant: "info",
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: "Small Badge",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Badge",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large Badge",
    size: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const SizeVariantCombos: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Badge size="sm" variant="primary">
          Small Primary
        </Badge>
        <Badge variant="primary" size="md">
          Medium Primary
        </Badge>
        <Badge variant="primary" size="lg">
          Large Primary
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Badge size="sm" variant="success">
          Small Success
        </Badge>
        <Badge variant="success" size="md">
          Medium Success
        </Badge>
        <Badge variant="success" size="lg">
          Large Success
        </Badge>
      </div>
    </div>
  ),
};

export const WithDot: Story = {
  args: {
    children: "Active",
    variant: "success",
    dot: true,
  },
};

export const DotVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Badge variant="default" dot>
        Default
      </Badge>
      <Badge variant="primary" dot>
        Primary
      </Badge>
      <Badge variant="success" dot>
        Success
      </Badge>
      <Badge variant="warning" dot>
        Warning
      </Badge>
      <Badge variant="danger" dot>
        Danger
      </Badge>
      <Badge variant="info" dot>
        Info
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="danger" dot>
        Offline
      </Badge>
      <Badge variant="default" dot>
        Idle
      </Badge>
    </div>
  ),
};

export const DotWithSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Badge size="sm" variant="success" dot>
        Small
      </Badge>
      <Badge size="md" variant="success" dot>
        Medium
      </Badge>
      <Badge size="lg" variant="success" dot>
        Large
      </Badge>
    </div>
  ),
};

export const AllAnimations: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "2rem",
        background: "var(--color-neutral-50)",
        borderRadius: "0.5rem",
      }}
    >
      <Badge variant="success" dot animation="none">
        None
      </Badge>
      <Badge variant="success" dot animation="pulse">
        Pulse
      </Badge>
      <Badge variant="success" dot animation="ripple">
        Ripple
      </Badge>
      <Badge variant="info" dot animation="glow">
        Glow
      </Badge>
      <Badge variant="warning" dot animation="bounce">
        Bounce
      </Badge>
    </div>
  ),
};

// Real-world use cases with animations
export const UserStatusAnimated: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Badge variant="success" dot animation="ripple" size="lg">
        ● Online
      </Badge>
      <Badge variant="warning" dot animation="pulse" size="lg">
        ● Away
      </Badge>
      <Badge variant="danger" dot animation="glow" size="lg">
        ● Busy
      </Badge>
      <Badge variant="default" dot animation="none" size="lg">
        ● Offline
      </Badge>
    </div>
  ),
};

// Show animations work with all variants
export const AnimationVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1rem",
        padding: "2rem",
        background: "var(--color-neutral-50)",
        borderRadius: "0.5rem",
      }}
    >
      <Badge variant="default" dot animation="ripple">
        Default
      </Badge>
      <Badge variant="primary" dot animation="ripple">
        Primary
      </Badge>
      <Badge variant="success" dot animation="ripple">
        Success
      </Badge>
      <Badge variant="warning" dot animation="ripple">
        Warning
      </Badge>
      <Badge variant="danger" dot animation="glow">
        Danger
      </Badge>
      <Badge variant="info" dot animation="glow">
        Info
      </Badge>
    </div>
  ),
};

// Notification badges with animations
export const NotificationBadges: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "2rem",
        background: "var(--color-neutral-50)",
        borderRadius: "0.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "1.125rem", fontWeight: 500 }}>
          New Messages
        </span>
        <Badge variant="danger" dot animation="bounce" size="sm">
          3
        </Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "1.125rem", fontWeight: 500 }}>
          System Status
        </span>
        <Badge variant="success" dot animation="ripple">
          Healthy
        </Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "1.125rem", fontWeight: 500 }}>
          Updates Available
        </span>
        <Badge variant="info" dot animation="pulse">
          2
        </Badge>
      </div>
    </div>
  ),
};

// Recommended animation + variant combinations
export const RecommendedCombos: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
        background: "var(--color-neutral-50)",
        borderRadius: "0.5rem",
      }}
    >
      <div>
        <h4
          style={{ margin: "0 0 1rem 0", color: "var(--color-text-secondary)" }}
        >
          ✅ Online Status (pulse = green radar)
        </h4>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Badge variant="success" dot animation="pulse">
            Online
          </Badge>
          <Badge variant="success" dot animation="pulse" size="sm">
            Active
          </Badge>
        </div>
      </div>

      <div>
        <h4
          style={{ margin: "0 0 1rem 0", color: "var(--color-text-secondary)" }}
        >
          🔴 Alerts & Errors (glow or bounce)
        </h4>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Badge variant="danger" dot animation="glow">
            Error
          </Badge>
          <Badge variant="danger" dot animation="bounce">
            3 New
          </Badge>
        </div>
      </div>

      <div>
        <h4
          style={{ margin: "0 0 1rem 0", color: "var(--color-text-secondary)" }}
        >
          ⚠️ Warnings (ripple or pulse)
        </h4>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Badge variant="warning" dot animation="ripple">
            Pending
          </Badge>
          <Badge variant="warning" dot animation="pulse">
            Away
          </Badge>
        </div>
      </div>

      <div>
        <h4
          style={{ margin: "0 0 1rem 0", color: "var(--color-text-secondary)" }}
        >
          ℹ️ Info & Updates (pulse or glow)
        </h4>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Badge variant="info" dot animation="pulse">
            2 Updates
          </Badge>
          <Badge variant="info" dot animation="glow">
            Processing
          </Badge>
        </div>
      </div>

      <div>
        <h4
          style={{ margin: "0 0 1rem 0", color: "var(--color-text-secondary)" }}
        >
          🎨 All combos work (user choice)
        </h4>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Badge variant="primary" dot animation="pulse">
            Custom
          </Badge>
          <Badge variant="success" dot animation="bounce">
            Playful
          </Badge>
          <Badge variant="danger" dot animation="ripple">
            Creative
          </Badge>
        </div>
      </div>
    </div>
  ),
};
