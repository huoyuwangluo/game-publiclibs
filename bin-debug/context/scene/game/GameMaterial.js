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
    var GameMaterial = (function (_super) {
        __extends(GameMaterial, _super);
        function GameMaterial(type) {
            var _this = _super.call(this, type ? type : TypeGame.MATERIAL) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameMaterial.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.material;
        };
        GameMaterial.prototype.getExitAutoOpenUITableIndex = function () {
            if (!app.gameContext.gameCurrent.copyVO) {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
            }
            if (app.gameContext.gameCurrent.copyVO.type == 201) {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
            }
            else if (app.gameContext.gameCurrent.copyVO.type == 202) {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 3;
            }
            else if (app.gameContext.gameCurrent.copyVO.type == 203) {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 2;
            }
            else {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 1;
            }
        };
        GameMaterial.prototype.enter = function (copyVO) {
            this._copyVO = copyVO;
            _super.prototype.enter.call(this, 29990);
        };
        return GameMaterial;
    }(s.GameSiginPlayerBoss));
    s.GameMaterial = GameMaterial;
    __reflect(GameMaterial.prototype, "s.GameMaterial");
})(s || (s = {}));
