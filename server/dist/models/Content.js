"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentType = ['image', 'video', 'audio', 'article'];
const ContentSchema = new mongoose_1.default.Schema({
    title: {
        type: 'string',
        required: true,
    },
    link: {
        type: 'string',
    },
    type: {
        type: 'string',
        enum: contentType,
        required: true,
    },
    tag: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Tag',
            required: true,
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true, trim: true }
});
const Tag = mongoose_1.default.model('Tag', tagSchema);
exports.Tag = Tag;
const Content = mongoose_1.default.model('Content', ContentSchema);
exports.Content = Content;
