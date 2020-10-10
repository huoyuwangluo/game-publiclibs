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
        var LadderRanking1 = (function (_super) {
            __extends(LadderRanking1, _super);
            function LadderRanking1() {
                return _super.call(this) || this;
            }
            LadderRanking1.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                if (!this._playerShowAvatar) {
                    this._playerShowAvatar = new components.PlayerShowAvatar();
                }
                this.addChild(this._playerShowAvatar);
                this._playerShowAvatar.x = 294;
                this._playerShowAvatar.y = 175;
                this._playerShowAvatar.scaleX = this._playerShowAvatar.scaleY = 0.7;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            LadderRanking1.prototype.enter = function (data) {
                this.initRanking();
            };
            LadderRanking1.prototype.exit = function () {
                this._playerShowAvatar.reset();
                this.clearList(this.listRanking);
                if (this.listRankingData)
                    this.listRankingData.source = null;
            };
            LadderRanking1.prototype.refreshModel = function (clothId, weaponId, wingId, headId, shoe) {
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
            LadderRanking1.prototype.initRanking = function () {
                var _this = this;
                this._playerShowAvatar.visible = false;
                GameModels.ladder1.requestRankingList(utils.Handler.create(this, function () {
                    _this.setRankingData();
                    var firstPlayerId = GameModels.ladder1.firstPlayer && GameModels.ladder1.firstPlayer.playerId;
                    if (!firstPlayerId)
                        return;
                    GameModels.ranking.requestPlayerData(firstPlayerId, utils.Handler.create(_this, function (data) {
                        _this.updateFirstEquipVO(data.PlayerData.Equips);
                        _this._playerShowAvatar.visible = true;
                        _this.refreshModel(data.PlayerData.PlayerClothViewId, data.PlayerData.PlayerWeaponViewId, data.PlayerData.PlayerWingViewId, data.PlayerData.PlayerHeadViewId, data.PlayerData.PlayerShoeViewId);
                    }));
                }));
            };
            LadderRanking1.prototype.initAndtoPool = function () {
                if (!this._firstEquips)
                    this._firstEquips = [];
                vo.toPoolList(this._firstEquips);
                this._firstEquips.length = 0;
            };
            LadderRanking1.prototype.updateFirstEquipVO = function (equips) {
                this.initAndtoPool();
                for (var i = 0; i < equips.length; i++) {
                    var equipTemp = vo.fromPool(vo.EquipVO, equips[i]);
                    this._firstEquips[equips[i].Position] = equipTemp;
                }
            };
            LadderRanking1.prototype.setRankingData = function () {
                if (GameModels.ladder1.roleData.ladderRanking <= 100) {
                    this.labRanking.text = GameModels.ladder1.roleData.ladderRanking + "";
                }
                else {
                    var elements = [];
                    elements.push({ text: "100", style: { size: 18 } });
                    elements.push({ text: "+", style: { size: 16 } });
                    this.labRanking.textFlow = elements;
                }
                var temp = Templates.getTemplateById(templates.Map.RANKREWARD, 32001);
                this.reward0.dataSource ? vo.toPool(this.reward0.dataSource) : null;
                this.reward1.dataSource ? vo.toPool(this.reward1.dataSource) : null;
                var chest = vo.fromPool(vo.PrizeVO, temp, item.TypePrize.GOLD);
                this.reward0.dataSource = chest.items[0].id + "_" + chest.items[0].count;
                this.reward1.dataSource = chest.items[1].id + "_" + chest.items[1].count;
                this.labNameGrade.text = (GameModels.ladder1.firstPlayer && GameModels.ladder1.firstPlayer.name) ? GameModels.ladder1.firstPlayer.name : Language.C_XWYD;
                if (!this.listRankingData) {
                    this.listRankingData = new eui.ArrayCollection(GameModels.ladder1.underOnePlayers);
                }
                else {
                    this.listRankingData.source = GameModels.ladder1.underOnePlayers;
                }
                this.listRanking.dataProvider = this.listRankingData;
            };
            LadderRanking1.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
            };
            return LadderRanking1;
        }(ui.LadderRanking1Skin));
        explore.LadderRanking1 = LadderRanking1;
        __reflect(LadderRanking1.prototype, "dialog.explore.LadderRanking1");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));
