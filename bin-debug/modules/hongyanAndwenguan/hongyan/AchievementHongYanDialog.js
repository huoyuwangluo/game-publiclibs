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
var achievement;
(function (achievement) {
    var AchievementHongYanDialog = (function (_super) {
        __extends(AchievementHongYanDialog, _super);
        function AchievementHongYanDialog() {
            return _super.call(this) || this;
        }
        AchievementHongYanDialog.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._labArr = [this.labHp, this.labAtk, this.labDef, this.labCross];
            this._labNameArr = [this.labPro0, this.labPro1];
            this._labCiHunProArr = [this.labPro2, this.labPro3];
            this._btnArr = [this.btn0, this.btn1];
            this._btnLabArr = [this.lab0, this.lab1];
            this._starLab1 = [this.labPro4, this.labPro6, this.labPro8];
            this._starLab2 = [this.labPro5, this.labPro7, this.labPro9];
        };
        AchievementHongYanDialog.prototype.enter = function (data) {
            var _this = this;
            if (data === void 0) { data = null; }
            this.getItem1.visible = this.getItem2.visible = this.getItem3.visible = GameModels.platform.isPay;
            this._index = 0;
            this.showBtnView();
            GameModels.hongYan.requestHongYanGetInfo(utils.Handler.create(this, function () {
                _this._voArr = GameModels.hongYan.hongyanVo;
                if (!_this._listData) {
                    _this._listData = new eui.ArrayCollection(GameModels.hongYan.hongyanVo);
                }
                else {
                    _this._listData.source = GameModels.hongYan.hongyanVo;
                }
                _this.list.dataProvider = _this._listData;
                _this.list.selectedIndex = 0;
                var configId = (data && data ? data : 0);
                if (configId != 0) {
                    for (var i = 0; i < GameModels.hongYan.hongyanVo.length; i++) {
                        if (GameModels.hongYan.hongyanVo[i].confId == configId) {
                            _this.list.selectedIndex = i;
                            break;
                        }
                    }
                }
                _this._currData = _this.list.selectedItem;
                _this.initView();
                var viewRole = mg.uiManager.getView(dialog.baowu.BaoWuMain);
                if (viewRole)
                    viewRole.updataChange();
            }));
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtnClick, this);
            }
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.img_up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpList, this);
            this.img_down.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeDownList, this);
            this.btnJihuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.getItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.getItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.getItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnJieHun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnLiHun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpClick, this);
            GameModels.hongYan.addEventListener(mo.ModelHongYan.HONGYAN_CHANGE, this.updataView, this);
            GameModels.hongYan.addEventListener(mo.ModelHongYan.HONGYAN_MERRY, this.showSkillTips, this);
            GameModels.bag.onItemChange(ConfigData.HONGYAN_UP_ITEM, this, this.updataView);
        };
        AchievementHongYanDialog.prototype.exit = function () {
            this._caiLiaoBagCount = 0;
            this._caiLiaoNeedCount = 0;
            utils.timer.clearAll(this);
            if (this._tartMovie)
                this._tartMovie.stop();
            if (this._tartMovie && this._tartMovie.parent) {
                this._tartMovie.parent.removeChild(this._tartMovie);
                this._tartMovie = null;
            }
            this.closeZDSJ();
            this.clearList(this.list);
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtnClick, this);
            }
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.img_up.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpList, this);
            this.img_down.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeDownList, this);
            this.btnJihuo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.getItem1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.getItem2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.getItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnJieHun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.skill.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnLiHun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnUp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpClick, this);
            GameModels.hongYan.removeEventListener(mo.ModelHongYan.HONGYAN_CHANGE, this.updataView, this);
            GameModels.hongYan.removeEventListener(mo.ModelHongYan.HONGYAN_MERRY, this.showSkillTips, this);
            GameModels.bag.offItemChange(ConfigData.HONGYAN_UP_ITEM, this, this.updataView);
        };
        AchievementHongYanDialog.prototype.onBtnClick = function (e) {
            var _this = this;
            this.closeZDSJ();
            switch (e.currentTarget) {
                case this.skill:
                    mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this.skill.dataSource);
                    break;
                case this.btnJihuo:
                    if (this._index == 0) {
                        GameModels.hongYan.requestHongYanActive(this._currData.confId, utils.Handler.create(this, function () {
                            mg.effectManager.playEffectOnce(TypeEffectId.JIHUO_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                            _this._currData = GameModels.hongYan.getHongYanByConfId(_this._currData.confId);
                            _this.initView();
                        }));
                    }
                    else {
                        GameModels.hongYan.requestHongYanBreakStar(this._currData.confId, utils.Handler.create(this, function () {
                            _this._currData = GameModels.hongYan.getHongYanByConfId(_this._currData.confId);
                            _this.initView();
                        }));
                    }
                    break;
                case this.btnJieHun:
                    if (!GameModels.funcs.hashFunIsOpen(2003)) {
                        mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, GameModels.funcs.getConfigOpenLv(2003)), 0xff0000);
                        return;
                    }
                    mg.alertManager.showAlert(dialog.hongYanCiHun.AchievementHongYanCiHun, false, true, this._currData.confId);
                    break;
                case this.btnLiHun:
                    var num = 500;
                    var str = Language.getExpression(Language.E_SFXH1MSJCHP, num);
                    mg.alertManager.showAlert(PromptAlert, false, true, str, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                        GameModels.hongYan.requestHongYanBreakMarriage(_this._currData.confId, utils.Handler.create(_this, function () {
                            _this._currData = GameModels.hongYan.getHongYanByConfId(_this._currData.confId);
                            _this.updataView();
                        }));
                    }), null, true);
                    break;
                case this.getItem1:
                    if (this._counmesId1)
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._counmesId1);
                    break;
                case this.getItem2:
                    if (this._counmesId2)
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._counmesId2);
                    break;
                case this.getItem3:
                    if (this._counmesId3)
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._counmesId3);
                    break;
            }
        };
        AchievementHongYanDialog.prototype.playEff = function () {
            if (GameModels.hongYan.baoJiStatue == 2 || GameModels.hongYan.baoJiStatue == 5) {
                if (this._tartMovie)
                    this._tartMovie.stop();
                if (this._tartMovie && this._tartMovie.parent) {
                    this._tartMovie.parent.removeChild(this._tartMovie);
                    this._tartMovie = null;
                }
                this._tartMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._tartMovie.resId = "jiaoxinbaoji";
                this._tartMovie.replaceSlotImage("jxwz_frame", "jxwz_" + (GameModels.hongYan.baoJiStatue == 2 ? 1 : 2) + "_png");
                this._tartMovie.updateReplaceSlot();
                this._tartMovie.x = mg.stageManager.stage.stageWidth / 2;
                this._tartMovie.y = mg.stageManager.stage.stageHeight / 2 - 150;
                mg.stageManager.stage.addChild(this._tartMovie);
                this._tartMovie.playOnce("newAnimation");
                this._tartMovie.onCompleteOnce(this, function () {
                    if (this._tartMovie)
                        this._tartMovie.stop();
                    if (this._tartMovie && this._tartMovie.parent) {
                        this._tartMovie.parent.removeChild(this._tartMovie);
                        this._tartMovie = null;
                    }
                });
            }
        };
        AchievementHongYanDialog.prototype.onBtnUpClick = function (e) {
            common.CommonBtnLongClick.instance.startLongClickFun(this.btnUp, this, this.caiLiaoUpgradeHandler);
        };
        AchievementHongYanDialog.prototype.caiLiaoUpgradeHandler = function () {
            if (this._caiLiaoBagCount >= this._caiLiaoNeedCount) {
                this.upgradeHandler();
            }
            else {
                this.alertPropView(ConfigData.HONGYAN_UP_ITEM);
            }
        };
        AchievementHongYanDialog.prototype.upgradeHandler = function () {
            var _this = this;
            mg.soundManager.playSound("OpenUI_zdsj", 1, true, true);
            GameModels.hongYan.requestHongYanUpgrade(this._currData.confId, utils.Handler.create(this, function (data) {
                _this._currData = GameModels.hongYan.getHongYanByConfId(_this._currData.confId);
                var expValue = 0;
                if (_this._currData.level > _this._oldLv) {
                    expValue = (_this._currData.templateLvs.exp - _this._oldExp) + data.NewHongYan.Exp;
                    mg.effectManager.playEffectOnce(TypeEffectId.SHENGJI_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                    _this.expProgress.noTweenValue = 0;
                    if (!!_this._currData.marryPetId && _this._currData.level == _this._currData.skillOpenLv) {
                        _this.showSkillTips();
                    }
                }
                else {
                    expValue = data.NewHongYan.Exp - _this._oldExp;
                }
                if (data.BaoJiStatue == 2 || data.BaoJiStatue == 5) {
                    mg.alertManager.tip(Language.C_HYYX + "+" + expValue);
                }
                else {
                    mg.alertManager.tip(Language.C_HGD + "+" + expValue);
                }
                _this.initView(true);
            }), utils.Handler.create(this, function (data) {
                mg.alertManager.tip(data.CodeMsg, 0xff0000);
                _this.closeZDSJ();
            }));
        };
        AchievementHongYanDialog.prototype.alertPropView = function (id) {
            this.closeZDSJ();
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, id);
        };
        AchievementHongYanDialog.prototype.changeUpList = function (e) {
            var sc = this.scroller;
            sc.viewport.scrollV -= 100;
            if (sc.viewport.scrollV <= 0) {
                sc.viewport.scrollV = 0;
            }
        };
        AchievementHongYanDialog.prototype.changeDownList = function (e) {
            this.closeZDSJ();
            var sc = this.scroller;
            sc.viewport.scrollV += 100;
            if ((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
                sc.viewport.scrollV = sc.viewport.contentHeight - sc.height;
            }
        };
        AchievementHongYanDialog.prototype.onListClick = function (e) {
            this.closeZDSJ();
            this.list.selectedIndex = e.itemIndex;
            this._currData = this.list.selectedItem;
            this.initView();
        };
        AchievementHongYanDialog.prototype.initView = function (isUp) {
            if (isUp === void 0) { isUp = false; }
            this._oldLv = this._currData ? this._currData.level : 0;
            this._oldExp = this._currData ? this._currData.exp : 0;
            if (this._listData)
                this._listData.replaceAll(this._voArr);
            this.updataView();
        };
        AchievementHongYanDialog.prototype.updataView = function () {
            if (this._currData) {
                this.needGroup1.visible = false;
                this.needGroup2.visible = false;
                this.needGroup3.visible = false;
                this.imgRedPoint0.visible = false;
                this.imgRedPoint1.visible = false;
                this.labTip.visible = false;
                this.btnJihuo.isWarn = false;
                this.expProgress.visible = true;
                this.btnUp.visible = false;
                this.btnUp.isWarn = false;
                this._counmesId1 = null;
                this._counmesId2 = null;
                this._counmesId3 = null;
                this._caiLiaoBagCount = 0;
                this._caiLiaoNeedCount = 0;
                this.imgRedPoint0.visible = this._currData.checkCanBaseUp;
                this.imgRedPoint1.visible = this._currData.checkCanBreakStar;
                this.baseGroup.visible = this._index == 0;
                this.starGroup.visible = this._index == 1;
                this._currData = GameModels.hongYan.getHongYanByConfId(this._currData.confId);
                this._listData.itemUpdated(this._currData);
                this.labMan.text = "";
                this.imgNeedBg.visible = false;
                this.imgNeedBg.source = this._index == 0 ? "img_shinv_needLv_png" : "img_shinv_needLv1_png";
                this.labNeedLv.text = "";
                var skillVo = vo.fromPool(vo.SkillVO);
                skillVo.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, this._currData.skillId), 0, this._currData.skillOpenLv, this._currData.level);
                this.skill.dataSource = skillVo;
                if (!!this._currData.marryPetId && this._currData.level >= this._currData.skillOpenLv) {
                    this.skill.filters = null;
                    skillVo.upNeedLevel = 1;
                    var marryPetVo = GameModels.pet.getAllPetVOByUid(this._currData.marryPetId);
                    if (marryPetVo)
                        this.labMan.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_YXPG1, marryPetVo.name));
                }
                else {
                    this.skill.filters = utils.filterUtil.grayFilters;
                    skillVo.actNeedLevel = 1;
                }
                this.imgBoby.source = "hyImg_" + this._currData.body + "_png";
                this.btnJieHun.visible = this._currData.level > 0 && !this._currData.marryPetId;
                this.btnLiHun.visible = !!this._currData.marryPetId;
                this.labName.text = this._currData.name;
                this.labLv.text = "" + this._currData.level;
                this.btnJihuo.label = Language.C_JH;
                this.btnJihuo.isWarn = false;
                this.labTip.visible = this._currData.level > 0;
                this.expProgress.max = this._currData.level > 0 ? this._currData.templateLvs.exp : 0;
                this.expProgress.value = this._currData.level > 0 ? this._currData.exp : 0;
                var hashAnimal = false;
                var animal = GameModels.animal.getAnimalBuyType(18);
                if (animal.isAct && animal.step >= 4) {
                    hashAnimal = true;
                }
                if (this._currData.level > 0) {
                    this.btnJihuo.visible = false;
                    this.needGroup3.visible = true;
                    this.imgNeedBg.visible = true;
                    this.btnUp.visible = true;
                    this.labNeedLv.text = this._currData.templateLvs.needlv + "";
                    this.labProess.text = this._currData.exp + "/" + this._currData.templateLvs.exp;
                    var str1 = this._currData.baseConsume.split("_");
                    var upItem = Templates.getTemplateById(templates.Map.ITEM, str1[0]);
                    this._counmesId3 = str1[0];
                    var needCount = hashAnimal ? Math.floor(parseInt(str1[1]) * (this._currData.templateLvs.growCon / 10000) / 2) : parseInt(str1[1]) * (this._currData.templateLvs.growCon / 10000);
                    var bagCount = GameModels.bag.getItemCountById(str1[0]);
                    this._caiLiaoBagCount = bagCount;
                    this._caiLiaoNeedCount = needCount;
                    this.labNeed3.text = upItem.name + ":";
                    this.imgNeedIcon3.source = upItem.icon;
                    this.labCount3.text = bagCount + "/" + needCount;
                    this.labCount3.textColor = bagCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.btnUp.isWarn = bagCount >= needCount && GameModels.user.player.level >= this._currData.templateLvs.needlv;
                    if (this._currData.templateLvs.nextId != -1) {
                        this.showPro(this._currData.getPro((this._currData.templateLvs.growProP / 10000)));
                    }
                    else {
                        this.btnUp.isWarn = false;
                        this.labCount3.text = Language.C_YMJ;
                        this.labCount3.textColor = TypeColor.GREEN1;
                        this.labTip.visible = false;
                    }
                    this.showPro(this._currData.getPro((this._currData.templateLvs.growProP / 10000)));
                    var count = GameModels.pet.formatUpVOList.length + 1;
                    this.labFight.text = "" + utils.htmlUtil.computeModelTatolFighting(this._currData.getPro((this._currData.templateLvs.growProP / 10000))) * count;
                    if (parseInt(this.labFight.text) >= 1000 && this._currData.confId == 1 && GameModels.user.player.level >= 80) {
                        var voYYQG = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.yyqg);
                        if (voYYQG && !voYYQG.hashYYQGAndMRCZReceive && !game.state.getItem(GameModels.user.player.uid, TypeSetting.ONEYUANQIANGGOU)) {
                            mg.uiManager.show(dialog.activity.oneYuanBuyDialog);
                            game.state.setItem(GameModels.user.player.uid, TypeSetting.ONEYUANQIANGGOU, true);
                            this.closeZDSJ();
                        }
                    }
                }
                else {
                    this.btnJihuo.visible = true;
                    this.needGroup3.visible = true;
                    this.labProess.text = "";
                    var str = this._currData.activaConsume.split("_");
                    var actItem = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                    this._counmesId3 = str[0];
                    var actNeedCount = parseInt(str[1]);
                    var actBagCount = GameModels.bag.getItemCountById(str[0]);
                    this.labNeed3.text = actItem.name + ":";
                    this.imgNeedIcon3.source = actItem.icon;
                    this.labCount3.text = actBagCount + "/" + actNeedCount;
                    this.labCount3.textColor = actBagCount >= actNeedCount ? TypeColor.GREEN1 : TypeColor.RED1;
                    this.btnJihuo.isWarn = actBagCount >= actNeedCount;
                    this.showPro(utils.htmlUtil.comAttributessorting(this._currData.activaPro));
                    this.labFight.text = "0";
                }
                this.showCiHunPro(this._currData.ciHunPro);
                if (this._index == 1) {
                    this.showStarView();
                }
            }
        };
        AchievementHongYanDialog.prototype.showPro = function (str) {
            var strArr = str.split(";");
            for (var i = 0; i < strArr.length; i++) {
                if (strArr[i]) {
                    this._labArr[i].text = strArr[i].split("_")[1];
                }
                else {
                    this._labArr[i].text = "";
                }
            }
        };
        AchievementHongYanDialog.prototype.showStarView = function () {
            if (!this._currData)
                return;
            this.btnJihuo.label = Language.C_SX1;
            this.btnJihuo.isWarn = false;
            this.btnJihuo.visible = true;
            this.btnUp.visible = false;
            this.btnUp.isWarn = false;
            this.labTip.visible = false;
            this.needGroup1.visible = true;
            this.needGroup2.visible = true;
            this.needGroup3.visible = false;
            this.labNeedLv.text = "";
            if (this._currData.star < this._currData.maxStar) {
                this.imgNeedBg.visible = true;
                this.labNeedLv.text = this._currData.templatesBreak.needLv + "";
            }
            var str1 = this._currData.breakStarConsume.split(";")[0].split("_");
            var temItem1 = Templates.getTemplateById(templates.Map.ITEM, str1[0]);
            this._counmesId1 = str1[0];
            var needCount = parseInt(str1[1]);
            var bagCount = GameModels.bag.getItemCountById(str1[0]);
            this.labNeed1.text = temItem1.name + ":";
            this.imgNeedIcon1.source = temItem1.icon;
            this.labCount1.text = bagCount + "/" + needCount;
            this.labCount1.textColor = bagCount >= needCount ? TypeColor.GREEN1 : TypeColor.RED1;
            var str2 = this._currData.breakStarConsume.split(";")[1].split("_");
            var temItem2 = Templates.getTemplateById(templates.Map.ITEM, str2[0]);
            this._counmesId2 = str2[0];
            var needCount1 = parseInt(str2[1]);
            var bagCount1 = GameModels.bag.getItemCountById(str2[0]);
            this.labNeed2.text = temItem2.name + ":";
            this.imgNeedIcon2.source = temItem2.icon;
            this.labCount2.text = bagCount1 + "/" + needCount1;
            this.labCount2.textColor = bagCount1 >= needCount1 ? TypeColor.GREEN1 : TypeColor.RED1;
            this.btnJihuo.isWarn = bagCount1 >= needCount1 && bagCount >= needCount && !!this._currData.marryPetId && this._currData.level >= this._currData.templatesBreak.needLv;
            if (this._currData.star >= this._currData.maxStar) {
                this.btnJihuo.label = Language.C_YMX;
                this.btnJihuo.isWarn = false;
                this.labCount1.text = this.labCount2.text = Language.C_YMJ;
                this.labCount1.textColor = this.labCount2.textColor = TypeColor.RED1;
            }
            this.showStarPro(this._currData.templatesBreak.properties);
            this.showStar();
        };
        AchievementHongYanDialog.prototype.showStar = function () {
            for (var i = this.starBg.numChildren; i >= 0; i--) {
                var imgBg = this.starBg.getChildAt(i);
                if (imgBg) {
                    this.starBg.removeChildAt(i);
                }
            }
            this.starBg.x = 221;
            for (var j = this.star.numChildren; j >= 0; j--) {
                var img = this.star.getChildAt(j);
                if (img) {
                    this.star.removeChildAt(j);
                }
            }
            var maxStar = this._currData.maxStar / 2;
            for (var c = 0; c < maxStar; c++) {
                var bg = new eui.Image();
                bg.source = "role_json.role_phantom_star1_png";
                this.starBg.addChild(bg);
            }
            this.starBg.x = this.starBg.x - (maxStar / 2) * 42;
            var nowStar = this._currData.star % 2 != 0 ? ((this._currData.star - 1) / 2 + 1) : (this._currData.star / 2);
            for (var c = 0; c < nowStar; c++) {
                var star = new eui.Image();
                if (c == nowStar - 1 && this._currData.star % 2 != 0) {
                    star.source = "role_json.role_phantom_star3_png";
                }
                else {
                    star.source = "role_json.role_phantom_star2_png";
                }
                this.star.addChild(star);
            }
            this.star.x = this.starBg.x + 3;
        };
        AchievementHongYanDialog.prototype.showStarPro = function (str) {
            var strArr = str.split(";");
            for (var i = 0; i < strArr.length; i++) {
                if (strArr[i]) {
                    this._starLab1[i].text = utils.htmlUtil.getAttributeName(strArr[i].split("_")[0]) + ":";
                    this._starLab2[i].text = parseInt(strArr[i].split("_")[1]) > 0 ? (parseInt(strArr[i].split("_")[1]) /**+ proEx*/) / 100 + "%" : "0";
                }
                else {
                    this._starLab1[i].text = "";
                    this._starLab2[i].text = "";
                }
            }
        };
        AchievementHongYanDialog.prototype.showCiHunPro = function (str) {
            var strArr = str.split(";");
            for (var i = 0; i < this._labCiHunProArr.length; i++) {
                if (strArr[i]) {
                    this._labNameArr[i].text = utils.htmlUtil.getAttributeName(strArr[i].split("_")[0]) + ":";
                    this._labCiHunProArr[i].text = (parseInt(strArr[i].split("_")[1]) /**+ proEx*/) / 100 + "%";
                }
                else {
                    this._labCiHunProArr[i].text = "";
                    this._labNameArr[i].text = "";
                }
            }
        };
        AchievementHongYanDialog.prototype.showSkillTips = function () {
            var skillVo = vo.fromPool(vo.SkillVO);
            skillVo.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, this._currData.skillId), 0, this._currData.skillOpenLv, this._currData.level);
            if (!!this._currData.marryPetId && this._currData.level >= this._currData.skillOpenLv) {
                mg.alertManager.showAlert(PetSkillLockTips, true, true, skillVo);
            }
        };
        AchievementHongYanDialog.prototype.showBtnView = function () {
            for (var i = 0; i < this._btnArr.length; i++) {
                if (i == this._index) {
                    this._btnArr[i].currentState = "down";
                    this._btnLabArr[i].textColor = 0xCCC6BA;
                }
                else {
                    this._btnArr[i].currentState = "up";
                    this._btnLabArr[i].textColor = 0x969696;
                }
            }
        };
        AchievementHongYanDialog.prototype.onTypeBtnClick = function (e) {
            if (e.currentTarget == this.btn1) {
                if (!GameModels.funcs.hashFunIsOpen(2008)) {
                    mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, GameModels.funcs.getConfigOpenLv(2008)), 0xff0000);
                    return;
                }
            }
            this._index = this._btnArr.indexOf(e.currentTarget);
            this.showBtnView();
            this.updataView();
        };
        AchievementHongYanDialog.prototype.closeZDSJ = function () {
            common.CommonBtnLongClick.instance.stopLongClickFun();
        };
        AchievementHongYanDialog.prototype.getCanUseListItem = function () {
            this.list.validateNow();
            var array = GameModels.hongYan.hongyanVo;
            if (array[0]) {
                return this.list.getChildAt(0);
            }
            return null;
        };
        return AchievementHongYanDialog;
    }(ui.AchievementHongYanDialogSkin));
    achievement.AchievementHongYanDialog = AchievementHongYanDialog;
    __reflect(AchievementHongYanDialog.prototype, "achievement.AchievementHongYanDialog");
})(achievement || (achievement = {}));
