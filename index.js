module.exports = (app, intentsObj) => {
    const origDictionary = app.dictionary ? Object.assign({}, app.dictionary) : {};

    Object.keys(intentsObj).forEach((intentName) => {
        const intent = intentsObj[intentName];
        const action = intentsObj[intentName].action;

        // add session as a parameter to intent actions, to eliminate
        // the constant "const session = req.getSession()" boilerplate
        const actionWithSession = () => (req, res) => {
            const session = req.getSession();
            action(req, res, session);
        };

        // while alexa-app does provide a dictionary function, it is app wide,
        // but I see it being also useful, declaratively, on a per-intent basis,
        // so this mutates the app dictionary on a per-intent basis allowing a
        // dictionary object for each intent, as well as the app wide dictionary.
        if (intent.dictionary) {
            app.dictionary = Object.assign({}, origDictionary, intent.dictionary);
            delete intent.dictionary;
        }

        delete intent.action;

        app.intent(intentName, intent, actionWithSession());

        // restore the dictionary to it's original status before moving on
        app.dictionary = origDictionary;
    });

    return app;
};
