# Answer Polls 4 Me
This is a very interesting program I developed, which allows me win every Telegram Poll quiz, with a 100% accuracy, and almost impossible time. It can be easily scaled to about as many accounts as well.

<br>

- **A little backstory:**  A while back, about a two years or more now, I used to be in a group where crypto quizzes were held on Telegram with Polls once every week (Sundays). For each session, three winners were picked based on how many correct answers they provided, and if there was a tie, who answered the fastest (an aggregate of the time taken to answer each poll questions) was picked. The first got around 10 USD, and the second and third shared 15 USD. Based on my knowledge in the space, answering the questions wasn't the hardest part, dealing with the pressure, the human time delay (time from reading the question to accurately clicking the right answer. I sometimes accidentally clicked the wrong ones even though I knew the right answer). For each weekend, I was always around, and it was a battle amongst thousands, as the group had over 5,000 members. I managed to win on 2 occasions in about 6weeks or so.. I was either coming 4th, 7th, or 10th. That was when I asked myself, how about, I come first all the time? Couldn't I make that happen? And I did. This repo is a testament to that. It eventually netted me quite some good earning from it. It was an intersting time. Till the group eventually winded down. The group was owned by a company that was affected in the FTX saga..

<br>

## How does it work?
There are 3 parts to the program.
- **The Poller:** This uses Telegram's TDLibrary, an open-source tool developed by Telegram, to handle interacting with Telegram's product via the API, with abstraction to it's MTProto Protocol. Using this, I can listen and use almost everythiing a native Android or iOS app, or even the web App provides. Listening to messages from individuals, groups, channels, sending messages, images, creating polls, and most importantly, interacting to polls. In the poller, I observed the combot is mostly used in all of the polls, So to get only poll messages, from a group, I listen in a group, using the group-id, and listen for only messages from combot, with its id, and finally check if the type of message I got if previous conditions are satisfied, is a type of poll.

    - From my observation, I realized Telegram musthave thought about it, and not allowed the result of the poll be transferred back to the user, hence, whenever I interact with the poll programmatically, I could not get back if my selection was right or wrong. I tried everything. There was just no interaction response, and I could not check back again for that message, it got closed. I was about giving up here, when I used the web-app for answering, and I observed that even if Telegram would not respond, there was a UI change when a response was provided. green colored bar and a 'check' icon if the right answer was selected, a red colored bar, and a 'cancel' icon, if the answer was wrong. This easily led to the next part.


- **The screenObserver:** I have worked with puppeteer on many occasions, and one of the earliest paid gigs I ever got was from a friend, to automate scalping an auction site. So I knew puppeteer could come to the rescue here. Armed with an idea and a skill, I started. It was a simple puppeteer application. All it had to do was spin up a browser, authenticat with the same Telegram account as the ```Poller```, head into the group where the poll was taking place, and by watching and querying the DOM, I could get just the latest polls. I also did something a little creative, when I get the latest poll, I find whichever has the 'check' icon, and get it's index, and voila.

    - So the flow, I set up a server/client process with Express for the Poller to communicate with the screenObserver. The screenObserver is setup and running before the polling begins, and the server listening on an endpoint. When the poller receives a poll message, it answers the Poll by choosing a random answer. It then wait about 500ms, for its poll response to render on the web-UI. It sends a message to screenObserver to observe the result of its selection in the web UI. The screenObserver gets the latest poll, drills down to the elements with the options, and finds which has the 'check' icon(check icon and green color is only used on the correct option, either correctly selected or not), and it almost instantenously finds it. All of these happens under microseconds. Finding it leads us to the third and last part.


- **Accounts-to-Answer:** The poller is the random chooser account, it is not in the game to win, rather, to help others win. Hence accounts that need to win needs to be provided. This follows almost the exact structure as the Poller, but it listens for answers, not make random ones. And with TDLib, interact with polls, and in this case accurately answers them. Using Express again, I set up a listener, on a different port from the screenObserver. When the screenObserver get the index for the right answer by querying the web-UI DOM, it immediately sends that to any of the accounts to answer endpoint waiting and listening for it. With this approach, multiple accounts can be setup to listen and answer simultaneoulsy, with some timing configurations to set the 1st responder down to the last.

This, my friends, is how I achieved this.
It is expected you run this locally, and then shutdown everything when done..

How to get the environment variables are explained in their respective readme files.
- **Accounts-to-answer:** Env readme [here](https://github.com/eebod/Answer-poll-4-me/blob/main/Accounts-to-answer/readme.md)
- **Poller:** Env readme [here](https://github.com/eebod/Answer-poll-4-me/blob/main/Poller/readme.md)
- **Screen-observer:** Env readme [here](https://github.com/eebod/Answer-poll-4-me/blob/main/Screeen-observer/readme.md)


## Watch me use this project
<!-- [![Watch me use this project](<img-link>)](<video-url>)  
Click on Image to Youtube video or use link: <video-url> -->


## Help Improve
You can also contribute to improving how this works, by sending in a pull request. It can be to fix a problem, improve a section, or to add a new feature.


## Reach me
This was written and developed by me, Ebode.
You can find more adventurous solutions I have developed in my corner [here](https://ebode.dev).
