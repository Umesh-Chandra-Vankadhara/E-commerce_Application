import express from 'express'
import data from '../data.js'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils.js'


const userRouter=express.Router()

userRouter.get('/seed',expressAsyncHandler(async(req,res) => {
    // the below line of code remove all users before inserting new users every time 
    // await User.remove({});
    const createdUsers=await User.insertMany(data.users)
    res.send({createdUsers})

}))

userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            return     res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user)
                })
        }
        return res.status(401).send({message:'Invalid email or password'})
     
    }

}))

userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const user=new User({
        name,
        email,
        password:bcrypt.hashSync(password,8)
    })
    const createdUser=await user.save();
    return res.send({
                    _id:createdUser._id,
                    name:createdUser.name,
                    email:createdUser.email,
                    isAdmin:createdUser.isAdmin,
                    token:generateToken(createdUser)
                })
  

}))


export default userRouter