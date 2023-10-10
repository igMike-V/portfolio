import  { useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import  type { Post, Project } from '../../cms/payload-types'
import { parseISO } from 'date-fns'

import ClientOnly from "~/components/shared/ClientOnly"
import ContentComponent, { type ContentNode } from '~/components/shared/ContentComponent'
import ProjectLinkButtons from '~/components/shared/ProjectLinkButtons'
import DevLogCards from '~/components/shared/DevLogCards'

//connectedPosts needs to be added to LoaderData

export const loader = async ({ params, context: { payload }}: LoaderFunctionArgs) => {
  const post = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  // query: 
  let connectedPosts = undefined
  if(post && post.docs && post.docs[0] && post.docs[0].project){
    const connectedPostsQuery = await payload.find({
      collection: 'posts',
      where: {
        project: {
          equals: (post.docs[0].project as Project).id,
        },
        slug: {
          not_equals: params.slug,
        },
      },
    })
    if(connectedPostsQuery && connectedPostsQuery.docs){
      connectedPosts = connectedPostsQuery.docs
    }
  }

  return json({post: post.docs[0], connectedPosts})
}

type LoaderData = {
  post: Post
  connectedPosts?: Post[]
}

export default function DevLog(){
  const { post, connectedPosts } = useLoaderData<LoaderData>()
  if(!post) return (<div>loading...</div>)

  const project: Project | undefined = post.project as Project
  const content: ContentNode[] = post.content as ContentNode[] || []
  
  let coverImageUrl = "https://dummyimage.com/600"
  if(typeof post.coverImage === 'object' && post.coverImage.url){
    coverImageUrl = post.coverImage.url
  }

  const date = parseISO(post.date)
  return (
      <article className='flex flex-col gap-5 flex-grow'>
        <div className="post--header">
          <div className="post--title flex flex-row items-center gap-5">
            <h2 className="font-heading text-aqua text-5xl">{post.title}</h2>
            <div className="post--logos flex flex-row items-center gap-2">
              {post.technologies &&
                  //TODO refactor this to a component
                  ( typeof post.technologies === 'object' && post.technologies.length > 0 ) ?
                  post.technologies.map((tech) => {
                    if (typeof tech === 'string') {
                      return null;
                    }
                    if (typeof tech.logo === 'string' || tech.logo === undefined){
                     return null
                    }
                    return <img 
                             className="h-9 w-9" 
                             key={tech.id}
                             src={tech.logo.sizes?.thumbnail?.url} 
                             width={50} 
                             height={50} 
                             alt={tech.name}/>;
                  }) : null 
                }
            </div>
          </div>
          <p className="mt-[-.2em] pl-[2px]">
            <span className="font-text text-lg">{`${date.toLocaleString('default', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`}</span>       
          </p>
        </div>
        <div className="post--image flex-grow pt-3">
          <div
            className="m-0 rounded-md h-24 sm:h-52 md:h-72"
            style={{
              backgroundImage: `url("${coverImageUrl}")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom'
            }}>
          </div>
        </div>
        <div className="post--body">
          <ClientOnly>{() => <ContentComponent content={content} />}</ClientOnly>
        </div>
        { project && 
        <div className="post--project-connection py-9 flex justify-start lgfix:gap-4 flex-col lgfix:flex-row  lgfix:items-center">
          <h3 className="font-heading text-[2.5rem] text-aqua">More about: {project.title}</h3>
          <ProjectLinkButtons project={project} buttonLabel="Project Page" wrapperStyles="flex-row-reverse justify-end" /> 
        </div>
        }
        { connectedPosts &&
        <div className="post--connected-posts">
          <DevLogCards devlogs={connectedPosts} />
        </div>
        }
      </article>  
  )
}