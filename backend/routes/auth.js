import express from 'express';
import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';

const router=express.Router();

// register user
router.post('/register',async(req,res,next)=>{
	const {username,email,password}=req.body;
	try{
		// validate the user input
		if(!username||!email||!password){
			return res.status(400).json({message:"Please register the user"})
		}
		// check if the user already exists
		const userExists=await User.findOne({email})
		if(userExists){
			return res.status(400).json({message:"User already exists"})
		}
		// create the user in the database
		const user=await User.create({username,email,password})
		const token=generateToken(user._id);
		res.status(201).json({
			id:user._id,
			username:user.username,
			email:user.email,
			password:user.password,
			token
		})
	}
	catch(error){
			return res.status(500).json({message:"Server error"},error)
	}

})
// login user
router.post('/login',async (req,res,register)=>{
	const {email,password}=req.body;
	try{
			if(!email || !password){
				return res.status(400).json({ message: "Please fill all the fields" })
			}
			const user=await User.findOne({email});
			if(!user && !(await user.matchPassword(password))){
				  return res.status(401).json({ message: "Invalid credentials" });
			}
			const token=generateToken(user._id);
			res.status(200).json({
				id:user._id,
				username:user.username,
				email:user.email,
				token
			})
	}
	catch(error){
 	res.status(500).json({ message: "Server error" });
	}
})
// get the current user data (Protected route)
router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

// generate JWT tokens

const generateToken=(id)=>{
	return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

export default router;