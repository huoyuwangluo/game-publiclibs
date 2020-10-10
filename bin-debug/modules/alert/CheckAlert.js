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
var CheckAlert = (function (_super) {
    __extends(CheckAlert, _super);
    function CheckAlert() {
        var _this = _super.call(this) || this;
        _this._bol = true;
        _this._okX = _this.btnOk.x;
        _this._cancalX = _this.btnCancel.x;
        return _this;
    }
    CheckAlert.prototype.initialize = function () {
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.boxChecked.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    CheckAlert.prototype.show = function (labContent, type, selectType, okHandler, cancelHandler, bol, data, isTextFlow, handlerClose, hideClose) {
        if (bol === void 0) { bol = true; }
        if (data === void 0) { data = null; }
        if (isTextFlow === void 0) { isTextFlow = false; }
        if (handlerClose === void 0) { handlerClose = true; }
        if (hideClose === void 0) { hideClose = true; }
        this._bol = bol;
        this.boxChecked.selected = this._bol;
        this._data = data;
        this._isTextFlow = isTextFlow;
        this._labContent = labContent;
        this._selectType = selectType;
        this._cancelHandler = cancelHandler;
        this._okHandler = okHandler;
        this._handlerClose = handlerClose;
        if (this._okHandler)
            this._okHandler.once = true;
        if (this._cancelHandler)
            this._cancelHandler.once = true;
        this.btnClose.visible = !hideClose;
        var label = TypeBtnLabel.getLabel(type);
        switch (type) {
            case TypeBtnLabel.OK_SIGIN:
            case TypeBtnLabel.GO:
            case TypeBtnLabel.I_KNOW:
                this.btnOk.label = label.ok;
                this.btnCancel.visible = false;
                this.btnOk.x = this.width / 2;
                break;
            default:
                this.btnOk.label = label.ok;
                this.btnCancel.label = label.cancel;
                this.btnCancel.visible = true;
                this.btnOk.x = this._okX;
                this.btnCancel.x = this._cancalX;
                break;
        }
        this.initData();
    };
    CheckAlert.prototype.hide = function () {
        this._data = null;
        if (this._cancelHandler) {
            this._cancelHandler.recover();
            this._cancelHandler = null;
        }
        if (this._okHandler) {
            this._okHandler.recover();
            this._okHandler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    CheckAlert.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btnOk:
                if (this.btnOk) {
                    TypeCheck.setCheckType(this._selectType, this._bol);
                    if (this._okHandler) {
                        this._okHandler.runWith(this._data);
                        this._okHandler = null;
                    }
                }
                if (this._handlerClose) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }
                return;
            case this.btnCancel:
                if (this._bol) {
                    GameModels.common.isSelected = true;
                    TypeCheck.setCheckType(this._selectType, this._bol);
                }
                if (this._cancelHandler) {
                    this._cancelHandler.run();
                    this._cancelHandler = null;
                }
                break;
            case this.boxChecked:
                this._bol = !this._bol;
                this.boxChecked.selected = this._bol;
                break;
        }
        if (e.currentTarget != this.boxChecked) {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    CheckAlert.prototype.initData = function () {
        if (this._isTextFlow == true) {
            this.labContent.textFlow = this._labContent;
        }
        else {
            this.labContent.text = this._labContent;
        }
    };
    return CheckAlert;
}(ui.CheckAlertSkin));
__reflect(CheckAlert.prototype, "CheckAlert", ["IAlert", "egret.DisplayObject"]);
