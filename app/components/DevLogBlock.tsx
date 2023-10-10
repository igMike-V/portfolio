import { type Post } from "payload/generated-types"
import { parseISO } from 'date-fns'
import { useNavigate } from "@remix-run/react"


type PostProps =  {
  post: Post;
}

export default function DevLogBlock({ post }: PostProps ) {
 
  const navigate = useNavigate()
  
  let coverImageUrl = "https://dummyimage.com/600"
  if(typeof post.coverImage === 'object' && post.coverImage.url){
    coverImageUrl = post.coverImage.url
  }

  
  function handleClick() {
    navigate(`/devlogs/${post.slug}`)
  }

  const date = parseISO(post.date)

  return (
    <article onClick={handleClick} className="flex flex-col pb-12 cursor-pointer">
      <div className="flex flex-row-reverse md:flex-row gap-3">

        <div className="flex flex-col justify-end items-start md:items-end pb-[.1em] sm:pb-0">
          <span className="font-heading tracking-tighter leading-none text-5xl">{date.getDate()}</span>
          <span className="font-heading leading-none text-[1.8em]">{date.toLocaleString('default', { month: 'short' })}</span>
          <span className="font-heading tracking-tighter leading-none text-[1.145em]">{date.getFullYear()}</span>
        </div>
        <div className="flex-grow">
          <h2 className="font-heading text-xl sm:text-2xl font-normal pb-2 text-dark dark:text-light m-0">{post.title}</h2>
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
        
      </div>
      <div className="flex gap-2 pt-1 md:pl-[3em] items-center">
           { 
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
                      className="h-6 w-6" 
                      key={tech.id}
                      src={tech.logo.sizes?.thumbnail?.url} 
                      width={50} 
                      height={50} 
                      alt={tech.name}/>;
           }) : null }
          </div>
    </article>
  )
}