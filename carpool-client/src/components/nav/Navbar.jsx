import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logout from "@/components/Logout";
import { AuthContext } from "@/context/AuthContext";
import logo from "@/assets/logo.png";
import { VscCompass } from "react-icons/vsc";
import { LiaUserCircle } from "react-icons/lia";



function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    // <nav className="bg-white/60 backdrop-blur-md fixed w-full top-0 left-0 z-50 p-4">
    <nav className="bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender border-secondary-purpleDark border-b fixed w-full top-0 left-0 z-50 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex justify-center items-center text-secondary-purpleDark text-3xl">

          <VscCompass/>

        <Link to="/" className="ml-2 font-bold font-audiowide">
          TripMate
        </Link>

        </div>
        

        {user ? (
          <div>
            <Link to="/" className="mr-6  text-secondary-purpleDark/90 text-lg font-semibold">
              Home
            </Link>
            <Link to="/addride" className="mr-6  text-secondary-purpleDark/90 text-lg font-semibold">
              Add Ride
            </Link>
            <Link to="/searchride" className="mr-6  text-secondary-purpleDark/90 text-lg font-semibold">
              Search Ride
            </Link>
            <Logout />
            <Link to="/profile" className="mr-6 ml-4  text-secondary-purpleDark/90 text-lg font-semibold">
              <LiaUserCircle className="inline text-2xl font-bold"/>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login" className="mr-6 text-secondary-purpleDark/90 text-md font-bold">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
