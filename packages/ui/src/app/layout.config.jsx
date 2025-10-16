/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.jsx
 * Docs Layout: app/docs/layout.jsx
 */
export const baseOptions = {
  nav: {
    // can be JSX too!
    title: "Muatrans UI",
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
  ],
};
