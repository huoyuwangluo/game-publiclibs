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
    var GameRobot = (function (_super) {
        __extends(GameRobot, _super);
        //private _master:GamePlayer;
        function GameRobot() {
            return _super.call(this, TypeActor.ROBOT) || this;
        }
        GameRobot.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._master = null;
        };
        return GameRobot;
    }(s.GamePlayer));
    s.GameRobot = GameRobot;
    __reflect(GameRobot.prototype, "s.GameRobot");
})(s || (s = {}));
