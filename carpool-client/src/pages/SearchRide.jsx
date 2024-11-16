import React, {useState, useEffect} from "react";
import RideCard from "../components/RideCard";
import AutocompleteInput from "../components/AutocompleteInput";
import axios from "axios";



function SearchRide() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [date, setDate] = useState("");
   

  const [rides, setRides] = useState([])


  const [today, setToday] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    // Set today's date when the component mounts
    setToday(getTodayDate());
    setCurrentTime(getCurrentTime());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare ride data to be sent to the backend
    const rideData = {
      pickupLocation,
      dropLocation,
      date,
    };

    try {
      // Post request to add the ride (adjust the URL and logic as needed)
      console.log(rideData)
      console.log("api called")
      const response = await axios.get('http://localhost:8000/api/v1/rides/searchride', {params: {pickupLocation,dropLocation, date}}, {
        withCredentials: true, // Include credentials like cookies
      });

      if(response.data.success){
        console.log(response);
        setRides(response.data.ride)
        console.log(rides)
        
            // navigate('/')
      }
      else{
        console.log(response);
        
        // alert("Something went wrong")
            // navigate('/')
      }
      console.log('Ride added:', response.data);
    } catch (error) {
      console.error('Error adding ride:', error);
    }


  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender text-contrast-darkBlue pt-20">
      <h1 className="text-center text-4xl font-bold">SEARCH FOR RIDES</h1>
      <form
      onSubmit={handleSubmit}
      className="bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl flex items-center justify-around w-[80vw] mx-auto mt-10 p-3"
      >
        <div>
          
          <AutocompleteInput
            label="Pickup Location"
            value={pickupLocation}
            setValue={setPickupLocation}
          />
        </div>
        <div>
          <AutocompleteInput
            label="Drop Location"
            value={dropLocation}
            setValue={setDropLocation}
          />
        </div>
        <div className="flex flex-col">
          <label className='text-text text-lg font-medium text-contrast-darkBlue'>Date</label>
          <input type="date" value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)} className="rounded p-1"/>
        </div>
        <div>
          <button className='w-52 bg-primary-yellow text-beige-light py-2 px-4 rounded  font-bold hover:bg-secondary-orange hover:text-contrast-white m-2 mt-8'>Search</button>
        </div>
      </form>

      <div className="w-[70vw] h-auto bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl mt-20 mx-auto">
      {rides.map((item) => {
        console.log(item);
        return <RideCard data={item}/>
      })}
        
        
      </div>
    </div>
  );
}

export default SearchRide;
