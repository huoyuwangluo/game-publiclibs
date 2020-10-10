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
var pet;
(function (pet_1) {
    var PetGongMingDemountAlter = (function (_super) {
        __extends(PetGongMingDemountAlter, _super);
        function PetGongMingDemountAlter() {
            return _super.call(this) || this;
        }
        PetGongMingDemountAlter.prototype.show = function (petVo) {
            this._petVo = petVo;
            this.imgQuila0.source = this.imgQuila1.source = ResPath.getPetQualityByStar(petVo.star, petVo.isHashFourSkill);
            var item = Templates.getTemplateById(templates.Map.ITEM, petVo.refId);
            this.imgIcon0.source = this.imgIcon1.source = item.icon;
            this.imgStar0.source = this.imgStar1.source = "tujian_json.img_star" + petVo.star;
            this.labName0.text = "Lv." + petVo.lv;
            this.labName1.text = "Lv.1";
            this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnDemout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        PetGongMingDemountAlter.prototype.onBtnClick = function (evt) {
            var _this = this;
            if (evt.currentTarget == this.btnCheck) {
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, this._petVo);
            }
            else if (evt.currentTarget == this.btnDemout) {
                var status = GameModels.kingwar.petHashKingWarArmy(this._petVo);
                if (status == 2) {
                    mg.alertManager.tip(Language.J_GWJSUBDZAZDZ);
                    return;
                }
                else if (status == 1) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_GWJZZBDZ, Language.C_QXJY), TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                        _this.requstSetGongMingList();
                    }));
                }
                else {
                    this.requstSetGongMingList();
                }
            }
            else {
                this.dispatchEventWith(egret.Event.CLOSE);
            }
        };
        PetGongMingDemountAlter.prototype.requstSetGongMingList = function () {
            var petList = GameModels.pet.gongMingPetList;
            var petIdList = [];
            for (var _i = 0, petList_1 = petList; _i < petList_1.length; _i++) {
                var pet = petList_1[_i];
                if (pet.uid != this._petVo.uid) {
                    petIdList.push(pet.uid);
                }
            }
            GameModels.pet.setGongMing(petIdList, utils.Handler.create(this, function () {
                mg.alertManager.tip(Language.C_XXCG);
                this.dispatchEventWith(egret.Event.CLOSE);
            }));
        };
        PetGongMingDemountAlter.prototype.hide = function () {
            this.btnCheck.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnDemout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetGongMingDemountAlter;
    }(ui.PetGongMingDemountAlterSkin));
    pet_1.PetGongMingDemountAlter = PetGongMingDemountAlter;
    __reflect(PetGongMingDemountAlter.prototype, "pet.PetGongMingDemountAlter", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
