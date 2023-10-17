import { InjectRepository } from "@nestjs/typeorm";
import { Employer } from "./entities/employer.entity";
import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { Injectable } from "@nestjs/common";
import { PostEmployerDto } from "./dto/postEmployer.dto";
import { ListEmployerDto } from "./dto/listEmployer.dto";
import { DetailEmployerDto } from "./dto/detailEmployer.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { ApplyEmployeeDto } from "./dto/applyEmployee.dto";

@Injectable()
export class EmployService {
    constructor(
        @InjectRepository(Employer)
        private readonly employer : Repository<Employer>,
        @InjectRepository(Employee)
        private readonly employee : Repository<Employee>
    ){}
    
    async createEmployer(postEmployerDto : PostEmployerDto) : Promise<void> {
        const result = this.employer.create(
            postEmployerDto
        )
        await this.employer.save(result)
    }

    async createEmployee(applyEmployeeDto : ApplyEmployeeDto) {
        const result = this.employee.create(
            applyEmployeeDto
        )
        await this.employer.save(result)
    }

    async updateEmployer(id : number, postEmployerDto : PostEmployerDto) : Promise<void> {
        await this.employer.update({id},postEmployerDto)
        
    }

    async readEmployerList(paginationDto : PaginationDto) : Promise<ListEmployerDto[]> {
        const skip = (paginationDto.page-1)* paginationDto.limit
        const take = paginationDto.limit
        return await this.employer.find({
            skip, take
        })
    }

    async readEmployerDetail(id: number) : Promise<DetailEmployerDto> {
        const detailEmployer = await this.employer.findOne({
            where : {
                id
            }
        })
        const detailEmployerDto = new DetailEmployerDto();
        Object.assign(detailEmployerDto, detailEmployer);
        const employers = await this.employer.find({
            where : {
                companyName : detailEmployer.companyName
            }
        })
        detailEmployerDto.employers = employers.map(e=>e.id)
        
        return detailEmployerDto
    }

    async readBySearch(company : string) : Promise<ListEmployerDto[]> {
        return await this.employer.createQueryBuilder('employer')
        .where('employer.companyName LIKE :companyName', {companyName : `${company}%`})
        .getMany()
    }

    async deleteEmployee(id : number) : Promise<void> {
        await this.employer.delete(id)
    }
}
