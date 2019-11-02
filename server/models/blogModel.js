const mongoose = require('mongoose');

const blog = mongoose.Schema({

    title:{
        type:String,
        unique:true,
        maxLength:100,
    },

    desc:{
        type:String,
        maxLength:1000,
        require:true
    },

    images:{
        type:Array,
        default: []
    }

},{timestamps:true});

const productModel = mongoose.model('Blog',blog);

module.exports = productModel;