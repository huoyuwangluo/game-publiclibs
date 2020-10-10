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
var dialog;
(function (dialog) {
    var gift;
    (function (gift) {
        var notifyGiftMainDialog1 = (function (_super) {
            __extends(notifyGiftMainDialog1, _super);
            function notifyGiftMainDialog1() {
                return _super.call(this) || this;
            }
            notifyGiftMainDialog1.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._selected = -1;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._curstack = new eui.ViewStack();
                this._curstack.touchEnabled = false;
                this.group.addChild(this._curstack);
            };
            notifyGiftMainDialog1.prototype.enter = function (data) {
                var _this = this;
                GameModels.notifyGift.setNewGift2(false, 0);
                this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.notifyGift.requestGetGiftInfo(utils.Handler.create(this, function () {
                    _this.updateView(data);
                }));
            };
            notifyGiftMainDialog1.prototype.exit = function () {
                GameModels.notifyGift.requestGetGiftInfo(null);
                this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
            };
            notifyGiftMainDialog1.prototype.updateView = function (data) {
                this.clear();
                var openList = GameModels.notifyGift.getNotifyGiftVoArrByType(2);
                this._curtabs = [];
                for (var i = 0; i < openList.length; i++) {
                    var btn = new renderer.ActivityTabButton();
                    btn.notifyData = openList[i];
                    btn.setImgIcon = "notify_json.img_notify_icon" + openList[i].refId;
                    btn.x = (openList.length + i) * 121;
                    btn.setLabName = openList[i].temp.name;
                    this.tabGroup.addChild(btn);
                    this._curtabs.push(btn);
                }
                if (!this._curviews)
                    this._curviews = [];
                var index = data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0;
                for (var i = 0; i < this._curtabs.length; i++) {
                    if (this._curtabs[i] && this._curtabs[i].notifyData) {
                        var viewstack = null;
                        viewstack = new view.gift.notifyTable(this._curtabs[i].notifyData);
                        if (viewstack)
                            this._curviews.push(this._curstack.addChild(viewstack));
                    }
                    if (index == this._curtabs[i].notifyData.refId) {
                        index = i;
                    }
                }
                this.onSelectChange(index);
            };
            notifyGiftMainDialog1.prototype.updateRedState = function (index, value) {
                this._curtabs[index].imgRed.visible = value;
            };
            notifyGiftMainDialog1.prototype.clear = function () {
                if (this._selected != -1) {
                    this._curtabs[this._selected].currentState = "up";
                    this._selected = -1;
                }
                if (this._curtabs)
                    this._curtabs.length = 0;
                if (this._curviews)
                    this._curviews.length = 0;
                this._curstack.selectedIndex = 0;
            };
            notifyGiftMainDialog1.prototype.onTabClick = function (e) {
                var index = this._curtabs.indexOf(e.target.parent);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            notifyGiftMainDialog1.prototype.onSelectChange = function (index) {
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
                if (!this._curviews[index])
                    return;
                this._curstack.selectedIndex = index;
                this._curviews[index].enter(index, null);
                if (this._selected != -1) {
                    this._curtabs[this._selected].currentState = "up";
                }
                this._selected = index;
                this._curtabs[index].currentState = "down";
            };
            notifyGiftMainDialog1.prototype.onLeftClick = function (e) {
                this.tabGroup.validateNow();
                if (this.scrollerTab.viewport.scrollH > 0) {
                    this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - 121);
                }
            };
            notifyGiftMainDialog1.prototype.onRightClick = function (e) {
                this.tabGroup.validateNow();
                var width = this.tabGroup.contentWidth - this.scrollerTab.width;
                if (this.scrollerTab.viewport.scrollH < width) {
                    this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + 121);
                }
            };
            return notifyGiftMainDialog1;
        }(ui.notifyGiftMainDialog1Skin));
        gift.notifyGiftMainDialog1 = notifyGiftMainDialog1;
        __reflect(notifyGiftMainDialog1.prototype, "dialog.gift.notifyGiftMainDialog1");
    })(gift = dialog.gift || (dialog.gift = {}));
})(dialog || (dialog = {}));
