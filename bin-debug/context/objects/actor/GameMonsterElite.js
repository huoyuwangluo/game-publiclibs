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
    var GameMonsterElite = (function (_super) {
        __extends(GameMonsterElite, _super);
        function GameMonsterElite() {
            return _super.call(this, TypeActor.MONSTERELITE) || this;
        }
        GameMonsterElite.prototype.initialize = function (vo) {
            _super.prototype.initialize.call(this, vo);
            this.scaleX = this.scaleY = GameModels.setting.eliteScaleFactor;
            this.titleColor = 0x6633CC;
            this.nameVisible = true;
        };
        return GameMonsterElite;
    }(s.GameMonster));
    s.GameMonsterElite = GameMonsterElite;
    __reflect(GameMonsterElite.prototype, "s.GameMonsterElite");
})(s || (s = {}));
