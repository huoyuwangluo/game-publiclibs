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
    var PetUpStars = (function (_super) {
        __extends(PetUpStars, _super);
        function PetUpStars() {
            return _super.call(this) || this;
        }
        PetUpStars.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            if (!this._playerShowAvatar) {
                this._playerShowAvatar = new components.PlayerShowAvatar();
            }
            this.addChildAt(this._playerShowAvatar, 5);
            this._playerShowAvatar.x = 300;
            this._playerShowAvatar.y = 340;
            this._petArr = [];
            this.list.dataProvider = this._listCollection = new eui.ArrayCollection([]);
            this._petSKillArr = [this.skill0, this.skill1, this.skill2, this.skill3];
            this._imgUpArr = [this.imgUp0, this.imgUp1, this.imgUp2, this.imgUp3];
            this._equipBoxs = [this.box1, this.box2, this.box3, this.box4];
            this._bingFaItems = [this.box5, this.box6];
        };
        PetUpStars.prototype.enter = function (rolePos) {
            this.showPetList();
            this._oldStar = null;
            this.needItemSelf.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            this.needItemOther0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            this.needItemOther1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            this.needItemLegion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO, this.showNeedItem, this);
            GameModels.pet.addEventListener(mo.ModelPet.BINGFA_CHANGE, this.updata, this);
            this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            this.skillShenBing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShenBingSkillClick, this);
            GameModels.petChoose.addEventListener(mo.ModelPetChoose.PET_CHANGE, this.updatePetInfo, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.PET_CHANGE, this.updatePetInfo, this);
            GameModels.pet.addEventListener(mo.ModelPet.PET_SETLOCK, this.petSetLockUpdata, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.PETLIST_CHANGE, this.selectedUpdate, this);
            GameModels.bag.addEventListener(mo.ModelBag.OPEN_BINGFA_LIST, this.updataPetHeadRenderer, this);
            this.imgAllPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            for (var i = 0; i < this._petSKillArr.length; i++) {
                this._petSKillArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
            }
            for (var i = 0; i < this._equipBoxs.length; i++) {
                this._equipBoxs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.ancientIconHandler, this);
            }
            for (var i = 0; i < this._bingFaItems.length; i++) {
                this._bingFaItems[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBingFaClick, this);
            }
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.imgLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLockClick, this);
        };
        PetUpStars.prototype.showPetList = function () {
            this._formatPos = -1;
            var upVoArr = GameModels.pet.formatUpVOList;
            var downVoArr = GameModels.pet.formatDownVOList;
            downVoArr.sort(function (a, b) {
                if (a.star != b.star) {
                    return b.star - a.star;
                }
                else {
                    return b.isGongMing - a.isGongMing;
                }
            });
            var vo = upVoArr.concat(downVoArr);
            this._listCollection.source = vo;
            this.list.selectedIndex = TypePetPos.role_currPos;
            this._data = this.list.selectedItem;
            this.viewToFollow();
            for (var _i = 0, upVoArr_1 = upVoArr; _i < upVoArr_1.length; _i++) {
                var pet = upVoArr_1[_i];
                if (pet.uid == this._data.uid) {
                    this._formatPos = pet.position;
                }
            }
            this.updata();
        };
        PetUpStars.prototype.updataPetHeadRenderer = function () {
            this.updata();
            if (this._listCollection)
                this._listCollection.itemUpdated(this.list.selectedItem);
        };
        PetUpStars.prototype.selectedUpdate = function (e) {
            this._formatPos = -1;
            var upVoArr = GameModels.pet.formatUpVOList;
            var petUid = e.data;
            var petArr = this._listCollection.source;
            for (var i = 0; i < petArr.length; i++) {
                if (petArr[i].uid == petUid) {
                    this.list.selectedIndex = i;
                    break;
                }
            }
            this._data = this.list.selectedItem;
            this.viewToFollow();
            for (var _i = 0, upVoArr_2 = upVoArr; _i < upVoArr_2.length; _i++) {
                var pet = upVoArr_2[_i];
                if (pet.uid == this._data.uid) {
                    this._formatPos = pet.position;
                }
            }
            this.updata();
        };
        PetUpStars.prototype.updata = function () {
            this._listCollection.replaceAll(this._listCollection.source);
            this.refreshEquips();
            this.showProitesAndSkill();
            this.showView();
        };
        PetUpStars.prototype.updatePetInfo = function () {
            this._formatPos = -1;
            var upVoArr = GameModels.pet.formatUpVOList;
            var downVoArr = GameModels.pet.formatDownVOList;
            downVoArr.sort(function (a, b) {
                return b.star - a.star;
            });
            var vo = upVoArr.concat(downVoArr);
            this._listCollection.source = vo;
            var petArr = this._listCollection.source;
            for (var i = 0; i < petArr.length; i++) {
                if (petArr[i].uid == this._data.uid) {
                    this.list.selectedIndex = i;
                    this.viewToFollow();
                    break;
                }
            }
            this._data = this.list.selectedItem;
            for (var _i = 0, upVoArr_3 = upVoArr; _i < upVoArr_3.length; _i++) {
                var pet = upVoArr_3[_i];
                if (pet.uid == this._data.uid) {
                    this._formatPos = pet.position;
                }
            }
            this.updata();
        };
        PetUpStars.prototype.refreshEquips = function () {
            if (this._formatPos < 0) {
                for (var i = 0; i < this._equipBoxs.length; i++) {
                    this._equipBoxs[i].visible = false;
                }
            }
            else {
                var equip = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, this._formatPos);
                for (var i = 0; i < this._equipBoxs.length; i++) {
                    this._equipBoxs[i].visible = true;
                    if (equip[i].refId) {
                        this._equipBoxs[i].quality = equip[i].templateEquip.quality;
                        this._equipBoxs[i].iconSour = equip[i].templateEquip.icon;
                        this._equipBoxs[i].step = "";
                        this._equipBoxs[i].lv = equip[i].templateEquip.lv.toString();
                        this._equipBoxs[i].isWarn = false;
                        this._equipBoxs[i].pos = equip[i].pos;
                        this._equipBoxs[i].lockLv = "";
                        this._equipBoxs[i].updateEffect(true, equip[i].templateEquip.quality);
                    }
                    else {
                        this._equipBoxs[i].quality = "role_json.ancientEquip_type_" + (i + 1) + "_png";
                        this._equipBoxs[i].iconSour = null;
                        this._equipBoxs[i].step = "";
                        this._equipBoxs[i].lv = "";
                        this._equipBoxs[i].lockLv = "";
                        this._equipBoxs[i].isWarn = false;
                        this._equipBoxs[i].pos = 0;
                        this._equipBoxs[i].updateEffect(false);
                    }
                }
            }
            this.showPlayerModelAndPetModel();
        };
        PetUpStars.prototype.showPlayerModelAndPetModel = function () {
            if (this._formatPos == 0) {
                this._playerShowAvatar.visible = true;
                this.body.visible = false;
                this.refreshModel(GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, 0));
            }
            else {
                this._playerShowAvatar.visible = false;
                this.body.visible = true;
                var pet = GameModels.pet.getFormatDownAndUpVO(this._data.uid);
                if (pet) {
                    this.body.setPetBody(pet.avatarId);
                }
            }
        };
        PetUpStars.prototype.refreshModel = function (items) {
            this.showWingAvatar();
            var bol = this.showClothesAvatar();
            if (bol) {
                this._playerShowAvatar.clothResId = GameModels.user.player.clothResId;
            }
            var bol1 = this.showFashionWeapon();
            if (bol1) {
                this._playerShowAvatar.weaponResId = GameModels.user.player.weaponResId;
            }
        };
        PetUpStars.prototype.showClothesAvatar = function () {
            var fashionCloth = GameModels.user.player.getProperty(TypeProperty.FASHION_CLOTH);
            if (fashionCloth) {
                var templateCloth = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionCloth);
                if (templateCloth) {
                    this._playerShowAvatar.clothResId = templateCloth.modelId;
                    return false;
                }
            }
            return true;
        };
        PetUpStars.prototype.showFashionWeapon = function () {
            var fashionWeapon = GameModels.user.player.getProperty(TypeProperty.FASHION_WEAPON);
            if (fashionWeapon) {
                var templateWeapon = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionWeapon);
                if (templateWeapon) {
                    this._playerShowAvatar.weaponResId = templateWeapon.modelId;
                    return false;
                }
            }
            return true;
        };
        PetUpStars.prototype.showWingAvatar = function () {
            this._playerShowAvatar.wingResId = "";
            var fashionWing = GameModels.user.player.getProperty(TypeProperty.WING_MODLEID);
            if (fashionWing > 0) {
                this._playerShowAvatar.wingResId = fashionWing + "";
            }
        };
        PetUpStars.prototype.showProitesAndSkill = function () {
            if (this._formatPos < 0) {
                for (var i = 0; i < this._bingFaItems.length; i++) {
                    this._bingFaItems[i].visible = false;
                }
            }
            else {
                var pet = GameModels.pet.getFormatUpVOByPos(this._formatPos);
                if (pet) {
                    this.showBingFa(pet);
                }
            }
        };
        PetUpStars.prototype.showBingFa = function (pet) {
            for (var i = 0; i < this._bingFaItems.length; i++) {
                this._bingFaItems[i].visible = true;
                var listVo = pet.getBingFaVOListByPos(i);
                if (listVo) {
                    this._bingFaItems[i].quality = ResPath.getQuality(listVo.quality);
                    this._bingFaItems[i].iconSour = listVo.icon;
                    this._bingFaItems[i].step = "";
                    this._bingFaItems[i].lv = "";
                    this._bingFaItems[i].isWarn = GameModels.bag.isHashHigherBingFaChange(listVo.quality);
                    this._bingFaItems[i].pos = 0;
                    this._bingFaItems[i].lockLv = "";
                }
                else {
                    if (pet.generalBraekTmp.bingfaOpen > i) {
                        if (i == 0 && pet.lv < 150) {
                            this._bingFaItems[i].quality = "role_json.ancientEquip_type_9_png";
                            this._bingFaItems[i].step = "";
                            this._bingFaItems[i].lv = "";
                            this._bingFaItems[i].isWarn = false;
                            this._bingFaItems[i].pos = 0;
                            this._bingFaItems[i].iconSour = "common_json.img_lock_png";
                            this._bingFaItems[i].lockLv = Language.getExpression(Language.E_1JJS, 150);
                        }
                        else {
                            this._bingFaItems[i].quality = "role_json.ancientEquip_type_9_png";
                            this._bingFaItems[i].iconSour = "forging_json.img_jiuXingIconBg";
                            this._bingFaItems[i].step = "";
                            this._bingFaItems[i].lv = "";
                            this._bingFaItems[i].isWarn = GameModels.bag.bingFa.source.length > 0;
                            this._bingFaItems[i].pos = 0;
                            this._bingFaItems[i].lockLv = "";
                        }
                    }
                    else {
                        this._bingFaItems[i].quality = "role_json.ancientEquip_type_9_png";
                        this._bingFaItems[i].step = "";
                        this._bingFaItems[i].lv = "";
                        this._bingFaItems[i].isWarn = false;
                        this._bingFaItems[i].pos = 0;
                        var star = pet.getOpenBingFaStar(pet.quality, i + 1);
                        if (star > 0) {
                            this._bingFaItems[i].iconSour = "common_json.img_lock_png";
                            this._bingFaItems[i].lockLv = i == 0 ? Language.getExpression(Language.E_1JJS, 150) : Language.getExpression(Language.E_1XJS, star);
                        }
                        else {
                            this._bingFaItems[i].iconSour = "common_json.img_skill_wu_png";
                            this._bingFaItems[i].lockLv = "";
                        }
                    }
                }
            }
        };
        PetUpStars.prototype.ancientIconHandler = function (e) {
            var items = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, this._formatPos);
            for (var i = 0; i < this._equipBoxs.length; i++) {
                if (e.currentTarget == this._equipBoxs[i]) {
                    if (items[i].refId) {
                        mg.TipManager.instance.showTip(tips.EquipTip, items[i]);
                    }
                    else {
                        //mg.alertManager.tip(Language.J_CWZWCDZB);
                    }
                    break;
                }
            }
        };
        PetUpStars.prototype.onBingFaClick = function (e) {
            var pet = GameModels.pet.getFormatUpVOByPos(this._formatPos);
            for (var i = 0; i < this._bingFaItems.length; i++) {
                if (e.currentTarget == this._bingFaItems[i]) {
                    var listVo = pet.getBingFaVOListByPos(i);
                    if (listVo) {
                        var obj = { data: listVo, petVo: pet, tabIndex: i };
                        mg.TipUpManager.instance.showTip(tipUps.BingFaAert, obj);
                    }
                    else {
                        if (pet.generalBraekTmp.bingfaOpen > i) {
                            if (i == 0 && pet.lv < 150) {
                                mg.alertManager.tip(Language.getExpression(Language.E_1JD2JJSBF, 150));
                            }
                            else {
                                var volist = GameModels.bag.baseBingFa;
                                if (volist.length <= 0) {
                                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, "800007");
                                }
                                else {
                                    mg.uiManager.show(dialog.list.BingFaList, pet, i);
                                }
                            }
                        }
                        else {
                            var star = pet.getOpenBingFaStar(pet.quality, i + 1);
                            if (star > 0) {
                                if (i == 0)
                                    mg.alertManager.tip(Language.getExpression(Language.E_1JD2JJSBF, 150));
                                else
                                    mg.alertManager.tip(Language.getExpression(Language.E_1DD2JJSBF, star));
                            }
                            else {
                                mg.alertManager.tip(Language.J_GWJWZMYTSTF);
                            }
                        }
                    }
                    break;
                }
            }
        };
        PetUpStars.prototype.onListClick = function (e) {
            // this.list.selectedIndex = e.itemIndex;
            this._formatPos = -1;
            this._data = this.list.selectedItem;
            if (this._data.isFormat) {
                TypePetPos.role_currPos = this._data.position;
            }
            var upVoArr = GameModels.pet.formatUpVOList;
            for (var _i = 0, upVoArr_4 = upVoArr; _i < upVoArr_4.length; _i++) {
                var pet = upVoArr_4[_i];
                if (pet.uid == this._data.uid) {
                    this._formatPos = pet.position;
                }
            }
            this.updata();
        };
        PetUpStars.prototype.petSetLockUpdata = function () {
            if (!this._data)
                return;
            this.imgLock.source = this._data.isLock == 0 ? "bag_json.img_bag_unlock" : "bag_json.img_bag_lock";
        };
        PetUpStars.prototype.showView = function () {
            this.imgXiYouPet.visible = false;
            if (!this._data)
                return;
            if (this._data.refId != "13000" && this._data.isHashFourSkill) {
                this.imgXiYouPet.visible = true;
                this.imgXiYouPet.source = this._data.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
            }
            GameModels.upStar.clearGamePetVo();
            this.petSetLockUpdata();
            this.imgMax.visible = false;
            this.maxGroup.visible = false;
            this.starGroup1.visible = false;
            this.imgStarMax.visible = false;
            this.imgArrow.visible = false;
            this.imgArrow0.visible = false;
            this.labAdd.visible = false;
            this.labAdd0.visible = false;
            this.labMax.visible = false;
            this.labMax0.visible = false;
            this.labNeedLv.visible = false;
            this.btnUpgrade.visible = false;
            if (this._data.generalBraekTmp.nextId != -1) {
                this.imgtitle.visible = true;
                this.maxGroup.visible = true;
                this.starGroup1.visible = true;
                this.imgArrow.visible = true;
                this.imgArrow0.visible = true;
                this.labAdd.visible = true;
                this.labAdd0.visible = true;
                this.imgLeftStar.source = "pet_json.img_petStar" + this._data.star + "_png";
                this.imgRightStar.source = "pet_json.img_petStar" + (this._data.star + 1) + "_png";
                this.labProperty.text = this._data.generalBraekTmp.growPro / 100 + "%";
                this.labProperty0.text = this._data.generalBraekTmp.levelOpen.toString();
                var tem = Templates.getTemplateById(templates.Map.GENERALBREAK, this._data.generalBraekTmp.nextId);
                this.labAdd.text = tem.growPro / 100 + "%";
                this.labAdd0.text = tem.levelOpen.toString();
                if (GameModels.user.player.level < this._data.generalBraekTmp.needLV) {
                    this.labNeedLv.visible = true;
                    this.labNeedLv.text = Language.getExpression(Language.E_ZG1JKS2X, this._data.generalBraekTmp.needLV, this._data.star + 1);
                }
                else {
                    this.btnUpgrade.visible = true;
                }
            }
            else {
                this.labMax.visible = true;
                this.labMax0.visible = true;
                this.imgMax.visible = true;
                this.imgStarMax.visible = true;
                this.labProperty.text = this._data.generalBraekTmp.growPro / 100 + "%";
                this.labProperty0.text = this._data.generalBraekTmp.levelOpen.toString();
            }
            this.group.removeChild(this.needItemSelf);
            this.group.removeChild(this.needItemOther0);
            this.group.removeChild(this.needItemOther1);
            this.group.removeChild(this.needItemLegion);
            if (this._data.generalBraekTmp.nextId != -1) {
                this.showNeedItem();
            }
            this.showSkill();
        };
        PetUpStars.prototype.showNeedItem = function () {
            var isAllCaiLiaoCan = GameModels.upStar.checkPetHeadUpStarRedPoint(this._data);
            if (this._data.selfPetCount > 0) {
                if (this._data.generalBraekTmp.consume) {
                    var consumeArr = this._data.generalBraekTmp.consume.split("_");
                    this.group.addChild(this.needItemOther1);
                    var templ1 = Templates.getTemplateById(templates.Map.ITEM, consumeArr[0]);
                    var obj1 = { petData: templ1, selecd: false, count: GameModels.bag.getItemCountById(ConfigData.GUANYING) + "/" + consumeArr[1] };
                    this.needItemOther1.data = null;
                    this.needItemOther1.data = obj1;
                }
                this.group.addChild(this.needItemSelf);
                if (GameModels.upStar.getGamePetVoArrByPos(0).length > 0) {
                    var templ = Templates.getTemplateById(templates.Map.GENERAL, this._data.refId);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(0).length < this._data.selfPetCount && GameModels.upStar.checkRedPointSelf(this._data);
                    var obj1 = { petData: GameModels.upStar.getGamePetVoArrByPos(0)[0], selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(0).length + "/" + this._data.selfPetCount, star: templ.star, point: isCount };
                    this.needItemSelf.data = null;
                    this.needItemSelf.data = obj1;
                }
                else {
                    var temp = Templates.getTemplateById(templates.Map.GENERAL, this._data.refId);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(0).length < this._data.selfPetCount && GameModels.upStar.checkRedPointSelf(this._data);
                    var obj1 = { petData: temp, selecd: false, star: temp.star, count: GameModels.upStar.getGamePetVoArrByPos(0).length + "/" + this._data.selfPetCount, point: isCount };
                    this.needItemSelf.data = null;
                    this.needItemSelf.data = obj1;
                }
                if (this._data.hashLegionPet) {
                    this.group.addChild(this.needItemLegion);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(3).length < this._data.legionPetCount && GameModels.upStar.checkRedPointLegion(this._data);
                    var obj1 = { petData: this._data.legionPetStar, selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(3).length + "/" + this._data.legionPetCount, star: this._data.legionPetStar, point: isCount, legion: this._data.refId == "13000" ? 4 : this._data.template.country };
                    this.needItemLegion.data = null;
                    this.needItemLegion.data = obj1;
                }
                if (this._data.hashOtherPetTypeCount > 0) {
                    this.group.addChild(this.needItemOther0);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(1).length < this._data.getOtherPetCount() && GameModels.upStar.checkRedPointOther1(this._data);
                    var obj1 = { petData: this._data.getOtherPetStar(), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(1).length + "/" + this._data.getOtherPetCount(), star: this._data.getOtherPetStar(), point: isCount };
                    this.needItemOther0.data = null;
                    this.needItemOther0.data = obj1;
                }
            }
            else {
                if (this._data.generalBraekTmp.consume) {
                    var consumeArr = this._data.generalBraekTmp.consume.split("_");
                    this.group.addChild(this.needItemSelf);
                    var templ1 = Templates.getTemplateById(templates.Map.ITEM, consumeArr[0]);
                    var obj1 = { petData: templ1, selecd: false, count: GameModels.bag.getItemCountById(ConfigData.GUANYING) + "/" + consumeArr[1] };
                    this.needItemSelf.data = null;
                    this.needItemSelf.data = obj1;
                }
                if (this._data.hashLegionPet) {
                    this.group.addChild(this.needItemLegion);
                    var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(3).length < this._data.legionPetCount && GameModels.upStar.checkRedPointLegion(this._data);
                    var obj1 = { petData: this._data.legionPetStar, selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(3).length + "/" + this._data.legionPetCount, star: this._data.legionPetStar, point: isCount, legion: this._data.refId == "13000" ? 4 : this._data.template.country };
                    this.needItemLegion.data = null;
                    this.needItemLegion.data = obj1;
                }
                if (this._data.hashOtherPetTypeCount > 0) {
                    if (this._data.hashOtherPetTypeCount == 1) {
                        this.group.addChild(this.needItemOther0);
                        var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(1).length < this._data.getOtherPetCount() && GameModels.upStar.checkRedPointOther1(this._data);
                        var obj1 = { petData: this._data.getOtherPetStar(), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(1).length + "/" + this._data.getOtherPetCount(), star: this._data.getOtherPetStar(), point: isCount };
                        this.needItemOther0.data = null;
                        this.needItemOther0.data = obj1;
                    }
                    else {
                        this.group.addChild(this.needItemOther0);
                        var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(1).length < this._data.getOtherPetCount() && GameModels.upStar.checkRedPointOther1(this._data);
                        var obj = { petData: this._data.getOtherPetStar(), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(1).length + "/" + this._data.getOtherPetCount(), star: this._data.getOtherPetStar(), point: isCount };
                        this.needItemOther0.data = null;
                        this.needItemOther0.data = obj;
                        this.group.addChild(this.needItemOther1);
                        var isCount = isAllCaiLiaoCan && GameModels.upStar.getGamePetVoArrByPos(2).length < this._data.getOtherPetCount(1) && GameModels.upStar.checkRedPointOther2(this._data);
                        var obj1 = { petData: this._data.getOtherPetStar(1), selecd: false, count: GameModels.upStar.getGamePetVoArrByPos(2).length + "/" + this._data.getOtherPetCount(1), star: this._data.getOtherPetStar(1), point: isCount };
                        this.needItemOther1.data = null;
                        this.needItemOther1.data = obj1;
                    }
                }
            }
        };
        PetUpStars.prototype.showSkill = function () {
            for (var i = 0; i < this._petSKillArr.length; i++) {
                this._petSKillArr[i].dataSource = null;
                this.skillGroup.removeChild(this._petSKillArr[i]);
                this.imgUpGroup.removeChild(this._imgUpArr[i]);
            }
            var skillList = this._data.skillList.list;
            for (var i = 0; i < this._petSKillArr.length; i++) {
                if (skillList[i]) {
                    var skillActNeedLevel = this._data.getSkillActNeedLevel(i);
                    if (skillActNeedLevel > 0) {
                        skillList[i].actNeedLevel = this._data.getSkillActNeedLevel(i);
                    }
                    else {
                        skillList[i].upNeedLevel = this._data.getSkillUpNeedLevel(i);
                    }
                    this.skillGroup.addChild(this._petSKillArr[i]);
                    this.imgUpGroup.addChild(this._imgUpArr[i]);
                    this._petSKillArr[i].dataSource = skillList[i];
                }
            }
            var skillArr = this._data.getSkillUp();
            for (var j = 0; j < skillArr.length; j++) {
                if (skillList[j] && skillList[j].isLock) {
                    this._imgUpArr[j].visible = false;
                    continue;
                }
                if (skillArr[j] <= 0) {
                    this._imgUpArr[j].visible = false;
                }
                else {
                    this._imgUpArr[j].visible = true;
                }
            }
            this.skillShenBing.dataSource = null;
            if (this._data.shenBingId != 0) {
                this.shenBingGroup.visible = true;
                var shenbingVo = GameModels.shenbing.getShenBingVoByRefid(this._data.shenBingId);
                this.skillShenBing.dataSource = this._data.shenBingSkill;
                this.skillShenBing.filters = this._data.shenBingLv >= 1 && this._data.generalBraekTmp.shenbingOpen > 0 ? null : utils.filterUtil.grayFilters;
                if (this._data.generalBraekTmp.shenbingOpen > 0 && this._data.shenBingLv >= 1) {
                    this._data.shenBingSkill.needLv = 2;
                }
                else {
                    this._data.shenBingSkill.needLv = 1;
                }
            }
            else {
                this.shenBingGroup.visible = false;
            }
        };
        PetUpStars.prototype.onSkillClick = function (e) {
            for (var i = 0; i < this._petSKillArr.length; i++) {
                if (e.currentTarget == this._petSKillArr[i]) {
                    mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._petSKillArr[i].dataSource);
                    break;
                }
            }
        };
        PetUpStars.prototype.onShenBingSkillClick = function (e) {
            if (!this._data)
                return;
            mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._data.shenBingSkill);
        };
        PetUpStars.prototype.touchEventClick = function (e) {
            if (!this._data)
                return;
            switch (e.currentTarget) {
                case this.needItemSelf:
                    if (this._data.generalBraekTmp.consume && this._data.refId == "13000") {
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, "210401");
                        // mg.alertManager.tip(Language.J_TGWGRWHQ);
                        //mg.alertManager.tip("消耗官印" + this._data.generalBraekTmp.consume.split("_")[1] + "个");
                        return;
                    }
                    mg.alertManager.showAlert(PetUpStarChooseListAlert, true, true, this._data, 0);
                    break;
                case this.needItemOther0:
                    mg.alertManager.showAlert(PetUpStarChooseListAlert, true, true, this._data, 1);
                    break;
                case this.needItemOther1:
                    if (this._data.generalBraekTmp.consume && this._data.refId != "13000") {
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, "210401");
                        // mg.alertManager.tip(Language.J_TGWGRWHQ);
                        //mg.alertManager.tip("消耗官印" + this._data.generalBraekTmp.consume.split("_")[1] + "个");
                        return;
                    }
                    mg.alertManager.showAlert(PetUpStarChooseListAlert, true, true, this._data, 2);
                    break;
                case this.needItemLegion:
                    mg.alertManager.showAlert(PetUpStarChooseListAlert, true, true, this._data, 3);
                    break;
                case this.btnUpgrade:
                    this._oldStar = this._data.star;
                    GameModels.upStar.petStarBreak(this._data.uid, utils.Handler.create(this, function () {
                        if (this._data.quality > 5 || this._data.refId == "13000") {
                            mg.alertManager.showAlert(PetUpStarSucceed, true, true, this._data, this._oldStar);
                        }
                        else {
                            mg.effectManager.playEffectOnce(TypeEffectId.SHENGJI_EFF, this.width * 0.5, this.height * 0.5, this);
                        }
                        this.updata();
                    }));
                    break;
                case this.imgAllPet:
                    mg.alertManager.showAlert(pet.PetAllPetAlter, true, true);
                    break;
            }
        };
        PetUpStars.prototype.viewToFollow = function () {
            if (this.scroller == null) {
                return;
            }
            /**视图跟随并居中锁定
             * itemWidth 单个呈现项的宽度
             *  */
            var listSH = this.list.scrollH; //可视区域位置
            var sWidth = this.scroller.width; //滚动轴宽度
            var listCWidth = this.list.contentWidth; //数据总长度
            this.list.validateNow();
            var itemWidth = this.list.getChildAt(0).width;
            var width = (itemWidth + 6) * (this.list.selectedIndex + 1);
            if (width >= sWidth) {
                width = width - sWidth;
            }
            else {
                width = 0;
            }
            this.list.scrollH = width; //显示视图的数量*列间距
            egret.Tween.get(this.list).to({ scrollH: width }, 200);
        };
        PetUpStars.prototype.onLockClick = function (e) {
            var _this = this;
            if (!this._data)
                return;
            var status = this._data.isLock == 0 ? 1 : 0;
            GameModels.pet.petSetLockDate(this._data.uid, status, utils.Handler.create(this, function () {
                _this._listCollection.itemUpdated(_this.list.selectedItem);
            }));
        };
        PetUpStars.prototype.exit = function () {
            this._data = null;
            this._oldStar = null;
            this.needItemSelf.data = null;
            this.needItemOther0.data = null;
            this.needItemOther1.data = null;
            GameModels.upStar.clearGamePetVo();
            GameModels.upStar.removeEventListener(mo.ModelUpStar.PETLIST_CHANGE, this.selectedUpdate, this);
            this.needItemSelf.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            this.needItemOther0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            this.needItemOther1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            this.needItemLegion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            GameModels.upStar.removeEventListener(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO, this.showNeedItem, this);
            this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            GameModels.pet.removeEventListener(mo.ModelPet.BINGFA_CHANGE, this.updata, this);
            GameModels.pet.removeEventListener(mo.ModelPet.PET_SETLOCK, this.petSetLockUpdata, this);
            GameModels.upStar.removeEventListener(mo.ModelUpStar.PET_CHANGE, this.updatePetInfo, this);
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.imgAllPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventClick, this);
            GameModels.petChoose.removeEventListener(mo.ModelPetChoose.PET_CHANGE, this.updatePetInfo, this);
            GameModels.bag.removeEventListener(mo.ModelBag.OPEN_BINGFA_LIST, this.updataPetHeadRenderer, this);
            this.skillShenBing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShenBingSkillClick, this);
            for (var i = 0; i < this._petSKillArr.length; i++) {
                this._petSKillArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
            }
            for (var i = 0; i < this._equipBoxs.length; i++) {
                this._equipBoxs[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ancientIconHandler, this);
            }
            for (var i = 0; i < this._bingFaItems.length; i++) {
                this._bingFaItems[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBingFaClick, this);
            }
            this.imgLock.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLockClick, this);
        };
        return PetUpStars;
    }(ui.PetUpStarsSkin));
    pet_1.PetUpStars = PetUpStars;
    __reflect(PetUpStars.prototype, "pet.PetUpStars");
})(pet || (pet = {}));
