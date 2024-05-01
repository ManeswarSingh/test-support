const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/send', (req, res) => {
    res.render('response'); // Render the response form
});

router.post('/send', async (req, res) => {
    const { senderEmail, senderPassword, recipientEmail, response } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: senderEmail, // Use sender's email address
            pass: senderPassword // Use sender's password
        }
    });

    // Define email options
    const mailOptions = {
        from: senderEmail, // Sender address
        to: recipientEmail, // Recipient address
        subject: 'Response to your ticket', // Email subject
        text: response // Email body
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.send('Response sent successfully');
    } catch (error) {
        console.error('Error sending response:', error);
        res.status(500).send('Error sending response');
    }
});

module.exports = router;
