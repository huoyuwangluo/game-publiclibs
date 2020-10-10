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
    var campBattle;
    (function (campBattle) {
        var CampBattleJoin = (function (_super) {
            __extends(CampBattleJoin, _super);
            function CampBattleJoin() {
                return _super.call(this) || this;
            }
            CampBattleJoin.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._fightPower = [this.leftFightPower, this.CentreFightPower, this.rightFightPower];
                this._btnArr = [this.btnEnter0, this.btnEnter1, this.btnEnter2];
            };
            CampBattleJoin.prototype.enter = function (data) {
                this._battleId = data;
                if (!this._battleId)
                    return;
                this.show();
                GameModels.campBattle.onGuWuCountChangHandler(this, this.show);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinCampBattle, this);
                }
                this.btnAddInspire0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guWuClick, this);
                this.leftList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                this.centreList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                this.rightList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                GameModels.campBattle.addEventListener(mo.ModelCampBattle.CAMPBATTLE_CHANGE_ROAD, this.showView, this);
            };
            CampBattleJoin.prototype.show = function () {
                var _this = this;
                GameModels.campBattle.getEntryInfo(this._battleId, utils.Handler.create(this, function () {
                    _this.showView();
                    _this.updateBeginTime();
                }));
            };
            CampBattleJoin.prototype.showView = function () {
                this._roadInfo = GameModels.campBattle.roadInfoList.concat();
                var fightPower;
                for (var _i = 0, _a = this._btnArr; _i < _a.length; _i++) {
                    var btn = _a[_i];
                    btn.label = Language.C_JR;
                }
                for (var i = 0; i < this._roadInfo.length; i++) {
                    this.showList(this._roadInfo[i].Pos);
                    fightPower = 0;
                    for (var _b = 0, _c = this._roadInfo[i].PlayerList; _b < _c.length; _b++) {
                        var player = _c[_b];
                        fightPower += player.FightPower;
                        if (player.PlayerId == GameModels.user.player.uid) {
                            this._btnArr[i].label = Language.C_YJR;
                        }
                    }
                    this._fightPower[i].text = Language.getExpression(Language.E_ZHZL, fightPower);
                }
                this.labPrice.text = GameModels.campBattle.guWuNeedCount + "";
                this.labPro.text = Language.P_SM + Language.getExpression(Language.E_J1BFH, (GameModels.campBattle.guWuTimes * 10));
                this.labPro0.text = Language.P_GJ + Language.getExpression(Language.E_J1BFH, (GameModels.campBattle.guWuTimes * 10));
            };
            CampBattleJoin.prototype.showList = function (pos) {
                switch (pos) {
                    case 0:
                        if (!this._listDate1) {
                            this._listDate1 = new eui.ArrayCollection();
                        }
                        this._listDate1.source = this._roadInfo[pos].PlayerList.sort(function (a, b) { return b.FightPower - a.FightPower; });
                        this.leftList.dataProvider = this._listDate1;
                        break;
                    case 1:
                        if (!this._listDate2) {
                            this._listDate2 = new eui.ArrayCollection();
                        }
                        this._listDate2.source = this._roadInfo[pos].PlayerList.sort(function (a, b) { return b.FightPower - a.FightPower; });
                        ;
                        this.centreList.dataProvider = this._listDate2;
                        break;
                    case 2:
                        if (!this._listDate3) {
                            this._listDate3 = new eui.ArrayCollection();
                        }
                        this._listDate3.source = this._roadInfo[pos].PlayerList.sort(function (a, b) { return b.FightPower - a.FightPower; });
                        ;
                        this.rightList.dataProvider = this._listDate3;
                        break;
                }
            };
            CampBattleJoin.prototype.joinCampBattle = function (evt) {
                var _this = this;
                var pos = this._btnArr.indexOf(evt.currentTarget);
                GameModels.campBattle.requesJoinEntryRoad(this._battleId, pos, utils.Handler.create(this, function () {
                    _this.show();
                }));
            };
            CampBattleJoin.prototype.guWuClick = function (evt) {
                GameModels.campBattle.requesGuWu(this._battleId);
            };
            CampBattleJoin.prototype.onListClick = function (e) {
                if (GameModels.user.player.wuguanLevel > 3) {
                    mg.alertManager.tip(Language.J_WGGG);
                    return;
                }
                var index = 0;
                if (e.currentTarget == this.leftList) {
                    index = 0;
                }
                else if (e.currentTarget == this.centreList) {
                    index = 1;
                }
                else {
                    index = 2;
                }
                this._targetItem = e.itemRenderer;
                this._targetItem.showChangePet(this._battleId, index);
            };
            CampBattleJoin.prototype.updateBeginTime = function () {
                this.labOpenTime.text = "";
                this._beginTime = 0;
                utils.timer.clear(this, this.joinTimerHandler);
                this._beginTime = GameModels.campBattle.getopenTime(this._battleId) - GameModels.timer.getPastSecond();
                if (this._beginTime > 0) {
                    this.labOpenTime.text = Language.getExpression(Language.E_ZDKS, utils.DateUtil.formatTimeLeft(this._beginTime));
                    utils.timer.loop(1000, this, this.joinTimerHandler);
                }
                else {
                    this.labOpenTime.text = "";
                    var index = GameModels.campBattle.campBattleIdList.indexOf(this._battleId);
                    var entryState = GameModels.campBattle.campBattleEntryList[index];
                    if (entryState == 2) {
                        app.gameContext.enterCampBattleWar(this._battleId);
                    }
                    else if (entryState == 3) {
                        GameModels.campBattle.requsetBattleResultInfo(this._battleId);
                    }
                }
            };
            CampBattleJoin.prototype.joinTimerHandler = function () {
                this._beginTime--;
                if (this._beginTime <= 0) {
                    this._beginTime = 0;
                    utils.timer.clear(this, this.joinTimerHandler);
                    var index = GameModels.campBattle.campBattleIdList.indexOf(this._battleId);
                    var entryState = GameModels.campBattle.campBattleEntryList[index];
                    if (entryState == 2) {
                        app.gameContext.enterCampBattleWar(this._battleId);
                    }
                    else if (entryState == 3) {
                        GameModels.campBattle.requsetBattleResultInfo(this._battleId);
                    }
                    return;
                }
                this.labOpenTime.text = Language.getExpression(Language.E_ZDKS, utils.DateUtil.formatTimeLeft(this._beginTime));
            };
            CampBattleJoin.prototype.exit = function () {
                this.clearList(this.leftList);
                this.clearList(this.centreList);
                this.clearList(this.rightList);
                this._roadInfo = null;
                GameModels.campBattle.offGuWuCountChangHandler();
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.joinCampBattle, this);
                }
                this.btnAddInspire0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guWuClick, this);
                this.leftList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                this.centreList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                this.rightList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                GameModels.campBattle.removeEventListener(mo.ModelCampBattle.CAMPBATTLE_CHANGE_ROAD, this.showView, this);
            };
            return CampBattleJoin;
        }(ui.CampBattleJoinSkin));
        campBattle.CampBattleJoin = CampBattleJoin;
        __reflect(CampBattleJoin.prototype, "dialog.campBattle.CampBattleJoin");
    })(campBattle = dialog.campBattle || (dialog.campBattle = {}));
})(dialog || (dialog = {}));
