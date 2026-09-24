import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route not found ${req.method}${req.url}`));
};
export default notFound;
