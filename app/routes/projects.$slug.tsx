import type { 
  LoaderFunctionArgs 
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/server-runtime"



import TechLogos from "~/components/TechLogos"
import ProjectFeatureCard from "~/components/ProjectFeatureCard"
import ContentComponent from "~/components/shared/ContentComponent"
import type {
  LexicalRootNode,
  ExtendedProject
} from "~/types"

import ClientOnly from "~/components/shared/ClientOnly"
import ProjectLinkButtons from "~/components/shared/ProjectLinkButtons"
import DevLogCards from "~/components/shared/DevLogCards"



export const loader = async ({ params, context: { payload } }:LoaderFunctionArgs) => {
  const projectLoader = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: params.slug
      }
    },
    limit: 1
  })
  let devLogs
  let project = {} as ExtendedProject
  if(projectLoader.docs[0]){
    project = projectLoader.docs[0] as ExtendedProject
    devLogs = await payload.find({
      collection: 'posts',
      where: {
        project: {
          equals: project.id,
        }
      }
    })
  }

  return json({project: project, devlogs: devLogs?.docs ||  []})
}

export default function Project() {
  
  const { project, devlogs } = useLoaderData<typeof loader>();
  let coverImageUrl = "https://dummyimage.com/600"
  if(typeof project?.coverImage === 'object' && project.coverImage.url){
    coverImageUrl = project?.coverImage.url
  }

  const description = project?.description?.root
  const content = project?.content?.root

  return (
    <main className="flex flex-col sm:gap-2 pb-11">
      <div className="flex sm:items-center flex-col sm:flex-row sm:gap-6">
        <h1 className="font-heading font-normal text-[3em] sm:text-[3em] text-aqua mt-0 p-0">
          {project?.title}
        </h1>
        <div className="flex flex-col sm:items-center sm:flex-row gap-3 pb-3 sm:pb-0">
          { project && <ProjectLinkButtons project={project} readMore={false} /> }
          <TechLogos technologies={project?.technologies} />
        </div>
      </div>
      <div className="py-5"><ClientOnly>{() => <ContentComponent content={description as LexicalRootNode} />}</ClientOnly></div>
      <div
        className="m-0 box-border h-80 rounded-mdv"
        style={{
          backgroundImage: `url("${coverImageUrl}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top'
        }}>

      </div>
      <div className="py-5"><ClientOnly>{() => <ContentComponent content={content as LexicalRootNode} />}</ClientOnly></div>
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
