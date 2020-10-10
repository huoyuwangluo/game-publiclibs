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
    var GameCampBattleUI = (function (_super) {
        __extends(GameCampBattleUI, _super);
        function GameCampBattleUI() {
            var _this = _super.call(this) || this;
            _this._leftPlayerItem = [_this.ui.player1, _this.ui.player2, _this.ui.player3];
            _this._rightPlayerItem = [_this.ui.player4, _this.ui.player5, _this.ui.player6];
            _this._battleId = 0;
            _this._pos = 0;
            return _this;
        }
        Object.defineProperty(GameCampBattleUI, "instance", {
            get: function () {
                if (!GameCampBattleUI._instance) {
                    GameCampBattleUI._instance = new GameCampBattleUI();
                }
                return GameCampBattleUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameCampBattleUI.prototype.enter = function (battleId) {
            this._battleId = battleId;
            var unionArr = GameModels.campBattle.getUnionList(battleId);
            this.ui.img_State1.source = "countryWar_json.img_countryWar_zi_" + unionArr[0];
            this.ui.img_State2.source = "countryWar_json.img_countryWar_zi_" + unionArr[1];
            GameModels.campBattle.onCampChangeHandler(this, this.updataPlayerInfo);
            GameModels.campBattle.onZhuWeiCountChangHandler(this, this.updateZhuWeiCount);
            this.ui.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayerInfo, this);
            this.ui.btnZuWei.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            for (var i = 0; i < this._leftPlayerItem.length; i++) {
                this._leftPlayerItem[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayerInfo, this);
                this._rightPlayerItem[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayerInfo, this);
            }
        };
        GameCampBattleUI.prototype.updataPlayerInfo = function () {
            this._remainInfoList = GameModels.campBattle.campRemainInfoList.concat();
            for (var i = 0; i < this._remainInfoList.length; i++) {
                if (this._remainInfoList[i].PlayerId == GameModels.user.player.uid) {
                    this._pos = this._remainInfoList[i].Pos;
                }
                var playerInfo = GameModels.scene.getObjectByUId(this._remainInfoList[i].PlayerId.toString());
                if (this._remainInfoList[i].IsLeft == 1) {
                    if (playerInfo) {
                        this._leftPlayerItem[this._remainInfoList[i].Pos].visible = true;
                        this._leftPlayerItem[this._remainInfoList[i].Pos].initializeData(playerInfo);
                        this._leftPlayerItem[this._remainInfoList[i].Pos].setqueue(this._remainInfoList[i].RemainCount);
                        this._leftPlayerItem[this._remainInfoList[i].Pos].setOrder(this._remainInfoList[i].MyOrder);
                        this._leftPlayerItem[this._remainInfoList[i].Pos].pos = this._remainInfoList[i].Pos;
                    }
                    else {
                        this._leftPlayerItem[this._remainInfoList[i].Pos].visible = false;
                    }
                }
                else {
                    if (playerInfo) {
                        this._rightPlayerItem[this._remainInfoList[i].Pos].visible = true;
                        this._rightPlayerItem[this._remainInfoList[i].Pos].initializeData(playerInfo);
                        this._rightPlayerItem[this._remainInfoList[i].Pos].setqueue(this._remainInfoList[i].RemainCount);
                        this._rightPlayerItem[this._remainInfoList[i].Pos].setOrder(this._remainInfoList[i].MyOrder);
                        this._rightPlayerItem[this._remainInfoList[i].Pos].pos = this._remainInfoList[i].Pos;
                    }
                    else {
                        this._rightPlayerItem[this._remainInfoList[i].Pos].visible = false;
                    }
                }
            }
            this.updateZhuWeiCount();
            this.updateStartLeftTime();
        };
        GameCampBattleUI.prototype.showPlayerInfo = function (evt) {
            var pos = 0;
            if (evt.currentTarget == this.ui.btnRank) {
                pos = this._pos;
            }
            else {
                var playerInfo = evt.currentTarget;
                pos = playerInfo.pos;
            }
            mg.uiManager.show(dialog.campBattle.CampBattleCheckPlayer, this._battleId, pos);
        };
        GameCampBattleUI.prototype.updateZhuWeiCount = function () {
            this.ui.labLeftZuWeiCount.text = GameModels.campBattle.leftZhuWeiCount.toString();
            this.ui.labrightZuWeiCount.text = GameModels.campBattle.rightZhuWeiCount.toString();
        };
        GameCampBattleUI.prototype.updateStartLeftTime = function () {
            if (GameModels.campBattle.startLeftTime > 0) {
                utils.timer.clear(this, this.lastTimeLoop);
                this.ui.countdownGroup.visible = true;
                this._startLeftTime = GameModels.campBattle.startLeftTime;
                utils.timer.loop(1000, this, this.lastTimeLoop, true);
                this.ui.countDownTime.text = this._startLeftTime.toString();
            }
            else {
                this.ui.countDownTime.text = "";
                this.ui.countdownGroup.visible = false;
            }
        };
        GameCampBattleUI.prototype.lastTimeLoop = function () {
            this._startLeftTime--;
            if (this._startLeftTime <= 0) {
                this.ui.countDownTime.text = "";
                this.ui.countdownGroup.visible = false;
                utils.timer.clear(this, this.lastTimeLoop);
                return;
            }
            this.ui.countDownTime.text = this._startLeftTime.toString();
        };
        GameCampBattleUI.prototype.onBtnClick = function (evt) {
            GameModels.campBattle.requesZhuWei(this._battleId);
        };
        GameCampBattleUI.prototype.exit = function () {
            GameModels.campBattle.offCampChangeHandler();
            GameModels.campBattle.offZhuWeiCountChangHandler();
            this.ui.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayerInfo, this);
            for (var i = 0; i < this._leftPlayerItem.length; i++) {
                this._leftPlayerItem[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayerInfo, this);
                this._rightPlayerItem[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayerInfo, this);
            }
        };
        return GameCampBattleUI;
    }(copy.GameUIBase));
    copy.GameCampBattleUI = GameCampBattleUI;
    __reflect(GameCampBattleUI.prototype, "copy.GameCampBattleUI");
})(copy || (copy = {}));
