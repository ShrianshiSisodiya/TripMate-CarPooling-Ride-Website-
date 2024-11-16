const Ride = require("../models/ride.models")
const Payment = require("../models/payment.models")
const User = require("../models/user.models")
const sendMail = require('../utils/mailer.js');
const mongoose = require("mongoose");



const addRide = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, date, pickupTime, pricePerSeat, totalSeats } = req.body;

    const userId = req.user.id;

    if (!(pickupLocation || dropLocation || date || pickupTime || pricePerSeat || totalSeats)) {
      return res.status(400).json({
        message: 'Invalid Data',
        success: false
      })
    }

    const newRide = new Ride({
      owner: userId,
      pickupLocation,
      dropLocation,
      date,
      pickupTime,
      pricePerSeat,
      totalSeats
    })

    await newRide.save();

    const createdRide = await Ride.findById(newRide._id);

    if (!createdRide) {
      return res.status(500).json({
        message: 'Something went wrong',
        success: false
      })
    }

    const user = await User.findById(userId)

    await sendMail(
      user.email, // recipient email
      'Ride Added Successfully',
      'Your ride has been successfully added.',
      `<p>Hello ${user.name},</p>
       <p>Your ride from ${createdRide.pickupLocation} to ${createdRide.dropLocation} has been successfully added.</p>
       <p>Thank you for using our service!</p>
       <p>~TripMate</p>`
    );

    return res.status(201).json({ message: 'Ride registered successfully', ride: createdRide, success: true });



  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Something went wrong',
      success: false
    })
  }

}

const searchRide = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, date } = req.query;

    // Construct query based on the input
    let query = {};

    // Match the pickupLocation or dropLocation with regex (if provided)
    if (pickupLocation) {
      query.pickupLocation = { $regex: new RegExp(pickupLocation, 'i') };
    }
    if (dropLocation) {
      query.dropLocation = { $regex: new RegExp(dropLocation, 'i') };
    }

    // Match the date exactly if provided (ensure correct format)
    if (date) {
      const rideDate = new Date(date);
      query.date = rideDate;
    }

    // Find rides based on the query
    const rides = await Ride.find(query).populate('owner');

    if (rides.length === 0) {
      return res.status(404).json({ message: 'No rides found' });
    }

    res.status(201).json({ message: 'Rides found', ride: rides, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

};

const searchRideById = async (req, res) => {
  try {
    const { _id } = req.query;

    const ride = await Ride.findById(_id).populate('owner');


    if (!ride) {
      return res.status(400).json({ message: 'Ride not found', success: false })
    }

    return res.status(200).json({ message: 'Ride Found', ride: ride, success: false })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }

}

const addPassesnger = async (req, res) => {

  const { rideId } = req.body;
  const userId = req.user.id;

  console.log(userId, rideId)

  const ride = await Ride.findById(rideId)

  ride.passengers.push(userId);
  ride.availableSeats -= 1;


  const newPayment = new Payment({
    rideId,
    passengerId: userId,
    ownerId: ride.owner,
    amount: ride.pricePerSeat,
  })

  // Save the updated ride document
  await ride.save();
  await newPayment.save()

  const passenger = await User.findById(userId)
  const owner = await User.findById(ride.owner)

  await sendMail(
    passenger.email, // recipient email
    'Ride Booked Successfully',
    'Your ride has been successfully booked.',
    `<p>Hello ${passenger.name},</p>
     <p>Your ride from ${ride.pickupLocation} to ${ride.dropLocation} has been successfully added.</p>
     <p>Please find the driver details,<p>
     <p>Name: ${owner.name}</p>
     <p>Email: ${owner.email}</p>
     <p>Mobile: ${owner.mobile}</p>
     <p>Thank you for using our service!</p>
     <p>~TripMate</p>`
  );

  await sendMail(
    owner.email, // recipient email
    'New Passenger Added',
    'Your ride has been successfully booked.',
    `<p>Hello ${owner.name},</p>
     <p>Your ride from ${ride.pickupLocation} to ${ride.dropLocation} has been successfully booked by${passenger.name}.</p>
     <p>Passenger Details,</p>
     <p>Name: ${passenger.name}</p>
     <p>Email: ${passenger.email}</p>
     <p>Mobile: ${passenger.mobile}</p>
     <p>Thank you for using our service!</p>
     <p>~TripMate</p>`
  );

  res.status(200).json({ message: 'Passenger added to the ride successfully', ride, success: true });


}

const getCurrentRides = async (req, res) => {

  try {

    const userId = req.user.id;

    const findRide = await Payment.find({
      passengerId : userId,
      rideCompletionStatus: false,
    }).populate(['rideId', 'ownerId']);


    return res.status(200).json({ message: 'Ride found', findRide, success: true })

    
    
  } catch (error) {
    return res.status(400).json({ message: 'Ride not found', success: false })
  }
}

const updateCompleteStatus = async(req, res) => {
  try {

    const {_id} = req.body;

    const ride = await Payment.findByIdAndUpdate(
      {_id},
      {rideCompletionStatus: true},
      {new: true}
    )

    if(ride.rideCompletionStatus === true){

      const owner = await User.findById(ride.ownerId);
      owner.totalEarnings += ride.amount;
      owner.availableBalance += ride.amount;
      await owner.save();

      return res.status(200).json({message: 'Ride Updated', success: true})
    }
    else{
      return res.status(400).json({message: 'Ride Status not Updated', success: false})
    }
    
  } catch (error) {
    return res.status(400).json({message: 'Ride Status not Updated', success: false})
  }
}

const getRideHistory = async (req, res) => {

  try {

    const userId = req.user.id;
    console.log(userId)

    const findRide = await Payment.find({
      passengerId : userId,
      rideCompletionStatus: true,
    }).populate('rideId')
    console.log(findRide)


    return res.status(200).json({ message: 'Ride found', findRide, success: true })

    
    
  } catch (error) {
    return res.status(400).json({ message: 'Ride not found', success: false })
  }
}

const getHostedRides = async (req, res) => {

  try {

    const userId = req.user.id;
    console.log(userId)

    const findRide = await Ride.find({
      owner: new mongoose.Types.ObjectId(String(userId)),
    });
    console.log(findRide)


    return res.status(200).json({ message: 'Ride found', findRide, success: true })

    
    
  } catch (error) {
    console.log(error);
    
    return res.status(400).json({ message: 'Ride not found', success: false })
  }
}



module.exports = { addRide, searchRide, searchRideById, addPassesnger, getCurrentRides, updateCompleteStatus, getRideHistory, getHostedRides }