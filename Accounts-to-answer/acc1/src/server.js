const express = require('express');
const Client = require('./tgClient');

const PORT = process.env.PORT || 5000;
const app = express();

const tgClient = new Client();
(async () => {
    await tgClient.initializeClient();
})();


app.post('/answerPollCorrectly', async (req, res) => {
    let { messageId, option } = req.query;
    if (!messageId || !option) {
        return res.status(400).send('Invalid parameters');
    }

    try {
        messageId = parseInt(messageId);
        option = parseInt(option);

        console.log('Sending poll response:', messageId, [option]);
        await tgClient.answerPoll(messageId, [option]);
        res.status(200).json({msg: 'Poll response sent successfully'});
    } catch (error) {
        console.error('Error sending poll response:', error);
        res.status(500).json({msg: 'Error in sending poll response', error: error.message});
    }
});


app.listen(PORT, ()=>{
    console.log(`Account 1 listening on port ${PORT}`);
})