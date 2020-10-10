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
var renderer;
(function (renderer) {
    var EveryAutoAlertRendder = (function (_super) {
        __extends(EveryAutoAlertRendder, _super);
        function EveryAutoAlertRendder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EveryAutoAlertRendder.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.checkBox.addEventListener(egret.Event.CHANGE, this.tapHandler, this);
        };
        EveryAutoAlertRendder.prototype.dataChanged = function () {
            var copyVO = this.data;
            if (this.data) {
                this.labName.text = copyVO.bossName;
                this.labLevel.text = convert.getLevelName(copyVO.openLevel) + '';
                var bool = GameModels.user.player.level >= copyVO.openLevel;
                if (bool) {
                    this.labState.text = Language.J_KQZDZD;
                    this.labState.textColor = 0x84786a;
                    this.checkBox.visible = true;
                }
                else {
                    this.labState.text = Language.J_WMZTZTJ;
                    this.labState.textColor = 0xc96e59;
                    this.checkBox.visible = false;
                }
                this.checkBox.selected = copyVO.autoEnter;
            }
            else {
            }
        };
        EveryAutoAlertRendder.prototype.tapHandler = function (e) {
            var _this = this;
            var copyVO = this.data;
            if (copyVO) {
                GameModels.copyBoss.requestBossAutoState(copyVO, this.checkBox.selected, this, function () {
                    if (!_this.data)
                        return;
                    _this.checkBox.selected = _this.data.autoEnter;
                    GameModels.copyBoss.disableAutoBoss();
                });
            }
        };
        return EveryAutoAlertRendder;
    }(ui.EveryAutoAlertRendderSkin));
    renderer.EveryAutoAlertRendder = EveryAutoAlertRendder;
    __reflect(EveryAutoAlertRendder.prototype, "renderer.EveryAutoAlertRendder");
})(renderer || (renderer = {}));
