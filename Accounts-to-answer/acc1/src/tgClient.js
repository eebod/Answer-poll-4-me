require('dotenv').config();
const tdl = require('tdl')
const { getTdjson } = require('prebuilt-tdlib');
tdl.configure({tdjson: getTdjson()})

class Client {
    constructor() {
        this.client = null;
        this.group = -1001628293578; //quikEC Group
    }

    async initializeClient() { 
        try {
            // Create new instance
            this.client = tdl.createClient({
                apiId: process.env.Account1_api_id,
                apiHash: process.env.Account1_api_hash
            })
    
            // First time login (Generate session)
            await this.client.login();

            console.log('Client initialized successfully')
        } catch (error) {
            console.error('Error in client initialization:', error)
            return null;
        }
    }

    async answerPoll(messageId, optionIds) {
        try {
            if(this.client) {
                // Verify it exists and is accessible
                const message = await this.client.invoke({
                    _: 'getMessage',
                    chat_id: this.group,
                    message_id: messageId
                })
        
                // Check if poll is still open
                if (message.content.poll.is_closed && message.content.poll.is_closed) {
                    throw new Error('Poll is already closed');
                }
        
                // Now attempt to vote
                await this.client.invoke({
                    _: 'setPollAnswer',
                    chat_id: this.group,
                    message_id: messageId,
                    option_ids: optionIds
                })
            }else {
                console.error('Client is not initialized');
            }
        } catch (error) {
          console.error('Error in poll interaction:', error)
          throw error
        }
    }
}


module.exports = Client;