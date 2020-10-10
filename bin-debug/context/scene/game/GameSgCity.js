var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var s;
(function (s) {
    var GameSgCity = (function (_super) {
        __extends(GameSgCity, _super);
        function GameSgCity() {
            return _super.call(this, TypeGame.CITY) || this;
        }
        GameSgCity.prototype.enter = function () {
            _super.prototype.enter.call(this);
            GameModels.user.player.xpState = TypeXpUp.STOP;
            GameModels.user.player.resetXp();
            GameModels.chapter.resetState(this, function () {
                if (GameModels.user.player.level > app.GameContext.enterCityLevel && app.gameContext.isFirstStartGame && GameModels.chapter.chapterReward > 0) {
                    app.gameContext.exitToMainGame();
                }
                else {
                    this._view.addCityViewToScene();
                    mg.soundManager.playBackGround("bgm_maincity");
                }
                this.enterOver();
            });
        };
        GameSgCity.prototype.exit = function () {
        };
        return GameSgCity;
    }(s.GameBase));
    s.GameSgCity = GameSgCity;
    __reflect(GameSgCity.prototype, "s.GameSgCity");
})(s || (s = {}));
