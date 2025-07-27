import mongoose from "mongoose";
const tripSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },
    from: String,
    to: String,
    date: Date,
    time: String,
    seatAvailable: Number,
    passengers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})


export default mongoose.model("Trip", tripSchema);