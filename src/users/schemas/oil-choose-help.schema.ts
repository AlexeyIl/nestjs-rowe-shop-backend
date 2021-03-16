import * as mongoose from 'mongoose';

export const OilRequestSchema = new mongoose.Schema({
    name: String,
    phone: String,
    carBrand: String,
    carModel: String,
    year: String,
    engine: String,
    transmission: String,
    date: Date
});