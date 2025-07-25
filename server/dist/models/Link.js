"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LinkSchema = new mongoose_1.default.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true },
});
// Exporting the LinkModel based on the LinkSchema
// The model represents the 'Links' collection in the database
exports.LinkModel = mongoose_1.default.model("Links", LinkSchema);
