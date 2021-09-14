import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Interaction } from "./Interaction.js";
export var InteractorType;
(function (InteractorType) {
    InteractorType["LIGAND"] = "ligand";
    InteractorType["RECEPTOR"] = "receptor";
    InteractorType["NULL"] = "NULL";
})(InteractorType || (InteractorType = {}));
let Interactor = class Interactor {
    interactor_id;
    interaction;
    official_symbol;
    synonyms;
    type;
    official_name;
    //alternatives_names!: string;, {nullable: true}
    //@Column("simple-array")       
    //@Column( { type : "varchar",array: true })
    alternative_names;
    json_feature;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Interactor.prototype, "interactor_id", void 0);
__decorate([
    ManyToOne('Interaction', 'interactors'),
    JoinColumn({ name: 'interaction_fk' }),
    __metadata("design:type", Interaction)
], Interactor.prototype, "interaction", void 0);
__decorate([
    Column({ type: 'varchar', length: '50' }),
    __metadata("design:type", String)
], Interactor.prototype, "official_symbol", void 0);
__decorate([
    Column({ type: 'varchar', length: '150' }),
    __metadata("design:type", String)
], Interactor.prototype, "synonyms", void 0);
__decorate([
    Column({
        type: "enum",
        enum: InteractorType,
        default: InteractorType.NULL
    }),
    __metadata("design:type", String)
], Interactor.prototype, "type", void 0);
__decorate([
    Column({ type: 'varchar', length: '100' }),
    __metadata("design:type", String)
], Interactor.prototype, "official_name", void 0);
__decorate([
    Column({ type: 'varchar', length: '250' }),
    __metadata("design:type", Array)
], Interactor.prototype, "alternative_names", void 0);
__decorate([
    Column("blob") //BLOB
    ,
    __metadata("design:type", String)
], Interactor.prototype, "json_feature", void 0);
Interactor = __decorate([
    Entity('interactor')
], Interactor);
export { Interactor };
//# sourceMappingURL=Interactor.js.map