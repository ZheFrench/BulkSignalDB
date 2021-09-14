import {Entity, PrimaryGeneratedColumn, Column,OneToMany} from "typeorm";
import {Component} from  "./Component.js";

@Entity('release')
export class Release {
   
    @PrimaryGeneratedColumn()
    release_id!: number;

    @Column({type : 'varchar',length:'100'})
    name!: string;

    @Column({ type: 'date' })
    date!: string;

   @OneToMany( 'Component' , 'release')
   components?: Component[];
}
