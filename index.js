const alexaUtterances = require('alexa-utterances');

module.exports = (app, intentsObj) => {
    Object.keys(intentsObj).forEach((intentName) => {
        const intent = intentsObj[intentName];
        const action = intentsObj[intentName].action;

        if (intent.utterances) {
            intent.utterances = intent.utterances.reduce(
                (acc, utterance) => acc.concat(alexaUtterances(utterance, intent.slots, intent.dictionary, false)),
                []
            );
        }
        delete intent.dictionary;
        delete intent.action;
        app.intent(intentName, intent, action);
    });
    return app;
};
