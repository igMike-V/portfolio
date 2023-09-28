export default function Hamburger({isOpen}: {isOpen: boolean}) {
  return (
    <div className="flex first-letter:items-center">
      {isOpen ? <img className="pt-1 h-8 flex justify-end items-center" src="/icons/rocket_hamburger_open.svg" alt="Close Menu" /> : <img className="h-8  flex justify-end items-center" src="/icons/rocket_hamburger_closed.svg" alt="Open Menu" />}
    </div>
  )
}