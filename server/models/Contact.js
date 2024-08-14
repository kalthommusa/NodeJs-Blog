const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema(
{
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
},
{
  // Add (createdAt and updatedAt) to the document
  timestamps: true
}
);

const Contact = mongoose.model('Contact', contactSchema); // collection will be named 'contacts' in the databas not 'Contact' 

module.exports = Contact;
