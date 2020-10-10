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
var DropPreviewAlert = (function (_super) {
    __extends(DropPreviewAlert, _super);
    function DropPreviewAlert() {
        return _super.call(this) || this;
    }
    DropPreviewAlert.prototype.initialize = function () {
        this._dropBoxes = [this.drop0, this.drop1, this.drop2];
        this._cdropBoxes = [this.cdrop0, this.cdrop1, this.cdrop2];
        this._textFlow = utils.TextFlowMaker.generateTextFlow(Templates.getTemplateByProperty(templates.Map.SYSRULE, "type", 8).des);
    };
    DropPreviewAlert.prototype.show = function (data, data2, isUnionFight) {
        if (data2 === void 0) { data2 = null; }
        if (isUnionFight === void 0) { isUnionFight = false; }
        this._data = data;
        this._isUnionFight = isUnionFight;
        this.currentState = this._isUnionFight ? "state2" : "state1";
        var rewards = data.split(";");
        if (data2) {
            this.cdrop5.dataSource = data2;
        }
        for (var i = 0; i < 3; i++) {
            this._dropBoxes[i].dataSource = (rewards[i]);
            this._cdropBoxes[i].dataSource = (rewards[i]);
        }
        this.cdrop4.dataSource = "201_20";
        this.labDesc.textFlow = this._textFlow;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    DropPreviewAlert.prototype.hide = function () {
        if (this._dropBoxes) {
            for (var _i = 0, _a = this._dropBoxes; _i < _a.length; _i++) {
                var box = _a[_i];
                box.dataSource = null;
            }
        }
        if (this._cdropBoxes) {
            for (var _b = 0, _c = this._cdropBoxes; _b < _c.length; _b++) {
                var cbox = _c[_b];
                cbox.dataSource = null;
            }
        }
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    DropPreviewAlert.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return DropPreviewAlert;
}(ui.DropPreviewSkin));
__reflect(DropPreviewAlert.prototype, "DropPreviewAlert", ["IAlert", "egret.DisplayObject"]);
