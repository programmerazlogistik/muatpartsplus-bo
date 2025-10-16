import { RatingInput } from "@muatmuat/ui/Form";

/**
 * Rating Input component for user feedback and reviews
 *
 * The Rating Input component provides an intuitive star-based rating interface for collecting user feedback.
 * It supports hover states, accessibility features, and customizable labels with translation support.
 *
 * ## When to Use
 *
 * - User feedback forms and surveys
 * - Product/service reviews
 * - Rating systems in applications
 * - Any scenario requiring 1-5 star rating input
 *
 * ## Design System Category
 *
 * Data Entry / Form Components
 *
 * ## Prerequisites
 *
 * - Requires IconComponent for star icons
 * - useDevice hook for responsive behavior
 * - useTranslation hook for localized labels
 * - Tailwind CSS for styling
 */

// Use relative import since story is co-located with component
export default {
  title: "Form/RatingInput",
  component: RatingInput,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable star rating input component with hover effects, accessibility support, and translation-ready labels.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 5 },
      description: "Current rating value (0-5)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the rating input is disabled",
    },
    withLabel: {
      control: "boolean",
      description: "Whether to show the rating label text",
    },
    onChange: {
      action: "rating changed",
      description: "Callback function called when rating changes",
    },
  },
};

/**
 * Default Rating Input
 *
 * Basic usage with default settings
 */
export const Default = {
  args: {
    value: 0,
    disabled: false,
    withLabel: true,
  },
};

/**
 * With Initial Rating
 *
 * Rating input with a pre-selected value
 */
export const WithRating = {
  args: {
    value: 4,
    disabled: false,
    withLabel: true,
  },
};

/**
 * Disabled State
 *
 * Rating input in disabled state
 */
export const Disabled = {
  args: {
    value: 3,
    disabled: true,
    withLabel: true,
  },
};

/**
 * Without Label
 *
 * Rating input without the descriptive label
 */
export const WithoutLabel = {
  args: {
    value: 2,
    disabled: false,
    withLabel: false,
  },
};

/**
 * Interactive Playground
 *
 * Fully interactive story for testing different configurations
 */
export const Playground = {
  args: {
    value: 0,
    disabled: false,
    withLabel: true,
  },
};

/**
 * Rating States Showcase
 *
 * Demonstrates all possible rating values
 */
export const RatingStates = () => (
  <div className="space-y-4">
    {[0, 1, 2, 3, 4, 5].map((rating) => (
      <div key={rating} className="flex items-center gap-4">
        <span className="w-8 text-sm font-medium">{rating}</span>
        <RatingInput value={rating} disabled withLabel />
      </div>
    ))}
  </div>
);
