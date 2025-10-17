import { BannerCarousel } from "@muatmuat/ui/BannerCarousel";

// Sample banner data for stories
const sampleBanners = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=250&fit=crop&crop=center",
    altText: "Mountain landscape banner showcasing beautiful peaks",
    linkUrl: "https://example.com/mountain",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1000&h=250&fit=crop&crop=center",
    altText: "Ocean view banner with crystal clear waters",
    linkUrl: "https://example.com/ocean",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&h=250&fit=crop&crop=center",
    altText: "Forest path banner with lush greenery",
    linkUrl: "https://example.com/forest",
  },
];

const promotionalBanners = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&h=250&fit=crop&crop=center",
    altText: "Summer Sale - Up to 50% Off",
    linkUrl: "https://example.com/summer-sale",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&h=250&fit=crop&crop=center",
    altText: "New Product Launch - Revolutionary Technology",
    linkUrl: "https://example.com/new-product",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&h=250&fit=crop&crop=center",
    altText: "Free Shipping on Orders Over $100",
    linkUrl: "https://example.com/free-shipping",
  },
];

export default {
  title: "Components/BannerCarousel",
  component: BannerCarousel,
  parameters: {
    docs: {
      description: {
        component: `
# 🎠 BannerCarousel

A responsive, accessible banner carousel component designed for showcasing featured content, promotions, or hero banners. Built with smooth transitions, hover controls, and flexible configuration options.

## When to Use

- **Hero sections** on landing pages
- **Promotional banners** for marketing campaigns  
- **Featured content** highlights
- **Product showcases** with multiple images
- **News or announcement** carousels

## Key Features

- 📱 **Responsive design** - Adapts from mobile (146px) to desktop (250px) heights
- ♿ **Accessibility-first** - ARIA labels, keyboard navigation support
- 🎨 **Smooth animations** - CSS transitions with 500ms duration
- ⏯️ **Smart autoplay** - Pauses on hover, resumes on mouse leave
- 🎯 **Navigation controls** - Previous/next arrows with hover visibility
- 📍 **Dot indicators** - Visual progress indicators
- 🔗 **Clickable banners** - Each banner can link to different destinations
- 🖼️ **Optimized images** - object-cover for consistent aspect ratios

## Import

\`\`\`javascript
import { BannerCarousel } from "@muatmuat/ui/BannerCarousel";
// or
import { BannerCarousel } from "@muatmuat/ui/BannerCarousel";
\`\`\`

## Basic Usage

\`\`\`jsx
const banners = [
  {
    id: 1,
    imageUrl: "https://example.com/banner1.jpg",
    altText: "Summer Sale - Up to 50% Off",
    linkUrl: "https://example.com/sale",
  },
  // ... more banners
];

<BannerCarousel 
  banners={banners}
  autoplaySpeed={5000}
  showControls={true}
  showIndicators={true}
/>
\`\`\`
        `,
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    banners: {
      description: "Array of banner objects containing image data and metadata",
      control: { type: "object" },
      table: {
        type: {
          summary: "BannerCarouselItem[]",
          detail: `interface BannerCarouselItem {
  id: string | number;
  imageUrl: string;
  altText?: string;
  linkUrl: string;
}`,
        },
      },
    },
    autoplaySpeed: {
      description:
        "Time in milliseconds between automatic slide transitions. Set to 0 to disable autoplay.",
      control: { type: "number", min: 0, max: 10000, step: 500 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "5000" },
      },
    },
    showControls: {
      description:
        "Whether to show navigation arrow controls. Controls appear on hover for better UX.",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    showIndicators: {
      description:
        "Whether to show dot indicators for slide navigation and progress tracking.",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export const Default = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 5000,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard banner carousel with all features enabled. Autoplay cycles through banners every 5 seconds, pausing on hover.",
      },
    },
  },
};

// ============================================================================
// Interaction States
// ============================================================================

export const FastAutoplay = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 2000,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Faster autoplay for high-engagement content. Useful for promotional banners where quick cycling is desired.",
      },
    },
  },
};

export const SlowAutoplay = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 8000,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Slower autoplay for content that needs more reading time. Good for text-heavy banners or detailed promotions.",
      },
    },
  },
};

export const NoAutoplay = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 0,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Manual navigation only. Users control the carousel entirely through arrow controls or dot indicators.",
      },
    },
  },
};

// ============================================================================
// UI Variants
// ============================================================================

export const NoControls = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 3000,
    showControls: false,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simplified carousel without navigation arrows. Users can still navigate using dot indicators.",
      },
    },
  },
};

export const NoIndicators = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 4000,
    showControls: true,
    showIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Clean carousel without dot indicators. Navigation is available through arrow controls only.",
      },
    },
  },
};

export const MinimalCarousel = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 5000,
    showControls: false,
    showIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Ultra-minimal carousel with autoplay only. Perfect for ambient background content or passive advertising.",
      },
    },
  },
};

// ============================================================================
// Content Variations
// ============================================================================

export const SingleBanner = {
  args: {
    banners: [sampleBanners[0]],
    autoplaySpeed: 0,
    showControls: false,
    showIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single banner display. When only one banner is provided, controls and indicators are automatically hidden.",
      },
    },
  },
};

export const TwoBanners = {
  args: {
    banners: sampleBanners.slice(0, 2),
    autoplaySpeed: 4000,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Two-banner carousel. Minimal content with simple back-and-forth navigation.",
      },
    },
  },
};

export const ManyBanners = {
  args: {
    banners: [
      ...sampleBanners,
      {
        id: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1000&h=250&fit=crop&crop=center",
        altText: "City skyline banner with modern architecture",
        linkUrl: "https://example.com/city",
      },
      {
        id: 5,
        imageUrl:
          "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1000&h=250&fit=crop&crop=center",
        altText: "Desert landscape banner with golden dunes",
        linkUrl: "https://example.com/desert",
      },
      {
        id: 6,
        imageUrl:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1000&h=250&fit=crop&crop=center",
        altText: "Tropical beach banner with palm trees",
        linkUrl: "https://example.com/beach",
      },
    ],
    autoplaySpeed: 3000,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple banners showcase. Tests indicator overflow and navigation with many slides.",
      },
    },
  },
};

// ============================================================================
// Real-world Examples
// ============================================================================

export const PromotionalBanners = {
  args: {
    banners: promotionalBanners,
    autoplaySpeed: 4000,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "E-commerce promotional banners. Realistic example with sales messaging and marketing content.",
      },
    },
  },
};

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground = {
  args: {
    banners: sampleBanners,
    autoplaySpeed: 5000,
    showControls: true,
    showIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to experiment with all BannerCarousel options. Try different combinations of settings to see how they affect the carousel behavior.",
      },
    },
  },
};
