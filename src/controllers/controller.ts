import { Request, Response } from "express"
import { LoginUserSchema, SignupUserSchema } from "../types";
import { UserModel } from "../models/models";
import  jwt  from "jsonwebtoken";

export const getMe = async(req:Request,res:Response) =>{
    res.send("hello this is your profile");
    console.log("getMe end point");
}

export const signup = async(req:Request, res: Response) =>{
    const {success, data} = SignupUserSchema.safeParse(req.body);
    if(!success){
        res.status(400).json({
            "success":false,
            "error": "Invalid request schema",
        })
        return;
    }
    const userWithSameEmail = await UserModel.findOne({
        email:data.email
    })
    if(userWithSameEmail){
        res.status(400).json({
            "success" : false,
            "error" : "Email already exists"
        })
        return;
    }
    const userDb = await UserModel.create({
        name:data.name,
        email : data.email,
        password : data.password,
        role : data.role
    })
    res.json({
        "success" : true,
        "data" : {
            "_id" : userDb._id,
            "name" : userDb.name,
            "email" : userDb.email,
            "role" : userDb.role
        }
    })

}

export const login = async(req:Request , res: Response) =>{
    const{success,data} = LoginUserSchema.safeParse(req.body);
    if(!success){
        res.status(400).json({
            "success" : "false",
            "error" : "Invalid Email or password"
        })
        return;
    }

    const userInDb = await UserModel.findOne({
        email:data.email,
    })

    if(!userInDb || userInDb.password != data.password){
        res.status(400).json({
            "success" : "false",
            "error" : "Invalid Email or password"
        })
        return;
    }

    const token = jwt.sign({
        "userId" : userInDb._id,
        "role" : userInDb.role
    },process.env.JWT_PASSWORD!)

    res.status(200).json({
        "success" : true,
        "data" : {
            "token" : token
        }
    })
    
}

