import SocialIcon from "./SocialIcon"
import ToggleButton from "./ToggleButton"


export default function Header() {
 
  return (
    <header className="bg-dark dark:bg-aqua md:px-4 md:py-5 flex flex-col md:flex-row md:items-center fixed md:bottom-0 min-w-full justify-between">
      <div className="p-2 md:px-0 md:py-0" >
        <h1 className="font-heading leading-none font-normal text-[1em] sm:text-[1.5em]">
          <span className="flex flex-col sm:flex-row sm:gap-2">
            <span className="text-light">Mike Vautour</span>
            <span className="flex">
              <span className=" text-aqua">DevLog</span>
              <span className="text-light">&</span>
              <span className="text-aqua">Project Sandbox</span>
            </span>
          </span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-5 text-light font-text text-sm justify-end md:border-none border-solid border-t-4 border-aqua">
        <nav>
          <ul className="list-none md:items-center flex gap-6 flex-col md:flex-row">
            <li>allProjects<span className="text-aqua">: [Project]</span></li>
            <li>devLogs<span className="text-aqua">: [BlogPost]</span></li>
            <li>myStatus<span className="text-aqua">: Resume</span></li>
          </ul>
        </nav>
        <ul className="flex justify-center items-center gap-6 md:gap-4 list-none">
          <li><SocialIcon href="#" target="_blank" icon="github" /></li>
          <li><SocialIcon href="#" target="_blank" icon="linkedin" /></li>
          <li><SocialIcon href="#" target="_blank" icon="twitter"/></li>
          <li><SocialIcon href="#" target="_blank" icon="youtube" /></li>
        </ul>
        <div className="theme switch">
            <ToggleButton />
        </div>
      </div>
     
    </header>
  )
}