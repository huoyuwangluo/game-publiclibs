var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mg;
(function (mg) {
    mg.stageManager = mg.StageManager.instance;
    mg.layerManager = mg.LayerManager.instance;
    mg.uiManager = mg.UIManager.instance;
    mg.dialogManager = mg.DialogManager.instance;
    mg.assetsManager = mg.AssetsManager.instance;
    mg.remindLowManager = mg.RemindLowManager.instance;
    mg.alertManager = mg.AlertManager.instance;
    mg.remindUpManager = mg.RemindUpManager.instance;
    mg.keyBoardManager = mg.KeyBoardManager.instance;
    mg.debugManager = mg.DebugManager.instance;
    mg.effectManager = mg.EffectManager.instance;
    mg.guideManager = mg.GuideManager.instance;
    mg.soundManager = mg.SoundManager.instance;
    mg.dragonbonesManager = mg.DragonbonesManager.instance;
    mg.controlManager = mg.ControlManager.instance;
    //export let storyManager=StoryManager.instance;
    // export let tipManager=TipManager.instance;
    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.initialize = function (stage) {
            mg.stageManager.initialize(stage);
            mg.layerManager.initialize(stage);
            mg.uiManager.initialize(stage);
            mg.remindLowManager.initialize(stage);
            mg.alertManager.initialize(stage);
            if (game.GameConfig.cmd) {
                mg.keyBoardManager.initialize(stage);
                mg.debugManager.initialize(stage);
            }
            mg.effectManager.initialize(stage);
            //guideManager.initialize(stage);
            mg.remindUpManager.initialize(stage);
            mg.soundManager.initialize(stage);
            // tipManager.initialize(stage);
            mg.dragonbonesManager.initialize(stage);
            //GameManager.addLifecyclListener();
        };
        /**对egret生命周期进行监听 */
        GameManager.addLifecyclListener = function () {
            egret.lifecycle.addLifecycleListener(function (context) {
                var t = egret.getTimer();
                // custom lifecycle plugin
                context.onUpdate = function () {
                    logger.log(egret.getTimer() - t);
                    t = egret.getTimer();
                };
            });
            egret.lifecycle.onPause = function () {
                egret.ticker.pause();
            };
            egret.lifecycle.onResume = function () {
                egret.ticker.resume();
            };
        };
        return GameManager;
    }());
    mg.GameManager = GameManager;
    __reflect(GameManager.prototype, "mg.GameManager");
    mg.initialize = GameManager.initialize;
})(mg || (mg = {}));
