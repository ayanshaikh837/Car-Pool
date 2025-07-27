import Trip from "../models/Trip.js";

//Create a trip
export const createTrip = async (req, res) => {
  try {
    const { from, to, date, time, seatAvailable } = req.body;

    const newTrip = new Trip({
      userId: req.user._id,
      from,
      to,
      date,
      time,
      seatAvailable,
    });

    await newTrip.save();

    res.status(201).json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get all available trips
export const searchTrips = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ message: "Please provide both 'from' and 'to' locations." });
  }

  try {
    const trips = await Trip.find({
      from: { $regex: new RegExp(from, "i") },
      to: { $regex: new RegExp(to, "i") }
    }).populate("userId", "-password");

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error searching trips", error });
  }
};


//Get trips created by logged-in user
export const getUserTrips = async (req, res) => {
  try {
    const userTrips = await Trip.find({ userId: req.user._id });
    res.status(200).json(userTrips);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// routes/trip.js
export const joinTrip = async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user._id;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.passengers.includes(userId))
      return res.status(400).json({ message: "Already joined this trip" });

    if (trip.seatAvailable <= 0)
      return res.status(400).json({ message: "No seats available" });

    trip.passengers.push(userId);
    trip.seatAvailable -= 1;
    await trip.save();

    res.status(200).json({ message: "Successfully joined the trip!" });
  } catch (error) {
    res.status(500).json({ message: "Error joining ride", error });
  }
};
