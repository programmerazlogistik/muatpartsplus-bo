import { Breadcrumb } from "@muatmuat/ui/Breadcrumb";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: `
# 🗂️ Breadcrumb

A navigation component that shows the current page location within a navigational hierarchy. Helps users understand where they are and provides a way to navigate back to parent pages.

## When to Use

- **Deep navigation structures** with multiple levels
- **Content hierarchies** like categories, subcategories, and items
- **File system navigation** showing folder structures
- **Multi-step processes** to show progress and allow backward navigation
- **E-commerce sites** for product categories and subcategories
- **Documentation sites** with nested sections

## Key Features

- 🔗 **Smart linking** - Items with href become clickable links
- 📱 **Responsive design** - Text truncation with ellipsis for long breadcrumbs
- 🎯 **Active state** - Current page highlighted by default
- ♿ **Accessibility-first** - Proper semantic structure and navigation landmarks
- 🎨 **Customizable styling** - Flexible appearance with className overrides
- 📏 **Width control** - maxWidth prop for consistent item sizing
- 🖱️ **Interaction control** - Options to disable clicks and active states

## Design System Category

Navigation Components

## Import

\`\`\`javascript
import { Breadcrumb } from "@muatmuat/ui/Breadcrumb";
// or
import { Breadcrumb } from "@muatmuat/ui";
\`\`\`

## Basic Usage

\`\`\`jsx
const breadcrumbData = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Electronics", href: "/products/electronics" },
  { name: "Smartphones" }, // Current page (no href)
];

<Breadcrumb data={breadcrumbData} />
\`\`\`

## Data Structure

Each breadcrumb item should follow this structure:

\`\`\`typescript
interface BreadcrumbItem {
  name: string;        // Display text for the breadcrumb
  href?: string;       // Optional link URL (if provided, item becomes clickable)
}
\`\`\`

## Best Practices

- ✅ **DO**: Keep breadcrumb text concise and descriptive
- ✅ **DO**: Use the last item for the current page without a link
- ✅ **DO**: Provide clear hierarchy from general to specific
- ❌ **DON'T**: Use breadcrumbs for single-level navigation
- ❌ **DON'T**: Make the current page clickable (unless needed)
- ❌ **DON'T**: Include too many levels (5-7 max recommended)
        `,
      },
    },
    layout: "centered",
  },
  argTypes: {
    data: {
      control: "object",
      description: "Array of breadcrumb items with name and optional href",
      table: {
        type: {
          summary: "BreadcrumbItem[]",
          detail: `interface BreadcrumbItem {
  name: string;
  href?: string;
}`,
        },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the breadcrumb container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    disableActive: {
      control: "boolean",
      description: "Disable active state styling for the current page",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disableClick: {
      control: "boolean",
      description: "Disable click interactions for all breadcrumb items",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    maxWidth: {
      control: "number",
      description:
        "Maximum width in pixels for breadcrumb items (enables text truncation)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

// Sample data for stories
const basicBreadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Current Page" },
];

const ecommerceBreadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Electronics", href: "/categories/electronics" },
  { name: "Smartphones", href: "/categories/electronics/smartphones" },
  { name: "iPhone 15 Pro", href: "/products/iphone-15-pro" },
  { name: "Space Black 256GB" },
];

const documentationBreadcrumbs = [
  { name: "Docs", href: "/docs" },
  { name: "Components", href: "/docs/components" },
  { name: "Navigation", href: "/docs/components/navigation" },
  { name: "Breadcrumb" },
];

const longTextBreadcrumbs = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "User Management System", href: "/dashboard/users" },
  { name: "Advanced User Profile Settings", href: "/dashboard/users/profile" },
  { name: "Security and Privacy Configuration Panel" },
];

// ============================================================================
// Basic Examples
// ============================================================================

export const Default = {
  args: {
    data: basicBreadcrumbs,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard breadcrumb with three levels. The last item represents the current page and is highlighted.",
      },
    },
  },
};

export const EcommerceExample = {
  args: {
    data: ecommerceBreadcrumbs,
  },
  parameters: {
    docs: {
      description: {
        story:
          "E-commerce breadcrumb showing navigation from home to a specific product variant with multiple category levels.",
      },
    },
  },
};

export const DocumentationExample = {
  args: {
    data: documentationBreadcrumbs,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Documentation site breadcrumb showing hierarchical content organization for technical documentation.",
      },
    },
  },
};

// ============================================================================
// Configuration Variants
// ============================================================================

export const DisabledActiveState = {
  args: {
    data: basicBreadcrumbs,
    disableActive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb with active state disabled. The current page appears in the same style as other items.",
      },
    },
  },
};

export const DisabledClicks = {
  args: {
    data: basicBreadcrumbs,
    disableClick: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb with click interactions disabled. Items appear as text only without hover effects or clickable behavior.",
      },
    },
  },
};

export const WithMaxWidth = {
  args: {
    data: longTextBreadcrumbs,
    maxWidth: 120,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb with maxWidth constraint applied. Long text is truncated with ellipsis to maintain consistent layout.",
      },
    },
  },
};

// ============================================================================
// Content Variations
// ============================================================================

export const TwoLevels = {
  args: {
    data: [{ name: "Dashboard", href: "/dashboard" }, { name: "Settings" }],
  },
  parameters: {
    docs: {
      description: {
        story: "Simple two-level breadcrumb for shallow navigation structures.",
      },
    },
  },
};

export const SingleLevel = {
  args: {
    data: [{ name: "Homepage" }],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single-level breadcrumb (though this pattern is rarely needed in practice).",
      },
    },
  },
};

export const DeepHierarchy = {
  args: {
    data: [
      { name: "Portal", href: "/portal" },
      { name: "Administration", href: "/portal/admin" },
      { name: "User Management", href: "/portal/admin/users" },
      { name: "Roles & Permissions", href: "/portal/admin/users/roles" },
      { name: "Permission Groups", href: "/portal/admin/users/roles/groups" },
      { name: "Edit Group: Super Administrators" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Deep hierarchy breadcrumb with six levels. Consider using a collapsed view for very deep structures.",
      },
    },
  },
};

// ============================================================================
// Real-world Examples
// ============================================================================

export const BlogNavigation = {
  args: {
    data: [
      { name: "Blog", href: "/blog" },
      { name: "Technology", href: "/blog/category/technology" },
      {
        name: "Web Development",
        href: "/blog/category/technology/web-development",
      },
      { name: "The Future of React Server Components" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Blog navigation breadcrumb showing category hierarchy leading to a specific article.",
      },
    },
  },
};

export const FileSystemNavigation = {
  args: {
    data: [
      { name: "Documents", href: "/files/documents" },
      { name: "Projects", href: "/files/documents/projects" },
      { name: "2024", href: "/files/documents/projects/2024" },
      {
        name: "Website Redesign",
        href: "/files/documents/projects/2024/website-redesign",
      },
      { name: "design-assets.zip" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "File system navigation breadcrumb showing folder structure leading to a specific file.",
      },
    },
  },
};

export const MarketplaceNavigation = {
  args: {
    data: [
      { name: "Marketplace", href: "/marketplace" },
      { name: "Fashion", href: "/marketplace/fashion" },
      { name: "Women's Clothing", href: "/marketplace/fashion/womens" },
      { name: "Dresses", href: "/marketplace/fashion/womens/dresses" },
      { name: "Summer Collection Floral Dress - Size M" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Marketplace navigation showing product categorization from general to specific item.",
      },
    },
  },
};

// ============================================================================
// Styling Examples
// ============================================================================

export const CustomStyling = {
  args: {
    data: basicBreadcrumbs,
    className: "bg-neutral-50 p-3 rounded-lg border",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb with custom container styling including background, padding, and border.",
      },
    },
  },
};

export const CompactStyle = {
  args: {
    data: documentationBreadcrumbs,
    className: "text-xs",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact breadcrumb with smaller text size for space-constrained layouts.",
      },
    },
  },
};

// ============================================================================
// Edge Cases & Responsive Behavior
// ============================================================================

export const VeryLongItemNames = {
  args: {
    data: [
      { name: "Enterprise Resource Planning Dashboard", href: "/erp" },
      { name: "Human Resources Management System", href: "/erp/hr" },
      {
        name: "Employee Performance Evaluation and Review Module",
        href: "/erp/hr/performance",
      },
      { name: "Quarterly Performance Assessment Report Generation Tool" },
    ],
    maxWidth: 150,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb handling very long item names with truncation. Text is cut off with ellipsis to maintain layout.",
      },
    },
  },
};

export const MixedLinkTypes = {
  args: {
    data: [
      { name: "Home", href: "/" },
      { name: "Non-clickable Section" }, // No href
      { name: "Clickable Subsection", href: "/subsection" },
      { name: "Current Page" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb with mixed item types - some clickable (with href) and others as plain text.",
      },
    },
  },
};

export const EmptyData = {
  args: {
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb with empty data array. Component handles gracefully without rendering anything.",
      },
    },
  },
};

// ============================================================================
// Accessibility Example
// ============================================================================

export const AccessibilityExample = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 font-semibold">Accessible Breadcrumb Example</h3>
        <nav aria-label="Breadcrumb navigation">
          <Breadcrumb
            data={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Laptops", href: "/products/laptops" },
              { name: "MacBook Pro 16-inch" },
            ]}
          />
        </nav>
      </div>

      <div className="bg-success-50 border-success-200 rounded-lg border p-3 text-sm">
        <h4 className="text-success-800 font-medium">
          ✅ Accessibility Features
        </h4>
        <ul className="text-success-700 mt-2 space-y-1">
          <li>• Semantic navigation structure with nav element</li>
          <li>• Descriptive aria-label for the navigation</li>
          <li>• Proper link semantics for clickable items</li>
          <li>• Clear visual hierarchy and hover states</li>
          <li>• Keyboard navigation support</li>
          <li>• Screen reader friendly content structure</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates proper accessibility implementation with semantic HTML and ARIA labels.",
      },
    },
  },
};

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground = {
  args: {
    data: basicBreadcrumbs,
    className: "",
    disableActive: false,
    disableClick: false,
    maxWidth: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to experiment with all Breadcrumb options. Try different combinations of settings to see how they affect the breadcrumb behavior and appearance.",
      },
    },
  },
};
