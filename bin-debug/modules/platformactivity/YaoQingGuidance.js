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
var YaoQingGuidance = (function (_super) {
    __extends(YaoQingGuidance, _super);
    function YaoQingGuidance() {
        return _super.call(this) || this;
    }
    YaoQingGuidance.prototype.show = function (data) {
    };
    YaoQingGuidance.prototype.btnUpSureClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    YaoQingGuidance.prototype.hide = function () {
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return YaoQingGuidance;
}(ui.YaoQingGuidanceSkin));
__reflect(YaoQingGuidance.prototype, "YaoQingGuidance", ["IAlert", "egret.DisplayObject"]);