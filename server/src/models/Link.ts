import mongoose from "mongoose";
const LinkSchema = new mongoose.Schema({
   
    hash: String,

    
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

// Exporting the LinkModel based on the LinkSchema
// The model represents the 'Links' collection in the database
export const LinkModel = mongoose.model("Links", LinkSchema);