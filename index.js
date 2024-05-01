const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ticketRoutes = require("./routes/ticket.js")
const Ticket = require('./models/ticket.models');
const respondRoutes = require("./respond.js")

const MONGODB_URI = 'mongodb+srv://singhmaneshwar08:singh@cluster0.8bwauss.mongodb.net'
const DB_NAME = 'ticket'
mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
.then((e)=>{
    console.log('mongodb connected')
})


const app = express()
PORT = 8000

app.set('view engine',"ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended:false}))
// app.use(cookieParser())


app.get('/',(req,res)=>{
    res.render('home')
})

app.use("/ticket",ticketRoutes)
app.get('/success',(req,res)=>{
    res.render('success')
})

app.get('/admin',async(req,res)=>{
    try {
        const tickets = await Ticket.find();
        res.render('admin', { tickets });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).send('Error fetching tickets');
    }
})

app.use('/response',respondRoutes)

app.listen(PORT,()=>{console.log(`app listening on port ${PORT}`);})