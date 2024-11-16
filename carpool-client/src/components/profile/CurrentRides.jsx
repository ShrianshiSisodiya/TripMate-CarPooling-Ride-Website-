import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrUserManager } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";

function CurrentRides() {
  const [currentRides, setCurrentRides] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCurrentRides = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/rides/getcurrentrides",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCurrentRides(response.data.findRide);
        console.log(response.data.findRide);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const updatecompletionstatus = async(_id) => {
    try {

      const response = await axios.post("http://localhost:8000/api/v1/rides/updatecompletestatus", {_id}, {withCredentials: true});

      if(response.data.success){
        alert("Ride Completed")
        navigate("/");
      }
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getCurrentRides();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  if(currentRides.length === 0){
    console.log("hiiiiiiiiiii")
    return(
      <div className="w-[100%] pt-10 min-h-screen bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender">
        <h1 className="w-fit p-5 bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl text-secondary-purpleDark text-2xl font-bold mx-auto mb-10">NO CURRENT RIDES FOUND!</h1>
        <div className="flex items-center justify-center">
        <Link to='/searchride'>
        <button  className='w-60 bg-primary-yellow text-beige-light py-2 px-4 rounded-lg hover:bg-secondary-orange hover:text-contrast-white font-semibold mx-auto'>Book Ride</button>
        </Link>
        </div>
         </div>
    )
  }

  return (
    <div className="w-[100%] pt-10 min-h-screen bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender">
      <div className="w-[80%] h-auto bg-white/60 backdrop-blur-md border border-transparent rounded-2xl m-auto">
        {currentRides?.map((item) => {
          return (
            <div className="flex flex-col h-auto w-[60vw] mx-auto bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender my-10 rounded-xl">
              <div className="h-24 flex items-center justify-between border-b-2">
                <div className="flex">
                  <h1 className="font-bold m-5 max-w-60 h-20 overflow-hidden flex items-center justify-center">
                    {item.rideId.pickupLocation}
                  </h1>
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-4 border-white/60 rounded-full"></div>

                    <div className="w-48 h-[3px] bg-white/60"></div>

                    <div className="w-4 h-4 border-4 border-white/60 rounded-full"></div>
                  </div>
                  <h1
                    className="font-bold m-5 max-w-60 overflow-hidden h-20 flex items-center justify-center
          "
                  >
                    {item.rideId.dropLocation}
                  </h1>
                </div>

                <div>
                  <p className="font-bold text-3xl m-10">
                    <span className="mr-2">&#8377;</span>
                    {item.rideId.pricePerSeat}
                  </p>
                </div>
              </div>

              <div className="h-20 flex items-center justify-around">
                <div className="flex items-center font-bold">
                  <SlCalender />
                  <p className="ml-2">{item.rideId.date.slice(0,10)}</p>
                </div>

                <div className="flex items-center font-bold">
                  <GrUserManager />
                  <p className="ml-2">{item.ownerId.name}</p>
                </div>

                <button className="bg-primary-yellow p-2 rounded-lg font-bold hover:bg-secondary-orange hover:text-contrast-white" onClick={()=>{updatecompletionstatus(item._id)}}>
                  Completed
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CurrentRides;
