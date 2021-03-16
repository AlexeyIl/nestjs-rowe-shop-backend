import * as mongoose from 'mongoose';

export const FilterListSchema = new mongoose.Schema({
  all: {
    sae: [String],
    pack: [Number],
  },
  auto: {
    sae: [String],
    pack: [Number],
  },
  moto: {
    sae: [String],
    pack: [Number],
  },
  transmission: {
    sae: [String],
    pack: [Number],
  },
  commercial: {
    sae: [String],
    pack: [Number],
  },
  agriculture: {
    sae: [String],
    pack: [Number],
  },
  antifreeze: {
    sae: [String],
    pack: [Number],
  },
  grease: {
    sae: [String],
    pack: [Number],
  },
  brake: {
    sae: [String],
    pack: [Number],
  },
  industrial: {
    sae: [String],
    pack: [Number],
  },
  marine: {
    sae: [String],
    pack: [Number],
  },
});
