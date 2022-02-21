import { NextFunction, Request, Response } from "express";

// Typing the Request body as Record<string,unknown> here since express.json()
// is used on all routes. This type is true even for requests with empty
// request bodies
export interface RequestHandler {
    (
        req: Request<Record<string, string>, unknown, Record<string, unknown>>,
        res: Response,
        next?: NextFunction
    ): Promise<void>;
}

export interface AsyncHandler {
    (fn: RequestHandler): RequestHandler;
}

const asyncHandler: AsyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
