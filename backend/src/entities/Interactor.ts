import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne,JoinColumn} from "typeorm";
import {Interaction} from  "./Interaction.js";

export enum InteractorType {
    LIGAND = "ligand",
    RECEPTOR = "receptor",
    NULL = "NULL"

}

@Entity('interactor')
export class Interactor {
   
    @PrimaryGeneratedColumn()
    interactor_id!: number;

    @ManyToOne( 'Interaction', 'interactors')
    @JoinColumn({name : 'interaction_fk'})
    interaction?: Interaction;

    @Column({type : 'varchar',length:'50'})
    official_symbol!: string;

    @Column({type : 'varchar',length:'150'})
    synonyms?: string;

    @Column({
        type: "enum",
       enum: InteractorType,
       default: InteractorType.NULL
    })
    type!: string;
   
    @Column({type : 'varchar',length:'100'})
    official_name!: string;

    //alternatives_names!: string;, {nullable: true}
    //@Column("simple-array")       
    //@Column( { type : "varchar",array: true })

    @Column({type : 'varchar',length:'250'})
    alternative_names?: string[];

    @Column("blob")//BLOB
    json_feature?: string;
    //@Column("simple-json")
    //json_feature?: { name: string, nickname: string };

}
