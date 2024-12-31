import { NextFunction ,Response,Request} from "express";
import jwt  from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";




export const createToken = (id:string,email:string, expiresIn:string)=>{
    const payload={id,email};
    const token =jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn,
    });
    return token
};
export const verifyToken=async (req:Request,res:Response,next:NextFunction)=>{
    const token =req.signedCookies[`${COOKIE_NAME}`];
    console.log(token);
    if(!token || token.trim()===""){
        return res.status(401).json({messagge:"Token Expired da"})
    }
    return new Promise<void>((resolve, reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err){
                reject(err.message);
                return res.status(401).json({message:"Token Expired di"})
            }
            else{
                console.log("Token verification successfull");
                resolve();
                res.locals.jwtData=success;
                return next()
            }
        })
    })
};