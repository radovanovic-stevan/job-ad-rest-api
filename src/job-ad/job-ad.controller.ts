import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobAdService } from './job-ad.service';
import { CreateJobAdDto } from './dto/create-job-ad.dto';
import { UpdateJobAdDto } from './dto/update-job-ad.dto';

@Controller('job-ad')
export class JobAdController {
  constructor(private readonly jobAdService: JobAdService) {}

  @Post()
  create(@Body() createJobAdDto: CreateJobAdDto) {
    return this.jobAdService.create(createJobAdDto);
  }

  @Get()
  findAll(
    @Query('pageNumber') pageNumber: string, 
    @Query('pageSize') pageSize: string, 
    @Query('searchTerm') searchTerm: string, 
    @Query('filters') filters: string) {
    return this.jobAdService.findAll(+pageNumber, +pageSize, searchTerm, filters?.split(','));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobAdDto: UpdateJobAdDto) {
    return this.jobAdService.update(+id, updateJobAdDto);
  }

}
