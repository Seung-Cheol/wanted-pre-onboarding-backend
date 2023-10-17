import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { EmployService } from './employ.service';
import { PostEmployerDto } from './dto/postEmployer.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApplyEmployeeDto } from './dto/applyEmployee.dto';

@Controller('employ')
export class EmployController {
    constructor(
        private readonly employService : EmployService
    ){}

    //공고에 등록합니다
    @Post('')
    @HttpCode(201)
    async postEmploy(@Body() postEmployerDto: PostEmployerDto) {
        await this.employService.createEmployer(postEmployerDto)
        return { 
            message : '공고 등록이 완료되었습니다.'
        }
    }

    //공고를 수정합니다
    @Put(':id')
    @HttpCode(200)
    async updateEmploy(@Param('id') id: number, @Body() postEmployerDto : PostEmployerDto) {
        await this.employService.updateEmployer(id,postEmployerDto)
        return {
            message : '공고 수정이 완료되었습니다.'
        }
    }

    //공고 리스트를 조회합니다
    @Get('')
    @HttpCode(200)
    async listEmployer(@Query() paginationDto : PaginationDto) {
        const data = await this.employService.readEmployerList(paginationDto)
        return {data}
    }

    //공고 상세를 조회합니다
    @Get(':id')
    @HttpCode(200)
    async detailEmployer(@Param('id') id: number) {
        const data = await this.employService.readEmployerDetail(id)
        return {data}
    }

    //공고를 검색합니다
    @Get('search')
    @HttpCode(200)
    async searchEmployer(@Query('company') company : string) {
        const data = await this.employService.readBySearch(company)
        return {data}
    }

    //공고에 지원합니다
    @Post('apply')
    @HttpCode(201)
    async applyEmployee(applyEmployeeDto : ApplyEmployeeDto) {
        await this.employService.createEmployee(applyEmployeeDto)
        return {
            message : '지원에 성공하였습니다'
        }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteEmployer(@Param('id') id : number) {
        await this.employService.deleteEmployee(id)
        return {
            message :'삭제에 성공했습니다.'
        }
    }


}
