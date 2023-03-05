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
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const helpers_1 = require("utils/helpers");
const Entity_1 = __importDefault(require("./Entity"));
const Sub_1 = __importDefault(require("./Sub"));
const User_1 = require("./User");
const Vote_1 = __importDefault(require("./Vote"));
const Comment_1 = __importDefault(require("./Comment"));
let Post = class Post extends Entity_1.default {
    get url() {
        return `/r/${this.subName}/${this.identifier}/${this.slug}`;
    }
    get commentCount() {
        return this.comments.length;
    }
    get voteScore() {
        return this.votes.reduce((memo, curt) => memo + (curt.value || 0), 0);
    }
    setUserVote(user) {
        const index = this.votes.findIndex((v) => v.username === user.username);
        this.userVote = index > -1 ? this.votes[index].value : 0;
    }
    makeIdAndSlug() {
        this.identifier = (0, helpers_1.makeId)(7);
        this.slug = (0, helpers_1.slugify)(this.title);
    }
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "subName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.posts),
    (0, typeorm_1.JoinColumn)({ name: 'username', referencedColumnName: 'username' }),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sub_1.default, (sub) => sub.posts),
    (0, typeorm_1.JoinColumn)({ name: 'subName', referencedColumnName: 'name' }),
    __metadata("design:type", Sub_1.default)
], Post.prototype, "sub", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
    // 하나의 Post에 여러개의 Comment가 있음
    ,
    (0, typeorm_1.OneToMany)(() => Comment_1.default, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
    // 하나의 Post에 여러개의 Vote가 있음
    ,
    (0, typeorm_1.OneToMany)(() => Vote_1.default, (vote) => vote.post),
    __metadata("design:type", Array)
], Post.prototype, "votes", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Post.prototype, "url", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Post.prototype, "commentCount", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Post.prototype, "voteScore", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Post.prototype, "makeIdAndSlug", null);
Post = __decorate([
    (0, typeorm_1.Entity)('posts')
], Post);
exports.default = Post;
