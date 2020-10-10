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
    var HuoDongTaskBox = (function (_super) {
        __extends(HuoDongTaskBox, _super);
        function HuoDongTaskBox() {
            return _super.call(this) || this;
        }
        HuoDongTaskBox.prototype.dataChanged = function () {
            this.imgClose.visible = false;
            this.imgOpen.visible = false;
            if (this.data) {
                var temp = this.data;
                if (temp.holidayType == game.TypeSummerActivity.TASK) {
                    this.labJifen.text = temp.template.value + Language.C_JF;
                }
                else {
                    this.labJifen.text = temp.template.value + Language.Z_CI;
                }
                if (temp.holidayRewardState == 1) {
                    this.imgBoxBg.source = "activitySummer_json.img_summer_box_Close";
                    this.imgRedPoint.visible = true;
                    this.imgClose.visible = true;
                }
                else if (temp.holidayRewardState == 2) {
                    this.imgBoxBg.source = "activitySummer_json.img_summer_box_Close";
                    this.imgRedPoint.visible = false;
                    this.imgClose.visible = true;
                }
                else {
                    this.imgBoxBg.source = "activitySummer_json.img_summer_box_Open";
                    this.imgRedPoint.visible = false;
                    this.imgOpen.visible = true;
                }
            }
        };
        return HuoDongTaskBox;
    }(ui.HuoDongTaskBoxSkin));
    renderer.HuoDongTaskBox = HuoDongTaskBox;
    __reflect(HuoDongTaskBox.prototype, "renderer.HuoDongTaskBox");
})(renderer || (renderer = {}));
