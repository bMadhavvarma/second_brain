import mongoose from "mongoose";

import User from "./User";
const contentType=['image','video','audio','article'];
const ContentSchema = new mongoose.Schema({
  title:{
    type:'string',
    required:true,
  },
  link:{
    type:'string',
  },
  type:{
    type:'string',
    enum:contentType,
    required:true,
  },
  tag:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Tag',
    required:true,
  }],
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }
});
const tagSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true, trim:true}});
const Tag = mongoose.model('Tag', tagSchema);

const Content = mongoose.model('Content', ContentSchema);
export { Content, Tag };