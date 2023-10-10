import {useState} from "react"
import SocialIcon from "./SocialIcon"
import ToggleButton from "./ToggleButton"
import Hamburger from "./Hamburger"
import { Link, useNavigate } from "@remix-run/react"


export default function Header() {
  const [ isOpen, setIsOpen ] = useState(false)
  const navigate = useNavigate()

  function toggleHamburger() {
    setIsOpen(!isOpen)
  }

  function closeHamburger() {
    setIsOpen(false)
  }
 
  return (
    <header>
      <div className="bg-dark dark:bg-aqua lg:px-4 lg:py-5 flex flex-col lg:flex-row lg:items-center fixed lg:bottom-0 min-w-full justify-between z-10">
        <div className="flex justify-between lg:justify-start lg:items-center lg:gap-1 p-2 lg:px-0 lg:py-0" >
          <h1 onClick={() => navigate('/')} className="font-heading leading-none font-normal antialiased text-[1em] sm:text-[1.5em] cursor-pointer">
            <span className="flex flex-col flex-wrap sm:flex-row">
              <span className="text-light dark:text-dark pr-2">Mike Vautour</span>
              <span className="flex">
                <span className=" text-aqua dark:text-light">DevLog</span>
                <span className="text-light dark:text-dark">&</span>
                <span className="text-aqua dark:text-light">Project Sandbox</span>
              </span>
            </span>
          </h1>
          <img className="hidden lgfix:block" src="/icons/rocket.svg" alt="rocket logo" />
          <div onClick={toggleHamburger} className="lg:hidden cursor-pointer">
            <Hamburger isOpen={isOpen} />
          </div>
        </div>
        <div>
          <div className={`${isOpen? 'flex' : 'hidden'} lg:flex flex-col justify-start lg:flex-row lg:items-center gap-5 text-light font-text text-sm  lg:border-none border-solid border-t-4 border-aqua transition-all duration-300`}>
            <nav>
              <ul className="list-none lg:items-center px-6 lg:p-1 flex lg:gap-6 flex-col lg:flex-row">
                <Link to='/devlogs'><li className="py-6 lg:p-0 lg:border-none border-b-[1px] leading-4 border-[#3F3F3F] dark:border-[#0F9BA3] border-solid">devLogs<span className="text-aqua dark:text-dark dark:font-bold">: [BlogPost]</span></li></Link>
                <Link to='/projects'><li className="py-6 lg:p-0 lg:border-none border-b-[1px] leading-4 border-[#3F3F3F] dark:border-[#0F9BA3] border-solid">allProjects<span className="text-aqua dark:text-dark dark:font-bold">: [Project]</span></li></Link>
                <a href="/docs/Mike_Vautour_Resume.pdf"><li className="py-6 lg:p-0 lg:border-none border-b-[1px] leading-4 border-[#3F3F3F] dark:border-[#0F9BA3] border-solid">myStatus<span className="text-aqua dark:text-dark dark:font-bold">: Resume</span></li></a>
              </ul>
            </nav>
            <ul className="flex justify-center items-center gap-6 pt-2 pb-6 lg:p-0 lg:gap-4 list-none lg:border-none border-b-[1px] border-[#3F3F3F] dark:border-[#0F9BA3] border-solid">
              <li><SocialIcon href="https://www.linkedin.com/in/mikevautour/" target="_blank" icon="linkedin" /></li>
              <li><SocialIcon href="https://twitter.com/iglab_dev" target="_blank" icon="twitter"/></li>
              <li><SocialIcon href="https://github.com/igMike-V" target="_blank" icon="github" /></li>
              <li><SocialIcon href="https://www.youtube.com/@intergalacticlab" target="_blank" icon="youtube" /></li>
            </ul>
            <div className="theme flex justify-center pt-2 pb-6 lg:p-0 items-center">
                <ToggleButton />
            </div>
          </div>
        </div>
      </div>
      {isOpen && 
      <div onTouchStart={closeHamburger} className={`h-screen fixed w-screen bg-darkoverlay transition-opacity opacity-0 ${isOpen && 'opacity-100'}`}></div>
      }
    </header>
  )
}