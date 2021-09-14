import {Entity, PrimaryGeneratedColumn,JoinColumn, Column,ManyToOne,OneToMany} from "typeorm";
import {Release} from "./Release.js";
import {Interaction} from "./Interaction.js";

@Entity('component')
export class Component {
   
    @PrimaryGeneratedColumn()
    component_id!: number;

    @ManyToOne( 'Release', 'components' )
    @JoinColumn({name : 'release_fk'})
    release?: Release;

    @OneToMany('Interaction', 'component')
    interactions?: Interaction[];

    @Column({type : 'varchar',length:'100'})
    name!: string;

    @Column({ type: 'date' })
    date!: string;

}
