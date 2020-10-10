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
    var GameExpeditionSupport = (function (_super) {
        __extends(GameExpeditionSupport, _super);
        function GameExpeditionSupport(type) {
            return _super.call(this, TypeGame.EXPEDITION_SUPPORT) || this;
        }
        GameExpeditionSupport.prototype.displayMyPlayer = function () {
            //super.displayMyPlayer(AISmartSync);
            this._player.initialize(GameModels.user.player);
            this._player.showStartProAdd();
        };
        return GameExpeditionSupport;
    }(s.GameExpedition));
    s.GameExpeditionSupport = GameExpeditionSupport;
    __reflect(GameExpeditionSupport.prototype, "s.GameExpeditionSupport");
})(s || (s = {}));
