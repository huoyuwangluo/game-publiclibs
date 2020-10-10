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
var SmithyInviteAlert = (function (_super) {
    __extends(SmithyInviteAlert, _super);
    function SmithyInviteAlert() {
        return _super.call(this) || this;
    }
    SmithyInviteAlert.prototype.show = function () {
        this._choosePlayer = [];
        GameModels.smithy.requestSmithyGetAssistantList(utils.Handler.create(this, function () {
            this.showList();
        }));
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnYaoQing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTouch, this);
    };
    SmithyInviteAlert.prototype.itemTouch = function (e) {
        var vo = this.list.selectedItem.vo;
        var currCount = GameModels.smithy.smithyPlayerListVo.length - 1;
        var needCount = 2 - currCount;
        if (!this.list.selectedItem.selected && needCount == this._choosePlayer.length) {
            mg.alertManager.tip(Language.C_XZWJYM);
            return;
        }
        this.list.selectedItem.selected = !this.list.selectedItem.selected;
        this._listData.itemUpdated(this.list.selectedItem);
        if (this.list.selectedItem.selected) {
            this._choosePlayer.push(vo.playerId);
        }
        else {
            for (var i = this._choosePlayer.length - 1; i >= 0; i--) {
                if (this._choosePlayer[i] == vo.playerId)
                    this._choosePlayer.splice(i, 1);
            }
        }
    };
    SmithyInviteAlert.prototype.showList = function () {
        var voList = GameModels.smithy.smithyPlayerListVo1;
        var data = [];
        for (var i = 0; i < voList.length; i++) {
            data.push({ vo: voList[i], selected: false });
        }
        if (data) {
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(data);
            }
            else {
                this._listData.source = data;
            }
        }
        else {
            if (!this._listData) {
                this._listData = new eui.ArrayCollection([]);
            }
            else {
                this._listData.source = [];
            }
        }
        this.list.dataProvider = this._listData;
        this.labNo.visible = data.length <= 0;
    };
    SmithyInviteAlert.prototype.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnYaoQing:
                if (GameModels.smithy.smithyPlayerListVo.length >= 3) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                    return;
                }
                if (this._choosePlayer.length <= 0) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                    return;
                }
                GameModels.smithy.requestSmithyInviteAssistant(this._choosePlayer, utils.Handler.create(this, this.endView));
                break;
        }
    };
    SmithyInviteAlert.prototype.endView = function () {
        mg.alertManager.tip(Language.J_YQCG);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    SmithyInviteAlert.prototype.hide = function () {
        this.clearList(this.list);
        this._listData = null;
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnYaoQing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTouch, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return SmithyInviteAlert;
}(ui.SmithyInviteAlertSkin));
__reflect(SmithyInviteAlert.prototype, "SmithyInviteAlert", ["IAlert", "egret.DisplayObject"]);
