const {Schema, model} = require('mongoose')

const ticketSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    
    urgency: {
        type: String,
        required: true,
        default:'Low',
        enum: ['High', 'Medium', 'Low'] 
    },
    message: {
        type: String,
        required: true
    }

},{timestamps:true});

const Ticket = model('Ticket', ticketSchema)

module.exports = Ticket;