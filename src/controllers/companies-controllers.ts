import { Request, Response } from "express";
import { Company } from "../models/company";

export const companiesController = {
    index: async (req: Request, res: Response) => {
        try {
            const companies = await Company.findAll();
            res.status(200).json(companies);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    }
}