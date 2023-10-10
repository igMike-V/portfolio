import type { 
  LoaderFunctionArgs 
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/server-runtime"

import type {  Project } from "payload/generated-types"

import TechLogos from "~/components/TechLogos"
import ProjectFeatureCard from "~/components/ProjectFeatureCard"
import ContentComponent,  { type ContentNode } from "~/components/shared/ContentComponent"

import ClientOnly from "~/components/shared/ClientOnly"
import ProjectLinkButtons from "~/components/shared/ProjectLinkButtons"
import DevLogCards from "~/components/shared/DevLogCards"


export const loader = async ({ params, context: { payload } }:LoaderFunctionArgs) => {
  const project = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: params.slug
      }
    },
    limit: 1
  })
  let devLogs
  if(project.docs[0]){
    devLogs = await payload.find({
      collection: 'posts',
      where: {
        project: {
          equals: project.docs[0].id,
        }
      }
    })
  }

  return json({project: project.docs[0], devlogs: devLogs?.docs ||  []})
}

export default function Project() {
  
  const { project, devlogs } = useLoaderData<typeof loader>();
  let coverImageUrl = "https://dummyimage.com/600"
  if(typeof project?.coverImage === 'object' && project.coverImage.url){
    coverImageUrl = project?.coverImage.url
  }

  const description: ContentNode[] = project?.description as ContentNode[] || []

  return (
    <main className="flex flex-col sm:gap-2 pb-11">
      <div className="flex sm:items-center flex-col sm:flex-row sm:gap-6">
        <h1 className="font-heading font-normal text-[3em] sm:text-[3em] text-aqua mt-0 p-0">
          {project?.title}
        </h1>
        <div className="flex items-center flex-row gap-2 pb-3 sm:pb-0">
          { project && <ProjectLinkButtons project={project} /> }
          <TechLogos technologies={project?.technologies} />
        </div>
      </div>
      <div
        className="m-0 box-border h-80 rounded-md"
        style={{
          backgroundImage: `url("${coverImageUrl}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom'
        }}>

      </div>
      <div><ClientOnly>{() => <ContentComponent content={description} />}</ClientOnly></div>
      <div className="content"></div>
      { project?.features && 
        <section className="py-6">
          <h2 className="features font-heading text-4xl text-aqua py-4">Project Features</h2>
          <div className="flex flex-wrap justify-between gap-2">
            {project.features.map(feature => <ProjectFeatureCard key={feature.id} feature={feature} />)}
          </div>
          </section>
      }
      {
        devlogs.length > 0 &&
        <section className="py-6">
          <h2 className="features font-heading text-4xl text-aqua py-4">Developement Updates (DevLogs)</h2>
          <div className="flex flex-wrap justify-between gap-2">
            <DevLogCards devlogs={devlogs} />
          </div>
        </section>
      }
      
    </main>
  )
}
