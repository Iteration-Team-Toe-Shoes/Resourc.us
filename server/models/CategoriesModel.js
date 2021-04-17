const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  timestamps: true, 
  createdAt: "created_at", 
  updatedAt: "updated_at"
};

const CategoriesSchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true,  
  },
  mentionCount: {
    type: Number, 
    required: true,
    default: 0 
  },
  tags: [{
    type: Schema.Types.ObjectId, 
    ref: 'tags',
  }],
}, options);

var Categories = mongoose.model('categories', CategoriesSchema);
module.exports = { Categories };