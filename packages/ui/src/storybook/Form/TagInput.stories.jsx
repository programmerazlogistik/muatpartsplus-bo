import { TagInput } from "@muatmuat/ui/Form";

export default {
  title: "Form/TagInput",
  component: TagInput,
  parameters: {
    docs: {
      description: {
        component: `
# 🏷️ TagInput Component

A flexible and accessible tag input component that allows users to add and remove tags dynamically. Perfect for tagging systems, multi-select inputs, and categorization interfaces.

## When to Use
- **Content tagging**: Blog posts, articles, or media content
- **Category selection**: Multiple category assignments
- **Skill/interest tags**: User profiles or job listings
- **Filter creation**: Dynamic filter interfaces
- **Metadata input**: Any scenario requiring multiple text values

## Design System Category
**Form Controls** - Data Entry Components

## Key Features
- ✅ **Controlled/Uncontrolled modes**: Works with or without external state management
- ✅ **Duplicate prevention**: Optional duplicate tag detection
- ✅ **Tag limits**: Maximum number of tags and character length per tag
- ✅ **Keyboard navigation**: Enter to add, Backspace to remove
- ✅ **Accessibility**: ARIA labels and screen reader support
- ✅ **Customizable styling**: Flexible appearance customization
- ✅ **Error handling**: Built-in validation and error display
        `,
      },
    },
  },
  argTypes: {
    tags: {
      control: { type: "object" },
      description: "Array of current tags (controlled mode)",
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: "[]" },
      },
    },
    onTagsChange: {
      action: "tags-changed",
      description: "Callback when tags change (controlled mode)",
      table: {
        type: { summary: "(tags: string[]) => void" },
      },
    },
    onTagsDuplicate: {
      action: "duplicate-tag",
      description: "Callback when duplicate tag is attempted",
      table: {
        type: { summary: "(tag: string) => void" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the input field",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Type and press Enter to add tags..."' },
      },
    },
    maxTags: {
      control: { type: "number", min: 1, max: 20 },
      description: "Maximum number of tags allowed",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "Infinity" },
      },
    },
    maxLength: {
      control: { type: "number", min: 5, max: 100 },
      description: "Maximum character length for each tag",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "50" },
      },
    },
    allowDuplicates: {
      control: { type: "boolean" },
      description: "Whether to allow duplicate tags",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the component is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    withTagInputHelp: {
      control: { type: "boolean" },
      description: "Show tag count and limits help text",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message to display",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS class for the container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    appearance: {
      control: { type: "object" },
      description: "Styling customization object",
      table: {
        type: { summary: "{ tagClassName?: string, inputClassName?: string }" },
        defaultValue: { summary: "{ tagClassName: '', inputClassName: '' }" },
      },
    },
  },
};

/**
 * ## Default State
 *
 * The basic TagInput component in its default state. Users can type and press Enter to add tags,
 * or press Backspace to remove the last tag when the input is empty.
 */
export const Default = {
  args: {
    placeholder: "Type and press Enter to add tags...",
  },
};

/**
 * ## Controlled Component
 *
 * TagInput can be controlled externally by providing `tags` and `onTagsChange` props.
 * This is useful when you need to manage tag state in a parent component or form library.
 */
export const Controlled = {
  args: {
    tags: ["React", "JavaScript", "TypeScript"],
    onTagsChange: undefined, // Will be handled by Storybook actions
    placeholder: "Add more technologies...",
  },
};

/**
 * ## With Tag Limits
 *
 * Demonstrate maximum tag count and character length restrictions.
 * Users cannot add more than the specified number of tags or exceed character limits.
 */
export const WithLimits = {
  args: {
    maxTags: 5,
    maxLength: 20,
    withTagInputHelp: true,
    placeholder: "Max 5 tags, 20 chars each",
    tags: ["Short", "Medium length", "Long tag example"],
  },
};

/**
 * ## Allow Duplicates
 *
 * By default, duplicate tags are prevented. Enable `allowDuplicates` to allow
 * the same tag to be added multiple times.
 */
export const AllowDuplicates = {
  args: {
    allowDuplicates: true,
    tags: ["duplicate", "unique", "duplicate"],
    placeholder: "Duplicates allowed...",
    withTagInputHelp: true,
  },
};

/**
 * ## Disabled State
 *
 * When disabled, users cannot add, remove, or interact with tags.
 * The component maintains its visual appearance but becomes non-interactive.
 */
export const Disabled = {
  args: {
    disabled: true,
    tags: ["Read-only", "Disabled", "No interaction"],
    placeholder: "This input is disabled",
  },
};

/**
 * ## With Error Message
 *
 * Display validation errors below the component. Useful for form validation
 * and providing feedback when tag input doesn't meet requirements.
 */
export const WithError = {
  args: {
    tags: ["Invalid", "Tags"],
    errorMessage: "Please remove invalid tags before continuing",
    placeholder: "Fix errors above...",
    withTagInputHelp: true,
  },
};

/**
 * ## Custom Styling
 *
 * Customize the appearance of tags and input field using the `appearance` prop.
 * This example shows custom styling for a dark theme variant.
 */
export const CustomStyling = {
  args: {
    tags: ["Styled", "Custom", "Theme"],
    placeholder: "Custom styled input...",
    className: "bg-gray-50 p-4 rounded-lg",
    appearance: {
      tagClassName: "bg-blue-100 text-blue-800 border-blue-200",
      inputClassName: "text-blue-900 placeholder-blue-500",
    },
    withTagInputHelp: true,
  },
};

/**
 * ## Real-world Example: Skills Input
 *
 * A practical example showing how TagInput might be used in a job application
 * or profile form for entering skills and technologies.
 */
export const SkillsInput = {
  args: {
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    placeholder: "Add your skills (e.g., React, Python, Docker)...",
    maxTags: 15,
    maxLength: 30,
    withTagInputHelp: true,
    onTagsDuplicate: undefined, // Will show alert in real implementation
  },
};

/**
 * ## Edge Case: Long Content
 *
 * Test the component with long tag names and many tags to see how it handles
 * overflow and wrapping behavior.
 */
export const LongContent = {
  args: {
    tags: [
      "Very long technology name that might wrap",
      "Short",
      "Medium length tag",
      "Another extremely long tag name that demonstrates wrapping behavior",
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Angular",
      "Svelte",
    ],
    placeholder: "Add more tags...",
    withTagInputHelp: true,
    maxTags: 20,
  },
};

/**
 * ## Interactive Playground
 *
 * Experiment with all TagInput features and configurations.
 * Try different combinations of props to see how they interact.
 */
export const Playground = {
  args: {
    tags: ["Playground", "Interactive"],
    placeholder: "Experiment with settings...",
    maxTags: 10,
    maxLength: 25,
    allowDuplicates: false,
    disabled: false,
    withTagInputHelp: true,
    errorMessage: "",
    onTagsChange: undefined, // Will be handled by Storybook actions
    onTagsDuplicate: undefined, // Will be handled by Storybook actions
    appearance: {
      tagClassName: "",
      inputClassName: "",
    },
  },
};
