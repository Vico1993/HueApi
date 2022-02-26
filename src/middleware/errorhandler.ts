import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log("JELLO", err.message);

    res.status(500).json({
        error: err.message,
    });
};
