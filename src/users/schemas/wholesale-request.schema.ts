import * as mongoose from 'mongoose';

export const WholesaleRequestSchema = new mongoose.Schema({
    name: String,
    company: String,
    inn: String,
    email: String,
    phone: String,
    date: Date
});