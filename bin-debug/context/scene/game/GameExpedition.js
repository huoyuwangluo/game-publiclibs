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
    var GameExpedition = (function (_super) {
        __extends(GameExpedition, _super);
        function GameExpedition(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this, type ? type : TypeGame.EXPEDITION) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameExpedition.prototype.enter = function (mapId) {
            _super.prototype.enter.call(this, mapId);
        };
        GameExpedition.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.yuanzheng;
        };
        GameExpedition.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
        };
        return GameExpedition;
    }(s.GameSiginPlayerBoss));
    s.GameExpedition = GameExpedition;
    __reflect(GameExpedition.prototype, "s.GameExpedition");
})(s || (s = {}));
