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
    var woods;
    (function (woods) {
        var WoorsView = (function (_super) {
            __extends(WoorsView, _super);
            function WoorsView() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.CENTRALITY_X = 340;
                _this.CENTRALITY_Y = 464;
                return _this;
            }
            WoorsView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._scrollerBinder = new components.ScrollerBinder();
                this._itemCollection = new eui.ArrayCollection();
                this.progressHonour.slideDuration = 0;
                this.listItems.scaleY = this.listItems.scaleX = 0.9;
            };
            WoorsView.prototype.destory = function () {
                _super.prototype.destory.call(this);
                if (this._itemCollection) {
                    this._itemCollection.source = null;
                    this._itemCollection = null;
                }
                this.listBoss.dataProvider = null;
            };
            WoorsView.prototype.enter = function (data) {
                this.labTiaoJian.visible = false;
                this.labFight.visible = false;
                this.imgFight.visible = false;
                if (this.bossScroller.horizontalScrollBar) {
                    this.bossScroller.horizontalScrollBar.autoVisibility = false;
                    this.bossScroller.horizontalScrollBar.visible = true;
                }
                this.listBoss.dataProvider = new eui.ArrayCollection(GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_WOODS, 1, true));
                this.listBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBossClick, this);
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.btnAddNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.woodsAddNumHandler, this);
                this._scrollerBinder.initialize(this.bossScroller, this.listBoss, this.btnPrev, this.btnNext);
                GameModels.copyBoss.requestBossCopyInfo(utils.Handler.create(this, this.onSelectBoss));
                this.updateBuyTimes();
            };
            WoorsView.prototype.exit = function () {
                utils.timer.clearAll(this);
                this.listBoss.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBossClick, this);
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
                this.btnAddNum.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.woodsAddNumHandler, this);
            };
            WoorsView.prototype.onBossClick = function (e) {
                this.onSelectBoss(e.itemIndex);
            };
            WoorsView.prototype.onSelectBoss = function (index) {
                if (index === void 0) { index = 0; }
                this.listBoss.selectedIndex = index; // 默认选中第一个BOSS
                var data = this.listBoss.selectedItem;
                if (this.progressHonour) {
                    this.progressHonour.labelDisplay.strokeColor = 0x0;
                    this.progressHonour.labelDisplay.stroke = 2;
                    this.progressHonour.maximum = utils.htmlUtil.getTemplateAndNameToValue(data.templateBoss.properties, "HP");
                    this.progressHonour.value = data.bossHP;
                }
                this._itemCollection.source = this.listBoss.selectedItem.template.dropShow.split(";");
                this.listItems.dataProvider = this._itemCollection;
                // this.imgModel.source = ResPath.getShowBossPath(data.bossShowId);
                // var point: any = GameModels.copyBoss.getShowPoint(data.bossShowId);
                // this.imgModel.x = this.CENTRALITY_X - 600 + point.x;
                // this.imgModel.y = this.CENTRALITY_Y - 600 + point.y;
                this.body.setPetBody(data.templateBoss.petId.toString(), false);
                if (data.isBossKilled) {
                    this.btnEnter.label = Language.C_YJS1;
                    this.btnEnter.filters = utils.filterUtil.grayFilters;
                    this.btnEnter.touchEnabled = false;
                }
                else if (data.stateLock) {
                    this.btnEnter.label = Language.getExpression(Language.E_1HKQ, convert.getLevelName(data.openLevel));
                    this.btnEnter.filters = utils.filterUtil.grayFilters;
                    this.btnEnter.touchEnabled = false;
                }
                else {
                    this.btnEnter.label = Language.C_TZ;
                    this.btnEnter.filters = null;
                    this.btnEnter.touchEnabled = true;
                }
                // } else if (data.template.needCE > 2000) {
                //     this.btnEnter.label = Language.C_WKQ;
                //     this.btnEnter.filters = utils.filterUtil.grayFilters;
                //     this.btnEnter.touchEnabled = false;
                // }
                // else {
                //     this.btnEnter.label = Language.C_TZ;
                //     this.btnEnter.filters = null;
                //     this.btnEnter.touchEnabled = true;
                // }
                this.updateBuyTimes();
            };
            WoorsView.prototype.updateBuyTimes = function () {
                this.labDomainCount.text = GameModels.copyBoss.woorsBossCount + "/" + GameModels.copyBoss.woorsRefreshNum;
            };
            WoorsView.prototype.openHelp = function (e) {
            };
            WoorsView.prototype.onEnterClick = function (e) {
                if (GameModels.copyBoss.woorsBossCount > 0) {
                    var copyVO = this.listBoss.selectedItem;
                    //app.gameContext.enterWoodsEveryOneBoss(copyVO)
                }
                else {
                    if (GameModels.platform.isPay) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_WSKTZCSBZ, TypeBtnLabel.OK_SIGIN, null, utils.Handler.create(this, function () {
                        }));
                    }
                    else {
                        mg.alertManager.tip(Language.J_GMCSBZ);
                    }
                }
            };
            WoorsView.prototype.woodsAddNumHandler = function (e) {
                // if (GameModels.copyBoss.woorsBossBuyCount >= GameModels.copyBoss.woorsBuyMaxNum) {
                //     mg.alertManager.tip(Language.J_GMCSYDSX, 0xff0000);
                //     return;
                // }
                if (GameModels.copyBoss.woorsBossCount >= GameModels.copyBoss.woorsRefreshNum) {
                    mg.alertManager.tip(Language.J_CSZGWXGM, 0xff0000);
                    return;
                }
                var num = GameModels.copyBoss.woorsBuyCost(GameModels.copyBoss.woorsBossBuyCount + 1);
                mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1MSGMTZJH, num), TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                    GameModels.copyBoss.woorsBuyChallengesTimes(utils.Handler.create(this, function () {
                        this.updateBuyTimes();
                    }));
                }), null, true);
            };
            return WoorsView;
        }(ui.WoorsSkin));
        woods.WoorsView = WoorsView;
        __reflect(WoorsView.prototype, "dialog.woods.WoorsView");
    })(woods = dialog.woods || (dialog.woods = {}));
})(dialog || (dialog = {}));
