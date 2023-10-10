import type { Project, Post } from "payload/generated-types";

type TechLogoProps = {
  technologies: Project['technologies'] | Post['technologies']
}

export default function TechLogos({technologies}: TechLogoProps) {
  return (
    <div className="flex gap-2 items-center">
           { ( typeof technologies === 'object' && technologies.length > 0 ) ?
           technologies.map((tech) => {
             if (typeof tech === 'string') {
               return null;
             }
             if (typeof tech.logo === 'string' || tech.logo === undefined){
              return null
             }
             return <img 
                      className="h-6 w-6" 
                      key={tech.id}
                      src={tech.logo.sizes?.thumbnail?.url} 
                      width={50} 
                      height={50} 
                      alt={tech.name}/>;
           }) : null }
          </div>
  )
}