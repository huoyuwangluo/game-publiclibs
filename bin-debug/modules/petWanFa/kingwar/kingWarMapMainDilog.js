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
    var kingwar;
    (function (kingwar) {
        /**国战主界面 */
        var kingWarMapMainDilog = (function (_super) {
            __extends(kingWarMapMainDilog, _super);
            function kingWarMapMainDilog() {
                return _super.call(this) || this;
            }
            kingWarMapMainDilog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._map = new kingwar.kingWarMap();
                this.group.addChild(this._map);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            kingWarMapMainDilog.prototype.enter = function (isMainCity) {
                if (isMainCity === void 0) { isMainCity = false; }
                if (GameModels.guide.guideType == mo.ModelGuide.guideType15) {
                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType15);
                    mg.StoryManager.instance.startBigStory(127, this, null);
                }
                if (GameModels.bag.getItemCountById(ConfigData.JUNGONG_ITEM) >= 800 && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_15) <= 0) {
                    mg.StoryManager.instance.startBigStory(139, this, null);
                    GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_15);
                }
                this.attGroup.visible = false;
                this.defGroup.visible = false;
                this.samllMap.visible = this.btnArrow.visible = false;
                this.btnMap.visible = true;
                this.scroller.viewport.validateNow();
                this.scroller.bounces = false;
                this.scroller.viewport.scrollH = (this.scroller.viewport.contentWidth - this.scroller.width) / 2;
                this.scroller.viewport.scrollV = (this.scroller.viewport.contentHeight - this.scroller.height) / 2;
                this._map.showView();
                if (isMainCity == true) {
                    this.moveToCurrCity(this._map.currCity);
                }
                else {
                    this.moveToCurrCity(this._map.getCurrCityByCityID(GameModels.kingwar.fightCityId));
                    var kingVo = GameModels.kingwar.getCityDataByID(GameModels.kingwar.fightCityId);
                    if (GameModels.kingwar.fightState) {
                        GameModels.kingwar.fightState = 0;
                        if (kingVo)
                            mg.alertManager.showAlert(dialog.kingwar.kingWarMapAtt, true, true, kingVo, true);
                    }
                    GameModels.kingwar.fightCityId = 0;
                }
                this.showView();
                this.updataJoinFightState();
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnLingQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnJunGong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.kingwar.addEventListener(mo.ModelKingWar.CITY_CHANGE, this.showView, this);
                GameModels.kingwar.addEventListener(mo.ModelKingWar.SETTARGET_CHANGE, this.showTargetCity, this);
                this.imgJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                GameModels.scene.onJoinScene(this, this.updataJoinFightState);
            };
            kingWarMapMainDilog.prototype.exit = function () {
                this.scroller.stopAnimation();
                egret.Tween.removeTweens(this.scroller.viewport);
                this._map.cleanView();
                this.samllMap.cleanView();
                this.btnRecord.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnLingQu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnJunGong.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnMap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.kingwar.removeEventListener(mo.ModelKingWar.CITY_CHANGE, this.showView, this);
                this.imgJoin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                GameModels.kingwar.removeEventListener(mo.ModelKingWar.SETTARGET_CHANGE, this.showTargetCity, this);
                GameModels.scene.offJoinScene();
            };
            kingWarMapMainDilog.prototype.onJoinHander = function () {
                mg.uiManager.removeAllDialogs();
                app.gameContext.enterGameKingWar("");
            };
            kingWarMapMainDilog.prototype.updataJoinFightState = function () {
                if (GameModels.scene.getjoinSceneListByType(TypeGame.KING_WAR)) {
                    this.imgJoinBg.visible = this.imgJoin.visible = true;
                }
                else {
                    this.imgJoinBg.visible = this.imgJoin.visible = false;
                }
            };
            kingWarMapMainDilog.prototype.moveToCurrCity = function (item) {
                if (!item)
                    return;
                var cy = 880 / 2; //this.scroller.viewport.height / 2;
                var cx = 580 / 2; //this.scroller.viewport.width / 2;
                logger.log("11111111111111==", cy);
                logger.log("11111111111111==", cx);
                logger.log("22222222222222==", item.y);
                logger.log("22222222222222==", item.x);
                egret.Tween.removeTweens(this.scroller.viewport);
                this.scroller.stopAnimation();
                var toY = item.y - cy;
                if (toY > this.scroller.viewport.contentHeight - this.scroller.height) {
                    toY = this.scroller.viewport.contentHeight - this.scroller.height;
                }
                if (toY < 0) {
                    toY = 0;
                }
                var toX = item.x - cx;
                if (toX > this.scroller.viewport.contentWidth - this.scroller.width) {
                    toX = this.scroller.viewport.contentWidth - this.scroller.width;
                }
                if (toX < 0) {
                    toX = 0;
                }
                logger.log("33333333333333==", toY);
                logger.log("33333333333333==", toX);
                egret.Tween.get(this.scroller.viewport).to({ scrollV: toY, scrollH: toX }, 1000, utils.Ease.expoOut);
            };
            kingWarMapMainDilog.prototype.showView = function () {
                var _this = this;
                this.imgMengBg.visible = this.groupMeng.visible = this.groupNoMeng.visible = false;
                GameModels.kingwar.requestMapInfoInfo(utils.Handler.create(this, function () {
                    logger.log("国战服务器回包过来了");
                    _this.labCityCount.text = "x" + GameModels.kingwar.getCountyCityCount(parseInt(GameModels.user.player.legionId));
                    _this.labRewardCount.text = "x" + GameModels.kingwar.getCountyCityRewardCount(parseInt(GameModels.user.player.legionId)) + "/" + Language.C_TIME;
                    _this.imgFlg.source = "img_smokePet_fag" + GameModels.user.player.legionId + "_png";
                    _this.samllMap.updataView();
                    _this._map.updataView();
                    if (GameModels.kingwar.hasHoldReward) {
                        _this.btnLingQu.filters = null;
                        _this.btnLingQu.isWarn = true;
                    }
                    else {
                        _this.btnLingQu.filters = utils.filterUtil.grayFilters;
                        _this.btnLingQu.isWarn = false;
                    }
                    _this.imgMengBg.visible = true;
                    if (GameModels.kingwar.hashTongmeng) {
                        _this.groupMeng.visible = true;
                        var myCount = GameModels.kingwar.getCountyCityCount(GameModels.kingwar.getTongmengByIndex(0));
                        var myMengCount = GameModels.kingwar.getCountyCityCount(GameModels.kingwar.getTongmengByIndex(1));
                        _this.labMengCount1.text = "" + (myCount + myMengCount);
                        _this.imgMeng1.source = "common_json.img_union_point" + GameModels.kingwar.getTongmengByIndex(0) + "_png";
                        _this.imgMeng2.source = "common_json.img_union_point" + GameModels.kingwar.getTongmengByIndex(1) + "_png";
                        var num = [1, 2, 3];
                        var other = 0;
                        for (var i = 0; i < num.length; i++) {
                            if (num[i] != GameModels.kingwar.getTongmengByIndex(0) && num[i] != GameModels.kingwar.getTongmengByIndex(1)) {
                                other = num[i];
                            }
                        }
                        _this.imgMeng3.source = "common_json.img_union_point" + other + "_png";
                        _this.labMengCount2.text = "" + GameModels.kingwar.getCountyCityCount(other);
                    }
                    else {
                        _this.groupNoMeng.visible = true;
                        _this.labNoMengCount1.text = "" + GameModels.kingwar.getCountyCityCount(1);
                        _this.labNoMengCount2.text = "" + GameModels.kingwar.getCountyCityCount(2);
                        _this.labNoMengCount3.text = "" + GameModels.kingwar.getCountyCityCount(3);
                    }
                    var voList = GameModels.kingwar.kingWarArmyVOArr;
                    if (voList[0] && !voList[0].hashPet && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_10) <= 0) {
                        var petUid = ["", "", "", "", ""];
                        for (var i = 0; i < 5; i++) {
                            petUid[i] = GameModels.pet.getFormatUpVOByPos(i) ? GameModels.pet.getFormatUpVOByPos(i).uid : "";
                        }
                        GameModels.pet.petSetFormationData(TypeFormation.UP_FORMATION_KINGWAR1, petUid, utils.Handler.create(_this, function () {
                            GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_10);
                        }));
                    }
                    _this.showTargetCity();
                }));
            };
            kingWarMapMainDilog.prototype.showTargetCity = function () {
                if (GameModels.kingwar.attTargetCityId) {
                    var attcityId = GameModels.kingwar.attTargetCityId;
                    this.attGroup.visible = true;
                    var attTargetCity = GameModels.kingwar.getCityDataByID(attcityId);
                    this.labAtt.text = Language.getExpression(Language.E_DJJHZ1, attTargetCity.cityTemp.cityName);
                }
                if (GameModels.kingwar.defTargetCityId) {
                    var defcityId = GameModels.kingwar.defTargetCityId;
                    this.defGroup.visible = true;
                    var defTargetCity = GameModels.kingwar.getCityDataByID(defcityId);
                    this.labDef.text = Language.getExpression(Language.E_DJJHZ2, defTargetCity.cityTemp.cityName);
                }
            };
            kingWarMapMainDilog.prototype.clickHandler = function (e) {
                var _this = this;
                switch (e.currentTarget) {
                    case this.btnHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 6101).des);
                        break;
                    case this.btnRank:
                        mg.alertManager.showAlert(dialog.kingwar.kingWarMapArmyInfo, true, true);
                        break;
                    case this.btnLingQu:
                        if (GameModels.kingwar.hasHoldReward) {
                            GameModels.kingwar.requestGetHoldReward(utils.Handler.create(this, function () {
                                _this.showView();
                            }));
                        }
                        else {
                            mg.alertManager.tip(Language.J_ZWKLQSY);
                        }
                        break;
                    case this.btnJunGong:
                        mg.uiManager.show(dialog.shop.MallChangeShopMain, { tabIndex: 1 });
                        break;
                    case this.btnMap:
                        this.samllMap.visible = this.btnArrow.visible = true;
                        this.btnMap.visible = false;
                        break;
                    case this.btnArrow:
                        this.samllMap.visible = this.btnArrow.visible = false;
                        this.btnMap.visible = true;
                        break;
                    case this.btnRecord:
                        mg.alertManager.showAlert(dialog.kingwar.kingWarMapRecordList, true, true);
                        break;
                }
            };
            return kingWarMapMainDilog;
        }(ui.kingWarMapMainDilogSkin));
        kingwar.kingWarMapMainDilog = kingWarMapMainDilog;
        __reflect(kingWarMapMainDilog.prototype, "dialog.kingwar.kingWarMapMainDilog");
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));
