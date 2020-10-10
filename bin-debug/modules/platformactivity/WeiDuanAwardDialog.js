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
        var WeiDuanAwardDialog = (function (_super) {
            __extends(WeiDuanAwardDialog, _super);
            function WeiDuanAwardDialog() {
                return _super.call(this) || this;
            }
            WeiDuanAwardDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rewards = [this.reward0, this.reward1, this.reward2];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            WeiDuanAwardDialog.prototype.enter = function () {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
                this.refeshData();
            };
            WeiDuanAwardDialog.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
            };
            WeiDuanAwardDialog.prototype.refeshData = function () {
                // var platformGift: templates.platformGift = Templates.getTemplateById(templates.Map.PLATFORMGIFT, mo.ModelPlatformActivity.WEIDUAN_GIFT);
                // if (platformGift) {
                //     var str: string[] = platformGift.rewards.split(";");
                //     for (var i = 0; i < this._rewards.length; i++) {
                //         if (str[i]) {
                //             this._rewards[i].visible = true;
                //             this._rewards[i].dataSource = str[i];
                //         }
                //         else {
                //             this._rewards[i].visible = false;
                //             this._rewards[i].dataSource = null;
                //         }
                //     }
                // }
                // this.labName.visible=false;
                // if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.qua.os == "AND" && (platform.sdk.weiduanDownload || platform.sdk.pf == "wanba_ts.93")) {
                //     this.btnReceive.source = "btn_weiduan_lq_png";
                //     this.labName.visible=true;
                // }
            };
            WeiDuanAwardDialog.prototype.onReceive = function (e) {
                if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.qua.os == "AND" && (platform.sdk.weiduanDownload || platform.sdk.pf == "wanba_ts.93")) {
                    GameModels.platformActivity.requesGetWeiDuanGift(mo.ModelPlatformActivity.WEIDUAN_GIFT);
                }
                else {
                    window.open("https://h5.qzone.qq.com/h5plus/download/1107772838?_wv=1025&via=H5.APP.YOUXINEI&autoDownload=1&hideDemo=1&newDownload=1");
                }
                mg.uiManager.remove(this);
            };
            WeiDuanAwardDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return WeiDuanAwardDialog;
        }(ui.WeiDuanAwardSkin));
        platformactivity.WeiDuanAwardDialog = WeiDuanAwardDialog;
        __reflect(WeiDuanAwardDialog.prototype, "dialog.platformactivity.WeiDuanAwardDialog");
    })(platformactivity = dialog.platformactivity || (dialog.platformactivity = {}));
})(dialog || (dialog = {}));
