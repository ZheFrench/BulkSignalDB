import {Entity, PrimaryGeneratedColumn, Column,JoinColumn,OneToMany,ManyToOne} from "typeorm";
import {Component} from "./Component.js";
import {Interactor} from  "./Interactor.js";

@Entity('interaction')
export class Interaction {
   
    @PrimaryGeneratedColumn()
    interaction_id!: number;

    @ManyToOne('Component', 'interactions')
    @JoinColumn({name : 'component_fk'})
    component?: Component;

    @OneToMany( 'Interactor' , 'interaction')
    interactors?: Interactor[];

    @Column({ type: 'date' })
    date!: string;

    @Column({type : 'varchar',length:'50'})
    source!: string;

    @Column({type : 'varchar',length:'50'})
    pmid?: string;

    @Column({type : 'varchar',length:'300'})
    note?: string;

}
