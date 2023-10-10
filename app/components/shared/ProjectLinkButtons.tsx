import type { Project } from "../../../cms/payload-types"
import { Link } from "@remix-run/react"
import { GrGithub } from "react-icons/gr"
import {styles} from '../../shared-styles'

type ProjectProps = {
  project: Project
  buttonLabel?: string
  wrapperStyles?: string
}
export default function ProjectLinkButtons({ project, buttonLabel, wrapperStyles }: ProjectProps): JSX.Element {
  return (
    <div className={`flex flex-wrap gap-2 ${wrapperStyles || ''}`}>
        <Link 
          to={`/projects/${project.slug}`}
          className={`text-light dark:text-dark bg-dark dark:bg-light leading-loose ${styles.button}`}
        >
          { buttonLabel || 'Read More' }
        </Link>
        {
          typeof project.projectLinks === 'object' &&
            project.projectLinks.map(projectLink => {
              const isGithub = projectLink.linkText.toLowerCase() === 'github'
              return (
                <a 
                  key={projectLink.linkText}
                  className={`${isGithub ? 'text-light dark:text-dark bg-dark dark:bg-light' : 'bg-aqua text-light' } m-0 ${styles.button} hover:scale-95`} 
                  href={projectLink.url} 
                  target="_blank"
                >
                  <div className="flex gap-1 p-0 m-0 items-center">
                    { isGithub && <GrGithub className="text-xl" />}
                    <span className="leading-loose">{ projectLink.linkText }</span>
                  </div>
                </a>
              )
          })
        }
      </div>
  )
}