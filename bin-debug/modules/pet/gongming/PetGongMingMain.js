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
(function (pet) {
    var PetGongMingMain = (function (_super) {
        __extends(PetGongMingMain, _super);
        function PetGongMingMain() {
            return _super.call(this) || this;
        }
        PetGongMingMain.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
        };
        PetGongMingMain.prototype.enter = function () {
            this.showView();
            GameModels.pet.isOpenGongMingView = true;
            // if (GameModels.guide.guideType == mo.ModelGuide.guideType8) {
            // 	GameModels.guide.requestGuideDone(mo.ModelGuide.guideType8);
            // 	mg.StoryManager.instance.startBigStory(150, this, null);
            // }
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            GameModels.pet.addEventListener(mo.ModelPet.UPDATA_PETGONGMING, this.showPetList, this);
        };
        PetGongMingMain.prototype.showView = function () {
            var petList = GameModels.pet.getQianPaiAndHouPaiPet();
            if (petList.length <= 1)
                return;
            this.body0.setPetBody(petList[0].avatarId);
            this.body1.setPetBody(petList[1].avatarId);
            this.labLv0.text = petList[0].lv.toString();
            this.labLv1.text = petList[1].lv.toString();
            this.imgStar0.source = "pet_json.img_petStar" + petList[0].star + "_png";
            this.imgStar1.source = "pet_json.img_petStar" + petList[1].star + "_png";
            this.labFight0.text = petList[0].fightValue.toString();
            this.labFight1.text = petList[1].fightValue.toString();
            GameModels.pet.petGetGongMingInfo(utils.Handler.create(this, function () {
                this.showPetList();
            }));
        };
        PetGongMingMain.prototype.showPetList = function () {
            for (var z = this.itemGroup.numChildren; z >= 0; z--) {
                var items = this.itemGroup.getChildAt(z);
                if (items) {
                    this.itemGroup.removeChildAt(z);
                }
            }
            var petList = GameModels.pet.gongMingPetList;
            var cdList = GameModels.pet.gongMingCDList;
            var maxPos = GameModels.pet.gongmingMaxPos;
            var hashAdd = false;
            var cdinitIndex = -1;
            var cdListLength = cdList.length;
            var data = [];
            var qianPaiCount = 0;
            var houPaiCount = 0;
            for (var i = 0; i < 20; i++) {
                if (petList[i]) {
                    if (petList[i].fightType == 1) {
                        qianPaiCount++;
                    }
                    else {
                        houPaiCount++;
                    }
                    data.push({ pet: petList[i], isAdd: false, lockLv: 0, cdTime: 0, cdIndex: 0 });
                }
                else {
                    if (cdListLength > 0) {
                        if (cdList.length < maxPos - i) {
                            if (!hashAdd) {
                                data.push({ pet: null, isAdd: true, lockLv: 0, cdTime: 0, cdIndex: 0 });
                                hashAdd = true;
                            }
                            else {
                                if (cdinitIndex < 0)
                                    cdinitIndex = i;
                                data.push({ pet: null, isAdd: false, lockLv: 0, cdTime: cdList[i - cdinitIndex], cdIndex: (i - cdinitIndex) });
                                cdListLength--;
                            }
                        }
                        else {
                            if (cdinitIndex < 0)
                                cdinitIndex = i;
                            data.push({ pet: null, isAdd: false, lockLv: 0, cdTime: cdList[i - cdinitIndex], cdIndex: (i - cdinitIndex) });
                            cdListLength--;
                        }
                    }
                    else {
                        if (i < maxPos) {
                            if (!hashAdd) {
                                data.push({ pet: null, isAdd: true, lockLv: 0, cdTime: 0, cdIndex: 0 });
                                hashAdd = true;
                            }
                            else {
                                data.push({ pet: null, isAdd: false, lockLv: 0, cdTime: 0, cdIndex: 0 });
                            }
                        }
                        else {
                            data.push({ pet: null, isAdd: false, lockLv: (i - 9), cdTime: 0, cdIndex: 0 });
                        }
                    }
                }
            }
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var obj = data_1[_i];
                var item = new pet.PetGongMingItem();
                item.scaleX = item.scaleY = 0.9;
                item.show(obj);
                this.itemGroup.addChild(item);
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
            }
            this.labContent.text = Language.getExpression(Language.E_JYT, petList.length, maxPos, qianPaiCount, houPaiCount);
        };
        PetGongMingMain.prototype.onItemClick = function (evt) {
            var target = evt.currentTarget;
            var data = target.data;
            if (!data)
                return;
            if (data.pet) {
                mg.alertManager.showAlert(pet.PetGongMingDemountAlter, true, true, data.pet);
                return;
            }
            if (data.isAdd) {
                mg.alertManager.showAlert(pet.PetGongMingList, false, true);
                return;
            }
            if (data.lockLv > 0) {
                mg.alertManager.tip(Language.getExpression(Language.E_VIP1KJ, data.lockLv));
                return;
            }
            if (data.cdTime > 0) {
                mg.alertManager.showAlert(pet.PetClearGongMingCd, true, true, data.cdTime, data.cdIndex);
                return;
            }
        };
        PetGongMingMain.prototype.onBtnClick = function (e) {
            mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5601).des);
        };
        PetGongMingMain.prototype.exit = function () {
            for (var z = this.itemGroup.numChildren; z >= 0; z--) {
                var items = this.itemGroup.getChildAt(z);
                if (items) {
                    this.itemGroup.removeChildAt(z);
                }
            }
            this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            GameModels.pet.removeEventListener(mo.ModelPet.UPDATA_PETGONGMING, this.showPetList, this);
        };
        return PetGongMingMain;
    }(ui.PetGongMingMainSkin));
    pet.PetGongMingMain = PetGongMingMain;
    __reflect(PetGongMingMain.prototype, "pet.PetGongMingMain");
})(pet || (pet = {}));
