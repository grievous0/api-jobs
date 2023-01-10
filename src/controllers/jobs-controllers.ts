import { Request, Response } from "express";
import { Job } from "../models";

export const jobsControllers = {
    //GET /jobs
    index: async (req: Request, res: Response) => {
        try {
            const job = await Job.findAll({ include: ['company', 'candidates'] });
            return res.json(job);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    //POST /jobs
    save: async (req: Request, res: Response) => {
        const { title, description, limitDate, companyId } = req.body;
        try {
            const job = await Job.create({
                title,
                description,
                limitDate,
                companyId
            })

            return res.status(201).json(job);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    //GET /jobs/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const job = await Job.findByPk(id, { include: ['company', 'candidates'] });

            if (!job) {
                return res.status(404).json({
                    error: 'Job not found'
                })
            }

            const candidatesCount = await job.countCandidates()


            return res.json({ ...job.get(), candidatesCount });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    //PUT /jobs/:id
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, limitDate, companyId } = req.body;
        try {
            const job = await Job.findByPk(id);
            if(job){
                const [affectedRows, jobs] = await Job.update({
                    title,
                    description,
                    limitDate,
                    companyId
                }, {
                    where: { id },
                    returning: true
                })

                res.status(200).json(jobs[0]);
            }

            return res.status(404).json({
                error: 'Job not found'
            })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    //DELETE /jobs/:id
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await Job.destroy({ where: { id } });
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    //POST /jobs/:id/addCandidate
    addCandidate: async (req: Request, res: Response) => {
        const jobId= req.params.id
        const { candidateId } = req.body
        try {
            const job = await Job.findByPk(jobId)

            if (!job) {
                return res.status(404).json({
                    error: 'Job not found'
                })
            }

            await job.addCandidate(candidateId)

            return res.status(201).json({
                message: 'Candidate added to job',
            })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },

    //POST /jobs/:id/removeCandidate
    removeCandidate: async (req: Request, res: Response) => {
        const jobId= req.params.id
        const { candidateId } = req.body
        try {
            const job = await Job.findByPk(jobId)

            if (!job) {
                return res.status(404).json({
                    error: 'Job not found'
                })
            }

            await job.removeCandidate(candidateId)

            return res.status(201).json({
                message: 'Candidate removed from job'
            })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    },
}