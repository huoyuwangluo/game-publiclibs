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
    var AncientPetTuiJianTeamRenderer = (function (_super) {
        __extends(AncientPetTuiJianTeamRenderer, _super);
        function AncientPetTuiJianTeamRenderer() {
            var _this = _super.call(this) || this;
            _this._quality = [_this.imgQuila, _this.imgQuila0, _this.imgQuila1, _this.imgQuila2];
            _this._icon = [_this.imgIcon, _this.imgIcon0, _this.imgIcon1, _this.imgIcon2];
            _this._star = [_this.imgStar, _this.imgStar0, _this.imgStar1, _this.imgStar2];
            return _this;
        }
        AncientPetTuiJianTeamRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var temp = this.data;
            this._petArr = [];
            this._temps = null;
            if (temp) {
                this._temps = temp;
                this.labTitle.text = temp.name;
                this.labContent.text = temp.des1;
                var generalArr = temp.general.split(";");
                this._petArr = generalArr;
                for (var i = 0; i < this._quality.length; i++) {
                    if (generalArr[i]) {
                        var general = Templates.getTemplateById(templates.Map.GENERAL, generalArr[i]);
                        var item = Templates.getTemplateById(templates.Map.ITEM, generalArr[i]);
                        this._icon[i].source = item.icon;
                        this._quality[i].source = ResPath.getPetQualityByStar(general.star, GameModels.pet.isHashFourSkill(generalArr[i]));
                        this._star[i].source = "tujian_json.img_star" + general.star;
                    }
                    else {
                        this._quality[i].source = null;
                        this._icon[i].source = null;
                        this._star[i].source = null;
                    }
                }
            }
            for (var i = 0; i < this._icon.length; i++) {
                this._icon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
            }
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        AncientPetTuiJianTeamRenderer.prototype.onPetClick = function (e) {
            var index = this._icon.indexOf(e.currentTarget);
            if (this._petArr[index]) {
                var general = Templates.getTemplateById(templates.Map.GENERAL, this._petArr[index]);
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, general);
            }
        };
        AncientPetTuiJianTeamRenderer.prototype.onBtnClick = function (e) {
            if (this._temps)
                mg.TipManager.instance.showTip(tips.AncientPetTuJianTeamTips, this._temps);
        };
        return AncientPetTuiJianTeamRenderer;
    }(ui.AncientPetTuiJianTeamRendererSkin));
    renderer.AncientPetTuiJianTeamRenderer = AncientPetTuiJianTeamRenderer;
    __reflect(AncientPetTuiJianTeamRenderer.prototype, "renderer.AncientPetTuiJianTeamRenderer");
})(renderer || (renderer = {}));
