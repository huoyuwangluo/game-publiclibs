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
        var XingYingDuoBaoPreview = (function (_super) {
            __extends(XingYingDuoBaoPreview, _super);
            function XingYingDuoBaoPreview() {
                return _super.call(this) || this;
            }
            XingYingDuoBaoPreview.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            XingYingDuoBaoPreview.prototype.enter = function (tatbleType) {
                this._tatbleType = tatbleType;
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
                this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
                this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
                this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
                this.showView(1);
            };
            XingYingDuoBaoPreview.prototype.showView = function (pos) {
                if (pos == 1) {
                    this.btn1.touchEnabled = false;
                    this.btn1.currentState = "down";
                    this.btn2.touchEnabled = true;
                    this.btn2.currentState = "up";
                    this.btn3.touchEnabled = true;
                    this.btn3.currentState = "up";
                }
                else if (pos == 2) {
                    this.btn1.touchEnabled = true;
                    this.btn1.currentState = "up";
                    this.btn2.touchEnabled = false;
                    this.btn2.currentState = "down";
                    this.btn3.touchEnabled = true;
                    this.btn3.currentState = "up";
                }
                else {
                    this.btn1.touchEnabled = true;
                    this.btn1.currentState = "up";
                    this.btn2.touchEnabled = true;
                    this.btn2.currentState = "up";
                    this.btn3.touchEnabled = false;
                    this.btn3.currentState = "down";
                }
                var rewadTmps = Templates.getTemplatesByPoolAndType(templates.Map.HOLIDAYTREASURE, "poolId", pos, "type", this._tatbleType);
                var data = [];
                for (var i = 0; i < rewadTmps.length; i++) {
                    data.push(rewadTmps[i].reward);
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(data);
                }
                else {
                    this._listData.source = data;
                }
                this.list.dataProvider = this._listData;
            };
            XingYingDuoBaoPreview.prototype.exit = function () {
                this.clearList(this.list);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
                this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
                this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
                this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
            };
            XingYingDuoBaoPreview.prototype.closeThis = function (e) {
                mg.uiManager.remove(this);
            };
            XingYingDuoBaoPreview.prototype.openItemTip = function (e) {
                if (e.currentTarget == this.btn1) {
                    this.showView(1);
                }
                else if (e.currentTarget == this.btn2) {
                    this.showView(2);
                }
                else {
                    this.showView(3);
                }
            };
            return XingYingDuoBaoPreview;
        }(ui.XingYingDuoBaoPreviewSkin));
        activity.XingYingDuoBaoPreview = XingYingDuoBaoPreview;
        __reflect(XingYingDuoBaoPreview.prototype, "view.activity.XingYingDuoBaoPreview");
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
