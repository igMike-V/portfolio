
import React, { useState } from "react"


const iconClass = 'h-5 w-5 text-light'


const DayIcon = () => (
  <svg className={iconClass} viewBox="0 0 20 20" fill="currentColor" stroke="none">
    <path transform="translate(5, 4)" d="M6.63923 0.214792C7.60111 1.27805 8.14263 2.732 7.99674 4.30958C7.76678 6.80453 5.77378 8.84203 3.28378 9.11898C2.17848 9.24261 1.13253 9.02749 0.232468 8.56756C0.098942 8.49833 -0.0469472 8.63433 0.0148703 8.7728C1.08308 11.1318 3.57308 12.7118 6.38948 12.425C9.20589 12.1381 11.7058 9.72479 11.9728 6.76991C12.277 3.4021 9.91555 0.521406 6.75792 -0.00033267C6.63675 -0.0201142 6.55763 0.123302 6.63923 0.214792Z" fill="white"/>
    <path transform="translate(5, 4)" d="M4.85643 3.33567C4.83665 3.33567 4.81687 3.32825 4.80203 3.31589L4.28771 2.91036L3.62008 3.04389C3.62008 3.04389 3.60772 3.04389 3.60278 3.04389C3.57063 3.04389 3.54096 3.02658 3.52612 2.99938C3.50634 2.96724 3.51129 2.9252 3.53601 2.89553L3.99346 2.37132L3.80801 1.72594C3.79812 1.68885 3.81296 1.64929 3.8451 1.62703C3.85994 1.61714 3.87725 1.6122 3.89455 1.6122C3.91434 1.6122 3.93412 1.61962 3.94895 1.63198L4.46327 2.0375L5.1309 1.90398C5.1309 1.90398 5.14327 1.90398 5.14821 1.90398C5.18036 1.90398 5.21003 1.92129 5.22486 1.94848C5.24465 1.98063 5.2397 2.02267 5.21497 2.05234L4.75753 2.57655L4.94298 3.22192C4.95287 3.25901 4.93803 3.29858 4.90589 3.32083C4.89105 3.33072 4.87374 3.33567 4.85643 3.33567Z" />
    <path transform="translate(5, 4)" d="M3.18487 6.46858C3.18487 6.46858 3.16509 6.4488 3.16014 6.43396L3.02662 5.98887L2.58648 5.796C2.58648 5.796 2.57906 5.79106 2.57659 5.79106C2.55928 5.7787 2.54691 5.75644 2.54939 5.73419C2.54939 5.70699 2.57164 5.68473 2.59637 5.67731L3.0736 5.55863L3.22691 5.10859C3.2368 5.08387 3.26152 5.06656 3.28872 5.06656C3.30109 5.06656 3.31345 5.0715 3.32334 5.07892C3.3357 5.08634 3.34312 5.0987 3.34807 5.11354L3.48159 5.55863L3.92173 5.7515C3.92173 5.7515 3.92915 5.75644 3.93162 5.75644C3.94893 5.76881 3.9613 5.79106 3.95882 5.81331C3.95882 5.84051 3.93657 5.86277 3.91184 5.87019L3.43461 5.98887L3.28131 6.43891C3.27141 6.46363 3.24669 6.48094 3.21949 6.48094C3.20712 6.48094 3.19476 6.476 3.18487 6.46858Z" />
    <path transform="translate(5, 4)" d="M1.68634 3.8401C1.68634 3.8401 1.66655 3.84999 1.65419 3.84999L1.27092 3.83515L1.0014 4.12941C1.0014 4.12941 0.996453 4.13435 0.99398 4.13682C0.979144 4.14671 0.959362 4.14919 0.942053 4.14177C0.922272 4.13188 0.909908 4.1121 0.909908 4.08984L0.944526 3.68432L0.632966 3.44199C0.615657 3.42716 0.608239 3.4049 0.615657 3.38265C0.61813 3.37276 0.625548 3.36534 0.632966 3.35792C0.642857 3.35051 0.652748 3.34803 0.665111 3.34803L1.04838 3.36287L1.3179 3.06862C1.3179 3.06862 1.32285 3.06367 1.32532 3.0612C1.34016 3.05131 1.35994 3.04884 1.37725 3.05625C1.39703 3.06614 1.40939 3.08593 1.40939 3.10818L1.37478 3.51618L1.68634 3.7585C1.70364 3.77334 1.71106 3.79559 1.70364 3.81784C1.70117 3.82774 1.69375 3.83515 1.68634 3.84257V3.8401Z" />
  </svg>
)

const NightIcon = () => (
  <svg className={iconClass} viewBox="0 0 20 20" fill="currentColor" stroke="none">
    <path transform="translate(2, 4)" d="M3.40068 2.54954L2.34295 1.48402L1.50682 2.32397L2.5675 3.3895L3.40068 2.54954ZM1.77273 5.90639H0V7.09361H1.77273V5.90639ZM7.09091 0H5.90909V1.75114H7.09091V0ZM11.4932 2.32397L10.657 1.48402L9.59636 2.54954L10.4325 3.3895L11.4932 2.32397ZM9.59932 10.4505L10.66 11.516L11.4961 10.676L10.4355 9.6105L9.59932 10.4505ZM11.2273 5.90639V7.09361H13V5.90639H11.2273ZM6.5 2.93836C4.54114 2.93836 2.95455 4.53219 2.95455 6.5C2.95455 8.46781 4.54114 10.0616 6.5 10.0616C8.45886 10.0616 10.0455 8.46781 10.0455 6.5C10.0455 4.53219 8.45886 2.93836 6.5 2.93836ZM5.90909 13H7.09091V11.2489H5.90909V13ZM1.50682 10.676L2.34295 11.516L3.40364 10.4505L2.5675 9.6105L1.50682 10.676Z" />
  </svg>
)

type ToggleButtonProps = {
  nightMode: boolean;
}



const ToggleButton = ({nightMode}: ToggleButtonProps) => {
  const [nightToggle, setNightToggle] = useState(nightMode)
 
  function toggle(){
   setNightToggle(!nightToggle)
  }
    return (
      <div className="flex justify-end items-center">
        <span className="flex justify-center items-center">
          <DayIcon />
        </span>
        <div onClick={toggle} className="cursor-pointer w-14 h-6 flex items-center bg-translight rounded-full mx-3 px-1 bg-dark">
          {
            nightToggle
            ? <div className="bg-dark w-5 h-5 rounded-full shadow-md transform translate-x7"></div>
            : <div className="bg-dark w-5 h-5 rounded-full shadow-md transform translate-x-7"></div>
          }
          
        </div>
        <span className="">
          <NightIcon />
        </span>
      </div>  
    )
}

export default ToggleButton