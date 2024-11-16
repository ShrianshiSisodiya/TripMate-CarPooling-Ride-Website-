import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import img from "../assets/directions1.png";
import { SlCalender } from "react-icons/sl";
import { GrUserManager } from "react-icons/gr";
import { AuthContext } from "../context/AuthContext";

function BookRide() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rideDetails, setRideDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchRideDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/rides/searchridebyid', {
        params: { _id: id },
      });

      setRideDetails(response.data.ride);
      setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      // Create Razorpay order from backend
      const { data } = await axios.post("http://localhost:8000/api/v1/payments/createorder", {
        rideId: id,
        userId: user._id,
        amount:rideDetails.pricePerSeat,
      });

      const { orderId, amount: payableAmount } = data;

      // Razorpay options
      const options = {
        key: "rzp_test_UwGBKHQ9WgoYFO", // Razorpay API Key
        amount: payableAmount,
        currency: "INR",
        name: "Carpool Service",
        description: "Ride Booking Payment",
        order_id: orderId,
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          // Verify payment on backend
          const verifyResponse = await axios.post("http://localhost:8000/api/v1/payments/verifypayment", {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });

          if(verifyResponse.data.success){
            const addPassengerResponse = await axios.post("http://localhost:8000/api/v1/rides/addpassenger",{rideId: rideDetails._id},
              {
                withCredentials: true, 
              })

            if(addPassengerResponse.data.success){
              console.log("Passenger added successfully")
            }
            alert("Payment successful! Your ride is booked.");
            navigate("/");
            
          }

          // Show success message
          
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed");
    }
  };

  useEffect(() => {
    fetchRideDetails();
    console.log(rideDetails)

    return console.log(rideDetails);
    
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender text-contrast-darkBlue pt-20">
      <div className="bg-white/60 shadow-xl backdrop-blur-md rounded-2xl w-[80vw] h-[80vh] mx-auto flex justify-around items-center">
        <div className="w-[70%] h-[80%] flex items-center justify-center">
          <img src={img} alt="" srcset="" width={"100%"} />
        </div>


        <div className="w-[80%] h-[80%] flex flex-col bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender rounded-xl p-10 mr-10">
          <div className="flex justify-start items-center text-lg">
            <SlCalender className="font-bold" />
            <p className="ml-5 font-bold">{rideDetails.date.slice(0,10)}</p>
          </div>
          <div className="flex flex-col mt-8">
            <h1 className="font-bold text-2xl ">From:</h1>
            <p className="font-semibold text-lg ">
              {rideDetails.pickupLocation}
            </p>
          </div>

          <div className="flex flex-col mt-5">
            <h1 className="font-bold text-2xl">To:</h1>
            <p className="font-semibold text-lg">
              {rideDetails.dropLocation}
            </p>
          </div>

          <div className="flex items-center mt-8 font-semibold">
            <GrUserManager />
            <p>{rideDetails.owner.name}</p>
          </div>
          <div className="flex items-center justify-between">
          <div className="font-bold mt-8 text-xl">
            <p>
              <span className="mr-2">&#8377;</span>{rideDetails.pricePerSeat}
            </p>
          </div>
          <button onClick={handlePayment} className="bg-primary-yellow p-2 rounded-lg font-bold hover:bg-secondary-orange hover:text-contrast-white w-28 mt-8">
            PAY
          </button>
          </div>
          

          
        </div>
      </div>
    </div>
  );
}

export default BookRide;
