import * as mongoose from 'mongoose';

export const SearchNameListSchema = new mongoose.Schema({
    name: String,
    price: Number,
    code: String
});