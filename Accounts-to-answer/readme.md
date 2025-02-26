# Getting environment Variables
There are two environment variables here, and to get yours, follow the instructions provided in the telegram documentation [here](https://core.telegram.org/api/obtaining_api_id).  
They should correspond to the following:

- **Account1_api_id=<TDLib_client_api_id>:** Retrieve the account_api_id, from the api-id provisioning web-app.
- **Account1_api_hash=<TDLib_client_api_hash>:** Retrieve the accompanying account_api_hash, from the api-id provisioning web-app.

## An extra
You setup by running either ```npm install```  or ```yarn install``` in this directory.

Finally, when you run the command ```npm run start``` for the first time, it would request extra verification for the api_id and hash provided.
Use the same number for the Telegram account used to get api_id, and you'll get sent a code to your Telegram app. input that as well, and you can now run everything smoothly.
TDLib would create directories for storage, and also cache your second verification, so you don't need to provide your number and a code everytime.