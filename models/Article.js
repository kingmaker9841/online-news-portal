const mongoose = require('mongoose');
const article = mongoose.Schema({
    headline : { type: String, required: true},
    summary : { type: String},
    description: {type: String},
    publishDate: {type: Date, required: true},
    source: { type: String, required: true},
    state: { type: String},
    createdDate: {type: Date, required: true},
    lastModifiedDate: { type: Date, required: true},
    mainImage: {type: String},
    galleryImage: [{type: String}],
    category: { type: String, required: true}
});

const Article = mongoose.model('articles', article);
module.exports = Article;