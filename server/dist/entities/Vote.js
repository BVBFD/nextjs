"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// import Comment from './Comment';
const Entity_1 = __importDefault(require("./Entity"));
const Post_1 = __importDefault(require("./Post"));
const User_1 = require("./User");
let Vote = class Vote extends Entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vote.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'username', referencedColumnName: 'username' }),
    __metadata("design:type", User_1.User)
], Vote.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vote.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Vote.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.default),
    __metadata("design:type", Post_1.default)
], Vote.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Vote.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Comment),
    __metadata("design:type", Comment)
], Vote.prototype, "comment", void 0);
Vote = __decorate([
    (0, typeorm_1.Entity)('votes')
], Vote);
exports.default = Vote;
