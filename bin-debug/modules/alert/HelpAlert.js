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
var HelpAlert = (function (_super) {
    __extends(HelpAlert, _super);
    function HelpAlert() {
        return _super.call(this) || this;
    }
    HelpAlert.prototype.show = function (data, title) {
        this._data = data;
        this.labTitle.text = title ? title : Language.J_BZ;
        this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(data);
        if (this.labContent.y + this.labContent.textHeight + 80 > 400) {
            this.imgBg.height = this.labContent.y + this.labContent.textHeight + 80;
            this.imgBg1.height = this.labContent.y + this.labContent.textHeight - 50;
        }
        else {
            this.imgBg.height = 400;
            this.imgBg1.height = 270;
        }
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    HelpAlert.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    HelpAlert.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return HelpAlert;
}(ui.HelpSkin));
__reflect(HelpAlert.prototype, "HelpAlert", ["IAlert", "egret.DisplayObject"]);
