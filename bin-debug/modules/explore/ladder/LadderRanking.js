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
        var LadderRanking = (function (_super) {
            __extends(LadderRanking, _super);
            function LadderRanking() {
                return _super.call(this) || this;
            }
            LadderRanking.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                if (!this._playerShowAvatar) {
                    this._playerShowAvatar = new components.PlayerShowAvatar();
                }
                this.addChild(this._playerShowAvatar);
                this._playerShowAvatar.x = 294;
                this._playerShowAvatar.y = 175;
                this._playerShowAvatar.scaleX = this._playerShowAvatar.scaleY = 0.7;
                GameModels.state.registerWarnTarget(GameRedState.ARENA_LADDER_REWARD, this.btnReward);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            LadderRanking.prototype.enter = function (data) {
                this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRewardView, this);
                this.initRanking();
            };
            LadderRanking.prototype.exit = function () {
                this._playerShowAvatar.reset();
                this.clearList(this.listRanking);
                if (this.listRankingData)
                    this.listRankingData.source = null;
                this.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openRewardView, this);
            };
            LadderRanking.prototype.refreshModel = function (clothId, weaponId, wingId, headId, shoe) {
                if (this._playerShowAvatar)
                    this._playerShowAvatar.reset();
                var c = Templates.getTemplateById(templates.Map.GAMEFASHION, clothId);
                var w = Templates.getTemplateById(templates.Map.GAMEFASHION, weaponId);
                if (!!c) {
                    clothId = c.modelId;
                }
                if (!!w) {
                    weaponId = w.modelId;
                }
                if (this._playerShowAvatar) {
                    this._playerShowAvatar.clothResId = clothId;
                    this._playerShowAvatar.weaponResId = weaponId;
                    if (parseInt(wingId) > 0) {
                        this._playerShowAvatar.wingResId = wingId;
                    }
                    if (parseInt(headId) > 0) {
                        this._playerShowAvatar.playHat(parseInt(headId));
                    }
                    // if (parseInt(shoe) > 0) {
                    // 	this._playerShowAvatar.bottomResId = "1097";
                    // }
                }
            };
            //排行面板
            LadderRanking.prototype.initRanking = function () {
                var _this = this;
                GameModels.ladder.requestRankingList(utils.Handler.create(this, function () {
                    _this.setRankingData();
                    var firstPlayerId = GameModels.ladder.firstPlayer.playerId;
                    if (!firstPlayerId)
                        return;
                    GameModels.ranking.requestPlayerData(firstPlayerId, utils.Handler.create(_this, function (data) {
                        _this.updateFirstEquipVO(data.PlayerData.Equips);
                        _this.refreshModel(data.PlayerData.PlayerClothViewId, data.PlayerData.PlayerWeaponViewId, data.PlayerData.PlayerWingViewId, data.PlayerData.PlayerHeadViewId, data.PlayerData.PlayerShoeViewId);
                    }));
                }));
            };
            LadderRanking.prototype.initAndtoPool = function () {
                if (!this._firstEquips)
                    this._firstEquips = [];
                vo.toPoolList(this._firstEquips);
                this._firstEquips.length = 0;
            };
            LadderRanking.prototype.updateFirstEquipVO = function (equips) {
                this.initAndtoPool();
                for (var i = 0; i < equips.length; i++) {
                    var equipTemp = vo.fromPool(vo.EquipVO, equips[i]);
                    this._firstEquips[equips[i].Position] = equipTemp;
                }
            };
            LadderRanking.prototype.setRankingData = function () {
                this.labJiFen.text = GameModels.ladder.roleData.myOrAddScore.toString();
                this.labRanking.text = GameModels.ladder.roleData.ladderRanking.toString();
                var temp = Templates.getTemplateById(templates.Map.RANKREWARD, 30001);
                this.reward.dataSource ? vo.toPool(this.reward.dataSource) : null;
                var chest = vo.fromPool(vo.PrizeVO, temp, item.TypePrize.GOLD);
                this.reward.dataSource = chest.items[0].id;
                var ladderStep = GameModels.ladder.firstPlayer.step;
                if (!ladderStep) {
                    this.imgGrade.visible = false;
                    this.imgLv.visible = false;
                }
                else {
                    this.imgGrade.visible = true;
                    this.imgGrade.source = dialog.explore.TypeGrade.getGradeImage(ladderStep);
                    if (ladderStep != dialog.explore.TypeGrade.EXTREME) {
                        this.imgLv.visible = true;
                        this.imgLv.source = dialog.explore.TypeGrade.getLvImge(ladderStep, GameModels.ladder.firstPlayer.lv);
                    }
                    else {
                        this.imgLv.visible = false;
                    }
                }
                this.labScore.text = GameModels.ladder.firstPlayer.myOrAddScore ? GameModels.ladder.firstPlayer.myOrAddScore.toString() : "0";
                this.labNameGrade.text = GameModels.ladder.firstPlayer.name ? GameModels.ladder.firstPlayer.name : Language.C_XWYD;
                if (!this.listRankingData) {
                    this.listRankingData = new eui.ArrayCollection(GameModels.ladder.underOnePlayers);
                }
                else {
                    this.listRankingData.source = GameModels.ladder.underOnePlayers;
                }
                this.listRanking.dataProvider = this.listRankingData;
            };
            LadderRanking.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
            };
            LadderRanking.prototype.openRewardView = function (e) {
                mg.uiManager.show(explore.LadderReward);
            };
            return LadderRanking;
        }(ui.LadderRankingSkin));
        explore.LadderRanking = LadderRanking;
        __reflect(LadderRanking.prototype, "dialog.explore.LadderRanking");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));
