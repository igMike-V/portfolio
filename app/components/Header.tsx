import {useState} from "react"
import SocialIcon from "./SocialIcon"
import ToggleButton from "./ToggleButton"
import Hamburger from "./Hamburger"


export default function Header() {
  const [ isOpen, setIsOpen ] = useState(false)

  function openHamburger() {
    setIsOpen(!isOpen)
  }
 
  return (
    <header className="bg-dark dark:bg-aqua md:px-4 md:py-5 flex flex-col md:flex-row md:items-center fixed md:bottom-0 min-w-full justify-between">
      <div className="flex justify-between md:flex md:items-center md:gap-1 p-2 md:px-0 md:py-0" >
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
        <img className="hidden md:block" src="/icons/rocket.svg" alt="hero" />
        <div onClick={openHamburger} className="md:hidden cursor-pointer">
          <Hamburger isOpen={isOpen} />
        </div>
      </div>
      <div className={`${isOpen? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-5 text-light font-text text-sm justify-end md:border-none border-solid border-t-4 border-aqua transition-all duration-300 `}>
        <nav>
          <ul className="list-none md:items-center px-6 md:p-1 flex md:gap-6 flex-col md:flex-row">
            <li className="py-6 md:p-0 md:border-none border-b-[1px] border-[#3F3F3F] border-solid">devLogs<span className="text-aqua">: [BlogPost]</span></li>
            <li className="py-6 md:p-0 md:border-none border-b-[1px] border-[#3F3F3F] border-solid">allProjects<span className="text-aqua">: [Project]</span></li>
            <li className="py-6 md:p-0 md:border-none border-b-[1px] border-[#3F3F3F] border-solid">myStatus<span className="text-aqua">: Resume</span></li>
          </ul>
        </nav>
        <ul className="flex justify-center items-center gap-6 pt-2 pb-6 md:p-0 md:gap-4 list-none md:border-none border-b-[1px] border-[#3F3F3F] border-solid">
          <li><SocialIcon href="#" target="_blank" icon="linkedin" /></li>
          <li><SocialIcon href="#" target="_blank" icon="twitter"/></li>
          <li><SocialIcon href="#" target="_blank" icon="github" /></li>
          <li><SocialIcon href="#" target="_blank" icon="youtube" /></li>
        </ul>
        <div className="theme flex justify-center pt-2 pb-6 md:p-0 items-center">
            <ToggleButton />
        </div>
      </div>
    </header>
  )
}