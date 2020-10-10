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
    var GameShiLiTa1 = (function (_super) {
        __extends(GameShiLiTa1, _super);
        function GameShiLiTa1(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this, type ? type : TypeGame.SHILITA_1) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameShiLiTa1.prototype.enter = function (copyVo) {
            if (copyVo instanceof vo.CopyVO)
                this._copyVO = copyVo;
            _super.prototype.enter.call(this, copyVo ? this._copyVO.template.map : copyVo);
        };
        GameShiLiTa1.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.bingfensanlu;
        };
        GameShiLiTa1.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
        };
        return GameShiLiTa1;
    }(s.GameSiginPlayerBoss));
    s.GameShiLiTa1 = GameShiLiTa1;
    __reflect(GameShiLiTa1.prototype, "s.GameShiLiTa1");
})(s || (s = {}));
