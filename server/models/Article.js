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
  }
},
{
  // Add (createdAt and updatedAt) to the document
  timestamps: true
}
);

const Article = mongoose.model('Article', ArticleSchema); // collection will be named 'articles' in the databas not 'Article' 

module.exports = Article;