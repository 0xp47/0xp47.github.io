import type { Metadata } from "next";
import { ProjectsPageClient } from "./projects-page-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "A complete showcase of all projects built by Jay Patrick Cano (0xp47).",
  alternates: {
    canonical: "/projects",
  },
};

export default function Page() {
  return <ProjectsPageClient />;
}
