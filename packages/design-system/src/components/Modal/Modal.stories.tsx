import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import { Modal } from "./Modal";
import { ModalProps } from "./Modal.types";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    closeOnBackdropClick: {
      control: "boolean",
    },
    closeOnEsc: {
      control: "boolean",
    },
    showCloseButton: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
const ModalWrapper = (args: Partial<ModalProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

// Basic Examples
export const Default: Story = {
  render: () => (
    <ModalWrapper title="Default Modal">
      <p>This is a simple modal with default settings.</p>
    </ModalWrapper>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <ModalWrapper>
      <h3 style={{ margin: "0 0 1rem 0" }}>Custom Content</h3>
      <p>You can use the modal without a title prop and add your own header.</p>
    </ModalWrapper>
  ),
};

export const WithFooter: Story = {
  render: () => {
    const FooterModalContent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Confirm Action"
            footer={
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    alert("Confirmed!");
                    setIsOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </div>
            }
          >
            <p>Are you sure you want to proceed with this action?</p>
          </Modal>
        </>
      );
    };
    return <FooterModalContent />;
  },
};

// Sizes
export const SmallSize: Story = {
  render: () => (
    <ModalWrapper size="sm" title="Small Modal">
      <p>This is a small modal, perfect for simple confirmations or alerts.</p>
    </ModalWrapper>
  ),
};

export const MediumSize: Story = {
  render: () => (
    <ModalWrapper size="md" title="Medium Modal">
      <p>This is a medium-sized modal (default size).</p>
      <p>It's suitable for most use cases like forms or detailed content.</p>
    </ModalWrapper>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <ModalWrapper size="lg" title="Large Modal">
      <p>This is a large modal, ideal for complex forms or rich content.</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <div>
          <h4>Column 1</h4>
          <p>Content here...</p>
        </div>
        <div>
          <h4>Column 2</h4>
          <p>Content here...</p>
        </div>
      </div>
    </ModalWrapper>
  ),
};

export const FullSize: Story = {
  render: () => (
    <ModalWrapper size="full" title="Full Size Modal">
      <p>
        This modal takes up almost the entire screen (95% width and height).
      </p>
      <p>Perfect for applications, dashboards, or immersive experiences.</p>
    </ModalWrapper>
  ),
};

// Scrollable Content
export const ScrollableContent: Story = {
  render: () => (
    <ModalWrapper title="Scrollable Modal">
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Paragraph {i + 1}: This modal has a lot of content that requires
            scrolling. The header and footer stay fixed while the body scrolls.
          </p>
        ))}
      </div>
    </ModalWrapper>
  ),
};

export const ScrollableWithFooter: Story = {
  render: () => {
    const ScrollableModalContent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Terms and Conditions"
            footer={
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Decline
                </Button>
                <Button variant="primary" onClick={() => setIsOpen(false)}>
                  Accept
                </Button>
              </div>
            }
          >
            <div>
              {Array.from({ length: 15 }, (_, i) => (
                <p key={i} style={{ marginBottom: "1rem" }}>
                  Section {i + 1}: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Scroll through all sections before accepting.
                </p>
              ))}
            </div>
          </Modal>
        </>
      );
    };
    return <ScrollableModalContent />;
  },
};

// Behavior Options
export const NoCloseButton: Story = {
  render: () => (
    <ModalWrapper title="No Close Button" showCloseButton={false}>
      <p>This modal doesn't have a close button.</p>
      <p>You can still close it by clicking outside or pressing ESC.</p>
    </ModalWrapper>
  ),
};

export const NoBackdropClose: Story = {
  render: () => (
    <ModalWrapper title="Click Outside Disabled" closeOnBackdropClick={false}>
      <p>Clicking outside this modal won't close it.</p>
      <p>Use the close button or press ESC to close.</p>
    </ModalWrapper>
  ),
};

export const NoEscClose: Story = {
  render: () => (
    <ModalWrapper title="ESC Key Disabled" closeOnEsc={false}>
      <p>Pressing ESC won't close this modal.</p>
      <p>Use the close button or click outside to close.</p>
    </ModalWrapper>
  ),
};

export const NoEasyClose: Story = {
  render: () => (
    <ModalWrapper
      title="Must Use Close Button"
      closeOnBackdropClick={false}
      closeOnEsc={false}
    >
      <p>This modal can only be closed using the close button.</p>
      <p>Neither clicking outside nor pressing ESC will work.</p>
    </ModalWrapper>
  ),
};

// Form Example
export const FormModal: Story = {
  render: () => {
    const FormModalContent = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [formData, setFormData] = useState({ name: "", email: "" });

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Submitted: ${formData.name}, ${formData.email}`);
        setIsOpen(false);
        setFormData({ name: "", email: "" });
      };

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Form</Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="User Information"
            footer={
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setFormData({ name: "", email: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    const form = document.getElementById(
                      "user-form"
                    ) as HTMLFormElement;
                    form?.requestSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            }
          >
            <form id="user-form" onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="name"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                  }}
                  required
                />
              </div>
            </form>
          </Modal>
        </>
      );
    };
    return <FormModalContent />;
  },
};

// Alert/Confirmation Patterns
export const SuccessAlert: Story = {
  render: () => {
    const SuccessAlertContent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Show Success</Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            size="sm"
            title="Success!"
            footer={
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                OK
              </Button>
            }
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "3rem",
                  color: "#10b981",
                  marginBottom: "1rem",
                }}
              >
                ✓
              </div>
              <p>Your changes have been saved successfully.</p>
            </div>
          </Modal>
        </>
      );
    };
    return <SuccessAlertContent />;
  },
};

export const DeleteConfirmation: Story = {
  render: () => {
    const DeleteConfirmContent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button variant="danger" onClick={() => setIsOpen(true)}>
            Delete Item
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            size="sm"
            title="Confirm Deletion"
            closeOnBackdropClick={false}
            footer={
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    alert("Item deleted!");
                    setIsOpen(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            }
          >
            <p>Are you sure you want to delete this item?</p>
            <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>
              This action cannot be undone.
            </p>
          </Modal>
        </>
      );
    };
    return <DeleteConfirmContent />;
  },
};

// Complex Example
export const UserProfileModal: Story = {
  render: () => {
    const ProfileModalContent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>View Profile</Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            size="md"
            title="User Profile"
          >
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#f43f5e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                JD
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>John Doe</h3>
                <p style={{ margin: "0 0 1rem 0", color: "#6b7280" }}>
                  Software Engineer
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <div>
                    <strong>Email:</strong>
                    <div>john.doe@example.com</div>
                  </div>
                  <div>
                    <strong>Location:</strong>
                    <div>Tokyo, Japan</div>
                  </div>
                  <div>
                    <strong>Joined:</strong>
                    <div>January 2024</div>
                  </div>
                  <div>
                    <strong>Projects:</strong>
                    <div>48 active</div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      );
    };
    return <ProfileModalContent />;
  },
};
