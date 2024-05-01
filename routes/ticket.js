const {Router} = require('express');
const Ticket = require('../models/ticket.models.js');



const router = Router();

router.get("/form",(req,res)=>{
    res.render('support-form')
})

router.post("/form", async(req,res)=>{
    const {name,email,urgency,message} = req.body;
    console.log(name, email)
    await Ticket.create({
        name,
        email,
        urgency,
        message
    })
    
    return res.redirect("/")
})



module.exports = router