import { Response, Request, NextFunction } from "express";
import Error from "../interface/error.interface";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
      const status = error.status || 500;
      const message = error.message || 'oohbs ! something went wrong';
      res.status(status).json({status, message}); 
  }
};

export default errorMiddleware;
