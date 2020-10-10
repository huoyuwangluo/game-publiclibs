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
var DaoJuBoxPreview = (function (_super) {
    __extends(DaoJuBoxPreview, _super);
    function DaoJuBoxPreview() {
        return _super.call(this) || this;
    }
    DaoJuBoxPreview.prototype.show = function (item, okHandler) {
        this.reward.dataSource = item;
        this._okHandler = okHandler;
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    DaoJuBoxPreview.prototype.onClick = function (e) {
        if (this._okHandler) {
            this._okHandler.run();
            this._okHandler = null;
        }
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    DaoJuBoxPreview.prototype.hide = function () {
        this._okHandler = null;
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return DaoJuBoxPreview;
}(ui.DaoJuBoxPreviewSkin));
__reflect(DaoJuBoxPreview.prototype, "DaoJuBoxPreview", ["IAlert", "egret.DisplayObject"]);
