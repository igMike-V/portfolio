import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

import DevLogBlock from "../components/DevLogBlock";
import ProjectBlock from "../components/ProjectBlock";
import { styles } from "../shared-styles"

export const loader = async ({ context: { payload } }: LoaderFunctionArgs) => {
  const projects = await payload.find({
    collection: "projects",
    where: {
      agencyProject: {
        not_equals: true
      }
    }
  })

  const posts = await payload.find({
    collection: "posts"
  })

  return json({ posts: posts.docs, projects: projects.docs }, { status: 200 });
};

export default function Index() {
  const { posts, projects } = useLoaderData<typeof loader>();
  console.log(projects)
  return (
    <main className="flex flex-col sm:gap-[4em] md:flex-row pb-11">
      <section className="basis-7/12 pb-16">
        <h2 className="font-heading font-normal text-4xl sm:text-[2.5em] text-aqua mt-0 p-0 pb-4">Featured Projects</h2>
        { projects.length > 0 && projects.map(project => <ProjectBlock project={project} key={project.id}  />)}
        <Link 
          to={`/projects`}
          className={`text-light dark:text-dark bg-aqua leading-loose py-3 ${styles.button} text-lg`}
        >
          More Projects
        </Link>
      </section>
      <section className="basis-5/12">
        <h2 className="font-heading font-normal text-4xl sm:text-[2.5em] md:pl-[.78em] text-aqua mt-0 p-0 pb-4">DevLog Updates</h2>
        { posts.length > 0 && posts.map((post) => <DevLogBlock post={post} key={post.id} />) }
        <Link 
          to={`/devlogs`}
          className={`text-light dark:text-dark bg-aqua leading-loose py-3 ${styles.button} text-lg`}
        >
          More DevLogs
        </Link>
      </section>
    </main>
  );
}
