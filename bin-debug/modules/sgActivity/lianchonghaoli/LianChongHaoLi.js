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
    var activity;
    (function (activity) {
        /*game.sgActivityType.lchl */
        var LianChongHaoLi = (function (_super) {
            __extends(LianChongHaoLi, _super);
            function LianChongHaoLi() {
                return _super.call(this) || this;
            }
            LianChongHaoLi.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._btnArr = [this.btn0, this.btn1, this.btn2];
            };
            LianChongHaoLi.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == 0) {
                        this._btnArr[i].currentState = "down";
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                    }
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this._index = 0;
                GameModels.sgActivity.requestLianChongInfo(utils.Handler.create(this, function () {
                    _this.showView();
                }));
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnChongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkClick, this);
            };
            LianChongHaoLi.prototype.exit = function () {
                this.clearList(this.list);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnChongZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkClick, this);
            };
            LianChongHaoLi.prototype.showView = function () {
                this.imgRed0.visible = GameModels.sgActivity.checkLianChongTableRedPoint(0);
                this.imgRed1.visible = GameModels.sgActivity.checkLianChongTableRedPoint(1);
                this.imgRed2.visible = GameModels.sgActivity.checkLianChongTableRedPoint(2);
                this.imgBg.source = "img_lianchonghaoli_bg_" + this._index + "_jpg";
                this.labCount.text = Language.C_YCZ1 + Language.getExpression(Language.E_1MS, GameModels.user.player.todayRechargeTotal);
                var voList = GameModels.sgActivity.getlianchongArr(this._index);
                if (voList) {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(voList);
                    }
                    else {
                        this._listData.source = voList;
                    }
                }
                else {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._listData.source = [];
                    }
                }
                this.list.dataProvider = this._listData;
            };
            LianChongHaoLi.prototype.onLinkClick = function (e) {
                mg.uiManager.show(MallScene, { tabIndex: 4 }, true);
            };
            LianChongHaoLi.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == this._index) {
                        this._btnArr[i].currentState = "down";
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                    }
                }
                this.showView();
            };
            LianChongHaoLi.prototype.onBuyClick = function (e) {
                var item = this.list.selectedItem;
                if (e.target instanceof components.SnapButton) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (item.value == 1 && GameModels.sgActivity.getDay(item.type) == item.templLianChongHaoLi.days) {
                        this.openRechargeDialog();
                    }
                    else {
                        GameModels.sgActivity.requestLianChongGetReward(item.key, utils.Handler.create(this, this.getRewardCallback, [item.templLianChongHaoLi.rewards]));
                    }
                }
            };
            LianChongHaoLi.prototype.openRechargeDialog = function () {
                mg.uiManager.remove(s.UserfaceName.sgDaily);
                var voMRCZ = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                if (voMRCZ && !voMRCZ.hashYYQGAndMRCZReceive) {
                    mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog, { tabIndex: game.sgActivityType.mrcz });
                }
                else {
                    mg.uiManager.show(MallScene);
                }
            };
            LianChongHaoLi.prototype.getRewardCallback = function (str) {
                this.updata();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            LianChongHaoLi.prototype.updata = function () {
                this.imgRed0.visible = GameModels.sgActivity.checkLianChongTableRedPoint(0);
                this.imgRed1.visible = GameModels.sgActivity.checkLianChongTableRedPoint(1);
                this.imgRed2.visible = GameModels.sgActivity.checkLianChongTableRedPoint(2);
                var vo = GameModels.sgActivity.getlianchongArr(this._index);
                if (this._listData)
                    this._listData.replaceAll(vo);
            };
            return LianChongHaoLi;
        }(ui.LianChongHaoLiSkin));
        activity.LianChongHaoLi = LianChongHaoLi;
        __reflect(LianChongHaoLi.prototype, "view.activity.LianChongHaoLi", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
