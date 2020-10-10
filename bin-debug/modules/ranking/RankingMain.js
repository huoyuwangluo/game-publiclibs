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
    var ranking;
    (function (ranking) {
        var TypeRanking = (function () {
            function TypeRanking() {
            }
            TypeRanking.getRankingStateByIndex = function (index) {
                return this.dictionary[index].State;
            };
            TypeRanking.getRankingRely = function (state) {
                for (var temp in this.dictionary) {
                    if (this.dictionary[temp].State == state)
                        return this.dictionary[temp].Rely;
                }
            };
            /**获得排行界面中对应排行的位置 */
            TypeRanking.getRankingIndex = function (name) {
                for (var temp in this.dictionary) {
                    if (this.dictionary[temp].Name == name)
                        return parseInt(temp);
                }
            };
            TypeRanking.FIGHT = Language.C_ZLPH;
            TypeRanking.GRADE = Language.C_DJPH;
            TypeRanking.ANIMAL = Language.C_HST;
            TypeRanking.GOD = Language.C_SZSL;
            TypeRanking.PET = Language.C_GKPH;
            TypeRanking.dictionary = {
                0: { State: TypeRank.ZONGGUANKA, Rely: Language.C_TGK, Name: Language.C_GKPH },
                1: { State: TypeRank.ZONGZHANLI, Rely: Language.C_ZZL, Name: Language.C_ZLPH },
                2: { State: TypeRank.DENGJI, Rely: Language.C_ZDJ, Name: Language.C_DJPH },
                3: { State: TypeRank.TIANTI, Rely: Language.C_TTJF, Name: Language.C_TT },
                4: { State: TypeRank.WUHUNTA, Rely: Language.C_WHT, Name: Language.C_WHT },
                5: { State: TypeRank.WUSHENTA, Rely: Language.C_HST, Name: Language.C_HST },
                6: { State: TypeRank.SHILIANTA, Rely: Language.C_SZSL, Name: Language.C_SZSL }
            };
            return TypeRanking;
        }());
        ranking.TypeRanking = TypeRanking;
        __reflect(TypeRanking.prototype, "dialog.ranking.TypeRanking");
        var RankingMain = (function (_super) {
            __extends(RankingMain, _super);
            function RankingMain() {
                return _super.call(this) || this;
            }
            RankingMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._playerShowAvatar = new components.PlayerShowAvatar();
                this._playerShowAvatar.scaleX = this._playerShowAvatar.scaleY = 0.8;
                this.gpModel.addChildAt(this._playerShowAvatar, 0);
                this._playerShowAvatar.x = 0;
                this._playerShowAvatar.y = -110;
                this.touchEnabled = false;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            RankingMain.prototype.enter = function (data) {
                this.listFenLei.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
                this.listRanking.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.showPlayerView, this);
                this.lookFirst.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFirstPlayerView, this);
                this.chapterRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showChapterRank, this);
                this.selectedTab(data ? data : 0);
                this._rankingWorship = new ranking.RankingWorship(this);
            };
            RankingMain.prototype.exit = function () {
                this._playerShowAvatar.reset();
                this.listFenLei.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
                this.listRanking.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.showPlayerView, this);
                this.lookFirst.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFirstPlayerView, this);
                this.chapterRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showChapterRank, this);
                if (this._rankingWorship)
                    this._rankingWorship.clear();
            };
            RankingMain.prototype.itemClick = function (e) {
                mg.soundManager.playSound('ButtonClick_1');
                var btnIndex = e.itemIndex;
                this.chapterRank.visible = btnIndex == 0;
                this.changeState(btnIndex);
            };
            RankingMain.prototype.showFirstPlayerView = function () {
                if (GameModels.ranking.onePlayerData) {
                    GameModels.friends.getPromptInfo(GameModels.ranking.onePlayerData.playerData.PlayerId, utils.Handler.create(this, function (info, count) {
                        mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                    }));
                }
            };
            RankingMain.prototype.showPlayerView = function (e) {
                GameModels.friends.getPromptInfo(e.itemRenderer.data.playerData.PlayerId, utils.Handler.create(this, function (info, count) {
                    mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                }));
            };
            RankingMain.prototype.showChapterRank = function (e) {
                mg.alertManager.showAlert(RankChapterRewardTitle, false, true);
            };
            RankingMain.prototype.selectedTab = function (index) {
                this.listFenLei.selectedIndex = index;
                this.changeState(index);
            };
            RankingMain.prototype.refreshModel = function (clothId, weaponId, wingId, headId, shoe) {
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
            RankingMain.prototype.changeState = function (index) {
                var type = TypeRanking.getRankingStateByIndex(index);
                // if ((type == 111) && GameModels.activity.kaifuDay < 2) {
                // 	mg.alertManager.tip(Language.getExpression(Language.E_KFD1TKQ, 2, 4), 0xff0000);
                // 	return;
                // }
                this.requestRankingList(type);
            };
            RankingMain.prototype.requestRankingList = function (type) {
                var _this = this;
                if (type == TypeRank.SHILIANTA) {
                    /**试练塔单独处理 */
                    if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.explorePetpagoda, 2, true)) {
                        if (!this._listData) {
                            this._listData = new eui.ArrayCollection([]);
                        }
                        else {
                            this._listData.source = [];
                        }
                        return;
                    }
                }
                if (type == TypeRank.WUSHENTA) {
                    /**武神塔单独处理 */
                    if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.explorePetpagoda, 1, true)) {
                        if (!this._listData) {
                            this._listData = new eui.ArrayCollection([]);
                        }
                        else {
                            this._listData.source = [];
                        }
                        return;
                    }
                }
                if (type == TypeRank.WUHUNTA) {
                    /**武魂塔单独处理 */
                    if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.explorePetpagoda, 0, true)) {
                        if (!this._listData) {
                            this._listData = new eui.ArrayCollection([]);
                        }
                        else {
                            this._listData.source = [];
                        }
                        return;
                    }
                }
                GameModels.ranking.requestRanking(type, utils.Handler.create(this, function (data) {
                    _this.setViewData(data);
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.ranking.laterPlayerData);
                    }
                    else {
                        _this._listData.source = GameModels.ranking.laterPlayerData;
                    }
                    _this.listRanking.dataProvider = _this._listData;
                    if (!GameModels.ranking.onePlayerData)
                        return;
                    var firstPlayerId = GameModels.ranking.onePlayerData.playerData.PlayerId;
                    GameModels.ranking.requestPlayerData(firstPlayerId, utils.Handler.create(_this, function (data) {
                        _this.updateFirstEquipVO(data.PlayerData.Equips);
                        _this.refreshModel(data.PlayerData.PlayerClothViewId, data.PlayerData.PlayerWeaponViewId, data.PlayerData.PlayerWingViewId, data.PlayerData.PlayerHeadViewId, data.PlayerData.PlayerShoeViewId);
                    }));
                }));
            };
            RankingMain.prototype.initAndtoPool = function () {
                if (!this._firstEquips)
                    this._firstEquips = [];
                vo.toPoolList(this._firstEquips);
                this._firstEquips.length = 0;
            };
            RankingMain.prototype.updateFirstEquipVO = function (equips) {
                this.initAndtoPool();
                for (var i = 0; i < equips.length; i++) {
                    var equipTemp = vo.fromPool(vo.EquipVO, equips[i]);
                    this._firstEquips[equips[i].Position] = equipTemp;
                }
            };
            RankingMain.prototype.setViewData = function (data) {
                var oneData = GameModels.ranking.onePlayerData;
                if (oneData) {
                    this.updateRankingWorship(oneData, data);
                    if (data.Ranking <= 0) {
                        this.labOwnRanking.text = Language.C_WSB;
                    }
                    else {
                        this.labOwnRanking.text = data.Ranking.toString();
                    }
                    if (oneData.type == Language.C_ZDJ) {
                        var temp = utils.htmlUtil.getGrade(oneData.playerData.Score);
                        var temp1 = utils.htmlUtil.getGrade(data.Score);
                        this.labType1.textFlow = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + oneData.type + ":</font><font color=" + 0x47C6D9 + ">" + temp1 + "</font>");
                    }
                    else if (oneData.type == Language.C_JWDJ) {
                        var temp = this.jueweiGrade(oneData.playerData.Score);
                        var temp1 = this.jueweiGrade(data.Score);
                        this.labType1.textFlow = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + oneData.type + ":</font><font color=" + 0x47C6D9 + ">" + temp1 + "</font>");
                    }
                    else {
                        this.labType1.textFlow = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + oneData.type + ":</font><font color=" + 0x47C6D9 + ">" + data.Score + "</font>");
                    }
                }
                else {
                    this.labOwnRanking.text = Language.C_WSB;
                    this.labType1.text = "";
                }
            };
            //膜拜功能
            RankingMain.prototype.updateRankingWorship = function (oneData, data) {
                this._rankingWorship.update(oneData, data);
            };
            RankingMain.prototype.jueweiGrade = function (lv) {
                // let curr: templates.heroNobility = Templates.getTemplateById(templates.Map.HERONOBILITY, lv + 1);
                // return curr.name;
                return "";
            };
            RankingMain.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.scroFenLei.verticalScrollBar) {
                    this.scroFenLei.verticalScrollBar.autoVisibility = false;
                    this.scroFenLei.verticalScrollBar.visible = false;
                }
                if (this.scroRanking.verticalScrollBar) {
                    this.scroRanking.verticalScrollBar.autoVisibility = false;
                    this.scroRanking.verticalScrollBar.visible = false;
                }
            };
            return RankingMain;
        }(ui.RankingSkin));
        ranking.RankingMain = RankingMain;
        __reflect(RankingMain.prototype, "dialog.ranking.RankingMain", ["IModuleView", "egret.DisplayObject"]);
    })(ranking = dialog.ranking || (dialog.ranking = {}));
})(dialog || (dialog = {}));
