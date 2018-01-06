# alexa-app-intent-generator

[![Greenkeeper badge](https://badges.greenkeeper.io/ericblade/alexa-app-intent-generator.svg)](https://greenkeeper.io/)

Simplified intent generation for the node alexa-app lib.

Adds individual intent dictionary, as well as a more declarative syntax for the entire
intent generation process.

Adds session (alexa-app request.getSession()) as third parameter to all intent calls.
For applications that use session, you're going to need it in probably every intent, so
might as well eliminate the boilerplate associated with it.

Please read the documentation for those libraries.

# Example:

```javascript
const AlexaApp = require('alexa-app');
const intentGenerator = require('alexa-app-intent-generator');

let app = new AlexaApp.app('test');

app.pre = (req, res, type) => {
    // do pre processing here
};

app.error = (exception, req, res) => {
    res.say(`I'm sorry, I encountered an error: ${exception.toString()}.}`);
};

app.launch((req, res) => {
    res.say('Greetings, Program!');
});

const queryDataFromRemote = () => {
    return new Promise((resolve, reject) => {
        // go and get some data from a remote server
        // and resolve it when you get it, or reject it on error
    });
};

const intents = {
    queryData: {
        action: (req, res) => {
            return queryDataFromRemote().then((data) => {
                res.say(`Received data ${data}`);
            }).catch((err) => {
                res.say(`I'm sorry, I was unable to retrieve the data, because ${JSON.stringify(err)}.`);
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
module.exports = app;
```
