import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AutocompleteInput from "../components/AutocompleteInput"; // Adjust the path based on your structure

const AddRide = () => {
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [date, setDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [totalSeats, setTotalSeats] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState("");

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
      pickupTime,
      pricePerSeat,
      totalSeats,
    };

    console.log(rideData);

    try {
      // Post request to add the ride (adjust the URL and logic as needed)
      const response = await axios.post(
        "http://localhost:8000/api/v1/rides/addride",
        rideData,
        {
          withCredentials: true, // Include credentials like cookies
        }
      );

      if (response.data.success) {
        alert("Ride Added Successfully");
        navigate("/");
      } else {
        alert("Something went wrong");
        navigate("/");
      }
      console.log("Ride added:", response.data);
    } catch (error) {
      console.error("Error adding ride:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender text-contrast-darkBlue flex flex-row items-center justify-around pt-12">
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-[50vw] z-0 p-6 h-auto flex items-center justify-center flex-col bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl"
        >
          <h1 className="text-primary-purple text-2xl font-bold mb-4">
            ADD RIDE
          </h1>

          {/* Autocomplete input for pickup and drop-off locations */}
          <AutocompleteInput
            label="Pickup Location"
            value={pickupLocation}
            setValue={setPickupLocation}
          />
          <AutocompleteInput
            label="Drop Location"
            value={dropLocation}
            setValue={setDropLocation}
          />

          {/* Other form fields */}
          <div className="flex flex-col m-2">
            <label className="text-text text-lg font-medium text-contrast-darkBlue">
              Date of Ride
            </label>
            <input
              className="p-1 rounded w-80"
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-text text-lg font-medium text-contrast-darkBlue">
              Pickup Time
            </label>
            <input
              className="p-1 rounded w-80"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
              min={date === today ? currentTime : "00:00"}
            />
          </div>
          <div className="flex flex-row justify-between  w-80">
            <div className="flex flex-col">
              <label className="text-text text-lg font-medium text-contrast-darkBlue">
                Seats
              </label>
              <input
                className="p-1 rounded w-36"
                type="number"
                value={totalSeats}
                min="1"
                max="4"
                onChange={(e) => setTotalSeats(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text text-lg font-medium text-contrast-darkBlue">
                Price Per Seat
              </label>
              <input
                className="p-1 rounded w-36"
                type="text"
                value={pricePerSeat}
                onChange={(e) => setPricePerSeat(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-60 bg-primary-yellow text-beige-light py-2 px-4 rounded hover:bg-secondary-orange hover:text-contrast-white mt-5"
          >
            Publish Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRide;
