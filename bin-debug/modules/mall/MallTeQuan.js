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
var view;
(function (view) {
    var vip;
    (function (vip) {
        var MallTeQuan = (function (_super) {
            __extends(MallTeQuan, _super);
            function MallTeQuan() {
                return _super.call(this) || this;
            }
            MallTeQuan.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rewardId = [660001, 670003, 680003, 690003, 780001];
            };
            MallTeQuan.prototype.enter = function (data) {
                this._type = data ? data : 0;
                this._selIndex = 0;
                GameModels.vip.isOpenTeQuanView = true;
                this.showView();
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                GameModels.vip.addEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshList, this);
            };
            MallTeQuan.prototype.showView = function () {
                var _this = this;
                GameModels.vip.requestSpecailCardGetInfo(true, utils.Handler.create(this, function () {
                    _this._specailCard = GameModels.vip.specailCardDate;
                    var news = [];
                    for (var i = 0; i < _this._specailCard.length; i++) {
                        if (_this._specailCard[i].type == _this._type) {
                            news.push({ cardVo: _this._specailCard[i], effect: true });
                            _this._selIndex = i;
                        }
                        else {
                            news.push({ cardVo: _this._specailCard[i], effect: false });
                        }
                    }
                    _this.list.dataProvider = _this._listData = new eui.ArrayCollection(news);
                    _this.list.selectedIndex = _this._selIndex;
                    _this.updateScrollH(_this.list.selectedIndex * 200);
                }));
            };
            MallTeQuan.prototype.refreshList = function () {
                this._listData.replaceAll(this._listData.source);
            };
            MallTeQuan.prototype.onListClick = function (e) {
                var _this = this;
                if (e.target instanceof components.Icon) {
                    var cardVo = this.list.selectedItem;
                    var specailCard = cardVo.cardVo;
                    if (specailCard.cardStatus == 1) {
                        if (specailCard.doneGotReward == 0) {
                            GameModels.vip.requestSpecailCardReward(specailCard.type, utils.Handler.create(this, function () {
                                var item = GameModels.dataSet.getDataSettingValueById(_this._rewardId[specailCard.type - 3]);
                                var rewards = item.split(";");
                                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                                _this._listData.replaceAll(_this._listData.source);
                            }));
                        }
                    }
                    else {
                        switch (specailCard.type) {
                            case 3:
                                var recharge1 = Templates.getTemplateById(templates.Map.GAMERECHARGE, "601");
                                GameModels.platform.buy(recharge1.RMB, 1, "" + recharge1.id, recharge1.name, recharge1.des);
                                break;
                            case 4:
                                GameModels.vip.requestBuySpecailCard(specailCard.type, utils.Handler.create(this, function () {
                                    _this._listData.replaceAll(_this._listData.source);
                                }));
                                break;
                            case 5:
                                var recharge2 = Templates.getTemplateById(templates.Map.GAMERECHARGE, "602");
                                GameModels.platform.buy(recharge2.RMB, 1, "" + recharge2.id, recharge2.name, recharge2.des);
                                break;
                            case 6:
                                var recharge3 = Templates.getTemplateById(templates.Map.GAMERECHARGE, "603");
                                GameModels.platform.buy(recharge3.RMB, 1, "" + recharge3.id, recharge3.name, recharge3.des);
                                break;
                            case 7:
                                GameModels.vip.requestBuySpecailCard(specailCard.type, utils.Handler.create(this, function () {
                                    _this._listData.replaceAll(_this._listData.source);
                                }));
                                break;
                        }
                    }
                }
            };
            MallTeQuan.prototype.updateScrollH = function (maxLength) {
                this.list.validateNow();
                var pos = maxLength - 450;
                var maxScrollV = this.list.contentHeight - 300;
                if (pos <= 0)
                    pos = 0;
                else if (pos >= maxScrollV)
                    pos = maxScrollV;
                this.rollScroller(pos);
            };
            /**滚动条滚动到指定位置 */
            MallTeQuan.prototype.rollScroller = function (pos, duration) {
                if (duration === void 0) { duration = 200; }
                egret.Tween.get(this.scroller.viewport).to({ scrollV: pos }, duration);
            };
            MallTeQuan.prototype.exit = function () {
                this._specailCard = null;
                this._selIndex = 0;
                this._type = 0;
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                GameModels.vip.removeEventListener(mo.ModelVip.VIPTEQUAN_CHANGE, this.refreshList, this);
            };
            return MallTeQuan;
        }(ui.MallTeQuanSkin));
        vip.MallTeQuan = MallTeQuan;
        __reflect(MallTeQuan.prototype, "view.vip.MallTeQuan", ["IModuleView", "egret.DisplayObject"]);
    })(vip = view.vip || (view.vip = {}));
})(view || (view = {}));
