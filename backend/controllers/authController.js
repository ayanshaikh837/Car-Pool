import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




export const register = async (req,res) =>{
    let {name,email,password,phone} = req.body;
    let findUser = await User.findOne({email});
    if(findUser){
        return res.status(400).json({message:"User already exists"});
    }
    let hashedpassword = await bcrypt.hash(password,10);
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword,
        phone:req.body.phone,
    })

    await newUser.save();

    res.status(201).json({message:"User registered successfully"})
}
export const login = async (req,res) =>{
        let {email,password} = req.body;
        let userExist = await User.findOne({email});
        if(!userExist){
            return res.status(404).json({message:"User not exist"});
        }
        let user =  await bcrypt.compare(password,userExist.password);
        if(user){
            let token = jwt.sign(
                {id: userExist._id},
                process.env.JWT_SECRET,
                {expiresIn:"1d"}
            )
            res.status(200).json({message:"Login successful", token});
        }
        else{
            return res.status(401).json({message:"Invalid credentials"});
        }
}