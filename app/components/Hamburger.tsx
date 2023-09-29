export default function Hamburger({isOpen}: {isOpen: boolean}) {
  return (
    <div className="flex first-letter:items-center">
      {isOpen
      ? <img className="flex h-8 justify-end items-center" src="/icons/hamburger_open.png" alt="Close Menu" /> 
      : <img className="flex h-8 justify-end items-center" src="/icons/hamburger_closed.png" alt="Open Menu" />}
    </div>
  )
}