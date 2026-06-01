import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.status(err.status || 500).json({ errorMsg: err.message });
};

export { errorHandler };
