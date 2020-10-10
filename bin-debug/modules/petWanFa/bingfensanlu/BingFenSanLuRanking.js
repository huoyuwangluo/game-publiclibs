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
    var yuanzheng;
    (function (yuanzheng) {
        var BingFenSanLuRanking = (function (_super) {
            __extends(BingFenSanLuRanking, _super);
            function BingFenSanLuRanking() {
                return _super.call(this) || this;
            }
            BingFenSanLuRanking.prototype.initialize = function () {
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
            BingFenSanLuRanking.prototype.enter = function (data) {
                this.initRanking();
            };
            BingFenSanLuRanking.prototype.exit = function () {
                this._playerShowAvatar.reset();
                this.clearList(this.listRanking);
                this.listRankingData.source = null;
            };
            BingFenSanLuRanking.prototype.refreshModel = function (clothId, weaponId, wingId, headId, shoe) {
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
            BingFenSanLuRanking.prototype.initRanking = function () {
                var _this = this;
                GameModels.ranking.requestRanking(TypeRank.SHILITA, utils.Handler.create(this, function (data) {
                    _this.setRankingData();
                    if (!GameModels.ranking.onePlayerData)
                        return;
                    var firstPlayerId = GameModels.ranking.onePlayerData.playerData.PlayerId;
                    GameModels.ranking.requestPlayerData(firstPlayerId, utils.Handler.create(_this, function (data) {
                        _this.updateFirstEquipVO(data.PlayerData.Equips);
                        _this.refreshModel(data.PlayerData.PlayerClothViewId, data.PlayerData.PlayerWeaponViewId, data.PlayerData.PlayerWingViewId, data.PlayerData.PlayerHeadViewId, data.PlayerData.PlayerShoeViewId);
                    }));
                }));
            };
            BingFenSanLuRanking.prototype.initAndtoPool = function () {
                if (!this._firstEquips)
                    this._firstEquips = [];
                vo.toPoolList(this._firstEquips);
                this._firstEquips.length = 0;
            };
            BingFenSanLuRanking.prototype.updateFirstEquipVO = function (equips) {
                this.initAndtoPool();
                for (var i = 0; i < equips.length; i++) {
                    var equipTemp = vo.fromPool(vo.EquipVO, equips[i]);
                    this._firstEquips[equips[i].Position] = equipTemp;
                }
            };
            BingFenSanLuRanking.prototype.setRankingData = function () {
                this.labJiFen.text = GameModels.ranking.myScore.toString();
                this.labRanking.text = GameModels.ranking.myRank > 0 ? GameModels.ranking.myRank.toString() : Language.C_WSB;
                var temp = Templates.getTemplateById(templates.Map.RANKREWARD, 4001);
                this.reward0.dataSource ? vo.toPool(this.reward0.dataSource) : null;
                this.reward1.dataSource ? vo.toPool(this.reward1.dataSource) : null;
                var chest = vo.fromPool(vo.PrizeVO, temp, item.TypePrize.GOLD);
                this.reward0.dataSource = chest.items[0].id + "_" + chest.items[0].count;
                this.reward1.dataSource = chest.items[1].id + "_" + chest.items[1].count;
                this.labScore.text = GameModels.ranking.onePlayerData ? GameModels.ranking.onePlayerData.playerData.Score.toString() : "";
                this.labNameGrade.text = GameModels.ranking.onePlayerData ? GameModels.ranking.onePlayerData.playerData.PlayerName : Language.C_XWYD;
                this.labDes.visible = GameModels.ranking.onePlayerData ? true : false;
                var dataArr = [];
                for (var i = 0; i < 20; i++) {
                    var data = { playerData: null, ranking: 0 };
                    data.playerData = GameModels.ranking.laterPlayerData[i];
                    data.ranking = i + 1;
                    dataArr.push(data);
                }
                if (!this.listRankingData) {
                    this.listRankingData = new eui.ArrayCollection(dataArr);
                }
                else {
                    this.listRankingData.source = dataArr;
                }
                this.listRanking.dataProvider = this.listRankingData;
            };
            BingFenSanLuRanking.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
            };
            return BingFenSanLuRanking;
        }(ui.BingFenSanLuRankingSkin));
        yuanzheng.BingFenSanLuRanking = BingFenSanLuRanking;
        __reflect(BingFenSanLuRanking.prototype, "dialog.yuanzheng.BingFenSanLuRanking");
    })(yuanzheng = dialog.yuanzheng || (dialog.yuanzheng = {}));
})(dialog || (dialog = {}));
