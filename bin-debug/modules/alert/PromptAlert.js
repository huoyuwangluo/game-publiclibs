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
var PromptAlert = (function (_super) {
    __extends(PromptAlert, _super);
    function PromptAlert() {
        var _this = _super.call(this) || this;
        _this._okX = _this.btnOk.x;
        _this._cancalX = _this.btnCancel.x;
        return _this;
    }
    PromptAlert.prototype.initialize = function () {
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.labPetHuWei.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    /**文本信息，按钮类型，左边按钮回调，右边按钮回调，数据源，是否富文本*/
    PromptAlert.prototype.show = function (labContent, type, cancelHandler, okHandler, data, isTextFlow, handlerClose, hideClose, labShow, labShowText) {
        if (data === void 0) { data = null; }
        if (isTextFlow === void 0) { isTextFlow = false; }
        if (handlerClose === void 0) { handlerClose = true; }
        if (hideClose === void 0) { hideClose = true; }
        if (labShow === void 0) { labShow = false; }
        if (labShowText === void 0) { labShowText = ""; }
        this._data = data;
        this._isTextFlow = isTextFlow;
        this._labContent = labContent;
        this._cancelHandler = cancelHandler;
        this._okHandler = okHandler;
        this._handlerClose = handlerClose;
        if (this._okHandler)
            this._okHandler.once = true;
        if (this._cancelHandler)
            this._cancelHandler.once = true;
        this.btnClose.visible = !hideClose;
        this.labPetHuWei.visible = labShow;
        this.labPetHuWei.text = labShowText;
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
    PromptAlert.prototype.hide = function () {
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
    PromptAlert.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btnOk:
                if (this.btnOk) {
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
                if (this._cancelHandler) {
                    this._cancelHandler.run();
                    this._cancelHandler = null;
                }
                break;
            case this.labPetHuWei:
                mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: 2, param: 1, param1: 1 });
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PromptAlert.prototype.initData = function () {
        if (this._isTextFlow == true) {
            this.labContent.textFlow = utils.TextFlowMaker.htmlParser(this._labContent);
        }
        else {
            this.labContent.text = this._labContent;
        }
    };
    return PromptAlert;
}(ui.CommonAlertSkin));
__reflect(PromptAlert.prototype, "PromptAlert", ["IAlert", "egret.DisplayObject"]);
