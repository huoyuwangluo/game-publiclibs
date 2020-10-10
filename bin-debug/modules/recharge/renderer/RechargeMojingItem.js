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
    var RechargeMojingItem = (function (_super) {
        __extends(RechargeMojingItem, _super);
        function RechargeMojingItem() {
            return _super.call(this) || this;
        }
        RechargeMojingItem.prototype.dataChanged = function () {
            var dataVO = this.data;
            if (dataVO) {
                var isSdkXianLai = platform.sdk && platform.sdk.type == platform.XL;
                if (isSdkXianLai) {
                    this.imgPrice.visible = false;
                    this.imgXianLaiDiamond.visible = true;
                    this.labXianLai.visible = true;
                    this.labXianLai.text = dataVO.template.RMB * 10 + '';
                }
                else {
                    this.imgPrice.visible = true;
                    this.imgXianLaiDiamond.visible = false;
                    this.labXianLai.visible = false;
                    this.imgPrice.source = "recharge_json.img_recharge_¥" + dataVO.template.RMB;
                }
                this.imgIcon.source = "img_recharge_mj" + dataVO.template.RMB + "_png";
                this.labMoshi.text = this.getConfigValueByType(dataVO.template.everyRewards, "2501");
                if (dataVO.buyState) {
                    this.firstGroup.visible = false;
                }
                else {
                    this.firstGroup.visible = true;
                    this.labMoshi2.text = this.getConfigValueByType(dataVO.template.otherRewards, "201");
                }
            }
        };
        RechargeMojingItem.prototype.getConfigValueByType = function (cfg, key) {
            var atts = cfg.split(";");
            for (var _i = 0, atts_1 = atts; _i < atts_1.length; _i++) {
                var att = atts_1[_i];
                var a = att.split("_");
                if (a[0] == key) {
                    return a[1];
                }
            }
            return "";
        };
        return RechargeMojingItem;
    }(ui.RechargeMoJingItemSkin));
    renderer.RechargeMojingItem = RechargeMojingItem;
    __reflect(RechargeMojingItem.prototype, "renderer.RechargeMojingItem");
})(renderer || (renderer = {}));
