module.exports = function (router) {

    // device selected
    router.beforeEach(function (transition) {
        let device = localStorage.getItem('device');
        if (transition.to.device) {
            if (!device || device === null) {
                localStorage.removeItem('device');
                transition.redirect('/wizard');
            }
        }
        transition.next()
    });


};