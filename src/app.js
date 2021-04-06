'use strict';

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb()
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.toIntent('DaysSinceCovidIntent');
  },

  DaysSinceCovidIntent() {
    let end_date = new Date()
    let start_date = new Date("03/11/2020")
    let length_time = end_date.getTime() - start_date.getTime()
    let days = (length_time / (1000 * 3600 * 24)) + 1
    this.ask('WelcomIntent')
    this.$speech.addText('Its been ' + Math.floor(days) + ' days since the start of the pandemic on March 11, 2020.')
    this.tell(this.$speech)
    
  },

  WelcomeIntent() {

    let welcomeMessages = 
    ["Hello, you are using 'days since covid-19'. ",
     "Thank you for using this application.",
     "This application's functionality calculates how many days since covid",
    ]
    this.$speech.addText(welcomeMessages)
    this.ask(this.$speech);
  },

  MyNameIsIntent() {
    this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
  },
});

module.exports = { app };
