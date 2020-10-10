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
var dialog;
(function (dialog) {
    var role;
    (function (role) {
        var equip;
        (function (equip_1) {
            var RoleEquipt = (function (_super) {
                __extends(RoleEquipt, _super);
                function RoleEquipt() {
                    return _super.call(this) || this;
                }
                RoleEquipt.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this.markDestoryImage(this.bg);
                    if (!this._playerShowAvatar) {
                        this._playerShowAvatar = new components.PlayerShowAvatar();
                    }
                    this.addChildAt(this._playerShowAvatar, 5);
                    this._playerShowAvatar.x = 300;
                    this._playerShowAvatar.y = 340;
                    this.btnCheckPet.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_CKXQ);
                    this._equipBoxs = [this.box1, this.box2, this.box3, this.box4];
                    this._petSKillArr = [this.skill0, this.skill1, this.skill2, this.skill3];
                    this._bingFaItems = [this.box5, this.box6];
                };
                RoleEquipt.prototype.destory = function () {
                    if (this._playerShowAvatar) {
                        if (this._playerShowAvatar.parent) {
                            this._playerShowAvatar.parent.removeChild(this._playerShowAvatar);
                        }
                        this._playerShowAvatar.reset();
                        this._playerShowAvatar = null;
                    }
                    for (var _i = 0, _a = this._equipBoxs; _i < _a.length; _i++) {
                        var box = _a[_i];
                        if (box.parent) {
                            box.parent.removeChild(box);
                        }
                        box.dataSource = null;
                    }
                    this._equipBoxs.length = 0;
                    this._equipBoxs = null;
                    _super.prototype.destory.call(this);
                };
                RoleEquipt.prototype.enter = function (rolePos, guideData) {
                    if (guideData === void 0) { guideData = null; }
                    this._isUpOperation = false;
                    this._shenBingSkillVo = null;
                    mg.soundManager.playViewLongSound("SoundJM_1", "ROLE");
                    this.expProgress.thumb.width = 20;
                    this._fightEffect = this.fromEffect("6108");
                    this._fightEffect.x = 325;
                    this._fightEffect.y = this.imgFightBg.y + 20;
                    this.addChildAt(this._fightEffect, this.getChildIndex(this.imgFightBg) + 1);
                    this._fightEffect.play();
                    this._count = 0;
                    this._angle = 0;
                    // egret.Tween.removeTweens(this.imgPreBg);
                    // this.tweenPreviewImgHandler();
                    this.headList.init((rolePos && rolePos >= 0) ? rolePos : TypePetPos.role_currPos, this, this.updata);
                    this.headList.registerWarns(GameRedState.ROLE_EQIUP_POS1, GameRedState.ROLE_EQIUP_POS2, GameRedState.ROLE_EQIUP_POS3, GameRedState.ROLE_EQIUP_POS4, GameRedState.ROLE_EQIUP_POS5);
                    GameModels.equip.addEventListener(mo.ModelEquip.USE_EQUIP_CHANGE, this.updateUseEquip, this);
                    GameModels.equip.addEventListener(mo.ModelEquip.DEL_EQUIP_CHANGE, this.refreshEquips, this);
                    GameModels.user.player.onPropertyChange(TypeProperty.FASHION_CLOTH, this, this.avatarChangeHandler);
                    GameModels.user.player.onPropertyChange(TypeProperty.WING_MODLEID, this, this.avatarChangeHandler);
                    GameModels.user.player.onPropertyChange(TypeProperty.FASHION_WEAPON, this, this.avatarChangeHandler);
                    // GameModels.user.player.onPropertyChange(TypeProperty.DRESSEDTITLE, this, this.updateMarkTitle);
                    this.btnUseEquips.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this.btnCheckPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
                    this.btnSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    GameModels.pet.addEventListener(mo.ModelPet.PET_CHANGE_LEVEL, this.showRoleAndPetLv, this);
                    GameModels.pet.addEventListener(mo.ModelPet.FORMAT_CHANGE, this.onPetFormatChangeHandler, this);
                    this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPropView, this);
                    mg.alertManager.addEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.closeZDSJ, this);
                    mg.StoryManager.instance.addEventListener(mg.StoryManager.SHOW_OR_HIED_STORY, this.closeZDSJ, this);
                    mg.uiManager.addEventListener(mg.UIManager.ADD_NEW_VIEW, this.closeZDSJ, this);
                    GameModels.bag.onItemChange(ConfigData.GENERAL_ONEUPGRADEITEM, this, this.showAttributeAndNeed);
                    GameModels.pet.addEventListener(mo.ModelPet.UPDATA_PETCHANGE_AND_PETJIBAN, this.updataJiBanAndChangRed, this);
                    this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this.getRoleExp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    GameModels.pet.addEventListener(mo.ModelPet.BINGFA_CHANGE, this.updata, this);
                    this.labCorps.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    GameModels.bag.addEventListener(mo.ModelBag.OPEN_BINGFA_LIST, this.updata, this);
                    this.btnZhuZhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        this._equipBoxs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.ancientIconHandler, this);
                    }
                    for (var i = 0; i < this._petSKillArr.length; i++) {
                        this._petSKillArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
                    }
                    for (var i = 0; i < this._bingFaItems.length; i++) {
                        this._bingFaItems[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBingFaClick, this);
                    }
                    this.skillShenBing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
                    mg.effectManager.unbindEffect(this.btnUseEquips);
                    mg.effectManager.unbindEffect(this.btnUpgrade);
                    if (guideData && guideData[1]) {
                        if ((guideData[1] == 1 && guideData[0] == TypeTask.WARE) || (guideData[1] == 2 && guideData[0] == 1)) {
                            //主线穿戴或者文官穿戴
                            mg.effectManager.bindEffect(this.btnUseEquips, TypeEffectId.BUTTON_EFF_BIG_RED);
                        }
                        if ((guideData[1] == 1 && (guideData[0] == TypeTask.UP_LEVEL_POS1 || GameModels.task.curTask.type == TypeTask.UP_LEVEL_POS2)) || (guideData[1] == 2 && guideData[0] == 2)) {
                            //主线升级或者文官升级
                            mg.effectManager.bindEffect(this.btnUpgrade, TypeEffectId.BUTTON_EFF_BIG_YELLO);
                        }
                    }
                };
                RoleEquipt.prototype.exit = function () {
                    mg.effectManager.unbindEffect(this.btnUseEquips);
                    mg.effectManager.unbindEffect(this.btnUpgrade);
                    this.headList.reset();
                    this.expProgress.reset();
                    this.closeZDSJ();
                    this._isUpOperation = false;
                    this._shenBingSkillVo = null;
                    this._count = 0;
                    this._angle = 0;
                    egret.Tween.removeTweens(this.imgPreBg);
                    GameModels.equip.removeEventListener(mo.ModelEquip.USE_EQUIP_CHANGE, this.updateUseEquip, this);
                    GameModels.equip.removeEventListener(mo.ModelEquip.DEL_EQUIP_CHANGE, this.refreshEquips, this);
                    mg.alertManager.removeEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.closeZDSJ, this);
                    mg.StoryManager.instance.removeEventListener(mg.StoryManager.SHOW_OR_HIED_STORY, this.closeZDSJ, this);
                    mg.uiManager.removeEventListener(mg.UIManager.ADD_NEW_VIEW, this.closeZDSJ, this);
                    GameModels.user.player.offPropertyChange(TypeProperty.FASHION_CLOTH, this, this.avatarChangeHandler);
                    GameModels.user.player.offPropertyChange(TypeProperty.WING_MODLEID, this, this.avatarChangeHandler);
                    GameModels.user.player.offPropertyChange(TypeProperty.FASHION_WEAPON, this, this.avatarChangeHandler);
                    // GameModels.user.player.offPropertyChange(TypeProperty.DRESSEDTITLE, this, this.updateMarkTitle);
                    this.btnSwitch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this.btnUseEquips.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this.btnCheckPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this.getItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPropView, this);
                    this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
                    GameModels.pet.removeEventListener(mo.ModelPet.PET_CHANGE_LEVEL, this.showRoleAndPetLv, this);
                    GameModels.pet.removeEventListener(mo.ModelPet.FORMAT_CHANGE, this.onPetFormatChangeHandler, this);
                    GameModels.bag.offItemChange(ConfigData.GENERAL_ONEUPGRADEITEM, this, this.showAttributeAndNeed);
                    this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this.getRoleExp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    GameModels.pet.removeEventListener(mo.ModelPet.BINGFA_CHANGE, this.updata, this);
                    this.labCorps.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    GameModels.bag.removeEventListener(mo.ModelBag.OPEN_BINGFA_LIST, this.updata, this);
                    this.btnZhuZhan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    if (this._playerShowAvatar) {
                        this._playerShowAvatar.reset();
                    }
                    if (this._fightEffect) {
                        if (this._fightEffect.parent) {
                            this._fightEffect.parent.removeChild(this._fightEffect);
                        }
                        this._fightEffect.stop();
                        utils.ObjectPool.to(this._fightEffect, true);
                        this._fightEffect = null;
                    }
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        this._equipBoxs[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ancientIconHandler, this);
                        this._equipBoxs[i].dataSource = null;
                    }
                    for (var i = 0; i < this._petSKillArr.length; i++) {
                        this._petSKillArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
                    }
                    for (var i = 0; i < this._bingFaItems.length; i++) {
                        this._bingFaItems[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBingFaClick, this);
                    }
                    this.skillShenBing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
                };
                RoleEquipt.prototype.tweenPreviewImgHandler = function () {
                    this._count++;
                    this._angle = this._count * 360;
                    egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
                };
                Object.defineProperty(RoleEquipt.prototype, "isUpOperation", {
                    get: function () {
                        return this._isUpOperation;
                    },
                    enumerable: true,
                    configurable: true
                });
                RoleEquipt.prototype.onPetFormatChangeHandler = function (e) {
                    var petPos = e.data;
                    logger.log("onPetFormatChangeHandler", petPos);
                    if (petPos == 1 || petPos == 2 || petPos == 3 || petPos == 4) {
                        mg.effectManager.playEffectOnce(TypeEffectId.PETUPFIGHT_EFF, mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
                        this.headList.init(petPos, this, this.updata);
                    }
                };
                RoleEquipt.prototype.ancientIconHandler = function (e) {
                    this.closeZDSJ();
                    var items = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, this.headList.selectIndex);
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        if (e.currentTarget == this._equipBoxs[i]) {
                            if (items[i].refId) {
                                if (items[i].quality == 5) {
                                    mg.alertManager.showAlert(role.ChengZhuangEquipInfoAlert, true, true, this.headList.selectIndex, items[i]);
                                }
                                else {
                                    mg.alertManager.showAlert(role.AncientEquipInfoAlert, true, true, this.headList.selectIndex, items[i]);
                                }
                            }
                            else {
                                // var bagEquips: vo.EquipVO[] = GameModels.bag.getEquipsByPos(items[i].pos);
                                // if (bagEquips.length > 0) {
                                // 	mg.uiManager.show(dialog.role.AncientEquipDressDialog, this.headList.selectIndex, items[i]);
                                // } else {
                                // 	//mg.alertManager.showAlert(PropOfSourceAlert, true, true, 330001);
                                // }
                            }
                            break;
                        }
                    }
                };
                RoleEquipt.prototype.onSkillClick = function (e) {
                    if (e.currentTarget == this.skillShenBing) {
                        if (this._shenBingSkillVo)
                            mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._shenBingSkillVo);
                    }
                    else {
                        for (var i = 0; i < this._petSKillArr.length; i++) {
                            if (e.currentTarget == this._petSKillArr[i]) {
                                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._petSKillArr[i].dataSource);
                                break;
                            }
                        }
                    }
                };
                RoleEquipt.prototype.onBingFaClick = function (e) {
                    var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
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
                RoleEquipt.prototype.updata = function () {
                    this.imgNeedStar.visible = false;
                    if (this.headList.selectIndex == 0)
                        mg.effectManager.unbindEffect(this.btnUpgrade);
                    TypePetPos.role_currPos = this.headList.selectIndex;
                    var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    this.imgXiYouPet.visible = false;
                    if (pet.refId != "13000" && pet.isHashFourSkill) {
                        this.imgXiYouPet.visible = true;
                        this.imgXiYouPet.source = pet.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                    }
                    if (pet) {
                        var petCorps = TypeCorps.getCorpsBuyType(pet.template.corps);
                        this.labCorps.textFlow = utils.htmlUtil.getUnderlineFormat(petCorps);
                        this.labLocation.text = pet.template.des;
                        if (this.headList.selectIndex == 0) {
                            if (GameModels.user.player.level >= pet.generalBraekTmp.levelOpen) {
                                this.imgNeedStar.visible = true;
                                if (GameModels.user.player.exp >= GameModels.user.player.roleLvTemplates.needExp) {
                                    this.imgNeedStar.source = "img_needStar1_png";
                                }
                                else {
                                    this.imgNeedStar.source = "img_needStar2_png";
                                }
                            }
                        }
                    }
                    this.expProgress.noTweenValue = 0;
                    if (this.headList.selectIndex == 0) {
                        if (GameModels.user.player.level > 1) {
                            this.expProgress.noTweenValue = GameModels.user.player.exp / GameModels.user.player.maxExp;
                        }
                    }
                    this.bg.source = this.headList.selectIndex == 0 ? "role_equipbg_jpg" : "role_equipbg1_jpg";
                    this.btnUpgrade.visible = this.headList.selectIndex != 0;
                    this.labExpValue.visible = this.headList.selectIndex == 0;
                    this.labExpValue.text = GameModels.user.player.exp + "/" + GameModels.user.player.roleLvTemplates.needExp;
                    this.closeZDSJ();
                    var viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
                    if (viewRole)
                        viewRole.updataChange();
                    // if (this.headList.selectIndex == 0) this.updateMarkTitle();
                    this.showAttributeAndNeed();
                    this.showRoleAndPetLv();
                    this.refreshEquips();
                    if (GameModels.role.roleHash100lv() && GameModels.role.isRoleJump) {
                        GameModels.role.isRoleJump = false;
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_JYYCQSX, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                            mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 1 });
                        }));
                    }
                };
                RoleEquipt.prototype.showProitesAndSkill = function () {
                    var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    if (pet) {
                        var voData = pet.formatData;
                        this.labHP.text = "" + voData.getProperty(TypeProperty.MaxHp);
                        this.labATT.text = "" + voData.getProperty(TypeProperty.PAtk);
                        this.labDEF.text = "" + voData.getProperty(TypeProperty.PDef);
                        this.labCROSS.text = "" + voData.getProperty(TypeProperty.IgnorePDef);
                        for (var i = 0; i < this._petSKillArr.length; i++) {
                            this._petSKillArr[i].dataSource = null;
                            this.skillGroup.removeChild(this._petSKillArr[i]);
                        }
                        var skillList = pet.skillList.list;
                        for (var i = 0; i < this._petSKillArr.length; i++) {
                            if (skillList[i]) {
                                var skillActNeedLevel = pet.getSkillActNeedLevel(i);
                                if (skillActNeedLevel > 0) {
                                    skillList[i].actNeedLevel = pet.getSkillActNeedLevel(i);
                                }
                                else {
                                    skillList[i].upNeedLevel = pet.getSkillUpNeedLevel(i);
                                }
                                this.skillGroup.addChild(this._petSKillArr[i]);
                                this._petSKillArr[i].dataSource = skillList[i];
                            }
                        }
                        this.skillShenBing.dataSource = null;
                        if (pet.shenBingId != 0) {
                            this.shenBingGroup.visible = true;
                            this._shenBingSkillVo = pet.shenBingSkill;
                            this.skillShenBing.dataSource = pet.shenBingSkill;
                            this.skillShenBing.filters = pet.shenBingLv >= 1 && pet.generalBraekTmp.shenbingOpen > 0 ? null : utils.filterUtil.grayFilters;
                            if (pet.generalBraekTmp.shenbingOpen > 0 && pet.shenBingLv >= 1) {
                                this._shenBingSkillVo.needLv = 2;
                            }
                            else {
                                this._shenBingSkillVo.needLv = 1;
                            }
                        }
                        else {
                            this.shenBingGroup.visible = false;
                        }
                        this.showBingFa(pet);
                    }
                };
                RoleEquipt.prototype.showBingFa = function (pet) {
                    for (var i = 0; i < this._bingFaItems.length; i++) {
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
                RoleEquipt.prototype.onBtnUpgrade = function (e) {
                    if (this.headList.selectIndex == 0) {
                        if (app.gameContext.typeGame != TypeGame.ATKCITY) {
                            mg.alertManager.tip(Language.J_FBZWFQH);
                            return;
                        }
                        // mg.uiManager.show(main.ChapterBossMainView);
                        mg.uiManager.removeAllDialogs();
                        return;
                    }
                    mg.effectManager.unbindEffect(this.btnUpgrade);
                    common.CommonBtnLongClick.instance.startLongClickFun(this.btnUpgrade, this, this.upgradeHandler);
                };
                RoleEquipt.prototype.upgradeHandler = function () {
                    var _this = this;
                    if (this.headList.selectIndex == 0)
                        return;
                    var petVo = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    var times = petVo.lv >= 100 ? 1 : 5;
                    if (this._bagCount >= this._needCount) {
                        mg.soundManager.playSound("OpenUI_zdsj", 1, true, true);
                        GameModels.role.levelUpgrade(this.headList.selectIndex, times, utils.Handler.create(this, function (data) {
                            _this.expProgress.oneTween();
                            _this.showAttributeAndNeed();
                            mg.effectManager.playEffectOnce(TypeEffectId.SHENGJI_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                            var viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
                            if (viewRole)
                                viewRole.updataChange();
                            if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType20000 && petVo.lv >= GameModels.pet.getFormatUpMaxLevelVOByPos(_this.headList.selectIndex)) {
                                GameModels.guide.stopClinteGuide();
                                GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType30000, _this.headList.selectIndex);
                            }
                        }), utils.Handler.create(this, function (data) {
                            mg.alertManager.tip(data.CodeMsg, 0xff0000);
                            _this.closeZDSJ();
                            if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType20000) {
                                GameModels.guide.stopClinteGuide();
                                GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType30000, _this.headList.selectIndex);
                            }
                        }));
                    }
                    else {
                        this._isUpOperation = true;
                        //50级之前且自动升级过时材料不够不弹物品获取Tips
                        if (GameModels.user.player.level <= TypeModel.LimitLevel) {
                            this.closeZDSJ();
                            mg.alertManager.tip(Language.J_CLBZTZZDSJ);
                        }
                        else {
                            if (GameModels.user.player.level >= 50 && GameModels.user.player.level < 150 && GameModels.pet.hashCanLvRebirth()) {
                                mg.alertManager.showAlert(PromptAlert, false, true, Language.J_QWCSWJ, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                                    mg.uiManager.show(dialog.tujian.TuJianMainDialog, { tabIndex: 3 });
                                }));
                            }
                            else {
                                this.alertPropView();
                            }
                        }
                        if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType20000) {
                            GameModels.guide.stopClinteGuide();
                            GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType30000, this.headList.selectIndex);
                        }
                    }
                };
                RoleEquipt.prototype.alertPropView = function () {
                    this.closeZDSJ();
                    var id = "";
                    if (this.headList.selectIndex != 0) {
                        var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                        id = pet.petLvTemplates.consume.split("_")[0];
                        if (pet.petLvTemplates.nextId == -1) {
                            mg.alertManager.tip(Language.J_WJYMJ);
                            return;
                        }
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, id, 0, false, 2);
                    }
                };
                RoleEquipt.prototype.onBtnClickHandler = function (e) {
                    this.closeZDSJ();
                    switch (e.target) {
                        case this.getRoleExp:
                            mg.alertManager.showAlert(PropOfSourceAlert, true, true, 301, 0, false, 1);
                            break;
                        case this.btnUseEquips:
                            mg.effectManager.unbindEffect(this.btnUseEquips);
                            if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.WARE) {
                                GameModels.task.curTask.clientTaskType = true;
                            }
                            if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType30000) {
                                GameModels.guide.stopClinteGuide();
                            }
                            GameModels.equip.requesOneDressNewEquips(this.headList.selectIndex, TypeEquip.JICHU_EQIUP_START_POS, TypeEquip.JICHU_EQIUP_END_POS);
                            break;
                        case this.btnSwitch:
                            if (this.headList.selectIndex == 0) {
                                mg.alertManager.tip(Language.J_CGZDZGBXXZ);
                                return;
                            }
                            var petArr = GameModels.pet.getPetVOListByType(this.headList.selectIndex);
                            if (petArr.length <= 0) {
                                // var posName: string = TypePetPos.getPosNameBuyPos(this.headList.selectIndex);
                                // mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_MYWJ, posName, posName), TypeBtnLabel.OK
                                // 	, null, utils.Handler.create(this, this.checkPet), null, null, true, false);
                                mg.alertManager.tip(Language.J_MYKRMHS);
                            }
                            else {
                                mg.uiManager.show(dialog.list.PetListDialog, this.headList.selectIndex);
                            }
                            break;
                        case this.btnCheckPet:
                        case this.imgHelp:
                            var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                            var obj = { proper: pet.property, refId: pet.refId };
                            mg.TipUpManager.instance.showTip(tipUps.PropertyTips, obj);
                            break;
                        case this.labCorps:
                            if (!GameModels.user.player.legionId) {
                                mg.alertManager.tip(Language.J_JRZYCKBZ);
                            }
                            else {
                                var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                                if (pet)
                                    mg.uiManager.show(LegionCorpsMain, pet.template.corps - 1);
                            }
                            break;
                        case this.btnZhuZhan:
                            var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                            if (pet.star < 6) {
                                mg.alertManager.tip(Language.J_6XKQZZGN);
                                return;
                            }
                            mg.uiManager.show(dialog.role.zhuzhan.RoleZhuZhan, pet);
                            break;
                    }
                };
                RoleEquipt.prototype.checkPet = function () {
                    if (this.headList.selectIndex == 0)
                        return;
                    if (this.headList.selectIndex == 1) {
                        mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: 2, param: 1, param1: 1 });
                    }
                    else if (this.headList.selectIndex == 4) {
                        mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: 2, param: 1, param1: 3 });
                    }
                    else {
                        mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: 2, param: 1, param1: 0 });
                    }
                };
                // protected updateMarkTitle() {
                // 	var template: templates.gameFashion = Templates.getTemplateById(templates.Map.GAMEFASHION, GameModels.user.player.getProperty(TypeProperty.DRESSEDTITLE));
                // 	var marktitleSkin = template ? template.modelId : null;
                // 	if (marktitleSkin) {
                // 		if (!this._title) {
                // 			this._title = new eui.Image();
                // 			this._title.scaleX = this._title.scaleY = 1.2;
                // 		}
                // 		this._title.source = ResPath.getShowTitlePath(marktitleSkin);
                // 		this._title.anchorOffsetX = 100;
                // 		this._title.anchorOffsetY = 40;
                // 		var infos = RES.getRes('title_config_json');
                // 		if (infos) {
                // 			for (var info of infos) {
                // 				if (info.id == marktitleSkin) {
                // 					this._title.anchorOffsetX = info.anchorX;
                // 					this._title.anchorOffsetY = info.anchorY;
                // 					break;
                // 				}
                // 			}
                // 		}
                // 		if (!this._title.parent) {
                // 			this.addChild(this._title);
                // 			this._title.x = this.width / 2;
                // 			this._title.y = this.blabFight.y + 70;
                // 		}
                // 	} else {
                // 		if (this._title) {
                // 			if (this._title.parent) {
                // 				this._title.parent.removeChild(this._title);
                // 			}
                // 			this._title.source = null;
                // 		}
                // 	}
                // }
                RoleEquipt.prototype.updateUseEquip = function (e) {
                    if (e === void 0) { e = null; }
                    this.updata();
                    var indexs = e.data;
                    for (var _i = 0, indexs_1 = indexs; _i < indexs_1.length; _i++) {
                        var index = indexs_1[_i];
                        for (var _a = 0, _b = this._equipBoxs; _a < _b.length; _a++) {
                            var item = _b[_a];
                            if (item && item.pos == index) {
                                mg.effectManager.playEffectOnce("6103", 45, 45, item);
                            }
                        }
                    }
                };
                RoleEquipt.prototype.refreshEquips = function () {
                    this.btnUseEquips.isWarn = false;
                    var equip = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, this.headList.selectIndex);
                    for (var i = 0; i < this._equipBoxs.length; i++) {
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
                    this.btnUseEquips.isWarn = GameModels.equip.checkEqiupRedPoint(this.headList.selectIndex);
                    this.showPlayerModelAndPetModel();
                };
                RoleEquipt.prototype.showPlayerModelAndPetModel = function () {
                    if (this.headList.selectIndex == 0) {
                        this._playerShowAvatar.visible = true;
                        this.body.visible = false;
                        this.refreshModel(GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, 0));
                    }
                    else {
                        this._playerShowAvatar.visible = false;
                        this.body.visible = true;
                        var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                        if (pet) {
                            this.body.setPetBody(pet.avatarId);
                        }
                    }
                };
                RoleEquipt.prototype.avatarChangeHandler = function () {
                    this.refreshModel(GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, 0));
                };
                RoleEquipt.prototype.showClothesAvatar = function () {
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
                RoleEquipt.prototype.showWingAvatar = function () {
                    this._playerShowAvatar.wingResId = "";
                    var fashionWing = GameModels.user.player.getProperty(TypeProperty.WING_MODLEID);
                    if (fashionWing > 0) {
                        this._playerShowAvatar.wingResId = fashionWing + "";
                    }
                };
                RoleEquipt.prototype.showFashionWeapon = function () {
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
                RoleEquipt.prototype.showAttributeAndNeed = function () {
                    this.getItem.visible = GameModels.platform.isPay;
                    this.btnUpgrade.isWarn = false;
                    this.xiaoHaoGroup.visible = this.headList.selectIndex != 0;
                    this.getRoleExp.visible = GameModels.platform.isPay && this.headList.selectIndex == 0;
                    if (this.headList.selectIndex != 0) {
                        var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                        if (pet) {
                            if (pet.petLvTemplates.nextId == -1) {
                                this.xiaoHaoGroup.visible = false;
                            }
                            else {
                                var strArr = pet.petLvTemplates.consume.split("_");
                                var item = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
                                this.imgXiaoHao.source = item.icon;
                                this._bagCount = GameModels.bag.getItemCountById(strArr[0]);
                                this._needCount = parseInt(strArr[1]);
                                var isCan = GameModels.bag.getItemCountById(strArr[0]) >= parseInt(strArr[1]);
                                this.labNeedName.text = item.name + ":";
                                this.labXiaoHaoCount.text = GameModels.bag.getItemCountById(strArr[0]) + "/" + strArr[1];
                                this.labXiaoHaoCount.textColor = isCan ? 0x00ff00 : 0xff0000;
                            }
                            var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                            if (pet && pet.lv < 100) {
                                this.btnUpgrade.label = Language.C_S5J;
                            }
                            else {
                                this.btnUpgrade.label = Language.C_SJ1;
                            }
                        }
                        this.btnUpgrade.isWarn = GameModels.equip.checkPosUpRedPoint(this.headList.selectIndex);
                    }
                    this.btnSwitch.isWarn = this.headList.selectIndex != 0 && GameModels.pet.isHashHigherPetChange(pet);
                };
                RoleEquipt.prototype.updataJiBanAndChangRed = function () {
                    var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    if (pet) {
                        this.btnSwitch.isWarn = GameModels.pet.isHashHigherPetChange(pet);
                    }
                };
                RoleEquipt.prototype.showRoleAndPetLv = function () {
                    var _this = this;
                    var elements = [];
                    var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    if (pet) {
                        elements.push({ text: "LV." + pet.lv, style: { textColor: 0xE0D2AF } });
                        elements.push({ text: "/" + pet.generalBraekTmp.levelOpen, style: { textColor: 0xD3D3D3 } });
                        this.labLv.textFlow = elements;
                        "" + pet.lv;
                    }
                    var num;
                    switch (this.headList.selectIndex) {
                        case 0:
                            num = TypeFunction.PetRoom_0;
                            break;
                        case 1:
                            num = TypeFunction.PetRoom_1;
                            break;
                        case 2:
                            num = TypeFunction.PetRoom_2;
                            break;
                        case 3:
                            num = TypeFunction.PetRoom_3;
                            break;
                        case 4:
                            num = TypeFunction.PetRoom_4;
                            break;
                    }
                    GameModels.common.requestFightNum(this, num, function (fightNum) {
                        _this.blabFight.text = fightNum.toString();
                    });
                    this.showProitesAndSkill();
                };
                RoleEquipt.prototype.refreshModel = function (items) {
                    this.showWingAvatar();
                    var bol = this.showClothesAvatar();
                    if (bol) {
                        this._playerShowAvatar.clothResId = GameModels.user.player.clothResId;
                    }
                    var bol1 = this.showFashionWeapon();
                    if (bol1) {
                        this._playerShowAvatar.weaponResId = GameModels.user.player.weaponResId;
                    }
                    // for (var i = 0; i < items.length; i++) {
                    // 	if (items[i].pos == TypeEquip.CLOTHES) {
                    // 		var bol: boolean = this.showClothesAvatar();
                    // 		if (bol) {
                    // 			if (items[i].templateEquip) {
                    // 				var id: string = items[i].templateEquip.model;
                    // 				this._playerShowAvatar.clothResId = id;
                    // 			}
                    // 			else {
                    // 				if (this._playerShowAvatar) {
                    // 					this._playerShowAvatar.clothResId = TypeEquip.DEFAULT_CLOTHES;
                    // 				}
                    // 			}
                    // 		}
                    // 	}
                    // 	if (items[i].pos == TypeEquip.WEAPON) {
                    // 		var bol: boolean = this.showFashionWeapon();
                    // 		if (bol) {
                    // 			if (items[i].templateEquip) {
                    // 				let tmp: templates.equip = items[i].templateEquip;
                    // 				if (this._playerShowAvatar) {
                    // 					this._playerShowAvatar.weaponResId = tmp.model;
                    // 				}
                    // 			}
                    // 			else {
                    // 				if (this._playerShowAvatar) {
                    // 					this._playerShowAvatar.weaponResId = TypeEquip.DEFAULT_WEAPON;
                    // 				}
                    // 			}
                    // 		}
                    // 	}
                    // }
                };
                RoleEquipt.prototype.closeZDSJ = function () {
                    common.CommonBtnLongClick.instance.stopLongClickFun();
                    if (this.headList.selectIndex == 0) {
                        this.btnUpgrade.visible = false;
                    }
                    else {
                        this.btnUpgrade.visible = true;
                        var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                        if (pet && pet.lv < 100) {
                            this.btnUpgrade.label = Language.C_S5J;
                        }
                        else {
                            this.btnUpgrade.label = Language.C_SJ1;
                        }
                    }
                };
                Object.defineProperty(RoleEquipt.prototype, "headIndex", {
                    get: function () {
                        return this.headList.selectIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                RoleEquipt.prototype.getHeadInfo = function (index) {
                    return this.headList.getRoleByIndex(index);
                };
                return RoleEquipt;
            }(ui.RoleEquiptSkin));
            equip_1.RoleEquipt = RoleEquipt;
            __reflect(RoleEquipt.prototype, "dialog.role.equip.RoleEquipt", ["IModuleView", "egret.DisplayObject"]);
        })(equip = role.equip || (role.equip = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
