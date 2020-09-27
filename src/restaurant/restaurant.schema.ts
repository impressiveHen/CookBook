import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  rate: {
      type: Number,
      min: 1,
      max: 5
  },
  address: {
      type: String
  },
  category: {
      type: String
  }
});