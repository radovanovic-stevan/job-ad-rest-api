import { OmitType } from "@nestjs/mapped-types";
import { JobAd } from "../entities/job-ad.entity";

export class CreateJobAdDto extends OmitType(JobAd, ["id"]) {}
