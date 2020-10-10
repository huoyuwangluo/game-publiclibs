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
    var GameChapterCity = (function (_super) {
        __extends(GameChapterCity, _super);
        //private _curBossVO: vo.GameMonsterVO
        //private _npcs: GameNpc[];
        //private _shenlongjuqing = false; //神龙剧情
        //private _tartMovie: s.DragonBoneMovieClip;
        function GameChapterCity(type) {
            return _super.call(this, TypeGame.DOOR_BOSS) || this;
            //this._countdownValue = 0;
            //this._delayTime = 2.5;
        }
        GameChapterCity.prototype.displayMyPlayer = function () {
            //super.displayMyPlayer(AISmartSync);
            this._player.initialize(GameModels.user.player);
            this._player.showStartProAdd();
        };
        return GameChapterCity;
    }(s.GameChapterBoss));
    s.GameChapterCity = GameChapterCity;
    __reflect(GameChapterCity.prototype, "s.GameChapterCity");
})(s || (s = {}));
