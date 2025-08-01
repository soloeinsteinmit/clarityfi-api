import { Request, Response, NextFunction } from "express";

/**
 * Wraps an async route handler and catches any thrown error.
 */
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
