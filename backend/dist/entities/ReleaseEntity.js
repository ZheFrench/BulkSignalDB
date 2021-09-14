import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let Release = class Release {
    release_id;
    date;
    name;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Release.prototype, "release_id", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Release.prototype, "date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Release.prototype, "name", void 0);
Release = __decorate([
    Entity()
], Release);
export { Release };
//# sourceMappingURL=ReleaseEntity.js.map