import React from "react";
import { Link } from "react-router-dom";
import { GrUserManager } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";



function RideCard({data}) {
  return (
    <div className="flex flex-col h-auto w-[60vw] mx-auto bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender my-10 rounded-xl">
      <div className="h-24 flex items-center justify-between border-b-2">

        <div className="flex">
          <h1 className="font-bold m-5 max-w-60 h-20 overflow-hidden flex items-center justify-center">{data.pickupLocation}</h1>
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-4 border-white/60 rounded-full"></div>

            <div className="w-48 h-[3px] bg-white/60"></div>

            <div className="w-4 h-4 border-4 border-white/60 rounded-full"></div>
          </div>
          <h1 className="font-bold m-5 max-w-60 overflow-hidden h-20 flex items-center justify-center
          ">{data.dropLocation}</h1>
        </div>

        <div>
        
        <p className="font-bold text-3xl m-10"><span className="mr-2">&#8377;</span>{data.pricePerSeat}</p>
        </div>

      </div>

      <div className="h-20 flex items-center justify-around">
        <div className="flex items-center font-bold">
        <SlCalender />
        <p className="ml-2">{data.date.slice(0,10)}</p>

        </div>

        <div className="flex items-center font-bold">
        <GrUserManager />
        <p className="ml-2">{data.owner.name}</p>
        </div>

        <Link to={`/book/${data._id}`}>

        <button className="bg-primary-yellow p-2 rounded-lg font-bold hover:bg-secondary-orange hover:text-contrast-white">Book Now</button>

        </Link>
      </div>
    </div>
  );
}

export default RideCard;
