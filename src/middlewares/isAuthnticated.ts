import { NextFunction, Request, Response } from "express";
import token from "../config"
import AppError from "../AppError";

export default function isAuthenticated(request:Request, response: Response, next: NextFunction ) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token não informado!");
    }

    const [, userToken] = authHeader.split(' ');

    if(userToken === token){
        return next();
    } else {
        throw new AppError("Token inválido", 401);
    }
}