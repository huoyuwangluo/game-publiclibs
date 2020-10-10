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
var XingYingDuoBaoGetAlert = (function (_super) {
    __extends(XingYingDuoBaoGetAlert, _super);
    function XingYingDuoBaoGetAlert() {
        return _super.call(this) || this;
    }
    XingYingDuoBaoGetAlert.prototype.show = function (data) {
        this.reward.visible = false;
        this.labShow.text = "";
        this.group.removeChildren();
        this.scroller.viewport.scrollV = 0;
        if (GameModels.user.player.vip >= 9) {
            this.btnFivT.visible = true;
            this.btnTen.x = 310;
        }
        else {
            this.btnFivT.visible = false;
            this.btnTen.x = 460;
        }
        if (data.length == 1) {
            var strArr = data[0].split("&");
            var str1 = strArr[1].split("_");
            var itemId = str1[0];
            var itemCount = strArr[0] == "1" ? parseInt(str1[1]) * 2 : parseInt(str1[1]);
            this.reward.visible = true;
            this.reward.labName.stroke = 1;
            this.reward.dataSource = itemId + "_" + itemCount;
        }
        else {
            for (var i = 0; i < data.length; i++) {
                if (!data[i])
                    continue;
                var strArr = data[i].split("&");
                var str1 = strArr[1].split("_");
                var itemId = str1[0];
                var itemCount = strArr[0] == "1" ? parseInt(str1[1]) * 2 : parseInt(str1[1]);
                var iconBox = new components.RewardItemBox();
                iconBox.labName.stroke = 1;
                iconBox.dataSource = itemId + "_" + itemCount;
                this.group.addChild(iconBox);
            }
        }
        if (GameModels.activitySummer.isBigReward) {
            var dataSeting = GameModels.dataSet.getDataSettingById(325001);
            var num = parseInt(dataSeting.value.split("_")[1]) * GameModels.activitySummer.xydbChouJingCount;
            this.labShow.text = Language.getExpression(Language.E_GXCDDJZN1XH2, GameModels.activitySummer.xydbChouJingCount, num);
        }
        this.btnFivT.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnAngin, this);
        this.btnTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnAngin, this);
        this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnAngin, this);
    };
    XingYingDuoBaoGetAlert.prototype.onbtnAngin = function (e) {
        var count = 0;
        if (e.currentTarget == this.btnFivT) {
            count = 50;
        }
        else if (e.currentTarget == this.btnTen) {
            count = 10;
        }
        else {
            count = 1;
        }
        GameModels.activitySummer.lunPanAngin(count);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    XingYingDuoBaoGetAlert.prototype.hide = function () {
        GameModels.activitySummer.xingyunduobaoPoolChange();
        this.reward.dataSource = null;
        this.group.removeChildren();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return XingYingDuoBaoGetAlert;
}(ui.XingYingDuoBaoGetAlertSkin));
__reflect(XingYingDuoBaoGetAlert.prototype, "XingYingDuoBaoGetAlert", ["IAlert", "egret.DisplayObject"]);
