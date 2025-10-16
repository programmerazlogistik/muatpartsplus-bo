import { DocsPage } from "fumadocs-ui/page";

import { source } from "@/lib/source";

export default function Page() {
  return <DocsPage tree={source.pageTree} />;
}
