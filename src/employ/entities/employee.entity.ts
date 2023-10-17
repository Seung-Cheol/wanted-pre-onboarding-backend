import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Employee')
export class Employee {
    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public userId : number;

    @Column()
    public employerId : number
}