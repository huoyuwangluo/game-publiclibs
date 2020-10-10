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
var GodDiePreviewAlert = (function (_super) {
    __extends(GodDiePreviewAlert, _super);
    function GodDiePreviewAlert() {
        return _super.call(this) || this;
    }
    GodDiePreviewAlert.prototype.initialize = function () {
        this._dropBoxes = [this.drop0, this.drop1, this.drop2];
    };
    GodDiePreviewAlert.prototype.show = function (data /*, data2: string = null*/) {
        this._data = data;
        var rewards = data.split(";");
        for (var i = 0; i < 3; i++) {
            this._dropBoxes[i].dataSource = (rewards[i] + "_" + 0);
        }
        // this.drop3.dataSource = data2;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    GodDiePreviewAlert.prototype.hide = function () {
        if (this._dropBoxes) {
            for (var _i = 0, _a = this._dropBoxes; _i < _a.length; _i++) {
                var box = _a[_i];
                box.dataSource = null;
            }
        }
        // this.drop3.dataSource = null;
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    GodDiePreviewAlert.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return GodDiePreviewAlert;
}(ui.GodDiePreviewSkin));
__reflect(GodDiePreviewAlert.prototype, "GodDiePreviewAlert", ["IAlert", "egret.DisplayObject"]);
