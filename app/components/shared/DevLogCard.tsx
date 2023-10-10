import { type Post } from 'payload/generated-types'
import { parseISO } from 'date-fns'
import { useNavigate } from '@remix-run/react'
import { type } from 'os'

type DevlogCardProps = {
  post: Post,
  styleOverrides?: DevLogStyleOverrides,
}

export type DevLogStyleOverrides = {
  image?: string,
  element?: string,
  wrapTitle?: boolean
}

export default function ProjectFeatureCard({ post, styleOverrides }: DevlogCardProps){
  const navigate = useNavigate()
  if (!post) return null
  let coverImageUrl = "https://dummyimage.com/600"
  if(typeof post.coverImage === 'object' && post.coverImage.url){
    coverImageUrl = post.coverImage.url
  }

  const date = parseISO(post.date)
  return (
    
    <article onClick={() => navigate(`/devlogs/${post.slug}`)}  className={`flex-wrap flex-grow cursor-pointer ${styleOverrides?.element || ''}`}>
       <h3 className="font-heading text-lg">
        <span>{post.title}</span>
        <span> - </span>
        <span className="text-aqua">{`${date.getDate()} ${date.toLocaleString('default', {month: 'long'})}, ${date.getFullYear()}`}</span>       
       </h3>
      <div
        className={`m-0 box-border h-80 rounded-md w-full ${styleOverrides?.image || ''}`}
        style={{
          backgroundImage: `url("${coverImageUrl}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
      </div>     
    </article>
  )
}