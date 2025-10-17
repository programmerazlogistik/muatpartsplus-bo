import { InfoBottomsheet } from "@muatmuat/ui/BottomSheet";

export default {
  title: "Components/InfoBottomsheet",
  component: InfoBottomsheet,
  parameters: {
    docs: {
      description: {
        component: `
# ℹ️ InfoBottomsheet

A specialized bottom sheet component for displaying informational content with a clean, accessible interface. Perfect for help text, explanations, and contextual information without cluttering the main UI.

## When to Use

- **Help documentation** and user guidance
- **Contextual information** for form fields and UI elements  
- **Terms and conditions** or legal text
- **Feature explanations** and onboarding tips
- **FAQ content** and support information
- **Rich formatted content** with HTML support

## Key Features

- 🎯 **Minimal trigger** - Clean info icon that doesn't disrupt design
- 📝 **Dual content modes** - Support for both plain text and HTML rendering
- ♿ **Accessibility-first** - Proper ARIA support and keyboard navigation
- 🎨 **Design system aligned** - Consistent styling with other components
- 📱 **Mobile optimized** - Responsive bottom sheet behavior
- 🔧 **Flexible styling** - Customizable trigger icon appearance

## Design System Category

Feedback / Information Components

## Import

\`\`\`javascript
import { InfoBottomsheet } from "@muatmuat/ui/BottomSheet";
// or
import { InfoBottomsheet } from "@muatmuat/ui/BottomSheet";
\`\`\`

## Basic Usage

\`\`\`jsx
// Simple text content
<InfoBottomsheet title="Help Information">
  This is helpful information that explains how to use this feature.
</InfoBottomsheet>

// HTML content
<InfoBottomsheet 
  title="Rich Content"
  render="<p>This supports <strong>HTML</strong> content!</p>"
/>

// In form context
<div className="flex items-center gap-2">
  <label>Field Label</label>
  <InfoBottomsheet title="Field Help">
    This field accepts email addresses in standard format.
  </InfoBottomsheet>
</div>
\`\`\`

## Prerequisites

- Requires BottomSheet components to be available
- Uses IconComponent for the trigger icon
- Depends on Tailwind CSS classes from the design system
        `,
      },
    },
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling the trigger icon",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    title: {
      control: "text",
      description: "Title displayed in the bottom sheet header",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      control: "text",
      description:
        "Plain text content to display (used when render prop is not provided)",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    render: {
      control: "text",
      description:
        "HTML string to render using dangerouslySetInnerHTML (takes precedence over children)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

// Sample content for stories
const sampleTextContent = `
This is sample informational content that would be displayed in the bottom sheet.
It can contain multiple paragraphs and provide detailed explanations about
features, settings, or any other information the user might need.
`;

const sampleHtmlContent = `
<h3 className="font-semibold mb-2">Important Information</h3>
<p className="mb-3">This bottom sheet can display <strong>rich HTML content</strong> including:</p>
<ul className="list-disc list-inside mb-3 space-y-1">
  <li>Formatted text with <em>emphasis</em></li>
  <li><strong>Bold text</strong> for important points</li>
  <li>Lists and bullet points</li>
  <li>Links and other HTML elements</li>
</ul>
<p className="text-sm text-neutral-600">Use this for displaying formatted help text or documentation.</p>
`;

/**
 * Basic info bottom sheet with text content
 */
export const Default = {
  args: {
    title: "Information",
    children: sampleTextContent,
  },
};

/**
 * Info bottom sheet with HTML content
 */
export const WithHtmlContent = {
  args: {
    title: "Detailed Information",
    render: sampleHtmlContent,
  },
};

/**
 * Info bottom sheet with custom title
 */
export const CustomTitle = {
  args: {
    title: "Help & Support",
    children:
      "This section provides help and support information for users who need assistance with this feature.",
  },
};

/**
 * Info bottom sheet with custom trigger styling
 */
export const CustomTrigger = {
  args: {
    title: "Custom Styled Info",
    className: "text-blue-600 hover:text-blue-800",
    children:
      "This info button has custom styling applied to the trigger icon.",
  },
};

/**
 * Info bottom sheet with long content
 */
export const LongContent = {
  args: {
    title: "Comprehensive Guide",
    children: `
This is a comprehensive guide that demonstrates how the InfoBottomsheet component
can handle longer content effectively. The bottom sheet will scroll if the content
exceeds the available height, ensuring all information remains accessible.

Key features of this component:
• Clean, minimal trigger (info icon)
• Accessible bottom sheet modal
• Support for both plain text and HTML content
• Consistent styling with the design system
• Responsive behavior across different screen sizes

The component automatically handles the modal behavior, including proper focus
management, keyboard navigation, and screen reader support through the underlying
BottomSheet components.
    `,
  },
};

/**
 * Info bottom sheet with formatted HTML
 */
export const FormattedHtml = {
  args: {
    title: "Terms & Conditions",
    render: `
<div>
  <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #1f2937;">Terms of Service</h2>

  <h3 style="font-size: 16px; font-weight: 600; margin: 16px 0 8px 0; color: #374151;">1. Acceptance of Terms</h3>
  <p style="margin-bottom: 12px; line-height: 1.5; color: #4b5563;">
    By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
  </p>

  <h3 style="font-size: 16px; font-weight: 600; margin: 16px 0 8px 0; color: #374151;">2. Use License</h3>
  <p style="margin-bottom: 12px; line-height: 1.5; color: #4b5563;">
    Permission is granted to temporarily use this service for personal, non-commercial transitory viewing only.
  </p>

  <div style="background-color: #f3f4f6; padding: 12px; border-radius: 6px; margin-top: 16px;">
    <p style="margin: 0; font-size: 14px; color: #6b7280;">
      <strong>Important:</strong> These terms are for demonstration purposes only.
    </p>
  </div>
</div>
    `,
  },
};

/**
 * Info bottom sheet in a form context
 */
export const InFormContext = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Account Type</label>
          <InfoBottomsheet title="Account Types">
            Choose between Personal and Business accounts. Personal accounts are
            for individual use, while Business accounts provide additional
            features for organizations.
          </InfoBottomsheet>
        </div>
        <select className="w-full rounded border border-neutral-300 px-3 py-2">
          <option>Personal</option>
          <option>Business</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Security Settings</label>
          <InfoBottomsheet
            title="Security Information"
            render={`
<h4>Two-Factor Authentication</h4>
<p>Enable 2FA to add an extra layer of security to your account. This helps protect your account even if your password is compromised.</p>
<ul>
  <li><strong>SMS:</strong> Receive codes via text message</li>
  <li><strong>App:</strong> Use authenticator apps like Google Authenticator</li>
  <li><strong>Hardware:</strong> Use security keys for maximum protection</li>
</ul>
            `}
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="2fa" />
          <label htmlFor="2fa" className="text-sm">
            Enable Two-Factor Authentication
          </label>
        </div>
      </div>
    </div>
  ),
};

/**
 * Multiple info bottom sheets
 */
export const MultipleInfoSheets = {
  render: () => (
    <div className="max-w-lg space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="mb-3 font-semibold">User Profile Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Email notifications</span>
            <InfoBottomsheet title="Email Preferences">
              Control which emails you receive from our platform. You can
              customize notifications for account activity, updates, and
              marketing communications.
            </InfoBottomsheet>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Privacy settings</span>
            <InfoBottomsheet title="Privacy Controls">
              Manage who can see your profile information and activity. Choose
              between public, friends-only, or private visibility settings.
            </InfoBottomsheet>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Data export</span>
            <InfoBottomsheet
              title="Data Management"
              render="<p>You can export all your data at any time. This includes your profile information, posts, and account settings. The export will be provided in JSON format.</p><p><strong>Note:</strong> Data export requests are processed within 24 hours.</p>"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Info bottom sheet with minimal content
 */
export const MinimalContent = {
  args: {
    title: "Quick Tip",
    children: "This is a brief informational message.",
  },
};
