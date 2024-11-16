import React from 'react'
import { VscCompass } from "react-icons/vsc";

function AuthNavbar() {
  return (
    <nav className="bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender border-secondary-purpleDark border-b fixed w-full top-0 left-0 z-50 p-4">
  <div className="flex justify-start items-center text-secondary-purpleDark text-3xl pl-10">
    <VscCompass />
    <p className="ml-2 font-audiowide font-bold">TripMate</p>

    

    
  </div>
</nav>

  )
}

export default AuthNavbar