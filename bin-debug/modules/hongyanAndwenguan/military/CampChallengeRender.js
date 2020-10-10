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
    var CampChallengeRender = (function (_super) {
        __extends(CampChallengeRender, _super);
        function CampChallengeRender() {
            var _this = _super.call(this) || this;
            _this.colorarry = [0xfbdfa1, 0xbe39f6, 0x51b3fe];
            return _this;
        }
        CampChallengeRender.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        CampChallengeRender.prototype.updata = function (data) {
            var temp = Templates.getTemplateById(templates.Map.OTHERMONSTER, data.MonsterId);
            this.labName.text = (temp) ? temp.name : data.PlayerName;
            this.img_office.source = "military_json.office_" + data.Step;
            this.lablv.text = (temp) ? temp.lv.toString() : data.PlayerLevel.toString();
            this.labFight.text = (temp) ? (utils.htmlUtil.computeModelTatolFighting(temp.properties) * 5).toString() : data.FightPower.toString();
            this.imgHead.source = (temp) ? ResPath.getPetIconSmall(temp.resId) : ResPath.getPlayerIconSmall(data.HeadIcon);
            if (data.Step <= 3) {
                this.labtitle.source = "military_json.military_title_" + data.Step;
                this.img_bg.source = "military_itembg_" + data.Step + "_png";
            }
            else {
                this.labtitle.source = "";
                this.img_bg.source = "";
            }
            var wuguandata = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", data.Step);
            this.lable_position.text = wuguandata.name;
            this.lable_position.textColor = data.Step > 3 ? 0xd3d3d3 : this.colorarry[data.Step - 1];
            if (data.PlayerId == GameModels.user.player.uid) {
                this.img_myself.visible = true;
            }
            else {
                this.img_myself.visible = false;
            }
        };
        return CampChallengeRender;
    }(ui.CampChallengeRendererSkin));
    renderer.CampChallengeRender = CampChallengeRender;
    __reflect(CampChallengeRender.prototype, "renderer.CampChallengeRender", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
})(renderer || (renderer = {}));
