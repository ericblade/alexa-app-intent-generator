// const alexaUtterances = require('alexa-utterances');

module.exports = (app, intentsObj) => {
    Object.keys(intentsObj).forEach((intentName) => {
        const intent = intentsObj[intentName];
        const action = intentsObj[intentName].action;

        const origDictionary = app.dictionary;
        if (!origDictionary) {
            app.dictionary = intent.dictionary;
        } else if (intent.dictionary) {
            app.dictionary = Object.assign({}, app.dictionary, intent.dictionary);
        }
        delete intent.dictionary;
        delete intent.action;
        app.intent(intentName, intent, action);
        app.dictionary = origDictionary;
    });
    return app;
};
