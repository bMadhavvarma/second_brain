import mongoose from "mongoose";

import User from "./User";

const contentType = ['image','note', 'video', 'audio', 'article', 'youtube', 'twitter', 'facebook',];

const ContentSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true }); // <-- Adds createdAt & updatedAt automatically

const TagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true }); // Optional: if you also want createdAt for tags

const Tag = mongoose.model('Tag', TagSchema);
const Content = mongoose.model('Content', ContentSchema);

export { Content, Tag };
