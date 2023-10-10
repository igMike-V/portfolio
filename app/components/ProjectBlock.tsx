import { type Project } from "payload/generated-types"
import TechLogos from "./TechLogos"
import ProjectLinkButtons from "./shared/ProjectLinkButtons"

type ProjectProps =  {
  project: Project;
}


export default function ProjectBlock({ project }: ProjectProps ) {
  let coverImageUrl = "https://dummyimage.com/600"
  if(typeof project.coverImage === 'object' && project.coverImage.url){
    coverImageUrl = project.coverImage.url
  }

  return (
    <article className="flex gap-2 flex-col pb-12">
      <div className="flex flex-col sm:flex-row sm:gap-3 md:items-center">
        <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark dark:text-light m-0">{project.title}</h2>
        <TechLogos technologies={project.technologies} />
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
      <p className="font-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lobortis nisi. Ut vestibulum commodo lacus, vel congue ipsum iaculis in. Integer
      </p>
      <ProjectLinkButtons project={project} />
    </article>
  )
}