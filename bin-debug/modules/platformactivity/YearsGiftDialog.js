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
var dialog;
(function (dialog) {
    var platformactivity;
    (function (platformactivity) {
        var YearsGiftDialog = (function (_super) {
            __extends(YearsGiftDialog, _super);
            function YearsGiftDialog() {
                return _super.call(this) || this;
            }
            YearsGiftDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._reward = [this.reward0, this.reward1, this.reward2];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            YearsGiftDialog.prototype.enter = function () {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnSee.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.refeshData();
            };
            YearsGiftDialog.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnSee.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                for (var i = 0; i < this._reward.length; i++) {
                    this._reward[i].dataSource = null;
                }
            };
            YearsGiftDialog.prototype.refeshData = function () {
                // if (GameModels.platformActivity.yearsGiftState == 0) {
                //     this.btnReceive.visible = true;
                //     this.imgFinsh.visible = false;
                // }
                // else {
                //     this.btnReceive.visible = false;
                //     this.imgFinsh.visible = true;
                // }
                // var platformGift: templates.platformGift = Templates.getTemplateById(templates.Map.PLATFORMGIFT, mo.ModelPlatformActivity.YEARS_GIFT);
                // if (platformGift) {
                //     var str: string[] = platformGift.rewards.split(";");
                //     for (var i = 0; i < this._reward.length; i++) {
                //         if (str[i]) {
                //             this._reward[i].visible = true;
                //             this._reward[i].dataSource = str[i];
                //         }
                //         else {
                //             this._reward[i].visible = false;
                //             this._reward[i].dataSource = null;
                //         }
                //     }
                // }
            };
            YearsGiftDialog.prototype.onBtnClick = function (e) {
                if (e.currentTarget == this.btnSee) {
                    window.open("https://mobile.qzone.qq.com/l?g=5145");
                }
                else {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    GameModels.platformActivity.requesGetYearsGift(mo.ModelPlatformActivity.YEARS_GIFT, utils.Handler.create(this, function () {
                        this.refeshData();
                    }));
                }
            };
            YearsGiftDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return YearsGiftDialog;
        }(ui.YearsGiftSkin));
        platformactivity.YearsGiftDialog = YearsGiftDialog;
        __reflect(YearsGiftDialog.prototype, "dialog.platformactivity.YearsGiftDialog");
    })(platformactivity = dialog.platformactivity || (dialog.platformactivity = {}));
})(dialog || (dialog = {}));
