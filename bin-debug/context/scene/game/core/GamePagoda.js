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
    var GamePagoda = (function (_super) {
        __extends(GamePagoda, _super);
        function GamePagoda(type) {
            var _this = _super.call(this, type) || this;
            _this.mapId = 25001;
            _this._countdownValue = 3;
            return _this;
        }
        GamePagoda.prototype.getExitAutoOpenUI = function () {
            if (this._exitOpenUI)
                return this._exitOpenUI;
            return s.UserfaceName.explorePetpagoda;
        };
        GamePagoda.prototype.getExitAutoOpenUITableIndex = function () {
            if (mo.ModelGamePagoda.COPY_SAVAGE_PAGODA == this._copyVO.type) {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 1;
            }
            else if (mo.ModelGamePagoda.COPY_LOCK_DEMON == this._copyVO.type) {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 2;
            }
            else if (mo.ModelGamePagoda.COPY_WUHUN_PAGODA == this._copyVO.type) {
                return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
            }
        };
        GamePagoda.prototype.enter = function (copyVO) {
            this._copyVO = copyVO;
            //super.enter(this._copyVO.template.map);
            _super.prototype.enter.call(this, this.mapId);
        };
        GamePagoda.prototype.exit = function () {
            copy.GamePagodaBossUI.instance.exit();
            this.stop();
            _super.prototype.exit.call(this);
            this._player.remove();
            this._scene.clear(true);
        };
        GamePagoda.prototype.start = function () {
            _super.prototype.start.call(this);
            this._player.come(500);
            //copy.CopyMainView.instance.initializePetData();
        };
        GamePagoda.prototype.startUI = function () {
            copy.GamePagodaBossUI.instance.enter(this._copyVO, this._sights[0].vo);
        };
        return GamePagoda;
    }(s.GameSiginPlayerBoss));
    s.GamePagoda = GamePagoda;
    __reflect(GamePagoda.prototype, "s.GamePagoda");
})(s || (s = {}));
