import { NextFunction, Request, Response } from "express";
import UserModel from "../Models/user.model";


const userModel = new UserModel;


export const create = async (req: Request, res: Response, next :NextFunction) => {
try{
const user = await userModel.create(req.body);
res.json({
    status:"success",
    data :{...user},
    message: 'user create successfully'
})

}catch(error){
    next(error);
}
};
export const getUsers=async(
    _req: Request,
    res:Response,
    next:NextFunction
)=>{

}
