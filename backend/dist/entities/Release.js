import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
let Release = class Release {
    release_id;
    name;
    date;
    components;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Release.prototype, "release_id", void 0);
__decorate([
    Column({ type: 'varchar', length: '100' }),
    __metadata("design:type", String)
], Release.prototype, "name", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Release.prototype, "date", void 0);
__decorate([
    OneToMany('Component', 'release'),
    __metadata("design:type", Array)
], Release.prototype, "components", void 0);
Release = __decorate([
    Entity('release')
], Release);
export { Release };
//# sourceMappingURL=Release.js.map