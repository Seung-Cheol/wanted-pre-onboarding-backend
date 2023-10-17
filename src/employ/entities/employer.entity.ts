import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Employer')
export class Employer {
    @PrimaryGeneratedColumn()
    public id : number;

    @Column({
        unique: true
    })
    public companyName : string;

    @Column()
    public position : string;

    @Column()
    public reward : number;

    @Column()
    public stack : string

    @Column()
    public content : string

    @Column()
    public nation : string
    
    @Column()
    public region : string
}