import * as mongoose from 'mongoose';

export const CallRequestSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: Date 
});