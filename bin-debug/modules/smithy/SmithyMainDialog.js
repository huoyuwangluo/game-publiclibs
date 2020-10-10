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
    var smithy;
    (function (smithy) {
        var SmithyMainDialog = (function (_super) {
            __extends(SmithyMainDialog, _super);
            function SmithyMainDialog() {
                return _super.call(this) || this;
            }
            SmithyMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._itemArr = [this.item1, this.item2, this.item3];
            };
            SmithyMainDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.labLeftBuyCount.visible = this.getItem.visible = GameModels.platform.isPay;
                if (GameModels.guide.guideType == mo.ModelGuide.guideType12) {
                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType12);
                    mg.StoryManager.instance.startBigStory(121, this, null);
                }
                this._effect1 = this.fromEffect("31025");
                this._effect1.x = 120;
                this._effect1.y = 473;
                this._effect1.play();
                this.addChildAt(this._effect1, this.getChildIndex(this.imgBg) + 1);
                this._effect2 = this.fromEffect("31026");
                this._effect2.x = 360;
                this._effect2.y = 373;
                this._effect2.play();
                this.addChildAt(this._effect2, this.getChildIndex(this.imgBg) + 1);
                this._selfData = null;
                this._time = 0;
                this.showViewInfo();
                GameModels.smithy.requestCreateSmithyTask();
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
                }
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
                this.btnTalent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
                this.btnChangeSB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                this.ShenBingIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                this.btnTime.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeClick, this);
                this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetItemClick, this);
                this.btnDuanZao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuanZaoClick, this);
                GameModels.smithy.addEventListener(mo.ModelSmithy.UPDATA_SMITHY_INFO, this.showViewInfo, this);
                GameModels.smithy.addEventListener(mo.ModelSmithy.UPDATA_SMITHY_TASK_INFO, this.showViewInfo, this);
            };
            SmithyMainDialog.prototype.exit = function () {
                if (this._effect1) {
                    if (this._effect1.parent) {
                        this._effect1.parent.removeChild(this._effect1);
                    }
                    this._effect1.stop();
                    utils.ObjectPool.to(this._effect1, true);
                    this._effect1 = null;
                }
                if (this._effect2) {
                    if (this._effect2.parent) {
                        this._effect2.parent.removeChild(this._effect2);
                    }
                    this._effect2.stop();
                    utils.ObjectPool.to(this._effect2, true);
                    this._effect2 = null;
                }
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
                    this._itemArr[i].dataSource = null;
                }
                this._isJoin = false;
                this._selfData = null;
                this._time = 0;
                utils.timer.clear(this);
                this.btnTalent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
                this.btnChangeSB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                this.ShenBingIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                this.btnTime.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeClick, this);
                this.getItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetItemClick, this);
                this.btnDuanZao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuanZaoClick, this);
                GameModels.smithy.removeEventListener(mo.ModelSmithy.UPDATA_SMITHY_INFO, this.showViewInfo, this);
                GameModels.smithy.removeEventListener(mo.ModelSmithy.UPDATA_SMITHY_TASK_INFO, this.showViewInfo, this);
            };
            SmithyMainDialog.prototype.showViewInfo = function () {
                this.labLv.text = "Lv." + GameModels.smithy.smithyLevel;
                this.labProess.text = GameModels.smithy.smithyExp + "/" + GameModels.smithy.smithyTemp.needExp;
                this.expProgress.noTweenValue = GameModels.smithy.smithyExp / GameModels.smithy.smithyTemp.needExp;
                this.labXiaoHaoCount0.text = GameModels.smithy.smithyCnt + "/" + GameModels.smithy.smithyRefreshNum;
                this.btnTalent.isWarn = GameModels.smithy.checkTalentRedPoint();
                this.labLeftBuyCount.text = GameModels.smithy.smithyBuyMaxNum > 0 ? Language.getExpression(Language.E_SYGMCS, GameModels.smithy.leftBuySmithyCnt) : "";
                this.showPlayerTaskInfo();
            };
            /**任务数据 */
            SmithyMainDialog.prototype.showPlayerTaskInfo = function () {
                // if (GameModels.smithy.smithyPlayerListVo.length <= 0) return;
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].dataSource = 1;
                }
                for (var i = 0; i < this._itemArr.length; i++) {
                    if (GameModels.smithy.smithyPlayerListVo[i]) {
                        var smithyVo = GameModels.smithy.smithyPlayerListVo[i];
                        this._itemArr[i].dataSource = smithyVo;
                        if (smithyVo.playerId == GameModels.user.player.uid) {
                            this._selfData = smithyVo;
                            this.showPlayerItem();
                        }
                    }
                }
                this.btnDuanZao.skinName = "skins.SnapBigButton2Skin";
                utils.timer.clear(this);
                if (GameModels.smithy.smithyLeftTime <= 0) {
                    if (GameModels.smithy.status > 0) {
                        this.btnDuanZao.visible = true;
                        this.btnDuanZao.skinName = "skins.SnapBigButton3Skin";
                        this.btnDuanZao.label = Language.C_LJLQ;
                    }
                    this.labTime.text = "";
                    this.imgTimeBg.visible = false;
                    this.btnTime.visible = false;
                }
                else {
                    this.btnTime.visible = true;
                    this.btnDuanZao.visible = false;
                    this._time = GameModels.smithy.smithyLeftTime;
                    this.updateLableTime();
                    utils.timer.countdown(this._time, this, this.updateLableTime, this.finshTime);
                }
            };
            SmithyMainDialog.prototype.updateLableTime = function () {
                if (this._time <= 0) {
                    return;
                }
                this.labTime.text = Language.C_DZDJS + utils.DateUtil.formatTimeLeft(this._time);
                this.imgTimeBg.visible = true;
                this._time--;
            };
            SmithyMainDialog.prototype.finshTime = function () {
                this.labTime.text = "";
                this.imgTimeBg.visible = false;
                this.btnTime.visible = false;
                this.btnDuanZao.skinName = "skins.SnapBigButton3Skin";
                this.btnDuanZao.label = Language.C_LJLQ;
                this.btnDuanZao.visible = true;
            };
            SmithyMainDialog.prototype.showPlayerItem = function () {
                this.btnChangeSB.visible = false;
                this.btnDuanZao.visible = false;
                if (GameModels.smithy.targetShenBinItemTemp) {
                    this.ShenBingIcon.source = GameModels.smithy.targetShenBinItemTemp.icon;
                    this.labNameSB.text = GameModels.smithy.targetShenBinItemTemp.name;
                    this.btnChangeSB.visible = GameModels.smithy.status <= 0;
                    this.imgRewardIcon1.visible = true;
                    this.imgRewardIcon1.dataSource = GameModels.smithy.targetShenBinId + "_0";
                }
                else {
                    this.ShenBingIcon.visible = GameModels.smithy.status <= 0;
                    this.ShenBingIcon.source = "common_json.img_add_png";
                    this.labNameSB.text = "";
                    this.imgRewardIcon1.visible = false;
                }
                if (GameModels.smithy.baseRewardStr) {
                    this.imgRewardIcon2.visible = true;
                    this.imgRewardIcon2.dataSource = GameModels.smithy.baseRewardStr;
                    var baseCount = parseInt(GameModels.smithy.baseRewardStr.split("_")[1]);
                    var teamCount = Math.ceil((GameModels.smithy.rewardTeamAddonPercent / 10000) * baseCount);
                    if (teamCount <= 0) {
                        this.imgRewardIcon2.labCount.text = "" + baseCount;
                    }
                    else {
                        this.imgRewardIcon2.labCount.text = (baseCount) + "(+" + teamCount + ")";
                    }
                }
                else {
                    this.imgRewardIcon2.visible = false;
                }
                this.imgRewardIcon0.dataSource = GameModels.smithy.targetShenBinTemp.reward;
                var animal = GameModels.animal.getAnimalBuyType(13);
                if (animal.isAct && animal.step >= 3) {
                    var str = GameModels.smithy.targetShenBinTemp.reward.split("_");
                    var count = parseInt(str[1]) + (parseInt(str[1]) / 2);
                    this.imgRewardIcon0.dataSource = str[0] + "_" + count;
                }
                if (GameModels.smithy.baseExp) {
                    this.ShenBingExpGroup.visible = true;
                    var baseExpCount = GameModels.smithy.baseExp;
                    var teamExpCount = (GameModels.smithy.expTeamAddonPercent / 10000) * baseExpCount;
                    if (Math.floor(teamExpCount) <= 0) {
                        this.labExpCount.text = "" + baseExpCount;
                    }
                    else {
                        this.labExpCount.text = (baseExpCount) + "(+" + Math.floor(teamExpCount) + ")";
                    }
                }
                else {
                    this.ShenBingExpGroup.visible = false;
                }
                this.btnDuanZao.skinName = "skins.SnapBigButton2Skin";
                this.btnDuanZao.visible = GameModels.smithy.status <= 0;
                this.btnDuanZao.label = Language.C_KSDZ;
            };
            /**锻造 */
            SmithyMainDialog.prototype.onDuanZaoClick = function () {
                if (GameModels.smithy.status > 0 && GameModels.smithy.smithyLeftTime <= 0) {
                    GameModels.smithy.requestSmithyGetSmithReward();
                    return;
                }
                if (GameModels.smithy.status <= 0) {
                    GameModels.smithy.requestSmithyStartTask();
                }
            };
            /**改变目标神兵 */
            SmithyMainDialog.prototype.onChangeClick = function (e) {
                if (GameModels.smithy.status > 0)
                    return;
                if (e.currentTarget == this.btnChangeSB || e.currentTarget == this.ShenBingIcon) {
                    mg.alertManager.showAlert(SmithyShenBingChoose, true, true);
                }
            };
            /**邀请好友或者踢出好友 */
            SmithyMainDialog.prototype.onItemClick = function (e) {
                if (GameModels.smithy.status > 0)
                    return;
                for (var i = 0; i < this._itemArr.length; i++) {
                    if (e.currentTarget == this._itemArr[i]) {
                        if (e.target instanceof components.IconButton) {
                            var data = this._itemArr[i].dataSource;
                            if (data.playerId)
                                GameModels.smithy.requestSmithyKickoutAssistant(data.playerId);
                        }
                        else {
                            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.legionList, -1, true)) {
                                return;
                            }
                            if (!GameModels.user.player.legionId) {
                                mg.alertManager.showAlert(PromptAlert, false, true, Language.J_SFJRJT, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                                    mg.uiManager.show(LegionList);
                                }));
                                return;
                            }
                            mg.alertManager.showAlert(SmithyInviteAlert, true, true);
                        }
                    }
                }
            };
            SmithyMainDialog.prototype.onTimeClick = function () {
                var dataValue = GameModels.dataSet.getDataSettingValueById(713001);
                var num = parseInt(dataValue.split("_")[1]);
                mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SFXHMSJSDZ, num), TypeBtnLabel.OK, TypeCheck.SMITHY_CD, null, utils.Handler.create(this, function () {
                    GameModels.smithy.requestSmithyCleanCD();
                }));
            };
            /**购买次数 */
            SmithyMainDialog.prototype.onGetItemClick = function () {
                if (GameModels.smithy.leftBuySmithyCnt <= 0) {
                    if (GameModels.platform.isPay) {
                        mg.alertManager.tip(Language.J_WSKTZCSBZ, 0xff0000);
                    }
                    else {
                        mg.alertManager.tip(Language.J_GMCSBZ);
                    }
                    return;
                }
                if (GameModels.smithy.smithyCnt >= GameModels.smithy.smithyRefreshNum) {
                    mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                    return;
                }
                var num = GameModels.smithy.getSmithyBuyItemNum((GameModels.smithy.smithyBuyMaxNum - GameModels.smithy.leftBuySmithyCnt) + 1);
                var str = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SFXH1MSGMDZCS, num));
                mg.alertManager.showCheckAlert(str, TypeBtnLabel.OK, TypeCheck.SMITHY_BUYCOUNT + "_" + num, null, utils.Handler.create(this, function () {
                    GameModels.smithy.requestSmithyBuyTimes();
                }), null, null, true);
            };
            /**帮助和天赋 */
            SmithyMainDialog.prototype.onHelpClick = function (e) {
                if (e.currentTarget == this.btnTalent) {
                    mg.uiManager.show(dialog.smithy.SmithyTalentDialog);
                }
                else {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 4201).des);
                }
            };
            return SmithyMainDialog;
        }(ui.SmithyMainDialogSkin));
        smithy.SmithyMainDialog = SmithyMainDialog;
        __reflect(SmithyMainDialog.prototype, "dialog.smithy.SmithyMainDialog", ["IModuleView", "egret.DisplayObject"]);
    })(smithy = dialog.smithy || (dialog.smithy = {}));
})(dialog || (dialog = {}));
