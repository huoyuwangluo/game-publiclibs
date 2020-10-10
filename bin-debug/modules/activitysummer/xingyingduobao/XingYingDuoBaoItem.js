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
var item;
(function (item_1) {
    var XingYingDuoBaoItem = (function (_super) {
        __extends(XingYingDuoBaoItem, _super);
        function XingYingDuoBaoItem() {
            var _this = _super.call(this) || this;
            _this._sound = new game.SoundItem();
            return _this;
        }
        XingYingDuoBaoItem.prototype.dataChange = function () {
            this.imgB.visible = false;
            this.imgB2.visible = false;
            this.labCount.text = "";
            if (this.dataSource) {
                var data = this.dataSource;
                var item = Templates.getTemplateById(templates.Map.ITEM, data.reward.split("_")[0]);
                this.imgIcon.source = item.icon;
                this.labCount.text = "x" + data.reward.split("_")[1];
                if (data.rewardType == 3) {
                    this.imgB.visible = true;
                }
                if (data.rewardType == 2) {
                    this.imgB2.visible = true;
                }
                this._sound.initialize('XYDB_MOVE', egret.Sound.EFFECT);
            }
        };
        XingYingDuoBaoItem.prototype.playSound = function () {
            this._sound.stop();
            this._sound.play();
        };
        /**效果 闪烁 */
        XingYingDuoBaoItem.prototype.effectFlash = function (hasSound) {
            if (hasSound === void 0) { hasSound = false; }
            this.imgSelecd.visible = true;
            egret.Tween.removeTweens(this.imgSelecd);
            this.effectFlashHandler(true, hasSound);
        };
        XingYingDuoBaoItem.prototype.effectFlashHandler = function (bool, hasSound) {
            if (!bool && hasSound)
                this.playSound();
            egret.Tween.get(this.imgSelecd).to({ scaleX: bool ? 1.2 : 1, scaleY: bool ? 1.2 : 1, alpha: bool ? 0.5 : 1 }, 60, utils.Ease.cubicInOut).call(this.effectFlashHandler, this, [!bool, hasSound]);
        };
        /**效果 亮起一次消失 */
        XingYingDuoBaoItem.prototype.effectBirghtOnce = function () {
            this.imgSelecd.visible = true;
            egret.Tween.removeTweens(this.imgSelecd);
            this.imgSelecd.alpha = 1;
            egret.Tween.get(this.imgSelecd).to({ alpha: 0 }, 500, utils.Ease.linearNone).call(this.effectHide, this);
        };
        /**效果 常亮 */
        XingYingDuoBaoItem.prototype.effectShow = function () {
            this.imgSelecd.visible = true;
            egret.Tween.removeTweens(this.imgSelecd);
        };
        /**效果 隐藏 */
        XingYingDuoBaoItem.prototype.effectHide = function () {
            this.imgSelecd.visible = false;
            egret.Tween.removeTweens(this.imgSelecd);
        };
        return XingYingDuoBaoItem;
    }(ui.XingYingDuoBaoItemSkin));
    item_1.XingYingDuoBaoItem = XingYingDuoBaoItem;
    __reflect(XingYingDuoBaoItem.prototype, "item.XingYingDuoBaoItem");
})(item || (item = {}));
