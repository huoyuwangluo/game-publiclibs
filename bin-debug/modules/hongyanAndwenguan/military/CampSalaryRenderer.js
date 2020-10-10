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
    var CampSalaryRenderer = (function (_super) {
        __extends(CampSalaryRenderer, _super);
        function CampSalaryRenderer() {
            var _this = _super.call(this) || this;
            _this.colorarry = [0xfbdfa1, 0xbe39f6, 0x51b3fe];
            return _this;
        }
        CampSalaryRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        CampSalaryRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var campWu = this.data;
                this.img_office.source = "military_json.office_" + campWu.step;
                this.laboffice.text = campWu.name;
                this.laboffice.textColor = campWu.step > 3 ? 0xd3d3d3 : this.colorarry[campWu.step - 1];
                if (campWu.step <= 3) {
                    this.labtitle.source = "military_json.military_title_" + campWu.step;
                }
                else {
                    this.labtitle.source = null;
                }
                this.labnum.text = campWu.count + "";
                var reword = campWu.rewards.split(";")[0];
                var item = Templates.getTemplateById(templates.Map.ITEM, parseInt(reword.split("_")[0]));
                this.icon.source = item.icon;
                this.labSalarynum.text = reword.split("_")[1] + Language.C_MS;
                if (GameModels.legion.SelfInfo.Step == campWu.step) {
                    this.img_myself.visible = true;
                }
                else {
                    this.img_myself.visible = false;
                }
            }
        };
        return CampSalaryRenderer;
    }(ui.CampSalaryRendererSkin));
    renderer.CampSalaryRenderer = CampSalaryRenderer;
    __reflect(CampSalaryRenderer.prototype, "renderer.CampSalaryRenderer", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
})(renderer || (renderer = {}));
