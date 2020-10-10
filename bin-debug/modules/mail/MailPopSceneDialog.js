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
var MailPopSceneDialog = (function (_super) {
    __extends(MailPopSceneDialog, _super);
    function MailPopSceneDialog() {
        return _super.call(this) || this;
    }
    MailPopSceneDialog.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        // Mediator.getMediator(this).onAdd(this, this.enter);
        // Mediator.getMediator(this).onRemove(this, this.exit);
    };
    MailPopSceneDialog.prototype.show = function (data) {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.btnDeleteFile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteMail, this);
        this.btnGetSigh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getSighAntThen, this);
        this.labelMailFile.addEventListener(egret.TextEvent.LINK, this.onLinkHandler, this);
        this.labelMailFile.type = egret.TextFieldType.DYNAMIC;
        this.panelAppendix.removeChildren();
        this.init(data);
    };
    MailPopSceneDialog.prototype.init = function (data) {
        if (data) {
            this._data = data;
            this.labelMailFile.textFlow = utils.TextFlowMaker.generateTextFlow(data.Content);
            GameModels.mail.mailEncosureItemData(data);
            var mail = GameModels.mail.getMail();
            var nums = mail.getMailsEncosures();
            if (nums.length > 0) {
                this.currentState = "GetSighFile";
                if (data.IsAttachment == 1) {
                    this.btnGetSigh.visible = false;
                    this.btnDeleteFile.visible = true;
                    this.getBox.visible = true;
                }
                else {
                    this.btnGetSigh.visible = true;
                    this.btnDeleteFile.visible = false;
                    this.getBox.visible = false;
                }
                this.setMailIcon();
            }
            else {
                this.currentState = "deleteFile";
                this.btnDeleteFile.visible = true;
            }
            // if (data.IsAttachment == 1) {
            // 	this.currentState = "GetSighFile";
            // 	this.btnGetSigh.visible = true;
            // 	this.btnDeleteFile.visible = false;
            // 	this.setMailIcon();
            // }
            // else {
            // 	this.currentState = "deleteFile";
            // 	this.btnDeleteFile.visible = true;
            // }
        }
    };
    MailPopSceneDialog.prototype.setMailIcon = function () {
        var mail = GameModels.mail.getMail();
        if (mail) {
            var source = mail.getMailTemplates();
            var length = source.length;
            var nums = mail.getMailsEncosures();
            this._mailIcon = [];
            for (var i = 0; i < length; i++) {
                this._mailIcon[i] = new treasure.TreasureIcon();
                this._mailIcon[i].updateItemData(nums[i].id, true, nums[i].count);
                this.panelAppendix.addChild(this._mailIcon[i]);
                this._mailIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (e.currentTarget.itemVo instanceof vo.EquipVO) {
                        mg.TipManager.instance.showTip(tips.EquipTip, e.currentTarget.itemVo);
                    }
                    else {
                        mg.TipManager.instance.showTip(tips.PropTip, e.currentTarget.itemVo);
                    }
                }, this);
            }
        }
    };
    MailPopSceneDialog.prototype.hide = function () {
        if (this._mailIcon) {
            for (var i = 0; i < this._mailIcon.length; i++) {
                this._mailIcon[i].reset();
            }
            this._mailIcon = null;
        }
        this.panelAppendix.removeChildren();
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.btnDeleteFile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteMail, this);
        this.btnGetSigh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getSighAntThen, this);
        this.labelMailFile.removeEventListener(egret.TextEvent.LINK, this.onLinkHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    MailPopSceneDialog.prototype.closePanel = function (e) {
        if (this._closeCallBack) {
            this._closeCallBack.run();
            this._closeCallBack = null;
        }
        // mg.uiManager.remove(this);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    MailPopSceneDialog.prototype.deleteMail = function () {
        var _this = this;
        GameModels.mail.regsterMailDelete(this._data.MailId, utils.Handler.create(this, function (data) {
            if (_this._deleteCallBack)
                _this._deleteCallBack.run();
            _this._deleteCallBack = null;
        }));
        // mg.uiManager.remove(this);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    MailPopSceneDialog.prototype.getSighAntThen = function (e) {
        var _this = this;
        if (utils.CheckUtil.checkBagSmelting())
            return;
        this.btnGetSigh.enabled = false;
        this.btnDeleteFile.enabled = false;
        GameModels.mail.regsterMailReceive(this._data.MailId, utils.Handler.create(this, function (data) {
            _this.btnGetSigh.enabled = true;
            _this.btnDeleteFile.enabled = true;
            if (data.Result == "1") {
                if (_this._mailIcon && _this._mailIcon.length > 0) {
                    _this.getMailProp();
                    // this.panelAppendix.removeChildren();
                    _this.getBox.visible = true;
                    _this.btnGetSigh.visible = false;
                    _this.btnDeleteFile.visible = true;
                }
                else {
                    _this.dispatchEventWith(egret.Event.CLOSE);
                    // mg.uiManager.remove(MailPopSceneDialog);
                }
            }
        }));
    };
    MailPopSceneDialog.prototype.getMailProp = function () {
        var mail = GameModels.mail.getMail();
        var nums = mail.getMailsEncosures();
        var strArr = [];
        for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
            var item = nums_1[_i];
            var str = item.id + "_" + item.count;
            strArr.push(str);
        }
        mg.TipUpManager.instance.showTip(tipUps.CommenGetRewardTips, strArr);
        // var endPos = (mg.uiManager.getView(main.MainUIView) as main.MainUIView).getBagPostion(true);
        // for (var i: number = 0; i < this._mailIcon.length; i++) {
        // 	this._mailIcon[i].playEffect(endPos, true, true);
        // }
    };
    MailPopSceneDialog.prototype.slignRandomImage = function (imgWight, step, numALL, num, intMiddle) {
        if (intMiddle === void 0) { intMiddle = 0; }
        if (numALL == 1)
            return numALL * (imgWight / 2) * -1 + intMiddle;
        return (2 * num - numALL - 2) * ((imgWight + step) / 2) + intMiddle + step / 2;
    };
    MailPopSceneDialog.prototype.onLinkHandler = function (evt) {
        mg.uiManager.showByName(parseInt(evt.text));
    };
    MailPopSceneDialog.prototype.closePanelCallBack = function (closeCallBack) {
        this._closeCallBack = closeCallBack;
    };
    MailPopSceneDialog.prototype.deleteMailCallBack = function (deleteCallBack) {
        this._deleteCallBack = deleteCallBack;
    };
    MailPopSceneDialog.prototype.commitProperties = function () {
        _super.prototype.commitProperties.call(this);
    };
    return MailPopSceneDialog;
}(ui.MailPopSceneSkin));
__reflect(MailPopSceneDialog.prototype, "MailPopSceneDialog", ["IAlert", "egret.DisplayObject"]);
