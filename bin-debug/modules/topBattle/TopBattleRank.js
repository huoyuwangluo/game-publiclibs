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
    var topBattle;
    (function (topBattle) {
        var TopBattleRank = (function (_super) {
            __extends(TopBattleRank, _super);
            function TopBattleRank() {
                return _super.call(this) || this;
            }
            TopBattleRank.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._playerShowAvatar = [];
                this._topLeftPlayerArr = [];
                this._topThreePlayerArr = [];
                this._fightArr = [this.labFight1, this.labFight2, this.labFight3];
                this._btnMoBai = [this.btn_worship1, this.btn_worship2, this.btn_worship3];
                this._labArr = [this.lab1, this.lab2, this.lab3];
                for (var i = 0; i < 3; i++) {
                    var playerShowAvatar = new components.PlayerShowAvatar();
                    playerShowAvatar.scaleX = playerShowAvatar.scaleY = 0.7;
                    this._playerShowAvatar.push(playerShowAvatar);
                    if (i == 0) {
                        playerShowAvatar.x = 300;
                        playerShowAvatar.y = 190;
                        this.hashBattleGroup.addChildAt(playerShowAvatar, this.hashBattleGroup.getChildIndex(this.imgBg) + 1);
                    }
                    else if (i == 1) {
                        playerShowAvatar.x = 300 - 200;
                        playerShowAvatar.y = 180;
                        this.hashBattleGroup.addChildAt(playerShowAvatar, this.hashBattleGroup.getChildIndex(this._playerShowAvatar[0]));
                    }
                    else {
                        playerShowAvatar.x = 300 + 200;
                        playerShowAvatar.y = 180;
                        this.hashBattleGroup.addChildAt(playerShowAvatar, this.hashBattleGroup.getChildIndex(this._playerShowAvatar[0]));
                    }
                }
            };
            TopBattleRank.prototype.enter = function () {
                GameModels.topBattle.requsetTopBattleGetRank(utils.Handler.create(this, function () {
                    this.showView();
                }));
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                for (var i = 0; i < this._btnMoBai.length; i++) {
                    this._btnMoBai[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoBaiClick, this);
                }
            };
            TopBattleRank.prototype.showView = function () {
                this.hashBattleGroup.visible = false;
                this.noBattleGroup.visible = false;
                this._topLeftPlayerArr = [];
                this._topThreePlayerArr = [];
                var rankList = GameModels.topBattle.playerRankList.concat();
                if (rankList.length <= 0) {
                    this.noBattleGroup.visible = true;
                    this.LabNextOpenHide.text = Language.J_BLDFSJSXSPM;
                    this.LabNextOpenTime.text = "";
                    for (var i = 0; i < 3; i++) {
                        if (this._playerShowAvatar[i]) {
                            this._playerShowAvatar[i].reset();
                        }
                    }
                }
                else {
                    this.hashBattleGroup.visible = true;
                    for (var i = 0; i < rankList.length; i++) {
                        if (i < 3 && rankList[i]) {
                            this._topThreePlayerArr.push(rankList[i]);
                        }
                        else {
                            this._topLeftPlayerArr.push(rankList[i]);
                        }
                    }
                    for (var j = 0; j < this._topThreePlayerArr.length; j++) {
                        if (this._topThreePlayerArr[j]) {
                            this.refreshModel(this._topThreePlayerArr[j].clothId, this._topThreePlayerArr[j].weaponId, j);
                            var hashWorship = GameModels.topBattle.hashWorship(this._topThreePlayerArr[j].playerId);
                            this._btnMoBai[j].filters = hashWorship ? utils.filterUtil.grayFilters : null;
                            this._btnMoBai[j].isWarn = hashWorship ? false : true;
                            this._btnMoBai[j].touchEnabled = hashWorship ? false : true;
                            this._btnMoBai[j].label = hashWorship ? Language.J_BMB + ":" + this._topThreePlayerArr[j].moBaiCount : Language.J_MB;
                            this._fightArr[j].text = this._topThreePlayerArr[j].playerFight.toString();
                            this._labArr[j].text = this._topThreePlayerArr[j].playerName;
                        }
                    }
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(this._topLeftPlayerArr);
                    }
                    else {
                        this._listData.source = this._topLeftPlayerArr;
                    }
                    this.list.dataProvider = this._listData;
                    var my = GameModels.topBattle.myRank;
                    var myRank = my ? my.ranking.toString() : Language.C_WSB;
                    this.LabRank.text = Language.J_WDPM + ":" + myRank;
                }
            };
            TopBattleRank.prototype.creatPlayerModel = function () {
            };
            TopBattleRank.prototype.refreshModel = function (clothId, weaponId, index) {
                if (this._playerShowAvatar[index])
                    this._playerShowAvatar[index].reset();
                var c = Templates.getTemplateById(templates.Map.GAMEFASHION, clothId);
                var w = Templates.getTemplateById(templates.Map.GAMEFASHION, weaponId);
                if (!!c) {
                    clothId = c.modelId;
                }
                if (!!w) {
                    weaponId = w.modelId;
                }
                if (this._playerShowAvatar[index]) {
                    this._playerShowAvatar[index].clothResId = clothId;
                    this._playerShowAvatar[index].weaponResId = weaponId;
                }
            };
            TopBattleRank.prototype.onListClick = function (e) {
                var player = this.list.selectedItem;
                GameModels.friends.getPromptInfo(player.playerId, utils.Handler.create(this, function (info, count) {
                    mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                }));
            };
            TopBattleRank.prototype.onBtnClick = function (e) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5901).des);
            };
            TopBattleRank.prototype.onMoBaiClick = function (e) {
                var _this = this;
                var index = this._btnMoBai.indexOf(e.currentTarget);
                var player = this._topThreePlayerArr[index];
                GameModels.topBattle.requsetTopBattleWorship(player.playerId, utils.Handler.create(this, function () {
                    _this._topThreePlayerArr[index].moBaiCount++;
                    _this.showView();
                }));
            };
            TopBattleRank.prototype.exit = function () {
                for (var i = 0; i < 3; i++) {
                    if (this._playerShowAvatar[i]) {
                        this._playerShowAvatar[i].reset();
                    }
                }
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                for (var i = 0; i < this._btnMoBai.length; i++) {
                    this._btnMoBai[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoBaiClick, this);
                }
            };
            return TopBattleRank;
        }(ui.TopBattleRankSkin));
        topBattle.TopBattleRank = TopBattleRank;
        __reflect(TopBattleRank.prototype, "dialog.topBattle.TopBattleRank");
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));
