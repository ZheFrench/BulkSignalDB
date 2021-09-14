import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Component } from "./Component.js";
let Interaction = class Interaction {
    interaction_id;
    component;
    interactors;
    date;
    source;
    pmid;
    note;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Interaction.prototype, "interaction_id", void 0);
__decorate([
    ManyToOne('Component', 'interactions'),
    JoinColumn({ name: 'component_fk' }),
    __metadata("design:type", Component)
], Interaction.prototype, "component", void 0);
__decorate([
    OneToMany('Interactor', 'interaction'),
    __metadata("design:type", Array)
], Interaction.prototype, "interactors", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Interaction.prototype, "date", void 0);
__decorate([
    Column({ type: 'varchar', length: '50' }),
    __metadata("design:type", String)
], Interaction.prototype, "source", void 0);
__decorate([
    Column({ type: 'varchar', length: '50' }),
    __metadata("design:type", String)
], Interaction.prototype, "pmid", void 0);
__decorate([
    Column({ type: 'varchar', length: '300' }),
    __metadata("design:type", String)
], Interaction.prototype, "note", void 0);
Interaction = __decorate([
    Entity('interaction')
], Interaction);
export { Interaction };
//# sourceMappingURL=Interaction.js.map