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
    var HeFuQMBossBox = (function (_super) {
        __extends(HeFuQMBossBox, _super);
        function HeFuQMBossBox() {
            return _super.call(this) || this;
        }
        HeFuQMBossBox.prototype.dataChanged = function () {
            if (this.data) {
                var temp = this.data;
                if (temp.hefuRewardState == 1) {
                    this.imgBoxBg.source = "activityHefu_json.img_hefu_boxClose";
                    this.imgRedPoint.visible = true;
                }
                else if (temp.hefuRewardState == 2) {
                    this.imgBoxBg.source = "activityHefu_json.img_hefu_boxClose";
                    this.imgRedPoint.visible = false;
                }
                else {
                    this.imgBoxBg.source = "activityHefu_json.img_hefu_boxOpen";
                    this.imgRedPoint.visible = false;
                }
            }
        };
        return HeFuQMBossBox;
    }(ui.HeFuQMBossBoxSkin));
    renderer.HeFuQMBossBox = HeFuQMBossBox;
    __reflect(HeFuQMBossBox.prototype, "renderer.HeFuQMBossBox");
})(renderer || (renderer = {}));
