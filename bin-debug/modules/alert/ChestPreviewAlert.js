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
var ChestPreviewAlert = (function (_super) {
    __extends(ChestPreviewAlert, _super);
    function ChestPreviewAlert() {
        var _this = _super.call(this) || this;
        _this._props = [_this.prop1, _this.prop2, _this.prop3, _this.prop4];
        return _this;
    }
    ChestPreviewAlert.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.freeGetFunc, this);
        this.btnDoubleBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doubleGetFunc, this);
    };
    ChestPreviewAlert.prototype.show = function (propIds, freeGetCall, doubleGetCall, current, leftBtnVis, rightBtnVis, labTip, labTitle) {
        if (freeGetCall === void 0) { freeGetCall = null; }
        if (doubleGetCall === void 0) { doubleGetCall = null; }
        if (current === void 0) { current = null; }
        if (leftBtnVis === void 0) { leftBtnVis = false; }
        if (rightBtnVis === void 0) { rightBtnVis = false; }
        if (labTip === void 0) { labTip = null; }
        if (labTitle === void 0) { labTitle = ""; }
        this.clearEffect();
        this._data = propIds;
        this._freeGetFunc = freeGetCall;
        this._doubleGetFunc = doubleGetCall;
        this.currentState = current ? current : ChestPreviewAlert.NORMAL;
        this.btnBack.once(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
        this.btnClose.once(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
        this.initPropsData();
        this.setBtnVis(leftBtnVis, rightBtnVis);
        this.labTip.text = labTip;
        if (labTitle == "") {
            this.labTitle.text = Language.J_JPYL;
        }
        else {
            this.labTitle.text = labTitle;
        }
    };
    ChestPreviewAlert.prototype.doubleGetFunc = function () {
        if (this._doubleGetFunc) {
            this._doubleGetFunc();
        }
    };
    ChestPreviewAlert.prototype.freeGetFunc = function () {
        if (this._freeGetFunc) {
            this._freeGetFunc();
        }
    };
    ChestPreviewAlert.prototype.hide = function () {
        this.clearEffect();
        this.removeEffectByResId(TypeEffectId.BUTTON_EFF_BIG_RED);
        for (var i = 0; i < this._props.length; i++) {
            this._props[i].reset();
            this._props[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemAlert, this);
        }
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this._freeGetFunc = null;
        this._doubleGetFunc = null;
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    ChestPreviewAlert.prototype.setBtnVis = function (leftBtnVis, rightBtnVis) {
        this.btnBuy.filters = leftBtnVis ? utils.filterUtil.sideFilters : utils.filterUtil.grayFilters;
        this.btnBuy.touchEnabled = leftBtnVis ? true : false;
        this.btnDoubleBuy.filters = rightBtnVis ? utils.filterUtil.sideFilters : utils.filterUtil.grayFilters;
        this.btnDoubleBuy.touchEnabled = rightBtnVis ? true : false;
    };
    ChestPreviewAlert.prototype.commitProperties = function () {
        _super.prototype.commitProperties.call(this);
        this.removeEffectByResId(TypeEffectId.BUTTON_EFF_BIG_RED);
        if (this.currentState == ChestPreviewAlert.NOEND && this.btnDoubleBuy.touchEnabled) {
            var effect = this.addEffect(TypeEffectId.BUTTON_EFF_BIG_RED, this.btnDoubleBuy.x, this.btnDoubleBuy.y);
            effect.touchEnabled = false;
            effect.touchChildren = false;
        }
    };
    ChestPreviewAlert.prototype.closeThis = function () {
        this.hide();
        this.clearEffect();
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    ChestPreviewAlert.prototype.onClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    ChestPreviewAlert.prototype.initPropsData = function () {
        var nums = this._data.length > this._props.length ? this._props.length : this._data.length;
        for (var i = 0; i < nums; i++) {
            this._props[i].visible = true;
            this._props[i].updateItemDataByItemVO(this._data[i], true, true);
            this._props[i].x = this.slignRandomImage(90, 35, this._data.length, i + 1, 272);
            this._props[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemAlert, this);
        }
        for (var i = this._data.length; i < this._props.length; i++) {
            this._props[i].visible = false;
        }
    };
    ChestPreviewAlert.prototype.openItemAlert = function (e) {
        if (e.currentTarget.itemVo instanceof vo.EquipVO) {
            mg.TipManager.instance.showTip(tips.EquipTip, e.currentTarget.itemVo);
        }
        else {
            mg.TipManager.instance.showTip(tips.PropTip, e.currentTarget.itemVo);
        }
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    ChestPreviewAlert.prototype.slignRandomImage = function (imgWight, step, numALL, num, intMiddle) {
        if (intMiddle === void 0) { intMiddle = 0; }
        if (numALL == 1)
            return numALL * (imgWight / 2) * -1 + intMiddle;
        return (2 * num - numALL - 2) * ((imgWight + step) / 2) + intMiddle + step / 2;
    };
    ChestPreviewAlert.NORMAL = "normal"; //正常状态
    ChestPreviewAlert.NOEND = "noend"; //无尽状态
    ChestPreviewAlert.HAPLOID = "haploid"; //单倍领取
    return ChestPreviewAlert;
}(ui.ChestPreviewSkin));
__reflect(ChestPreviewAlert.prototype, "ChestPreviewAlert", ["IAlert", "egret.DisplayObject"]);
