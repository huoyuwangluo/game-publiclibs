var app;
(function (app) {
    function initialize(stage) {
        if (!game.GameConfig.isMobile)
            egret.TextField.default_fontFamily = game.GameConfig.DEFAULT_FONT_NAME;
        mg.initialize(stage);
    }
    app.initialize = initialize;
    function start() {
        utils.timer.loop(utils.ObjectPool.CHECK_INTERVAL, this, function () {
            utils.ObjectPool.destroyExpiredObjects();
        });
        utils.timer.loop(15000, this, function () {
            n.MessagePool.destroyExpiredObjects();
        });
        utils.timer.loop(30000, this, function () {
            s.SkillPool.destroyExpiredObjects(30000);
        });
        app.gameContext = new app.GameContext();
        app.gameContext.initialize();
    }
    app.start = start;
    function stop() {
        if (app.gameContext)
            app.gameContext.stop();
    }
    app.stop = stop;
})(app || (app = {}));
