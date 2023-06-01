import { AuthenticatedRequest } from "./authentication.middleWare";
import { NextFunction, Response } from "express";

export const asyncHandler =
  (fn: any) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
