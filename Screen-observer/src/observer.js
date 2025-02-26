const puppeteer = require('puppeteer');

// Browser Controller
class BrowserController {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async initialize(groupUrl){
        try {
            const launchOptions = {
                defaultViewport: {
                width: 1300,
                height: 1080,
                },
                headless: false,
                ignoreHTTPSErrors: true,
            };

            console.log("Startting Browser...");
      
            this.browser = await puppeteer.launch(launchOptions);
            this.page = await this.browser.pages().then((pages) => pages[0]);
      
            // Navigate to Telegram Channel Page
            await this.page.goto(groupUrl, { waitUntil: 'networkidle2' });
    
            // Human interface login to Telegram
            console.log('\n>> Complete Telegram via browser UI.\n');
            
        } catch (error) {
            if(this.browser){
                await this.browser.close();
            }
            throw error;
        }
    }

    async getPollAnswer(){
        try {
            const result = await this.page.evaluate(() => {
                const allPollResults = document.querySelectorAll(".poll-results");
                const lastPoll = allPollResults[allPollResults.length-1];
                const pollOptions = lastPoll.querySelectorAll('.PollOption');
        
                const index = Array.from(pollOptions).findIndex(option => {
                    const chosenIcon = option.querySelector('.poll-option-share .poll-option-chosen i.icon-check');
                        return chosenIcon !== null;
                });

                return index;
            })
            return result;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = BrowserController;