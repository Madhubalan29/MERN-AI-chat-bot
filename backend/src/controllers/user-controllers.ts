import {Response,Request, NextFunction } from "express";
import user from "../models/user.js";
import {hash,compare} from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const users= await user.find();
        return res.status(200).json({message:"OK",users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
        
    }
};
export const userSignup = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,email,password}=req.body;
        const exsistinguser =await user.findOne({email});
        if(exsistinguser)return res.status(401).send("User already there")
        const hashedpass= await hash(password,10);
        const users= new user({name,email,password:hashedpass});
        await users.save();
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            path:"/",
            signed:true

        });
        const token =createToken(users._id.toString(),users.email,"7d");
        const expires=new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie("auth_token",token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true})
        return res.status(201).json({message:"OK",name:users.name,email:users.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
        
    }
};
export const userlogin = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password}=req.body;
        const User= await user.findOne({email})
        if(!User){
            return res.status(401).send("Signup first asshole")
        }
        const ispasswordcorrect = await compare(password,User.password);
        if(!ispasswordcorrect)return res.status(403).send("hey cheater");
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            path:"/",
            signed:true

        });
        const token =createToken(User._id.toString(),User.email,"7d");
        const expires=new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true})
        
        return res.status(201).json({message:"OK",name:User.name,email:User.email});
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
        
    }
};
export const verifyUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const User= await user.findById(res.locals.jwtData.id)
        if(!User){
            return res.status(401).send("Signup first asshole")
        }
        
        
        return res.status(201).json({message:"OK",name:User.name,email:User.email});
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
        
    }
};
export const userlogout = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const User= await user.findById(res.locals.jwtData.id)
        if(!User){
            return res.status(401).send("Signup first asshole")
        }
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            path:"/",
            signed:true

        });
        
        return res.status(201).json({message:"OK",name:User.name,email:User.email});
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
        
    }
};