import type { LoaderFunctionArgs } from "@remix-run/node";
import type { Post } from "../../cms/payload-types"
import type { DevLogStyleOverrides } from "~/components/shared/DevLogCard";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { Outlet } from "@remix-run/react";
import DevLogCards from "~/components/shared/DevLogCards";

export const loader = async ({ context: { payload }}: LoaderFunctionArgs) => {
  const posts = await payload.find({
    collection: 'posts',
    limit: 6,
  })
  return posts ? json({posts: posts.docs}) : [] 
}

type LoaderData = {
  posts: Post[]
}

const childStyleOverrides: DevLogStyleOverrides = {
  image: 'h-28',
  element: 'pb-4',
  wrapTitle: true,
}

export default function DevLogs() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col md:flex-row-reverse md:justify-end gap-12">
      <section className='flex flex-col gap-5 flex-grow'>
        <Outlet />
      </section>
      <section className="basis-1/4 min-w-[33%] bg-[#a5a5a512] p-5">
        <h3 className="text-aqua font-heading text-3xl">More dev logs</h3>
        <div className="pt-4">
          {
          posts.length > 0 && 
          <DevLogCards childStyleOverrides={childStyleOverrides} devlogs={posts} />
          }
        </div>
      </section>
    </div>    
  )
}