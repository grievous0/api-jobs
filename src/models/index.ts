import { Candidate } from "./candidates";
import { Job } from "./job";
import { Company } from "./company";

Company.hasMany(Job)
Job.belongsTo(Company)

export { Candidate, Job, Company }
