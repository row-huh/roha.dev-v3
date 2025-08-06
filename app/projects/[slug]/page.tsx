import ProjectDetailPageClient from "./ProjectDetailPageClient"
import { projectDetails } from "./projectDetails"

// Function to generate static params for SSG
export async function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({
    slug: slug,
  }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  return <ProjectDetailPageClient slug={params.slug} />
}
