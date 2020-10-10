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
    var PetListFenJieDialogRenderer = (function (_super) {
        __extends(PetListFenJieDialogRenderer, _super);
        function PetListFenJieDialogRenderer() {
            var _this = _super.call(this) || this;
            _this._rewardArr = [_this.labGet1, _this.labGet2];
            return _this;
        }
        PetListFenJieDialogRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var vo = this.data.tmp;
                this._petVo = vo;
                if (vo.star <= 0) {
                    this.imgStar.visible = false;
                }
                else {
                    this.imgStar.visible = true;
                    this.imgStar.source = "tujian_json.img_star" + vo.star;
                }
                this.imgXiYouPet.visible = vo.isHashFourSkill;
                this.imgXiYouPet.source = vo.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                this.labLV.text = vo.lv.toString();
                this.imgPos.source = "pet_json.img_fightType_" + vo.fightType + "_png";
                this.imgQuila.source = ResPath.getPetQualityByStar(vo.star, vo.isHashFourSkill);
                var item = Templates.getTemplateById(templates.Map.ITEM, vo.refId);
                this.imgIcon.source = item.icon;
                this.labName.text = vo.name;
                this.labName.textColor = TypeQuality.getStarColor(vo.star);
                this.imgSelecd.visible = this.data.selected;
                this.imgUnSelecd.visible = !this.data.selected;
                this.labFight.text = vo.baseFightValue.toString();
                this.imgLock.source = vo.isLock == 0 ? "bag_json.img_bag_unlock" : "bag_json.img_bag_lock";
                var reward = vo.generalBraekTmp.recover.split(";");
                var clearCaiLiao = 0;
                if (vo.lv > 1) {
                    clearCaiLiao = parseInt(GameModels.pet.getCaiLiaoCountByClearPet(vo.lv).split(";")[0].split("_")[1]);
                }
                for (var i = 0; i < this._rewardArr.length; i++) {
                    if (reward[i]) {
                        var itemTmp = Templates.getTemplateById(templates.Map.ITEM, reward[i].split("_")[0]);
                        var elements1 = [];
                        elements1.push({ text: itemTmp.name, style: { textColor: TypeQuality.getQualityColor(itemTmp.quality) } });
                        var selfCaiLiao = parseInt(reward[i].split("_")[1]);
                        elements1.push({ text: "X" + (i == 0 ? selfCaiLiao + clearCaiLiao : selfCaiLiao), style: { textColor: 0XFDDFA1 } });
                        this._rewardArr[i].textFlow = elements1;
                    }
                    else {
                        this._rewardArr[i].text = "";
                    }
                }
            }
            else {
                this._petVo = null;
                this.imgIcon.source = null;
            }
        };
        return PetListFenJieDialogRenderer;
    }(ui.PetListFenJieDialogRendererSkin));
    renderer.PetListFenJieDialogRenderer = PetListFenJieDialogRenderer;
    __reflect(PetListFenJieDialogRenderer.prototype, "renderer.PetListFenJieDialogRenderer");
})(renderer || (renderer = {}));
