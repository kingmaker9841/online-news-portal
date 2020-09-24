const mongoose = require('mongoose');
const newsCategory = mongoose.Schema({
    name : {type: String, required: true}
});
const Categories = mongoose.model('categories', newsCategory);
module.exports = Categories;