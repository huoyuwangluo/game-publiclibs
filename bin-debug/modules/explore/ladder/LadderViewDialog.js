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
    var explore;
    (function (explore) {
        var LadderViewDialog = (function (_super) {
            __extends(LadderViewDialog, _super);
            function LadderViewDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._maxTimes = 3;
                return _this;
            }
            LadderViewDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            LadderViewDialog.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.prizeProgress.initializeData(GameModels.ladder.prizeMin, GameModels.ladder.prizeMax, GameModels.ladder.prizes);
                this.prizeProgress.value = GameModels.ladder.prizeProgress;
                GameModels.state.registerWarnTarget(GameRedState.ARENA_LADDER_RANK, this.btnRank);
            };
            LadderViewDialog.prototype.destory = function () {
                _super.prototype.destory.call(this);
                this.removeListenerBoxes();
                this.prizeProgress.reset();
            };
            LadderViewDialog.prototype.enter = function (data) {
                if (GameModels.guide.guideType == mo.ModelGuide.guideType2) {
                    mg.StoryManager.instance.startBigStory(124, this, null);
                }
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRankingView, this);
                this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClickTime, this);
                this.btnAddCount.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAddCountView, this);
                this.btnJiLu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHander, this);
                this.btnDuiHun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHander, this);
                if (this.imgHelp) {
                    this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                }
                GameModels.bag.onItemChange(ConfigData.LADDER_ITEM, this, this.updateFightViewData);
                GameModels.scene.onJoinScene(this, this.judgeNowLayout);
                this.roles.addEventListener("ENTER", this.enterFight, this);
                this.initFight();
            };
            LadderViewDialog.prototype.onClickHander = function (e) {
                if (e.currentTarget == this.btnJiLu) {
                    mg.alertManager.showAlert(LadderViewRecord, true, true, 0);
                }
                else {
                    mg.uiManager.show(dialog.shop.MallChangeShopMain, { tabIndex: 2 });
                }
            };
            LadderViewDialog.prototype.exit = function () {
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openRankingView, this);
                this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClickTime, this);
                this.btnAddCount.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAddCountView, this);
                this.btnJiLu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHander, this);
                this.btnDuiHun.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHander, this);
                if (this.imgHelp) {
                    this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                }
                this.roles.removeEventListener("ENTER", this.enterFight, this);
                GameModels.bag.offItemChange(ConfigData.LADDER_ITEM, this, this.updateFightViewData);
                GameModels.scene.offJoinScene();
                // GameModels.state.unRegisterWarnTarget(GameRedState.ARENA_LADDER_RANK);
                this.removeListenerBoxes();
            };
            //竞技面板
            LadderViewDialog.prototype.initFight = function () {
                var _this = this;
                this.removeListenerBoxes();
                this.addListenerBoxes();
                GameModels.ladder.requestFightList(utils.Handler.create(this, function () {
                    //注册宝箱和挑战  触碰事件
                    _this.updateFightViewData();
                    _this.judgeNowLayout();
                }));
            };
            //刷新倒计时
            LadderViewDialog.prototype.startClickTime = function () {
                var _this = this;
                GameModels.ladder.requestRefreshPlayer(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_SXCG);
                    _this.judgeNowLayout();
                }));
            };
            //弹出购买次数界面
            LadderViewDialog.prototype.openAddCountView = function (e) {
                //现无VIP  以后有VIP加以判断
                var nowMaxBuy = GameModels.vip.ladderFightCount + GameModels.ladder.normalBuyTimes();
                if (GameModels.ladder.buyTimes >= nowMaxBuy) {
                    if (GameModels.platform.isPay) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_KGMCSBZ, TypeBtnLabel.GO, null, utils.Handler.create(this, function () {
                            mg.uiManager.show(view.vip.VipMianDailog);
                        }), null, null, true, false);
                    }
                    else {
                        mg.alertManager.tip(Language.J_GMCSBZ);
                    }
                    return;
                }
                if (GameModels.ladder.getLaterTimesPrice(GameModels.ladder.buyTimes + 1) > GameModels.user.player.diamonds) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_MSBZSFQWGM, TypeBtnLabel.GOTO, null, utils.Handler.create(this, this.rigthCallback));
                    return;
                }
                var tem = Templates.getTemplateById(templates.Map.ITEM, ConfigData.LADDER_ITEM);
                mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1MSGM2CWP, GameModels.ladder.getLaterTimesPrice(GameModels.ladder.buyTimes + 1), tem.name), TypeBtnLabel.OK, null, utils.Handler.create(this, this.sendBuyTimes), null, true, true, false);
            };
            LadderViewDialog.prototype.openHelp = function () {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 101).des);
            };
            LadderViewDialog.prototype.rigthCallback = function (data) {
                GameModels.recharge.openRechargeDialog();
            };
            LadderViewDialog.prototype.sendBuyTimes = function () {
                var _this = this;
                GameModels.ladder.requestBuyTimes(utils.Handler.create(this, function () {
                    _this.updateFightViewData();
                    mg.alertManager.tip(Language.J_GMCG);
                }));
            };
            LadderViewDialog.prototype.openRankingView = function (e) {
                mg.uiManager.show(explore.LadderRanking);
            };
            LadderViewDialog.prototype.judgeNowLayout = function () {
                var ladderRanking = GameModels.ladder.roleData.ladderRanking;
                if (ladderRanking <= 2) {
                    this.setFightRolesState(Number(ladderRanking));
                    this.updateFightRolesData(Number(ladderRanking));
                }
                else {
                    this.setFightRolesState(mo.ModelLadder.ROLEINDEX);
                    this.updateFightRolesData(mo.ModelLadder.ROLEINDEX);
                }
            };
            LadderViewDialog.prototype.setFightRolesState = function (roleIndex) {
                var state;
                for (var i = 0; i < this.roles.$children.length; i++) {
                    if (i == (roleIndex - 1)) {
                        state = renderer.LadderRoleInfoCell.OWNSTATE;
                    }
                    else {
                        state = renderer.LadderRoleInfoCell.OTHERSTATE;
                    }
                    this.roles.getChildAt(i).currentState = state;
                }
                var viewSport = mg.uiManager.getView(dialog.sport.SportsMainDialog);
                if (viewSport)
                    viewSport.updataChange();
            };
            LadderViewDialog.prototype.updateFightRolesData = function (roleIndex) {
                var datas = GameModels.ladder.treePlayerData;
                var j = 0;
                for (var i = 0; i < this.roles.$children.length; i++) {
                    if (i == (roleIndex - 1)) {
                        this.roles.getChildAt(i).updateRoleData(GameModels.ladder.roleData, i);
                    }
                    else {
                        this.roles.getChildAt(i).updateRoleData(datas[j], i);
                        j++;
                    }
                }
            };
            LadderViewDialog.prototype.updateFightViewData = function () {
                if (this.prizeProgress) {
                    this.prizeProgress.update();
                    this.prizeProgress.value = GameModels.ladder.prizeProgress;
                }
                if (GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_104)) {
                    this.labFightNum.text = GameModels.ladder.leftCount + "/" + 7;
                }
                else {
                    this.labFightNum.text = GameModels.ladder.leftCount + "/" + 5;
                }
                if (GameModels.ladder.leftCount > 0) {
                    this.xiaoHaoGroup.visible = false;
                    this.groupCount.visible = true;
                }
                else {
                    this.xiaoHaoGroup.visible = true;
                    this.groupCount.visible = false;
                    var tem = Templates.getTemplateById(templates.Map.ITEM, ConfigData.LADDER_ITEM);
                    this.labXiaoHaoCount.text = GameModels.bag.getItemCountById(ConfigData.LADDER_ITEM) + "/1";
                    this.labNeedName.text = tem.name;
                    this.imgXiaoHao.source = tem.icon;
                }
                this.labXunZhangNum.text = GameModels.ladder.roleData.myOrAddMedal.toString();
            };
            LadderViewDialog.prototype.addListenerBoxes = function () {
                var boxes = this.prizeProgress.prizeBoxes;
                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBoxClick, this);
                    boxes[i].index = i + 1;
                }
            };
            LadderViewDialog.prototype.removeListenerBoxes = function () {
                var boxes = this.prizeProgress.prizeBoxes;
                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].removeEffects();
                    boxes[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBoxClick, this);
                }
            };
            LadderViewDialog.prototype.enterFight = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (GameModels.guide.guideType == mo.ModelGuide.guideType2) {
                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType2);
                }
                var player = e.data.player;
                var index = e.data.index;
                if (index == 3) {
                    app.gameContext.enterLadderFight(player.playerId, utils.Handler.create(this, this.quickCallback));
                }
                else {
                    mg.alertManager.showAlert(PrewarEmbattle, true, true, 3, player);
                }
                // app.gameContext.enterLadderFight((e.data as vo.LadderPlayerVO).playerId);
            };
            LadderViewDialog.prototype.quickCallback = function (data) {
                // mg.alertManager.tip(Language.J_SDCG);
                this.initFight();
                if (data.RewardStr) {
                    var rewardArr = data.RewardStr.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
                // var items: string[] = data.RewardStr.split(";");
                //mg.effectManager.flyIconsToBag(items, this.roleInfo4.localToGlobal(this.roleInfo4.width * .5, this.roleInfo4.height * .5));
            };
            LadderViewDialog.prototype.btnBoxClick = function (e) {
                var _this = this;
                if (e.currentTarget.data.state == item.StatePrize.WAIT) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    var rewards = [];
                    var itemArr = e.currentTarget.data.items;
                    for (var _i = 0, itemArr_1 = itemArr; _i < itemArr_1.length; _i++) {
                        var items = itemArr_1[_i];
                        var str = items.id + "_" + items.count;
                        rewards.push(str);
                    }
                    GameModels.ladder.requestOpenChest(e.currentTarget.index, utils.Handler.create(this, function () {
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                        _this.prizeProgress.update();
                    }));
                }
                else {
                    //弹出奖励弹框
                    mg.alertManager.showAlert(ChestPreviewAlert, true, true, e.currentTarget.data.items, null, null, null, false, false, null, '');
                }
            };
            LadderViewDialog.prototype.getCanUseListItem = function () {
                var datas = GameModels.ladder.treePlayerData;
                if (this.roleInfo1.currentState != "own") {
                    return this.roleInfo1.btnDebrs;
                }
                return this.roleInfo2.btnDebrs;
            };
            return LadderViewDialog;
        }(ui.LadderViewSkin));
        explore.LadderViewDialog = LadderViewDialog;
        __reflect(LadderViewDialog.prototype, "dialog.explore.LadderViewDialog");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));
