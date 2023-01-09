import { Request, Response } from "express";
import { Company } from "../models";

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
    },

    // POST /companies
    save: async (req: Request, res: Response) => {
        const { name, bio, website, email } = req.body;

        try {
            const companies = await Company.create({
                name,
                bio,
                website,
                email
            })
            res.status(201).json(companies);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    // GET /companies/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const company = await Company.findByPk(id, { include: 'jobs' });
            res.status(200).json(company);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    // PUT /companies/:id
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, bio, website, email } = req.body;
        
        try {
            const [affectedRows, companies] = await Company.update({
                name,
                bio,
                website,
                email
            }, { 
                where: { id },
                returning: true
            })

            return res.status(200).json(companies[0]);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    // DELETE /companies/:id
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        
        try {
            await Company.destroy({ where: { id } })

            return res.status(200).json({
                message: 'Company deleted successfully'
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },
}