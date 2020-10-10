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
var RoleWingGodConcumeAlert = (function (_super) {
    __extends(RoleWingGodConcumeAlert, _super);
    function RoleWingGodConcumeAlert() {
        var _this = _super.call(this) || this;
        _this.labNo.text = Language.J_MYDYDSY;
        return _this;
    }
    RoleWingGodConcumeAlert.prototype.show = function (handler) {
        if (handler === void 0) { handler = null; }
        if (handler)
            this._handler = handler;
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        this._selectItem = null;
        GameModels.role.getWingGodTransfromBagData();
        this.refreshItems();
    };
    RoleWingGodConcumeAlert.prototype.hide = function () {
        this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        this.clearList(this.list);
        if (this._handler) {
            this._handler.recover();
            this._handler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    RoleWingGodConcumeAlert.prototype.refreshItems = function () {
        var listData = GameModels.role.wingGodTransfromBagData;
        if (listData.length <= 0) {
            this.labNo.visible = true;
        }
        else {
            this.labNo.visible = false;
            if (!this._listData) {
                this._listData = new eui.ArrayCollection();
            }
            this._listData.source = listData;
            this.list.dataProvider = this._listData;
        }
    };
    RoleWingGodConcumeAlert.prototype.listHandler = function (e) {
        if (e.target instanceof renderer.RoleWingGodIconRenderer) {
            this._selectItem = this.list.selectedItem;
            GameModels.role.setTransfromBagDataSelect(this._selectItem);
            this.refreshItems();
        }
    };
    RoleWingGodConcumeAlert.prototype.onOkClick = function (e) {
        if (!this._selectItem) {
            if (!this.labNo.visible) {
                mg.alertManager.tip(Language.J_QXZXHSY);
                return;
            }
            else {
                this.dispatchEventWith(egret.Event.CLOSE);
            }
        }
        else {
            if (this._handler) {
                this._handler.runWith(this._selectItem.item);
            }
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    RoleWingGodConcumeAlert.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return RoleWingGodConcumeAlert;
}(ui.RoleWingGodConcumeAlertSkin));
__reflect(RoleWingGodConcumeAlert.prototype, "RoleWingGodConcumeAlert", ["IAlert", "egret.DisplayObject"]);
