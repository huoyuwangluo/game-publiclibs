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
var SmithyShenBingChoose = (function (_super) {
    __extends(SmithyShenBingChoose, _super);
    function SmithyShenBingChoose() {
        return _super.call(this) || this;
    }
    SmithyShenBingChoose.prototype.show = function () {
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(GameModels.smithy.shenBinIdList);
        }
        else {
            this._listData.source = GameModels.smithy.shenBinIdList;
        }
        this.list.dataProvider = this._listData;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
    };
    SmithyShenBingChoose.prototype.listHandler = function () {
        var id = this.list.selectedItem;
        GameModels.smithy.requestChooseSmithyTarget(id, utils.Handler.create(this, this.clickHandler));
    };
    SmithyShenBingChoose.prototype.clickHandler = function () {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    SmithyShenBingChoose.prototype.hide = function () {
        this.clearList(this.list);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return SmithyShenBingChoose;
}(ui.SmithyShenBingChooseSkin));
__reflect(SmithyShenBingChoose.prototype, "SmithyShenBingChoose", ["IAlert", "egret.DisplayObject"]);
