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
var LegionNumberList = (function (_super) {
    __extends(LegionNumberList, _super);
    function LegionNumberList() {
        return _super.call(this) || this;
    }
    LegionNumberList.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    LegionNumberList.prototype.enter = function (data) {
        this._currIndex = 0;
        this.showView();
        this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
    };
    LegionNumberList.prototype.exit = function () {
        this.clearList(this.list);
        this.btnUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this.btnNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
    };
    LegionNumberList.prototype.onBuyClick = function (e) {
        var item = this.list.selectedItem;
        GameModels.friends.getPromptInfo(item.playerId, utils.Handler.create(this, function (info, count) {
            mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
        }));
    };
    LegionNumberList.prototype.showView = function () {
        this.btnNext.touchEnabled = false;
        this.btnNext.filters = utils.filterUtil.grayFilters;
        this.btnUp.touchEnabled = false;
        this.btnUp.filters = utils.filterUtil.grayFilters;
        GameModels.legion.myLegionNumberList(this._currIndex, utils.Handler.create(this, function () {
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(GameModels.legion.legionNumberListDataVo);
            }
            else {
                this._listData.source = GameModels.legion.legionNumberListDataVo;
            }
            this.list.dataProvider = this._listData;
            if (GameModels.legion.maxPage > 1) {
                if (GameModels.legion.maxPage > (GameModels.legion.curPageId + 1)) {
                    this.btnNext.touchEnabled = true;
                    this.btnNext.filters = null;
                }
                if (GameModels.legion.curPageId > 0) {
                    this.btnUp.touchEnabled = true;
                    this.btnUp.filters = null;
                }
            }
        }));
    };
    LegionNumberList.prototype.onBtnClickHandler = function (e) {
        switch (e.target) {
            case this.btnUp:
                this._currIndex = this._currIndex - 1;
                this.showView();
                break;
            case this.btnNext:
                this._currIndex = this._currIndex + 1;
                this.showView();
                break;
        }
    };
    return LegionNumberList;
}(ui.LegionNumberListSkin));
__reflect(LegionNumberList.prototype, "LegionNumberList");
