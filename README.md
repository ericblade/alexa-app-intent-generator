# alexa-app-intent-generator

Simplified intent generation for the node alexa-app lib

This combines alexa-app and alexa-utterances into a more powerful library.

Please read the documentation for those libraries.  I'll update this README more soon.

Example:

const AlexaApp = require('alexa-app');
const intentGenerator = require('alexa-app-intent-generator');

let app = new AlexaApp.app('test');

app.pre = (req, res, type) => {
    // do pre processing here
};

app.error = (exception, req, res) => {
    response.say(`I'm sorry, I encountered an error: ${exception.toString()}.`});
};

app.launch = (req, res) => {
    response.say('Greetings, Program!');
};

const queryDataFromRemote = () => {
    return new Promise((resolve, reject) => {
        // go and get some data from a remote server
        // and resolve it when you get it, or reject it on error
    });
};

const intents = {
    queryData: {
        action: (req, res) => {
            return queryDataFromRemote().catch((err) => {
                response.say(`I'm sorry, I was unable to retrieve the data, because ${JSON.stringify(err)}.`);
            })
        },
        dictionary: {
            info: ['info','information','data','results']
        }
        utterances: [
            'retrieve {the|my|} {info}',
        ]
    }
};

app = intentGenerator(app, intents);
