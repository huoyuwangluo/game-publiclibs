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
        var LadderViewDialog1 = (function (_super) {
            __extends(LadderViewDialog1, _super);
            function LadderViewDialog1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LadderViewDialog1.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            LadderViewDialog1.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this._startTime = 0;
                this.prizeProgress.initializeData(GameModels.ladder1.prizeMin, GameModels.ladder1.prizeMax, GameModels.ladder1.prizes);
                this.prizeProgress.value = GameModels.ladder1.prizeProgress;
            };
            LadderViewDialog1.prototype.destory = function () {
                _super.prototype.destory.call(this);
                this.removeListenerBoxes();
                this.prizeProgress.reset();
            };
            LadderViewDialog1.prototype.enter = function (data) {
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRankingView, this);
                this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClickTime, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                this.btnJiLu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHander, this);
                this.imgJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                this.imgQuick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickHander, this);
                GameModels.scene.onJoinScene(this, this.updataJoinFightState);
                this.addEventListener("ENTER", this.enterFight, this);
                this.initFight();
                this.updataJoinFightState();
            };
            LadderViewDialog1.prototype.onJoinHander = function () {
                app.gameContext.enterLadder1Fight("");
            };
            LadderViewDialog1.prototype.onQuickHander = function () {
                mg.TipManager.instance.showCheckAlert(Language.J_KSTZKKSHDGXZ, TypeBtnLabel.OK, TypeCheck.YANWUSAODANG, null, utils.Handler.create(this, function () {
                    app.gameContext.enterLadder1Fight("", utils.Handler.create(this, this.quickCallback));
                }));
            };
            LadderViewDialog1.prototype.quickCallback = function (data) {
                // mg.alertManager.tip(Language.J_SDCG);
                this.initFight();
                if (data.RewardStr) {
                    var rewardArr = data.RewardStr.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
                // var items: string[] = data.RewardStr.split(";");
                //mg.effectManager.flyIconsToBag(items, this.roleInfo4.localToGlobal(this.roleInfo4.width * .5, this.roleInfo4.height * .5));
            };
            LadderViewDialog1.prototype.updataJoinFightState = function () {
                if (GameModels.scene.getjoinSceneListByType(TypeGame.LADDER_FIGHT1)) {
                    this.imgJoin.visible = true;
                    this.imgQuick.visible = false;
                    this.roleInfo0.btnDebrs.visible = this.roleInfo1.btnDebrs.visible = false;
                }
                else {
                    this.imgJoin.visible = false;
                    this.imgQuick.visible = true;
                    this.roleInfo0.btnDebrs.visible = this.roleInfo1.btnDebrs.visible = true;
                }
            };
            LadderViewDialog1.prototype.onClickHander = function (e) {
                mg.alertManager.showAlert(LadderViewRecord, true, true, 1);
            };
            LadderViewDialog1.prototype.exit = function () {
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openRankingView, this);
                this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClickTime, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                this.btnJiLu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHander, this);
                this.imgJoin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                this.imgQuick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickHander, this);
                GameModels.scene.offJoinScene();
                this.removeEventListener("ENTER", this.enterFight, this);
                this.removeListenerBoxes();
            };
            //竞技面板
            LadderViewDialog1.prototype.initFight = function () {
                var _this = this;
                this.removeListenerBoxes();
                this.addListenerBoxes();
                GameModels.ladder1.requestFightList(utils.Handler.create(this, function () {
                    //注册宝箱和挑战  触碰事件
                    _this.updateFightViewData();
                    _this.judgeNowLayout();
                }));
            };
            //刷新倒计时
            LadderViewDialog1.prototype.startClickTime = function () {
                var _this = this;
                GameModels.ladder1.requestRefreshPlayer(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_SXCG);
                    _this.judgeNowLayout();
                }));
            };
            LadderViewDialog1.prototype.openHelp = function () {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5501).des);
            };
            LadderViewDialog1.prototype.openRankingView = function (e) {
                mg.uiManager.show(explore.LadderRanking1);
            };
            LadderViewDialog1.prototype.judgeNowLayout = function () {
                this.labName.text = GameModels.ladder1.roleData.name;
                if (GameModels.ladder1.roleData.ladderRanking <= 100) {
                    this.labTatolJiFen.text = GameModels.ladder1.roleData.ladderRanking + "";
                }
                else {
                    var elements = [];
                    elements.push({ text: "100", style: { size: 18 } });
                    elements.push({ text: "+", style: { size: 16 } });
                    this.labTatolJiFen.textFlow = elements;
                }
                this.labTatolJiFen0.text = "" + GameModels.ladder1.prizeProgress1;
                this.updateFightRolesData();
            };
            LadderViewDialog1.prototype.updateFightRolesData = function () {
                var datas = GameModels.ladder1.treePlayerData;
                this.roleInfo0.updateRoleData(datas[0]);
                this.roleInfo1.updateRoleData(datas[1]);
            };
            LadderViewDialog1.prototype.updateFightViewData = function () {
                if (this.prizeProgress) {
                    this.prizeProgress.update();
                    this.prizeProgress.value = GameModels.ladder1.prizeProgress;
                }
                this.labFightNum.text = GameModels.ladder1.leftCount + "/" + 5;
                this.labXunZhangNum.text = GameModels.ladder1.roleData.myOrAddMedal.toString();
                if (GameModels.ladder1.leftCount > 0) {
                    this.xiaoHaoGroup.visible = false;
                    this.groupCount.visible = true;
                }
                else {
                    this.xiaoHaoGroup.visible = true;
                    this.groupCount.visible = false;
                    var tem = Templates.getTemplateById(templates.Map.ITEM, ConfigData.YANWU_ITEM);
                    this.labXiaoHaoCount0.text = GameModels.bag.getItemCountById(ConfigData.YANWU_ITEM) + "/1";
                    this.labNeedName0.text = tem.name;
                    this.imgXiaoHao0.source = tem.icon;
                }
                this.timeCount();
            };
            LadderViewDialog1.prototype.timeCount = function () {
                if (GameModels.ladder1.leftTime > 0 && GameModels.ladder1.leftCount < 5) {
                    this.labTimeCount.visible = true;
                    this.labTimeCount.text = Language.getExpression(Language.E_HHFYC, utils.DateUtil.formatTimeLeft(GameModels.ladder1.leftTime));
                    utils.timer.loop(1000, this, this.timeOverCall, true);
                }
                else {
                    this.labTimeCount.visible = false;
                }
            };
            LadderViewDialog1.prototype.timeOverCall = function () {
                this.labTimeCount.text = Language.getExpression(Language.E_HHFYC, utils.DateUtil.formatTimeLeft(GameModels.ladder1.leftTime));
                if (GameModels.ladder1.leftTime < 0) {
                    utils.timer.clear(this, this.timeOverCall);
                    this.updateFightViewData();
                    this.judgeNowLayout();
                }
            };
            LadderViewDialog1.prototype.addListenerBoxes = function () {
                var boxes = this.prizeProgress.prizeBoxes;
                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBoxClick, this);
                    boxes[i].index = i + 1;
                }
            };
            LadderViewDialog1.prototype.removeListenerBoxes = function () {
                var boxes = this.prizeProgress.prizeBoxes;
                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].removeEffects();
                    boxes[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBoxClick, this);
                }
            };
            LadderViewDialog1.prototype.enterFight = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                mg.alertManager.showAlert(PrewarEmbattleYanWu, true, true, e.data);
            };
            LadderViewDialog1.prototype.btnBoxClick = function (e) {
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
                    GameModels.ladder1.requestOpenChest(e.currentTarget.index, utils.Handler.create(this, function () {
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                        _this.prizeProgress.update();
                    }));
                }
                else {
                    //弹出奖励弹框
                    mg.alertManager.showAlert(ChestPreviewAlert, true, true, e.currentTarget.data.items, null, null, null, false, false, null, '');
                }
            };
            return LadderViewDialog1;
        }(ui.LadderView1Skin));
        explore.LadderViewDialog1 = LadderViewDialog1;
        __reflect(LadderViewDialog1.prototype, "dialog.explore.LadderViewDialog1");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));
