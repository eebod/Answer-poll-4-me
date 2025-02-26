require('dotenv').config()
const tdl = require('tdl')
const { getTdjson } = require('prebuilt-tdlib');
tdl.configure({tdjson: getTdjson()})
const axios = require('axios')

// Configuration object
const config = {
  apiId: process.env.Account1_api_id,
  apiHash: process.env.Account1_api_hash,
}

// Detail for group and poll account
const deets = {
    group: -1001628293578, //quikEC Group
    target: 983000232, // Combot poll bot
}

async function initializeClient() {
    try {
        // Create new instance
        const client = tdl.createClient({
            apiId: config.apiId,
            apiHash: config.apiHash
        })

        // First time login (Generate session)
        await client.login()
        client.invoke

        return client
    } catch (error) {
        console.error('Error in client initialization:', error)
        return null;
    }
}

async function listenForMessages(client, targetGroupId, targetSender) {
  client.on('update', async update => {
    if (update._ === 'updateNewMessage') {
      const message = update.message
      // Check if message is from target group
      if (message.chat_id === targetGroupId) {
        // Check if message is from target sender
        if(message.sender_id.user_id == targetSender){
            // Confirming the message is a Poll
            if(message.content._ === 'messagePoll'){
                const randomOption = Math.floor(Math.random() * message.content.poll.options.length)
                await answerPoll(client, message.chat_id, message.id, [randomOption])
                console.log("Poll received and answered!!")
            }
        }
      }
    }
  })
}

async function answerPoll(client, chatId, messageId, optionIds) {
    try {
        // Verify it exists and is accessible
        const message = await client.invoke({
            _: 'getMessage',
            chat_id: chatId,
            message_id: messageId
        })
    
        // Check if poll is still open
        if (message.content.poll.is_closed) {
            throw new Error('Poll is already closed')
        }
    
        // Now attempt to vote
        await client.invoke({
            _: 'setPollAnswer',
            chat_id: chatId,
            message_id: messageId,
            option_ids: optionIds
        })

        // wait half a second for Answer to render on UI
        await new Promise(resolve => setTimeout(resolve, 500))

        // Alert server to selected answer
        const response = await axios.post('http://localhost:3000/getPollAnswer');
        const pollAnswer = response.data.pollAnswer;

        console.log('Poll Answer:', pollAnswer) 

        // Send Correct response to other accounts
        // Account 1
        const doNtn = await axios.post(`http://localhost:5000/answerPollCorrectly?messageId=${messageId}&option=${pollAnswer}`);

    } catch (error) {
      console.error('Error in poll interaction:', error)
      throw error
    }
}

async function main() {
  try {
    // Initialize client
    const client = await initializeClient();
    if (client) {
        await listenForMessages(client,deets.group, deets.target)
        console.log('Poller is running and listening for Messages...')
    }
  } catch (error) {
    console.error('Error:', error)
    return null;
  }
}

// Main Worker Caller!!
main()