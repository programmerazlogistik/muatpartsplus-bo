import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { source } from "@/lib/source";

import { baseOptions } from "@/app/layout.config";

export default function Layout({ children }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
