import { Module } from '@nestjs/common';
import { EmployController } from './employ.controller';
import { EmployService } from './employ.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Employer } from './entities/employer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Employee,
        Employer
    ])
  ],
  controllers: [EmployController],
  providers: [EmployService],
})
export class EmployModule {}
