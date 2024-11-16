import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/nav/Navbar";

import img2 from "../assets/directions2.png";
import img3 from "../assets/directions3.png";
import img4 from "../assets/directions4.png";

function Home() {
  return (
    
    <div className="min-h-screen w-full bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender text-contrast-darkBlue flex flex-col items-center justify-around ">
      <div id="home-1" className="h-[100vh] flex pt-40">
        <div className="w-[50%] h-[80%] flex items-center justify-center">
          <img src={img2} alt="" srcset="" width={"70%"} />
        </div>
        <div className="w-[50%] h-[80%] flex flex-col items-center justify-center p-16">
          <h1 className="font-bold text-5xl mb-10 text-secondary-purpleDark font-playwrite">
          Ride Together, Save More
          </h1>
          
          <p className="text-lg font-semibold text-center text-secondary-purpleDark/90">
          TripMate isn’t just convenient, it’s a way to connect with others on your route while saving on travel costs. Share your ride, reduce your carbon footprint, and discover how much more affordable travel can be!
          </p>
        </div>
      </div>
      <div id="home-2" className="h-[100vh] flex pt-40">
      <div className="w-[50%] h-[80%] flex flex-col items-center justify-center p-20">
          <h1 className="font-bold text-5xl mb-10 text-secondary-purpleDark  font-playwrite">
          Find Rides Anytime, Anywhere
          </h1>
          
          <p className="text-lg font-semibold text-left text-secondary-purpleDark/90">
          We make finding and booking rides simple and accessible from wherever you are. Whether it’s a daily commute or a weekend getaway, our platform connects you to trusted drivers and fellow passengers instantly.
          </p>
        </div>
        <div className="w-[50%] h-[80%] flex items-center justify-center">
          <img src={img3} alt="" srcset="" width={"70%"} />
        </div>

      </div>
      <div id="home-3"  className="h-[100vh] flex pt-40">
      <div className="w-[50%] h-[80%] flex items-center justify-center">
          <img src={img4} alt="" srcset="" width={"70%"} />
        </div>
        <div className="w-[50%] h-[80%] flex flex-col items-center justify-center p-20">
          <h1 className="font-bold text-5xl mb-10 text-secondary-purpleDark  font-playwrite">
          Your Ride, Your Choice
          </h1>
          
          <p className="text-lg font-semibold text-center text-secondary-purpleDark/90">
          With our flexible ride-sharing platform, you’re in control of every detail. Whether it’s a daily commute or a weekend adventure, our service adapts to your needs. Enjoy a personalized, convenient, and hassle-free travel experience—because every ride should be as unique as you are.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
