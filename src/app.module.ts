import { Module } from '@nestjs/common';
import { EmployModule } from './employ/employ.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employ/entities/employee.entity';
import { Employer } from './employ/entities/employer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        port: 3306,
        database: process.env.DB_DBNAME,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [
            Employee,
            Employer 
        ], 
        synchronize:true
    }),
    EmployModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
