import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    ABC: Number,
    code: String,
    pack: Number,
    box: Number,
    weight: Number,
    price: Number,
    category: String,
    group: String,
    name: String,
    discription: String,
    pass: String,
    tech: String,
    img: String,
    sae: String,
    fullDiscription: String,
    using: String,
    benefits: String,
    recomendation: String,
    instructions: String,
    quantity: Number,
    approvs: [String],
    approvsEqual: [String],
    approvsRecomendation: [String]

});