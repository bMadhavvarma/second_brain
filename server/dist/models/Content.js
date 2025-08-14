"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentType = ['image', 'note', 'video', 'audio', 'article', 'youtube', 'twitter', 'facebook'];
const ContentSchema = new mongoose_1.default.Schema({
    title: {
        type: String, // fixed: should be String, not 'string'
        required: true,
    },
    link: {
        type: String,
    },
    type: {
        type: String,
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
}, { timestamps: true }); // <-- Adds createdAt & updatedAt automatically
const TagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true }); // Optional: if you also want createdAt for tags
const Tag = mongoose_1.default.model('Tag', TagSchema);
exports.Tag = Tag;
const Content = mongoose_1.default.model('Content', ContentSchema);
exports.Content = Content;
