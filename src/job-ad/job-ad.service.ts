import { HttpException, Injectable } from '@nestjs/common';
import { jobAds } from 'src/database';
import { CreateJobAdDto } from './dto/create-job-ad.dto';
import { UpdateJobAdDto } from './dto/update-job-ad.dto';
import { JobAd } from './entities/job-ad.entity';

@Injectable()
export class JobAdService {
  create(ad: CreateJobAdDto) {
    if (jobAds.some((elem) => elem.title === ad.title)) throw new HttpException('Ad with that title already exists',400);
    const id = this.getNewId();
    jobAds.unshift({ ...ad, id });
    return id;
  }

  findAll(    
      pageNumber: number,
      pageSize: number,
      searchTerm: string | undefined,
      filters: string[] | undefined
    ) {
    let jobsToSend: JobAd[] = JSON.parse(JSON.stringify(jobAds));

    if (searchTerm) {
      jobsToSend = jobsToSend.filter((elem) =>
        elem.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
    }

    if (filters && filters.length !== 0) {
      jobsToSend = jobsToSend.filter((elem) => filters.includes(elem.status));
    }

    const length = jobsToSend.length;
    jobsToSend = jobsToSend.slice(
      (pageNumber - 1) * pageSize,
      (pageNumber - 1) * pageSize + pageSize
    );
    return { jobs: jobsToSend, length };
  }

  update(id: number, changed: UpdateJobAdDto) {
    const adIndex = jobAds.findIndex((elem) => elem.id === id);
    if (adIndex === -1) throw new HttpException('Ad does not exist',400);

    if (changed.title && jobAds.find((elem) => elem.title === changed.title && elem.id !== id)) {
      throw new HttpException('Ad with that title already exists',400);
    }
    jobAds[adIndex] = { ...jobAds[adIndex], ...changed };
    return 'Creation Success';
  }

  private getNewId(): number {
    let startingPoint = jobAds.length;
    while (true) {
      if (jobAds.every((elem) => elem.id !== startingPoint))
        return startingPoint;
      startingPoint++;
    }
  }

}
