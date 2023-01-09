import { Request, Response } from "express";
import { Job } from "../models";

export const jobsControllers = {
    //GET /jobs
    index: async (req: Request, res: Response) => {
        try {
            const job = await Job.findAll({ include: 'company' });
            return res.json(job);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    }
}