const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
{
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }/*,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }*/
},
{
  // Add (createdAt and updatedAt) to the document
  timestamps: true
}
);

module.exports = mongoose.model('Article', ArticleSchema); // collection will be named 'articles' not 'Article' in the database