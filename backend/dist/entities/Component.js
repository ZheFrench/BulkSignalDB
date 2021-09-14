import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Release } from "./Release.js";
let Component = class Component {
    component_id;
    release;
    interactions;
    name;
    date;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Component.prototype, "component_id", void 0);
__decorate([
    ManyToOne('Release', 'components'),
    JoinColumn({ name: 'release_fk' }),
    __metadata("design:type", Release)
], Component.prototype, "release", void 0);
__decorate([
    OneToMany('Interaction', 'component'),
    __metadata("design:type", Array)
], Component.prototype, "interactions", void 0);
__decorate([
    Column({ type: 'varchar', length: '100' }),
    __metadata("design:type", String)
], Component.prototype, "name", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Component.prototype, "date", void 0);
Component = __decorate([
    Entity('component')
], Component);
export { Component };
//# sourceMappingURL=Component.js.map