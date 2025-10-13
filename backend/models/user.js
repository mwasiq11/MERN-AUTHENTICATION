import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=new mongoose.Schema({
	username:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	}

},{timestamps:true}
);

// we will hash the password before saving the user
userSchema.pre("save",async function (next){
	// check if the is modified
	if(!this.isModified("password")){
	// bycrpt the password so that it is not in plain text in the database
	const salt=await bcrypt.genSalt(10);
	this.password=await bcrypt.hash(this.password,salt);
	next();
	}
})

// method to match the password
userSchema.methods.matchPassword=async function (enteredPassword){
	return await bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model('User',userSchema);
export default User;
