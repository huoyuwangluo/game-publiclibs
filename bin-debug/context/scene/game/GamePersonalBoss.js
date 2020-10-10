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
    var GamePersonalBoss = (function (_super) {
        __extends(GamePersonalBoss, _super);
        function GamePersonalBoss() {
            var _this = _super.call(this, TypeGame.PERSONAL_BOSS) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GamePersonalBoss.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.copyboss;
        };
        GamePersonalBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
        };
        GamePersonalBoss.prototype.enter = function (copyVO) {
            this._copyVO = copyVO;
            this._scene.clear(true);
            this._isEnter = true;
            this._isEnterOver = false;
            this.enterMap(this._copyVO.template.map);
        };
        GamePersonalBoss.prototype.start = function () {
            _super.prototype.start.call(this);
            this._scene.cameraManager.lookAt(this._player);
        };
        GamePersonalBoss.prototype.onStartGame = function () {
        };
        GamePersonalBoss.prototype.startHandler = function () {
            _super.prototype.startHandler.call(this);
            copy.CopyMainView.instance.showBossBlood(GameModels.scene.sights[0]);
        };
        return GamePersonalBoss;
    }(s.GameSiginPlayerBoss));
    s.GamePersonalBoss = GamePersonalBoss;
    __reflect(GamePersonalBoss.prototype, "s.GamePersonalBoss");
})(s || (s = {}));
