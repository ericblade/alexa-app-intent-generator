module.exports = (app, intentsObj) => {
    const newApp = app;

    Object.keys(intentsObj).forEach((intentName) => {
        const intent = intentsObj[intentName];
        const action = intentsObj[intentName].action;

        // add session as a parameter to intent actions, to eliminate
        // the constant "const session = req.getSession()" boilerplate
        const actionWithSession = () => (req, res) => {
            const session = req.getSession();
            action(req, res, session);
        };

        // i want to declare the dictionary on a per-intent basis, as well as per-app.
        // The app will use the entire dictionary anyway, but it seems cleaner to have
        // a dictionary that is only used in a particular intent defined at that intent
        // in the declarative intent section.

        if (intent.dictionary) {
            newApp.dictionary = Object.assign({}, app.dictionary, intent.dictionary);
            delete intent.dictionary;
        }

        delete intent.action;

        newApp.intent(intentName, intent, actionWithSession());
    });

    return newApp;
};
