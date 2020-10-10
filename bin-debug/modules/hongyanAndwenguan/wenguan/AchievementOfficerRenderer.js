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
    var AchievementOfficerRenderer = (function (_super) {
        __extends(AchievementOfficerRenderer, _super);
        function AchievementOfficerRenderer() {
            return _super.call(this) || this;
        }
        AchievementOfficerRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var name = this.data.tempname;
                var state = this.data.tempstate;
                this.lab_name.text = name.substring(2, name.length);
                this.img_bg.alpha = 1;
                switch (state) {
                    case 1:
                        this.img_bg.alpha = 0.8;
                        this.img_bg.source = "achieven_json.img_officer_1";
                        break;
                    case 2:
                        this.img_bg.source = "achieven_json.img_officer_1";
                        break;
                    case 3:
                        this.img_bg.source = "achieven_json.img_officer_2";
                        break;
                }
            }
        };
        return AchievementOfficerRenderer;
    }(ui.AchievementOfficerRendererSkin));
    renderer.AchievementOfficerRenderer = AchievementOfficerRenderer;
    __reflect(AchievementOfficerRenderer.prototype, "renderer.AchievementOfficerRenderer");
})(renderer || (renderer = {}));
