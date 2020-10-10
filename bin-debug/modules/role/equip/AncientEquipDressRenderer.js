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
    var AncientEquipDressRenderer = (function (_super) {
        __extends(AncientEquipDressRenderer, _super);
        function AncientEquipDressRenderer() {
            var _this = _super.call(this) || this;
            _this._lab = [_this.lab1, _this.lab3, _this.lab4, _this.lab5];
            return _this;
        }
        AncientEquipDressRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var temp = this.data;
                var isHas = GameModels.equip.useNewEquips.indexOf(temp) != -1;
                this.imgQuality.source = ResPath.getQuality(temp.templateEquip.quality);
                this.labName.textColor = TypeQuality.getQualityColor(temp.templateEquip.quality);
                this.labName.text = temp.templateEquip.name;
                var str = temp.templateEquip.properties.split(";");
                if (temp.templateEquip.type == 130 || temp.templateEquip.type == 132) {
                    this.labLevel.text = Language.C_JJ1 + ":" + temp.templateEquip.step;
                }
                else {
                    this.labLevel.text = Language.C_DJ + ":" + temp.templateEquip.lv;
                }
                this.imgIcon.source = temp.icon;
                this.labScore.text = Language.C_ZDL + ":" + utils.htmlUtil.computeModelTatolFighting(temp.templateEquip.properties);
                this.btnUse.label = isHas ? Language.C_XX : Language.C_CD;
                this.btnUse.skinName = isHas ? "skins.SnapBigButton2Skin" : "skins.SnapBigButton1Skin";
                for (var i = 0; i < this._lab.length; i++) {
                    if (str[i]) {
                        this._lab[i].text = TypeProperty.getChineseAndValue(str[i]);
                    }
                    else {
                        this._lab[i].text = "";
                    }
                }
            }
            else {
                this.imgIcon.source = null;
            }
        };
        return AncientEquipDressRenderer;
    }(ui.AncientEquipDressRendererSkin));
    renderer.AncientEquipDressRenderer = AncientEquipDressRenderer;
    __reflect(AncientEquipDressRenderer.prototype, "renderer.AncientEquipDressRenderer");
})(renderer || (renderer = {}));
