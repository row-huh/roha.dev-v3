import ProjectDetailPageClient from "./ProjectDetailPageClient"
import { projectDetails } from "./projectDetails"


export async function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>  // params is a Promise in Next 14 async route
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  return <ProjectDetailPageClient slug={slug} />
}
