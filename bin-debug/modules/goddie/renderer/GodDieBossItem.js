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
    var GodDieBossItem = (function (_super) {
        __extends(GodDieBossItem, _super);
        function GodDieBossItem() {
            var _this = _super.call(this) || this;
            _this._time = 0;
            return _this;
        }
        GodDieBossItem.prototype.initializeData = function (vo /*n.ProtoShenYunZhiDiBoss*/) {
            if (!this._vo) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }
            this._vo = vo;
            if (vo) {
                var bossData = GameModels.sceneGodDie.getMonsterData(vo.MonsterId);
                var copyData = GameModels.sceneGodDie.getCopyData(vo.CopyId);
                this.headIcon.source = ResPath.getBossIconSmall(bossData.resId);
                this.labName.text = bossData.name + "(" + convert.getLevelName(copyData.openLv) + ")";
                this._time = vo.RefreshTime;
                this.updateTime();
                utils.timer.loop(1000, this, this.updateTime);
            }
        };
        GodDieBossItem.prototype.updateTime = function () {
            if (this._time > 0) {
                this._time--;
            }
            if (this._time > 0) {
                this.RecoverTime.text = Language.getExpression(Language.E_1HSX, utils.DateUtil.formatTimeLeft(this._time));
            }
            else {
                this.RecoverTime.text = "";
            }
        };
        GodDieBossItem.prototype.onClick = function (e) {
            //mg.alertManager.showAlert(GodDieBossTip, true, true, this._vo);
        };
        GodDieBossItem.prototype.clear = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            utils.timer.clearAll(this);
        };
        return GodDieBossItem;
    }(ui.GodDieBossItemSkin));
    renderer.GodDieBossItem = GodDieBossItem;
    __reflect(GodDieBossItem.prototype, "renderer.GodDieBossItem");
})(renderer || (renderer = {}));
