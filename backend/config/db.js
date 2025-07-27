import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();


const uri = process.env.MONGO_URI;



async function connect (){
    await mongoose.connect(uri).then(()=>{
    console.log("DB Conncted");
}).catch((error)=>{
    console.log(error);
});
    
}



export default connect;