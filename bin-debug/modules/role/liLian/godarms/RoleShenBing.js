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
        var liLian;
        (function (liLian) {
            var RoleShenBing = (function (_super) {
                __extends(RoleShenBing, _super);
                function RoleShenBing() {
                    return _super.call(this) || this;
                }
                RoleShenBing.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._btnTypeArr = [this.btn_shenBing1, this.btn_shenBing2];
                };
                RoleShenBing.prototype.enter = function (data) {
                    this.getItem.visible = this.btnBuy.visible = this.imgPreBg.visible = GameModels.platform.isPay;
                    this._isChange = true;
                    this._oldIndex = 0;
                    this._skillUpLv = 0;
                    this._count = 0;
                    this._angle = 0;
                    egret.Tween.removeTweens(this.imgPreBg);
                    this.tweenPreviewImgHandler();
                    var id = data ? data : 0;
                    var arr = GameModels.shenbing.getShenBingTmpBuyId(id);
                    this._index = arr && arr[0] ? arr[0] : 1;
                    this._selectIndex = arr && arr[1] ? arr[1] : 0;
                    this.shenbingList.dataProvider = this._listData = new eui.ArrayCollection();
                    this.createPhantomEffect();
                    var hashRedPoint = GameModels.shenbing.getHashRedPointBuyStep();
                    if (hashRedPoint) {
                        var arr1 = GameModels.shenbing.getShenBingTmpBuyId(hashRedPoint.refId);
                        this._index = arr && arr[0] ? this._index : arr1 && arr1[0] ? arr1[0] : 1;
                        this._selectIndex = arr && arr[1] ? this._selectIndex : arr1 && arr1[1] ? arr1[1] : 0;
                    }
                    this.showListView(this._index - 1);
                    this.btn_shenBing1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                    this.btn_shenBing2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                    this.shenbingList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                    this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.requestUpdate, this);
                    this.talent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTalent, this);
                    this.btnSplit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHeChengOrSplit, this);
                    this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPorpView, this);
                    GameModels.bag.addEventListener(mo.ModelBag.HECHENG_CHANG, this.updataList, this);
                    GameModels.shenbing.addEventListener(mo.ModelShenBing.SHENBING_TALENT, this.showSkillTalent, this);
                    GameModels.bag.onItemChange(ConfigData.SEHNBINGDEBIES, this, this.showView);
                    this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyItemClick, this);
                };
                RoleShenBing.prototype.exit = function () {
                    this._isChange = true;
                    this._oldIndex = 0;
                    this._skillUpLv = 0;
                    this._index = 0;
                    this._selectIndex = 0;
                    this.clearList(this.shenbingList);
                    this.removePhantomEffect();
                    this._count = 0;
                    this._angle = 0;
                    egret.Tween.removeTweens(this.imgPreBg);
                    this.btn_shenBing1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                    this.btn_shenBing2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                    this.shenbingList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                    this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.requestUpdate, this);
                    this.talent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showTalent, this);
                    this.getItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPorpView, this);
                    this.btnSplit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showHeChengOrSplit, this);
                    GameModels.bag.removeEventListener(mo.ModelBag.HECHENG_CHANG, this.updataList, this);
                    GameModels.shenbing.removeEventListener(mo.ModelShenBing.SHENBING_TALENT, this.showSkillTalent, this);
                    GameModels.bag.offItemChange(ConfigData.SEHNBINGDEBIES, this, this.showView);
                    this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyItemClick, this);
                };
                RoleShenBing.prototype.updataList = function () {
                    this._listData.replaceAll(this._listData.source);
                    this.showView();
                    this.checkBtnRedPoint();
                };
                RoleShenBing.prototype.btnClick = function (evt) {
                    var index = this._btnTypeArr.indexOf(evt.currentTarget);
                    if (index == this._btnTypeArr.length - 1) {
                        this.scroller.viewport.scrollV = 0;
                        this.scroller.validateNow();
                    }
                    if (this._oldIndex == index) {
                        this._isChange = !this._isChange;
                    }
                    else {
                        this._oldIndex = index;
                        this._isChange = true;
                    }
                    if (this._isChange) {
                        this._selectIndex = 0;
                        this.showListView(index);
                    }
                    else {
                        this._listData.source = [];
                        for (var i = 0; i < this._btnTypeArr.length; i++) {
                            if (i == 0) {
                                this._btnTypeArr[i].y = 25.5;
                            }
                            else {
                                this._btnTypeArr[i].y = this._btnTypeArr[i - 1].y + this._btnTypeArr[i - 1].height + 1;
                            }
                        }
                        this.shenbingscroller.y = this._btnTypeArr[this._btnTypeArr.length - 1].y + this._btnTypeArr[this._btnTypeArr.length - 1].height / 2 + this.shenbingscroller.height / 2 + 1;
                        this.shenbingscroller.validateNow();
                    }
                };
                RoleShenBing.prototype.showListView = function (index) {
                    this._listData.source = GameModels.shenbing.getShenBingVoByStep(index + 1);
                    this.shenbingList.selectedIndex = this._selectIndex;
                    this._data = this.shenbingList.selectedItem;
                    this.shenbingscroller.validateNow();
                    this.shenbingscroller.anchorOffsetX = this.shenbingscroller.width / 2;
                    this.shenbingscroller.anchorOffsetY = this.shenbingscroller.height / 2;
                    for (var i = 0; i < this._btnTypeArr.length; i++) {
                        if (i > index) {
                            if (i - 1 == index) {
                                this._btnTypeArr[i].y = this.shenbingscroller.y + this.shenbingscroller.height / 2 + this._btnTypeArr[i].height / 2 + 1;
                            }
                            else {
                                this._btnTypeArr[i].y = this._btnTypeArr[i - 1].y + this._btnTypeArr[i - 1].height + 1;
                            }
                        }
                        else if (i == index) {
                            for (var j = 0; j <= index; j++) {
                                if (j > 0) {
                                    this._btnTypeArr[j].y = this._btnTypeArr[j - 1].y + this._btnTypeArr[j - 1].height + 1;
                                }
                            }
                            // this.shenbingscroller.x = this._btnTypeArr[index].x + 22;
                            this.shenbingscroller.y = this._btnTypeArr[index].y + this._btnTypeArr[index].height / 2 + this.shenbingscroller.height / 2 + 1;
                        }
                    }
                    this.showView();
                    this.checkBtnRedPoint();
                    this.updateScrollH(this.shenbingList.selectedIndex * 45);
                };
                RoleShenBing.prototype.updateScrollH = function (maxLength) {
                    this.shenbingList.validateNow();
                    var pos = maxLength - 200 + 46;
                    var maxScrollV = this.shenbingList.contentHeight - 300;
                    if (pos <= 0)
                        pos = 0;
                    else if (pos >= maxScrollV)
                        pos = maxScrollV;
                    this.rollScroller(pos);
                };
                /**滚动条滚动到指定位置 */
                RoleShenBing.prototype.rollScroller = function (pos, duration) {
                    if (duration === void 0) { duration = 200; }
                    egret.Tween.get(this.scroller.viewport).to({ scrollV: pos }, duration);
                };
                RoleShenBing.prototype.showView = function () {
                    var _this = this;
                    if (!this._data)
                        return;
                    this.btnUpgrade.isWarn = false;
                    this.labName.text = this._data.name;
                    var petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._data.general);
                    if (petTmp) {
                        var elements = [];
                        elements.push({ text: petTmp.name, style: { textColor: TypeQuality.getStarColor(petTmp.star) } });
                        elements.push({ text: Language.C_ZSSB, style: { textColor: 0xD3D3D3 } });
                        this.labExclusive.textFlow = elements;
                    }
                    else {
                        this.labExclusive.text = "";
                    }
                    var talentId = this._data.getTalentBuyLevel(this._data.level);
                    this._talentTemp = Templates.getTemplateById(templates.Map.SKILLNEW, talentId);
                    this.imgIcon.source = this._talentTemp.icon;
                    if (this._data.level < 1) {
                        this.talent.filters = utils.filterUtil.grayFilters;
                    }
                    else {
                        this.talent.filters = null;
                    }
                    this.star.setStar(this._data.level);
                    this.btnAcvitice(this._data.level);
                    if (this._data.level < 10) {
                        var consume = "";
                        if (this._data.level > 0) {
                            var num = this._data.getGrowBase(this._data.level);
                            if (num > 0) {
                                var strArr = this._data.template.baseCon.split("_");
                                consume = strArr[0] + "_" + num * parseInt(strArr[1]);
                            }
                            else {
                                consume = this._data.getGrowUpConsume(this._data.level);
                            }
                        }
                        else {
                            consume = this._data.activateConsume;
                        }
                        var strConsume = consume.split("_");
                        var itemtemps = Templates.getTemplateById(templates.Map.ITEM, strConsume[0]);
                        var bagcount = GameModels.bag.getItemCountById(strConsume[0]);
                        this.labNeed.text = itemtemps.name + ":";
                        this.imgNeedIcon.source = itemtemps.icon;
                        this.labCount.text = bagcount + "/" + strConsume[1];
                        this.labCount.textColor = bagcount >= parseInt(strConsume[1]) ? TypeColor.GREEN1 : TypeColor.RED1;
                        if (bagcount >= parseInt(strConsume[1]) && this._data.level < 10) {
                            this.btnUpgrade.isWarn = true;
                        }
                    }
                    else {
                        var itemtemps = Templates.getTemplateById(templates.Map.ITEM, 211301);
                        this.labNeed.text = itemtemps.name + ":";
                        this.imgNeedIcon.source = itemtemps.icon;
                        this.labCount.text = Language.C_YMJ;
                        this.labCount.textColor = TypeColor.RED1;
                        this.btnUpgrade.label = Language.C_YMJ;
                    }
                    this.propertyBox.updateAtts(this._data.getGrowUpProperites(this._data.level), this._data.getGrowUpProperites(this._data.level + 1));
                    if (this._effect) {
                        this._effect.resId = this._data.modle;
                        this._effect.play();
                    }
                    // this.expProgress.value = (this._data.level / 10) * 100;
                    var num = TypeFunction.ShenBin;
                    GameModels.common.requestFightNum(this, num, function (fightNum) {
                        _this.labFight.text = fightNum.toString();
                    });
                };
                RoleShenBing.prototype.buyItemClick = function (e) {
                    mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 5);
                };
                RoleShenBing.prototype.tweenPreviewImgHandler = function () {
                    this._count++;
                    this._angle = this._count * 360;
                    egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
                };
                RoleShenBing.prototype.checkBtnRedPoint = function () {
                    this.btn_shenBing1.isWarn = GameModels.shenbing.checkShenBinRedBuyStep(1);
                    this.btn_shenBing2.isWarn = GameModels.shenbing.checkShenBinRedBuyStep(2);
                };
                RoleShenBing.prototype.btnAcvitice = function (num) {
                    if (num <= 0) {
                        //未激活
                        this.btnUpgrade.label = Language.C_JH;
                    }
                    else {
                        //已激活
                        this.btnUpgrade.label = Language.C_SJ1;
                    }
                };
                RoleShenBing.prototype.showSkillTalent = function () {
                    if (this._data.level >= this._skillUpLv) {
                        this._skillUpLv = 0;
                        var talentId = this._data.getTalentBuyLevel(this._data.level);
                        var skillVO = vo.fromPool(vo.SkillVO);
                        skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, talentId), 0);
                        if (this._data.level == 1) {
                            mg.alertManager.showAlert(PetSkillLockTips, true, true, skillVO);
                        }
                        else {
                            mg.alertManager.showAlert(PetSkillLockTips, true, true, skillVO, 2);
                        }
                    }
                };
                RoleShenBing.prototype.showTalent = function (e) {
                    var talentId = this._data.getTalentBuyLevel(this._data.level);
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, talentId), 0);
                    if (this._data.level <= 0) {
                        skillVO.actNeedLevel = 1;
                    }
                    else {
                        skillVO.upNeedLevel = this._data.getUpSkillNeedLevel(talentId);
                    }
                    mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, skillVO);
                };
                RoleShenBing.prototype.requestUpdate = function (e) {
                    var _this = this;
                    if (this._data.level <= 0) {
                        this._skillUpLv = 1;
                    }
                    else {
                        this._skillUpLv = this._data.getUpSkillNeedLevel(this._data.getTalentBuyLevel(this._data.level));
                    }
                    GameModels.shenbing.requestUpShenBing(this._data.refId, utils.Handler.create(this, function () {
                        _this._listData.replaceAll(_this._listData.source);
                        _this.showView();
                        _this.checkBtnRedPoint();
                    }));
                };
                RoleShenBing.prototype.onListClick = function (e) {
                    this.shenbingList.selectedIndex = e.itemIndex;
                    this._data = this.shenbingList.selectedItem;
                    this.showView();
                };
                RoleShenBing.prototype.alertPorpView = function (evt) {
                    var consume = "";
                    if (this._data.level > 0) {
                        var num = this._data.getGrowBase(this._data.level);
                        if (num > 0) {
                            var strArr = this._data.template.baseCon.split("_");
                            consume = strArr[0] + "_" + num * parseInt(strArr[1]);
                        }
                        else {
                            consume = this._data.getGrowUpConsume(this._data.level);
                        }
                    }
                    else {
                        consume = this._data.activateConsume;
                    }
                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, consume.split("_")[0]);
                };
                RoleShenBing.prototype.showHeChengOrSplit = function (evt) {
                    var consume = "";
                    if (this._data.level > 0) {
                        consume = this._data.getGrowUpConsume(this._data.level);
                    }
                    else {
                        consume = this._data.activateConsume;
                    }
                    if (evt.currentTarget == this.btnSplit) {
                        mg.uiManager.show(dialog.resolve.CommonOtherResovle, 2, consume.split("_")[0]);
                    }
                };
                RoleShenBing.prototype.createPhantomEffect = function () {
                    if (!this._effect) {
                        this._effect = utils.ObjectPool.from(s.AnimationSprite);
                        this._effect.y = 360;
                        this._effect.x = this.width * .5 + 10;
                        this._effect.frameRate = 6;
                        this.addChild(this._effect);
                    }
                };
                RoleShenBing.prototype.removePhantomEffect = function () {
                    if (this._effect) {
                        this._effect.stop();
                        this._effect.filters = null;
                        if (this._effect.parent) {
                            this._effect.parent.removeChild(this._effect);
                        }
                        utils.ObjectPool.to(this._effect, true);
                        this._effect = null;
                    }
                };
                return RoleShenBing;
            }(ui.RoleShenBingSkin));
            liLian.RoleShenBing = RoleShenBing;
            __reflect(RoleShenBing.prototype, "dialog.role.liLian.RoleShenBing");
        })(liLian = role.liLian || (role.liLian = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
