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
    var GameAtkCity = (function (_super) {
        __extends(GameAtkCity, _super);
        function GameAtkCity() {
            return _super.call(this, TypeGame.ATKCITY) || this;
        }
        GameAtkCity.prototype.enter = function () {
            _super.prototype.enter.call(this);
            GameModels.user.player.xpState = TypeXpUp.STOP;
            GameModels.user.player.resetXp();
            GameModels.chapter.resetState(this, function () {
                this._view.addCityViewToScene();
                if (GameModels.chapter.data.CityId >= 1002) {
                    mg.soundManager.playBackGround("bgm_leiming");
                }
                else {
                    mg.soundManager.playBackGround("bgm_haidao");
                }
                this.enterOver();
            });
        };
        GameAtkCity.prototype.exit = function () {
        };
        return GameAtkCity;
    }(s.GameBase));
    s.GameAtkCity = GameAtkCity;
    __reflect(GameAtkCity.prototype, "s.GameAtkCity");
})(s || (s = {}));
