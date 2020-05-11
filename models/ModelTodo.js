const { Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    keyDate: {
        type: Date,
        require: true
    },
    completed : {
        type: Boolean,
        default: false
    }

});

module.exports= model('ModelTodo', schema)
