const express = require('express');
const BrowserController = require('./observer');
const PORT = process.env.PORT || 3000;

const app = express();

const telegramGroupUrl = 'https://web.telegram.org/a/#-1001628293578';

// Create Browser Instance
const browser = new BrowserController();
(async () => {
    await browser.initialize(telegramGroupUrl);
})();


// Endpoint listening for poll answer
app.post('/getPollAnswer', async (req,res) => {
    try {
        const pollAnswer = await browser.getPollAnswer();
        res.status(200).json({msg: "Poll Answer", pollAnswer});
    } catch (error) {
        res.status(500).json({msg: "An error occured" , error: error.message})
    }
})

app.listen(PORT, ()=>{
    console.log(`Browser observer listening on port ${PORT}`);
})