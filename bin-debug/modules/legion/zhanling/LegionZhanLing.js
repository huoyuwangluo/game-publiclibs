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
var LegionZhanLing = (function (_super) {
    __extends(LegionZhanLing, _super);
    function LegionZhanLing() {
        return _super.call(this) || this;
    }
    LegionZhanLing.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    LegionZhanLing.prototype.enter = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (this.scroller.verticalScrollBar) {
            this.scroller.verticalScrollBar.autoVisibility = false;
            this.scroller.verticalScrollBar.visible = false;
        }
        GameModels.zhanling.getBPInfo(utils.Handler.create(this, function () {
            if (!_this._listData) {
                _this._listData = new eui.ArrayCollection(GameModels.zhanling.zhanlingVoList);
            }
            else {
                _this._listData.source = GameModels.zhanling.zhanlingVoList;
            }
            _this.list.dataProvider = _this._listData;
            _this.labTime.text = utils.DateUtil.formatTimeLeftInChinese(GameModels.zhanling.leftTime, true, true, true, false);
            _this.showView();
        }));
        this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        GameModels.zhanling.addEventListener(mo.ModelZhanLing.ZHANLING_CHANGE, this.zhanlingChange, this);
    };
    LegionZhanLing.prototype.exit = function () {
        this.clearList(this.list);
        this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOneKey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        GameModels.zhanling.removeEventListener(mo.ModelZhanLing.ZHANLING_CHANGE, this.zhanlingChange, this);
    };
    LegionZhanLing.prototype.onBtnClick = function (e) {
        var _this = this;
        if (e.currentTarget == this.btnOneKey) {
            GameModels.zhanling.getBPAllReward(utils.Handler.create(this, function (data) {
                _this.showView();
            }));
        }
        else if (e.currentTarget == this.btnGet) {
            mg.uiManager.show(dialog.legion.LegionTaskMain, { tabIndex: 1 });
        }
        else if (e.currentTarget == this.btnUpgrade) {
            mg.alertManager.showAlert(LegionZhanLingJinJie, true, true);
        }
        else {
            //购买等级
            if (GameModels.zhanling.currTemp.level >= 100) {
                mg.alertManager.tip(Language.J_ZLYDDZDDJ);
            }
            else {
                mg.alertManager.showAlert(BuyZhanLingLevel, true, true);
            }
        }
    };
    LegionZhanLing.prototype.zhanlingChange = function () {
        var _this = this;
        GameModels.zhanling.getBPInfo(utils.Handler.create(this, function () {
            if (!_this._listData) {
                _this._listData = new eui.ArrayCollection(GameModels.zhanling.zhanlingVoList);
            }
            else {
                _this._listData.source = GameModels.zhanling.zhanlingVoList;
            }
            _this.list.dataProvider = _this._listData;
            _this.labTime.text = utils.DateUtil.formatTimeLeftInChinese(GameModels.zhanling.leftTime, true, true, true, false);
            _this.showView();
        }));
    };
    LegionZhanLing.prototype.showView = function () {
        this.btnBuy.label = Language.J_GMDJ;
        this.btnBuy.touchEnabled = true;
        var exp = GameModels.zhanling.exp / GameModels.zhanling.currTemp.needExp;
        this.imgPro.width = (exp > 1 ? 1 : exp) * 349;
        this.labLevel.text = GameModels.zhanling.currTemp.id + "";
        this.btnUpgrade.visible = GameModels.zhanling.stepOpen <= 0;
        this.btnOneKey.visible = GameModels.zhanling.stepOpen > 0;
        this.btnBuy.visible = GameModels.zhanling.stepOpen > 0;
        this.labCount.text = GameModels.zhanling.exp >= GameModels.zhanling.currTemp.needExp ? GameModels.zhanling.currTemp.needExp + "/" + GameModels.zhanling.currTemp.needExp : GameModels.zhanling.exp + "/" + GameModels.zhanling.currTemp.needExp;
        if (this._listData)
            this._listData.replaceAll(GameModels.zhanling.zhanlingVoList);
        if (GameModels.zhanling.currTemp.level >= 100) {
            this.btnBuy.label = Language.C_YMJ;
        }
    };
    return LegionZhanLing;
}(ui.LegionZhanLingSkin));
__reflect(LegionZhanLing.prototype, "LegionZhanLing");
