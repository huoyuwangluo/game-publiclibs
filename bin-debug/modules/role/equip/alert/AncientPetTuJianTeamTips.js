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
var tips;
(function (tips) {
    var AncientPetTuJianTeamTips = (function (_super) {
        __extends(AncientPetTuJianTeamTips, _super);
        function AncientPetTuJianTeamTips() {
            var _this = _super.call(this) || this;
            _this._quality = [_this.imgQuila, _this.imgQuila0, _this.imgQuila1, _this.imgQuila2];
            _this._icon = [_this.imgIcon, _this.imgIcon0, _this.imgIcon1, _this.imgIcon2];
            _this._star = [_this.imgStar, _this.imgStar0, _this.imgStar1, _this.imgStar2];
            _this._name = [_this.labName, _this.labName0, _this.labName1, _this.labName2];
            return _this;
        }
        Object.defineProperty(AncientPetTuJianTeamTips.prototype, "data", {
            set: function (data) {
                this.show(data);
            },
            enumerable: true,
            configurable: true
        });
        AncientPetTuJianTeamTips.prototype.show = function (data) {
            var temp = data;
            this.labTitle.text = temp.name;
            this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(temp.des2);
            var generalArr = temp.general.split(";");
            for (var i = 0; i < this._quality.length; i++) {
                if (generalArr[i]) {
                    var general = Templates.getTemplateById(templates.Map.GENERAL, generalArr[i]);
                    var item = Templates.getTemplateById(templates.Map.ITEM, generalArr[i]);
                    this._icon[i].source = item.icon;
                    this._quality[i].source = ResPath.getPetQualityByStar(general.star, GameModels.pet.isHashFourSkill(generalArr[i]));
                    this._star[i].source = "tujian_json.img_star" + general.star;
                    this._name[i].text = general.name;
                    this._name[i].textColor = TypeQuality.getStarColor(general.star);
                }
                else {
                    this._quality[i].source = null;
                    this._icon[i].source = null;
                    this._star[i].source = null;
                    this._name[i].text = "";
                }
            }
        };
        AncientPetTuJianTeamTips.prototype.removeSelf = function () {
            mg.TipManager.instance.setCurrent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AncientPetTuJianTeamTips;
    }(ui.AncientPetTuJianTeamTipsSkin));
    tips.AncientPetTuJianTeamTips = AncientPetTuJianTeamTips;
    __reflect(AncientPetTuJianTeamTips.prototype, "tips.AncientPetTuJianTeamTips", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));
