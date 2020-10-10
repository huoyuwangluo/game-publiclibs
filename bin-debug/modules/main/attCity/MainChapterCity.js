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
var main;
(function (main) {
    var MainChapterCity = (function (_super) {
        __extends(MainChapterCity, _super);
        function MainChapterCity() {
            var _this = _super.call(this) || this;
            _this._isPlaying = false;
            _this._isindicateing = false;
            return _this;
        }
        MainChapterCity.prototype.init = function () {
            this._parent = this.parent;
            // this.leftGroup.visible = GameModels.platform.isPay;
            GameModels.state.registerWarnTarget(GameRedState.FIRSTRECHARGE1, this.btnFirstRecharge);
            GameModels.state.registerWarnTarget(GameRedState.DAILY_ACTIVITY1, this.btnActivity);
            GameModels.state.registerWarnTarget(GameRedState.TEQUAN, this.btnTeQuan);
            GameModels.state.registerWarnTarget(GameRedState.OUYUXIANREN, this.btnouYu);
            GameModels.state.registerWarnTarget(GameRedState.QIANGZHENG, this.btnGet);
            GameModels.state.registerWarnTarget(GameRedState.SHENGZHIMAIN, this.btnShengZhi);
            GameModels.state.registerWarnTarget(GameRedState.GUANZHI1, this.btnGuanZhi);
            GameModels.state.registerWarnTarget(GameRedState.SHARE, this.btnShare);
            this.imgArrow.mask = this.imgMask;
            this._iconLayour = new components.IconLayout(this.leftGroup, true);
            this._rewardItem = null;
            GameModels.chapter.addEventListener(mo.ModelSceneChapter.CHAPTER_STEP_CHANGE, this.showPetHead, this);
            GameModels.share.addEventListener(mo.ModelShare.FIRSTREWARD_UPDATA, this.updateShare, this);
            GameModels.wenguanTask.addEventListener(mo.ModelWenGuanTask.WENGUAN_UPDATA, this.updateShare, this);
            this.btnFunPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnAtt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.groupAtt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAutoAttClick, this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnFirend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnMail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnouYu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnTeQuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnFirstRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            //this.imgFirstRechargeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnShengZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShengZhiClick, this);
            this.btnGuanZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnGiveHongYan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnouTuCao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            GameModels.user.player.onPropertyChange(TypeProperty.Level, this, this.levelChangeHandler);
            GameModels.user.player.onPropertyChange(TypeProperty.FOOD_TIME, this, this.updataReward);
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.updataReward);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_MAIL, this.btnMail);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_SOCIALITY, this.btnFirend);
            GameModels.state.registerWarnTarget(GameRedState.MAIN_MAIL_SOCIALITY, this.btnChat);
            GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.updateFirstRecharge, this);
            GameModels.user.player.onPropertyChange(TypeProperty.TOTAL_FIRST_RECHARGE, this, this.updateFirstRecharge);
            if (GameModels.task.curTask)
                GameModels.task.curTask.addEventListener(egret.Event.CHANGE, this.initFun, this);
            game.state.onState(TypeSetting.OPEN_MODELS, this, this.levelChangeHandler);
            GameModels.chat.onMessageRecive1(this, this.updateChat);
            GameModels.task.onOuYuXianRen(this, this.taskEndHandler);
            GameModels.task.onWenGuanSongHongYan(this, this.updataHongYan);
            GameModels.ouYuXianRen.onEnd(this, this.updataOuYuXianRen);
            GameModels.guide.ontiaoGuan(this, this.tiaoguanGuide);
            this.initFun();
            this.imgTiaoGuanTip.visible = false;
        };
        MainChapterCity.prototype.tiaoguanGuide = function () {
            if (GameModels.guide.guideType == mo.ModelGuide.guideType14) {
                this.imgTiaoGuanTip.visible = true;
                egret.Tween.removeTweens(this.imgTiaoGuanTip);
                this.playTiaoGuanTipTween(true);
            }
        };
        MainChapterCity.prototype.playTiaoGuanTipTween = function (isBool) {
            egret.Tween.get(this.imgTiaoGuanTip).to({ y: isBool ? 198 : 180 }, 500).call(this.playTiaoGuanTipTween, this, [!isBool]);
        };
        MainChapterCity.prototype.taskEndHandler = function () {
            if (!GameModels.task.hasTask || (GameModels.task.hasTask && GameModels.task.curTask.id == mo.ModelTask.ouyuxianrenOpenId)) {
                GameModels.task.offOuYuXianRen();
                if (GameModels.ouYuXianRen.hashOuYuXianRen) {
                    if (app.gameContext.typeGame == TypeGame.CITY) {
                        app.gameContext.enterChapter(this, function () {
                            mg.uiManager.show(dialog.ouYuXianRen.OuYanXianRenDialog, true);
                        });
                    }
                    else {
                        mg.uiManager.show(dialog.ouYuXianRen.OuYanXianRenDialog, true);
                    }
                }
            }
        };
        MainChapterCity.prototype.initFun = function () {
            this.updateFirstRecharge();
            this.updataFunPreview();
            this.updateGameFunOpen();
            this.updataTuCao();
            this.updataShengZhi();
            this.updataGuanZhi();
            this.updateShare();
        };
        MainChapterCity.prototype.btnShengZhiClick = function () {
            mg.uiManager.show(pet.PetGroupMain);
        };
        MainChapterCity.prototype.updataShengZhi = function () {
            if (TypeFunOpen.isOpen(s.UserfaceName.shengZhiMain)) {
                this.btnShengZhi.visible = true;
            }
            else {
                this.btnShengZhi.visible = false;
            }
        };
        MainChapterCity.prototype.levelChangeHandler = function () {
            this.initFun();
            //this.updateFirstRechargeBg();
        };
        MainChapterCity.prototype.updateGameFunOpen = function () {
            if (GameModels.platform.isPay) {
                if (TypeFunOpen.isOpen(s.UserfaceName.sgDaily)) {
                    this._iconLayour.add(this.btnActivity);
                }
                else {
                    this._iconLayour.remove(this.btnActivity);
                }
            }
            else {
                this._iconLayour.remove(this.btnActivity);
            }
            this.updateTeQuan();
            this.btnGet.visible = this.groupAtt.visible = GameModels.user.player.level >= 28;
        };
        MainChapterCity.prototype.updateShare = function () {
            this._iconLayour.remove(this.btnShare);
            if (platform.sdk && platform.sdk.type == "wx") {
                var currTemps = GameModels.wenguanTask.curWenGuanTemplates;
                var hashWenGuan = currTemps && currTemps.id >= 103;
                if (hashWenGuan && TypeFunOpen.isOpen(s.UserfaceName.share) && (GameModels.share && GameModels.share.firstShareStatus <= 1)) {
                    this._iconLayour.add(this.btnShare);
                }
            }
        };
        MainChapterCity.prototype.updateTeQuan = function () {
            if (GameModels.platform.isPay) {
                if (TypeFunOpen.checkFuncOpen(s.UserfaceName.vipTeQuan, 1)) {
                    this._iconLayour.add(this.btnTeQuan);
                }
                else {
                    this._iconLayour.remove(this.btnTeQuan);
                }
            }
            else {
                this._iconLayour.remove(this.btnTeQuan);
            }
        };
        MainChapterCity.prototype.updateFirstRecharge = function () {
            if (GameModels.platform.isPay) {
                if (GameModels.sgActivity.isHashFirstRecharge() && TypeFunOpen.isOpen(s.UserfaceName.firstRecharge)) {
                    this._iconLayour.add(this.btnFirstRecharge);
                }
                else {
                    this._iconLayour.remove(this.btnFirstRecharge);
                }
            }
            else {
                this._iconLayour.remove(this.btnFirstRecharge);
            }
        };
        /*private updateFirstRechargeBg(): void {
            var pos: number[] = [226, 316, 410, 511];
            if (GameModels.firstRecharge.hashFirstRecharge && !GameModels.firstRecharge.clickFirstRecharge) {
                if (this.imgFirstRechargeBg && this.imgFirstRechargeBg.visible) this.imgFirstRechargeBg.y = pos[this._iconLayour.getShowItemPos(this.btnFirstRecharge)];
                return;
            }
            if (this.imgFirstRechargeBg.parent) {
                if (this.imgFirstRechargeBg) egret.Tween.removeTweens(this.imgFirstRechargeBg);
                this.imgFirstRechargeBg.parent.removeChild(this.imgFirstRechargeBg);
            }
            if (!GameModels.sgActivity.isHashFirstRecharge()) return;
            if (!this.btnFirstRecharge || !this.btnFirstRecharge.parent) return;
            var isShow: boolean = false;
            if (GameModels.user.player.level == 30 && GameModels.user.player.firstRechargeTotal <= 0) {
                this.imgFirstRechargeBg.source = "img_firstrechargeBg_1_png";
                isShow = true;
            }
            else if (GameModels.user.player.level == 50 && GameModels.user.player.firstRechargeTotal < 1000) {
                this.imgFirstRechargeBg.source = "img_firstrechargeBg_2_png";
                isShow = true;
            }
            else if (GameModels.user.player.level == 70 && GameModels.user.player.firstRechargeTotal < 5000) {
                this.imgFirstRechargeBg.source = "img_firstrechargeBg_3_png";
                GameModels.firstRecharge.firstRechargeIndex = 1;
                isShow = true;
            }
            else if (GameModels.user.player.level == 90 && GameModels.user.player.firstRechargeTotal < 18000) {
                this.imgFirstRechargeBg.source = "img_firstrechargeBg_4_png";
                GameModels.firstRecharge.firstRechargeIndex = 2;
                isShow = true;
            }
            else if (GameModels.user.player.level == 100 && GameModels.user.player.firstRechargeTotal < 36000) {
                this.imgFirstRechargeBg.source = "img_firstrechargeBg_5_png";
                GameModels.firstRecharge.firstRechargeIndex = 3;
                isShow = true;
            }
            if (isShow) {
                GameModels.firstRecharge.clickFirstRecharge = false;
                GameModels.firstRecharge.hashFirstRecharge = true;
                this.imgFirstRechargeBg.y = pos[this._iconLayour.getShowItemPos(this.btnFirstRecharge)];
                this.imgFirstRechargeBg.visible = true;
                this.imgFirstRechargeBg.x = 70;
                if (this.imgFirstRechargeBg) egret.Tween.removeTweens(this.imgFirstRechargeBg);
                this.playFirstRechargeTween(true);
                this.allGroup.addChild(this.imgFirstRechargeBg);
            }
        }
        private playFirstRechargeTween(isBool: boolean): void {
            egret.Tween.get(this.imgFirstRechargeBg).to({ x: isBool ? 70 : 90 }, 500).call(this.playFirstRechargeTween, this, [!isBool]);
        }*/
        MainChapterCity.prototype.showView = function () {
            if (!GameModels.chapter.data)
                return;
            this.remAllTeXiao();
            // if (GameModels.chapter.data.CityId == 1001 && GameModels.chapter.data.Order == 1 && !this._isPlaying) {
            // 	this._isPlaying = true;
            // 	mg.soundManager.playSound("GameStart");
            // 	this.addChild(this.imgMask);
            // 	this.imgMask.y = this.imgArrow.y + this.imgArrow.height;
            // 	this.playArrowEff();
            // }
            //else {
            // mg.soundManager.playViewLongSound("SoundJM_5", "CHAPTER");
            //}
            this.showPetHead();
            this.updataFunPreview();
            this.foolUpdata();
            this.updataShengZhi();
            this.updataHongYan();
            this.updataOuYuXianRen();
            this.updataTuCao();
            this.updataGuanZhi();
            this.updateShare();
            //this.playAttTween();
        };
        // private playAttTween(isBool: boolean = false) {
        // 	egret.Tween.get(this.btnAtt).to({ scaleX: isBool ? 1.1 : 1, scaleY: isBool ? 1.1 : 1 }, 1000, utils.Ease.quadOut).call(this.playAttTween, this, [!isBool]);
        // }
        MainChapterCity.prototype.updateChat = function () {
            if (GameModels.chat.unreadCount > 0) {
                this.labChatCount.visible = true;
                this.btnChat.isWarn = true;
                this.labChatCount.text = GameModels.chat.unreadCount > 99 ? "99+" : GameModels.chat.unreadCount + "";
            }
            else {
                this.labChatCount.visible = false;
            }
        };
        MainChapterCity.prototype.showPetHead = function () {
            this.labZhang.text = GameModels.chapter.mainMapTemplate.id + "";
            this.imgChapter.source = "img_rewardTitle_" + GameModels.chapter.mainMapTemplate.id + "_png";
            this.imgOrde.source = "chapterMap_json.img_city_" + GameModels.chapter.mainCityTemplate.order;
            var chapterOlder = GameModels.chapter.totalChapter;
            egret.Tween.removeTweens(this.rewardGroup);
            egret.Tween.removeTweens(this.indicateGroup);
            var temp = GameModels.chapter.getChapterRewardBuyNowChapter();
            this.labDes.text = Language.C_TG + temp.order + Language.Z_G;
            this.labCount.text = temp.order + "";
            this.icon.source = temp.id < 3 ? "chapterMap_json.img_chapterReward" + temp.id : "chapterMap_json.img_chapterReward" + temp.rewards.split("_")[0];
            if (temp.order > 100) {
                this.imgCountBg.source = "chapterMap_json.btn_map_zidongzhandou_wenzi1";
            }
            else {
                this.imgCountBg.source = "chapterMap_json.btn_map_zidongzhandou_wenzi2";
            }
            var chapterReward = GameModels.chapter.chapterReward;
            if (chapterReward && GameModels.chapter.data.Id == chapterReward) {
                this.labGetReward.visible = true;
                if (mg.alertManager.current != mg.alertManager.getInstance(MainChapterRewardAlter))
                    mg.alertManager.showAlert(MainChapterRewardAlter, false, true, GameModels.chapter.data.Id);
            }
            else {
                this.labGetReward.visible = false;
            }
            if (GameModels.chapter.data.Id <= 1001006) {
                if (this.titleGroup.parent) {
                    this.titleGroup.parent.removeChild(this.titleGroup);
                    this.labTitle2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                }
                if (chapterOlder == 5)
                    this._isindicateing = false;
                if (!this._isindicateing) {
                    this.addChild(this.indicateGroup);
                    this.indicateGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.tweenIndicateGroupHandler(false);
                    if (GameModels.chapter.data.Id <= 1001004) {
                        this.labChapter.text = Language.getExpression(Language.E_SY1GKSJSXY, (5 - chapterOlder));
                    }
                    else {
                        this.labChapter.text = Language.getExpression(Language.E_SY1GJKGJSLC, (7 - chapterOlder));
                    }
                }
            }
            else {
                if (this.indicateGroup.parent) {
                    this.indicateGroup.parent.removeChild(this.indicateGroup);
                    this.indicateGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                }
                if (GameModels.chapter.data.Id > 1006001 && GameModels.chapter.isShowRewardTitle) {
                    this.addChild(this.titleGroup);
                    var elements = [];
                    this._rewardItem = Templates.getTemplateById(templates.Map.ITEM, temp.rewards.split("_")[0]);
                    if (this._rewardItem.type == 2103) {
                        var bagCount = GameModels.bag.getPetSuiCountById(temp.rewards.split("_")[0]);
                        if (bagCount >= 60) {
                            this.labTitle1.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_YY1GHJSP, bagCount, this._rewardItem.name));
                            this.labTitle2.textFlow = utils.htmlUtil.getUnderlineFormat(Language.E_QWZM);
                            this.labTitle2.textColor = 0x34e22c;
                        }
                        else {
                            this.labTitle1.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_HC1GWJSP, (60 - bagCount), this._rewardItem.name));
                            this.labTitle2.textFlow = utils.TextFlowMaker.htmlParser(Language.E_ZMYWHSWJ);
                        }
                    }
                    else if (this._rewardItem.type == 2150) {
                        var bagCount = GameModels.bag.getItemCountById(temp.rewards.split("_")[0]);
                        if (bagCount >= 10) {
                            this.labTitle1.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_YY1GGJZML, bagCount));
                            this.labTitle2.textFlow = utils.htmlUtil.getUnderlineFormat(Language.E_QWSLC);
                            this.labTitle2.textColor = 0x34e22c;
                        }
                        else {
                            this.labTitle1.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_HC1GZML, (10 - bagCount)));
                            this.labTitle2.textFlow = utils.TextFlowMaker.htmlParser(Language.E_SLCYC);
                        }
                    }
                    this.labTitle2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                }
                else {
                    if (this.titleGroup.parent) {
                        this.titleGroup.parent.removeChild(this.titleGroup);
                        this.labTitle2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    }
                }
            }
        };
        MainChapterCity.prototype.tweenIndicateGroupHandler = function (isBool) {
            egret.Tween.get(this.indicateGroup).to({ horizontalCenter: isBool ? -55 : -35 }, 500).call(this.tweenIndicateGroupHandler, this, [!isBool]);
        };
        MainChapterCity.prototype.barLabelFunction = function (value, maximum) {
            return Math.ceil(value / maximum * 100) + "%";
        };
        MainChapterCity.prototype.updataOuYuXianRen = function () {
            // this.btnouYu.visible = true;
            if (!GameModels.task.hasTask || (GameModels.task.hasTask && GameModels.task.curTask.id >= mo.ModelTask.ouyuxianrenOpenId)) {
                this.btnouYu.visible = GameModels.platform.isPay && GameModels.ouYuXianRen.hashOuYuXianRen;
                if (!GameModels.ouYuXianRen.hashOuYuXianRen) {
                    GameModels.ouYuXianRen.offEnd();
                }
            }
            else {
                this.btnouYu.visible = false;
            }
        };
        MainChapterCity.prototype.updataHongYan = function () {
            if (!GameModels.task.hasTask) {
                this.btnGiveHongYan.visible = false;
                return;
            }
            if (GameModels.task.curTask.id >= mo.ModelTask.wenguanSongHongYanEnd) {
                this.btnGiveHongYan.visible = false;
                return;
            }
            if (GameModels.task.curTask.id <= mo.ModelTask.wenguanSongHongYanStart) {
                this.btnGiveHongYan.visible = false;
                return;
            }
            this.btnGiveHongYan.visible = true;
        };
        MainChapterCity.prototype.updataTuCao = function () {
            if (!GameModels.platform.isPay) {
                this.btnouTuCao.visible = false;
                return;
            }
            this.btnouTuCao.visible = TypeFunOpen.checkFuncOpen(s.UserfaceName.strategy);
        };
        MainChapterCity.prototype.updataGuanZhi = function () {
            this.btnGuanZhi.visible = TypeFunOpen.checkFuncOpen(s.UserfaceName.guanzhi);
        };
        MainChapterCity.prototype.foolUpdata = function () {
            this.updataReward();
            utils.timer.clear(this, this.foolUpdata);
            utils.timer.once(60000, this, this.foolUpdata);
        };
        MainChapterCity.prototype.playArrowEff = function () {
            this.imgArrow.visible = true;
            this.addChild(this.imgArrow);
            egret.Tween.get(this.imgMask).to({ y: this.imgArrow.y }, 1000, utils.Ease.quadOut).call(this.tweenCallHandler, this);
        };
        MainChapterCity.prototype.tweenCallHandler = function () {
            this.petHead.visible = true;
            this.addChild(this.petHead);
            var temp = Templates.getTemplateById(templates.Map.GENERAL, 13006);
            this.petHead.setGeneralHeadInfo(parseInt(temp.model), 0, true, temp);
            this.petHead.scaleX = this.petHead.scaleY = 2;
            egret.Tween.get(this.petHead).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.backOut).wait(500).call(this.playEffectCall, this);
        };
        MainChapterCity.prototype.playEffectCall = function () {
            var imgbg = new eui.Image("img_chapaterMap_eff_bg_png");
            imgbg.horizontalCenter = -105;
            imgbg.y = 200;
            this.addChild(imgbg);
            this._imgArr.push(imgbg);
            for (var i = 0; i < 8; i++) {
                var img = new eui.Image("chapterMap_json.wenzi_0" + (i + 1));
                if (i < 4) {
                    img.horizontalCenter = -75;
                    img.y = 220 + (i * 70);
                }
                else {
                    img.horizontalCenter = -150;
                    img.y = 290 + ((i - 4) * 70);
                }
                img.touchEnabled = false;
                img.scaleX = img.scaleY = 2;
                this._imgArr.push(img);
                utils.timer.once(i * 100, this, this.playEff, false, img, i == 7);
            }
        };
        MainChapterCity.prototype.playEff = function (image, isLast) {
            this.addChild(image);
            if (isLast) {
                egret.Tween.get(image).to({ scaleX: 1, scaleY: 1 }).wait(1000).call(this.remAllTeXiao, this);
                return;
            }
            egret.Tween.get(image).to({ scaleX: 1, scaleY: 1 });
        };
        MainChapterCity.prototype.remAllTeXiao = function () {
            if (this.petHead.parent)
                this.petHead.parent.removeChild(this.petHead);
            if (this.imgArrow.parent)
                this.imgArrow.parent.removeChild(this.imgArrow);
            if (this.imgMask.parent)
                this.imgMask.parent.removeChild(this.imgMask);
            if (this._imgArr) {
                for (var i = 0; i < this._imgArr.length; i++) {
                    if (this._imgArr[i])
                        egret.Tween.removeTweens(this._imgArr[i]);
                    if (this._imgArr[i] && this._imgArr[i].parent) {
                        this._imgArr[i].parent.removeChild(this._imgArr[i]);
                        this._imgArr[i] = null;
                    }
                }
                this._imgArr = [];
            }
            else {
                this._imgArr = [];
            }
            egret.Tween.removeTweens(this.imgMask);
            egret.Tween.removeTweens(this.petHead);
            utils.timer.clear(this, this.playEff);
            //if (this._map) this._map.enter();
        };
        MainChapterCity.prototype.onAutoAttClick = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    egret.Tween.removeTweens(this.groupAtt);
                    this.groupAtt.scaleX = this.groupAtt.scaleY = 1;
                    egret.Tween.get(this.groupAtt).to({ scaleX: 0.9, scaleY: 0.9 }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onAutoAttClick, this);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.removeTweens(this.groupAtt);
                    egret.Tween.get(this.groupAtt).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.cubicOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onAutoAttClick, this);
                    break;
                case egret.TouchEvent.TOUCH_TAP:
                    GameModels.chapter.isShowRewardTitle = false;
                    if (GameModels.platform.isPay) {
                        if (GameModels.serverTime.kaifuDay < 3 && GameModels.user.player.vip < 4) {
                            mg.alertManager.tip(Language.J_V4KAIQI);
                            return;
                        }
                    }
                    else {
                        if (GameModels.serverTime.kaifuDay < 3) {
                            mg.alertManager.tip(Language.J_V4KAIQI1);
                        }
                    }
                    this.cleanTiaoGuanGuide();
                    this.imgTiaoGuanTip.visible = false;
                    egret.Tween.removeTweens(this.imgTiaoGuanTip);
                    if (GameModels.chapter.totalChapter >= 400) {
                        GameModels.chapter.requestGetEnemyFormationInfo(utils.Handler.create(this, function () {
                            mg.alertManager.showAlert(PrewarEmbattle400, true, true, 2);
                        }));
                    }
                    else {
                        GameModels.chapter.requestGetEnemyFormationInfo(utils.Handler.create(this, function () {
                            mg.alertManager.showAlert(PrewarEmbattle, true, true, 2);
                        }));
                    }
                    break;
            }
        };
        MainChapterCity.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.btnGuanZhi:
                    mg.uiManager.show(dialog.WenGuan.WenGuanDialog);
                    break;
                case this.btnouYu:
                    if (GameModels.ouYuXianRen.hashOuYuXianRen)
                        mg.uiManager.show(dialog.ouYuXianRen.OuYanXianRenDialog, false);
                    break;
                case this.imgGold:
                    if ((Math.floor(GameModels.chapter.farmFood / 60) * (this._currPastTime / 60)) + GameModels.user.player.liangcao >= 24000) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_ZSLCJDDSX, TypeBtnLabel.GOTO_SHENGZHI, utils.Handler.create(this, function () {
                            this.requestFood();
                        }), utils.Handler.create(this, function () {
                            mg.uiManager.show(pet.PetGroupMain);
                        }));
                    }
                    else {
                        this.requestFood();
                    }
                    break;
                case this.btnFunPreview:
                    if (this._funVo)
                        mg.alertManager.tip(Language.getExpression(Language.E_GN12JKF, this._funVo.tempName, this._funVo.openLv));
                    break;
                case this.btnAtt:
                    if (GameModels.task.hasTask && !GameModels.task.curTask.canSubmit) {
                        if (GameModels.task.curTask.type == TypeTask.SMOMEPET1 || GameModels.task.curTask.type == TypeTask.SMOMEPET2 || GameModels.task.curTask.type == TypeTask.SMOMEPET3 || GameModels.task.curTask.type == TypeTask.SMOMEPET4) {
                            mg.alertManager.tip(Language.J_QXWCZXRW);
                            return;
                        }
                    }
                    GameModels.chapter.isShowRewardTitle = false;
                    if (GameModels.chapter.totalChapter < 13) {
                        mg.uiManager.removeAllDialogs();
                        app.gameContext.enterChapterBoss("");
                    }
                    else {
                        if (GameModels.chapter.totalChapter >= 400) {
                            mg.alertManager.showAlert(PrewarEmbattle400, true, true, 1);
                        }
                        else {
                            mg.alertManager.showAlert(PrewarEmbattle, true, true, 1);
                        }
                    }
                    break;
                case this.btnChat:
                    GameModels.chat.unreadCount = 0;
                    this.updateChat();
                    GameModels.state.updateState(GameRedState.MAIL_ONEGET);
                    GameModels.state.updateState(GameRedState.MAIN_MAIL);
                    var mainView = mg.uiManager.getView(s.UserfaceName.main);
                    if (mainView && mainView.chat) {
                        if (mainView.chat.parent) {
                            mainView.chat.remove();
                            GameModels.chat.isOpened = false;
                        }
                        else {
                            mainView.chat.add(true);
                            mainView.chat.openHandler();
                        }
                    }
                    break;
                case this.btnFirend:
                    mg.uiManager.show(dialog.sociality.SocialityDialog);
                    break;
                case this.btnMail:
                    mg.uiManager.show(MailSceneDialog);
                    break;
                case this.btnGet:
                    if (GameModels.role.teamHash80lv() && GameModels.role.isTeamJump) {
                        GameModels.role.isTeamJump = false;
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_JYYCQSX, TypeBtnLabel.OK, utils.Handler.create(this, function () {
                            GameModels.common.requestQiangZhengInfo(this, function () {
                                mg.uiManager.show(MainChapterCityReward1);
                            });
                        }), utils.Handler.create(this, function () {
                            mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 1 });
                        }));
                        return;
                    }
                    GameModels.common.requestQiangZhengInfo(this, function () {
                        mg.uiManager.show(MainChapterCityReward1);
                    });
                    break;
                case this.btnTeQuan:
                    mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1 });
                    break;
                case this.btnShare:
                    mg.uiManager.show(animal.AnimalShare);
                    break;
                case this.btnFirstRecharge:
                    //case this.imgFirstRechargeBg:
                    GameModels.firstRecharge.clickFirstRecharge = true;
                    GameModels.firstRecharge.hashFirstRecharge = false;
                    //if (this.imgFirstRechargeBg) egret.Tween.removeTweens(this.imgFirstRechargeBg);
                    //if (this.imgFirstRechargeBg.parent) this.imgFirstRechargeBg.parent.removeChild(this.imgFirstRechargeBg);
                    mg.uiManager.show(dialog.firstrecharge.FirstRechargeDialog1, { tabIndex: GameModels.firstRecharge.firstRechargeIndex });
                    break;
                case this.btnActivity:
                    mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog);
                    break;
                case this.btnGiveHongYan:
                    mg.alertManager.showAlert(MainUnLockHongYanAlter, true, true);
                    break;
                case this.btnouTuCao:
                    mg.uiManager.show(dialog.strategy.StrategyMain, { tabIndex: 1 });
                    break;
                case this.icon:
                case this.indicateGroup:
                    this._isindicateing = true;
                    if (this.indicateGroup.parent) {
                        this.indicateGroup.parent.removeChild(this.indicateGroup);
                        this.indicateGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    }
                    if (this.titleGroup.parent) {
                        GameModels.chapter.isShowRewardTitle = false;
                        this.titleGroup.parent.removeChild(this.titleGroup);
                        this.labTitle2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    }
                    egret.Tween.removeTweens(this.indicateGroup);
                    mg.alertManager.showAlert(MainChapterRewardAlter, false, true, GameModels.chapter.data.Id);
                    break;
                case this.labTitle2:
                    if (this.titleGroup.parent) {
                        GameModels.chapter.isShowRewardTitle = false;
                        this.titleGroup.parent.removeChild(this.titleGroup);
                        this.labTitle2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    }
                    if (this._rewardItem.type == 2103) {
                        mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 2 });
                    }
                    else if (this._rewardItem.type == 2150) {
                        mg.uiManager.show(treasure.TreasureMain, { tabIndex: 0 });
                    }
                    break;
            }
        };
        MainChapterCity.prototype.requestFood = function () {
            GameModels.common.requestFood(this, function () {
                mg.alertManager.showAlert(MainChapterCityReward, true, true, false);
            });
        };
        MainChapterCity.prototype.updataReward = function () {
            //701 101 301
            var temFood = Templates.getTemplateById(templates.Map.ITEM, 701);
            this.iconLiangCao.source = temFood.icon;
            this.labLiangCao.text = Math.floor(GameModels.chapter.farmFood / 60) + "/" + Language.P_FZ;
            var temGold = Templates.getTemplateById(templates.Map.ITEM, 101);
            this.iconGold.source = temGold.icon;
            this.labGold.text = Math.floor(GameModels.chapter.farmGold / 60) + "/" + Language.P_FZ;
            var temExp = Templates.getTemplateById(templates.Map.ITEM, 301);
            this.labExp.text = Math.floor(GameModels.chapter.farmExp / 60) + "/" + Language.P_FZ;
            var totalTime = GameModels.common.levyMaxTime;
            var pastTime = 0;
            if (GameModels.user.player.foolTime <= 0) {
                pastTime = Math.floor((GameModels.timer.getTimer() / 1000 - GameModels.serverTime.birthServerDate / 1000));
            }
            else {
                pastTime = Math.floor((GameModels.timer.getTimer() / 1000 - GameModels.user.player.foolTime / 1000));
            }
            pastTime = pastTime > totalTime ? totalTime : pastTime;
            this.expProgress.noTweenValue = pastTime / totalTime;
            this._currPastTime = pastTime <= 0 ? 0 : pastTime;
            this.labCurrTime.text = this.getTime(this._currPastTime);
            this.groupCurrTime.x = 20 + (this._currPastTime / totalTime) * 150;
            this.imgGold.source = "chapterMap_json.img_mapgold" + GameModels.dataSet.getFoodTime(this._currPastTime);
            this._count1 = 0;
            this._angle1 = 0;
            egret.Tween.removeTweens(this.imgGuang);
            this.imgGuang.visible = false;
            if (GameModels.dataSet.getFoodTime(this._currPastTime) > 0) {
                this.imgGuang.visible = true;
                this.tweenRewardImgHandler();
            }
        };
        MainChapterCity.prototype.tweenRewardImgHandler = function () {
            this._count1++;
            this._angle1 = this._count1 * 360;
            egret.Tween.get(this.imgGuang).to({ rotation: this._angle1 }, 2000 * this._count1).call(this.tweenRewardImgHandler, this);
        };
        MainChapterCity.prototype.getTime = function (s) {
            var hourStr = "";
            var minuteStr = "";
            var secondStr = "";
            var hour = Math.floor(s / 3600);
            if (hour <= 0) {
                hourStr = "00";
            }
            else if (hour < 10) {
                hourStr = "0" + hour;
            }
            else {
                hourStr = "" + hour;
            }
            var minute = Math.floor((s % 3600) / 60);
            if (minute <= 0) {
                minuteStr = "00";
            }
            else if (minute < 10) {
                minuteStr = "0" + minute;
            }
            else {
                minuteStr = "" + minute;
            }
            var second = (s % 60);
            if (second <= 0) {
                secondStr = "00";
            }
            else if (second < 10) {
                secondStr = "0" + second;
            }
            else {
                secondStr = "" + second;
            }
            return hourStr + ":" + minuteStr;
        };
        MainChapterCity.prototype.updataFunPreview = function () {
            this._funVo = null;
            if (this.groupFunPreview.parent) {
                this.groupFunPreview.parent.removeChild(this.groupFunPreview);
            }
            if (!app.gameContext.manager.gameCurrent)
                return;
            if (mg.uiManager.hasDialog)
                return;
            if (app.gameContext.manager.gameCurrent.type != TypeGame.ATKCITY)
                return;
            var funvo = GameModels.funcs.currFunPreview;
            if (funvo) {
                this._count = 0;
                this._angle = 0;
                this._funVo = funvo;
                egret.Tween.removeTweens(this.imgPreBg);
                this.addChild(this.groupFunPreview);
                this.btnFunPreview.imageSource = "preview_json.img_preview_icon_" + funvo.id;
                this.labFunPreview.text = Language.getExpression(Language.E_1JKF, funvo.openLv);
                this.tweenPreviewImgHandler();
            }
        };
        MainChapterCity.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        MainChapterCity.prototype.add = function () {
            if (!this.parent) {
                this.showView();
                if (GameModels.user.player.level >= 15 && GameModels.user.player.level <= 150) {
                    mg.effectManager.bindEffect(this.btnAtt, TypeEffectId.GONGCHENG_EFF, 1, 0, 0, 6);
                }
                else {
                    mg.effectManager.unbindEffect(this.btnAtt);
                }
                this._parent.addChild(this);
            }
        };
        MainChapterCity.prototype.cleanTiaoGuanGuide = function () {
            if (GameModels.guide.guideType == mo.ModelGuide.guideType14) {
                GameModels.guide.guideType = 0;
            }
        };
        MainChapterCity.prototype.remove = function () {
            if (this.parent) {
                this.remAllTeXiao();
                this.cleanTiaoGuanGuide();
                egret.Tween.removeTweens(this.groupAtt);
                mg.effectManager.unbindEffect(this.btnAtt);
                utils.timer.clear(this, this.foolUpdata);
                egret.Tween.removeTweens(this.imgGuang);
                this.parent.removeChild(this);
            }
        };
        return MainChapterCity;
    }(ui.MainChapterCitySkin));
    main.MainChapterCity = MainChapterCity;
    __reflect(MainChapterCity.prototype, "main.MainChapterCity");
})(main || (main = {}));
