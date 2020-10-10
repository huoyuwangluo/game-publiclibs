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
var copy;
(function (copy) {
    var GameKingBattleUI = (function (_super) {
        __extends(GameKingBattleUI, _super);
        function GameKingBattleUI() {
            var _this = _super.call(this) || this;
            _this._isShiedPet = false;
            _this._rewardStr = ["520301", "520302", "520303", "520304", "520305"];
            _this._reawardBox = [_this.ui.reawardBox0, _this.ui.reawardBox1, _this.ui.reawardBox2, _this.ui.reawardBox3, _this.ui.reawardBox4];
            for (var i = 0; i < _this._reawardBox.length; i++) {
                _this._reawardBox[i].show(i);
            }
            _this._pointItems = [_this.ui.point0, _this.ui.point1, _this.ui.point2, _this.ui.point3, _this.ui.point4];
            return _this;
        }
        Object.defineProperty(GameKingBattleUI, "instance", {
            get: function () {
                if (!GameKingBattleUI._instance) {
                    GameKingBattleUI._instance = new GameKingBattleUI();
                }
                return GameKingBattleUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameKingBattleUI.prototype.enter = function (battleScene, battleAttackHandler) {
            this._rewardVo = [];
            this._battleScene = battleScene;
            this._battleAttackHandler = battleAttackHandler;
            this.ui.legionWarRankGroup.x = -260;
            this.ui.legionRight.visible = true;
            this.ui.legionWarRank.enter("KingBattlefield");
            this.ui.labProgressScore.text = GameModels.sceneKingBattle.curMyScore + "/" + GameModels.sceneKingBattle.pointScoreReward[GameModels.sceneKingBattle.pointScoreReward.length - 1].value.split("&")[0];
            this.ui.progressBar.maximum = parseInt(GameModels.sceneKingBattle.pointScoreReward[GameModels.sceneKingBattle.pointScoreReward.length - 1].value.split("&")[0]);
            this.ui.progressBar.value = 0;
            this.ui.legionRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRight, this);
            this.ui.legionLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toLeft, this);
            this.ui.listAttacker.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            for (var i = 0; i < this._reawardBox.length; i++) {
                this._reawardBox[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRewardTips, this);
            }
            this._isShiedPet = false;
            for (var z = 0; z < this._rewardStr.length; z++) {
                if (this._rewardStr[z]) {
                    var itemVo = vo.fromPool(vo.ItemVO, parseInt(this._rewardStr[z]));
                    itemVo.count = 1;
                    this._rewardVo.push(itemVo);
                }
            }
            for (var _i = 0, _a = this._pointItems; _i < _a.length; _i++) {
                var pointItem = _a[_i];
                pointItem.enableHandler();
            }
            GameModels.sceneKingBattle.onScoreInitHandler(this, this.upSwordWarData);
            GameModels.sceneKingBattle.onScorePersonChangeHandler(this, this.upSwordWarData);
            GameModels.sceneKingBattle.onScoreTeamChangeHandler(this, this.upSwordWarData);
            GameModels.sceneKingBattle.onSwordListChangeHandler(this, this.kingBattlefieldListChangeHandler);
            this.kingBattlefieldListChangeHandler();
            this.upSwordWarData();
            this.ui.listAttacker.dataProvider = GameModels.sceneKingBattle.attackersCollection;
            utils.timer.loop(1000, this, this.updateTime);
        };
        GameKingBattleUI.prototype.exit = function () {
            this.ui.legionWarRankGroup.x = -260;
            this.ui.legionRight.visible = true;
            this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            this.ui.legionRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toRight, this);
            this.ui.legionLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toLeft, this);
            for (var i = 0; i < this._reawardBox.length; i++) {
                this._reawardBox[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showRewardTips, this);
            }
            this.ui.clearList(this.ui.listAttacker);
            for (var _i = 0, _a = this._reawardBox; _i < _a.length; _i++) {
                var box = _a[_i];
                box.hide();
            }
            utils.timer.clearAll(this);
        };
        GameKingBattleUI.prototype.exitKingBattlefield = function () {
            utils.timer.clear(this, this.updateTime);
            for (var _i = 0, _a = this._pointItems; _i < _a.length; _i++) {
                var pointItem = _a[_i];
                pointItem.disableHandler();
            }
            GameModels.sceneKingBattle.offScoreInitHandler();
            GameModels.sceneKingBattle.offScorePersonChangeHandler();
            GameModels.sceneKingBattle.offScoreTeamChangeHandler();
            GameModels.sceneKingBattle.offSwordListChangeHandler();
            this._battleScene = null;
        };
        GameKingBattleUI.prototype.listItemTapHandler = function (e) {
            var playerVO = e.item;
            if (!playerVO || (playerVO && playerVO.uid == GameModels.user.player.uid))
                return;
            if (playerVO.isSelfTeam(GameModels.user.player.getTeamTarget())) {
                mg.alertManager.tip(Language.J_ZZTZGWJ);
                return;
            }
            var leaderVO = playerVO.getTeamLeaderVO();
            if (leaderVO == null)
                return;
            app.gameContext.gameCurrent.startAttack(leaderVO);
        };
        GameKingBattleUI.prototype.toRight = function () {
            var _this = this;
            egret.Tween.get(this.ui.legionWarRankGroup).to({ x: this.ui.legionWarRankGroup.x + 260 }, 100, utils.Ease.quadOut).call(function () {
                _this.ui.legionRight.visible = false;
            }, this);
        };
        GameKingBattleUI.prototype.toLeft = function () {
            var _this = this;
            egret.Tween.get(this.ui.legionWarRankGroup).to({ x: this.ui.legionWarRankGroup.x - 260 }, 100, utils.Ease.quadOut).call(function () {
                _this.ui.legionRight.visible = true;
            }, this);
        };
        GameKingBattleUI.prototype.upSwordWarData = function () {
            this.ui.legionWarRank.upData();
            this.ui.progressBar.value = GameModels.sceneKingBattle.curMyScore;
            this.ui.labProgressScore.text = GameModels.sceneKingBattle.curMyScore + "/" + GameModels.sceneKingBattle.pointScoreReward[GameModels.sceneKingBattle.pointScoreReward.length - 1].value.split("&")[0];
            for (var i = 0; i < this._reawardBox.length; i++) {
                if (GameModels.sceneKingBattle.pointScoreReward[i]) {
                    var scoreReward = GameModels.sceneKingBattle.pointScoreReward[i].value.split("&");
                    var bol = false;
                    if (GameModels.sceneKingBattle.curMyScore >= parseInt(scoreReward[0])) {
                        bol = true;
                    }
                    this._reawardBox[i].setFilters(parseInt(scoreReward[0]), bol, "KingBattlefield");
                }
            }
        };
        GameKingBattleUI.prototype.kingBattlefieldListChangeHandler = function () {
            var list = GameModels.sceneKingBattle.pointInfoList;
            for (var i = 0; i < list.length; i++) {
                this._pointItems[i].initializeData(list[i]);
            }
        };
        GameKingBattleUI.prototype.updateTime = function () {
            GameModels.sceneKingBattle.nextRefreshSeconds--;
            if (GameModels.sceneKingBattle.nextRefreshSeconds > -1) {
                var str = utils.DateUtil.formatTimeLeft(GameModels.sceneKingBattle.nextRefreshSeconds);
                str = str.substring(3, str.length);
                this.ui.integralTime.text = str;
            }
        };
        GameKingBattleUI.prototype.showRewardTips = function (e) {
            var index = this._reawardBox.indexOf(e.currentTarget);
            mg.alertManager.showAlert(ChestPreviewAlert, true, true, [this._rewardVo[index]], function () { }, null, ChestPreviewAlert.NORMAL, true, false, null);
        };
        return GameKingBattleUI;
    }(copy.GameUIBase));
    copy.GameKingBattleUI = GameKingBattleUI;
    __reflect(GameKingBattleUI.prototype, "copy.GameKingBattleUI");
})(copy || (copy = {}));
