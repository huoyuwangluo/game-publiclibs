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
var MailSceneDialog = (function (_super) {
    __extends(MailSceneDialog, _super);
    function MailSceneDialog() {
        return _super.call(this) || this;
    }
    MailSceneDialog.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    MailSceneDialog.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameModels.state.registerWarnTarget(GameRedState.MAIL_ONEGET, this.btnOneGet);
    };
    MailSceneDialog.prototype.enter = function (data) {
        this._rewardStr = "";
        this.listMail.dataProvider = this._listData = new eui.ArrayCollection();
        this.registerDate();
        this.listMail.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.registerPopOpenAndshow, this);
        this.btnOneGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onceGet, this);
        this.btnOneDelete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onceDelete, this);
    };
    MailSceneDialog.prototype.exit = function () {
        this._rewardStr = "";
        this.listMail.dataProvider = this._listData = null;
        this.listMail.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.registerPopOpenAndshow, this);
        this.btnOneGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onceGet, this);
        this.btnOneDelete.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onceDelete, this);
        this.clearData();
    };
    MailSceneDialog.prototype.registerDate = function () {
        this.updataData();
        if (this.scrMail.verticalScrollBar) {
            this.scrMail.verticalScrollBar.autoVisibility = false;
            this.scrMail.verticalScrollBar.visible = false;
        }
    };
    MailSceneDialog.prototype.clearData = function () {
        if (this._arrData) {
            this._arrData.reset();
            n.MessagePool.to(this._arrData);
            this._arrData = null;
        }
    };
    MailSceneDialog.prototype.registerPopOpenAndshow = function (e) {
        this._targetItem = e.itemRenderer;
        mg.alertManager.showAlert(MailPopSceneDialog, false, true, this._targetItem.data);
        var mailPopSceneAlert = mg.alertManager.getInstance(MailPopSceneDialog);
        mailPopSceneAlert.closePanelCallBack(utils.Handler.create(this, this.registerAdmisDataIsRead));
        mailPopSceneAlert.deleteMailCallBack(utils.Handler.create(this, this.deleteMail));
        // mg.uiManager.show(MailPopSceneDialog, this._targetItem.data);
        //(mg.uiManager.getView(MailPopSceneDialog) as MailPopSceneDialog).closePanelCallBack(utils.Handler.create(this, this.registerAdmisDataIsRead));
        //(mg.uiManager.getView(MailPopSceneDialog) as MailPopSceneDialog).deleteMailCallBack(utils.Handler.create(this, this.deleteMail));
    };
    MailSceneDialog.prototype.updataData = function () {
        var _this = this;
        this.btnOneDelete.enabled = false;
        this.btnOneGet.enabled = false;
        this.listMail.touchChildren = false;
        GameModels.mail.getMailList(utils.Handler.create(this, function (data) {
            data.autoRecover = false;
            _this.clearData();
            _this._arrData = data;
            if (data.Mails.length) {
                _this.scrMail.visible = true;
                if (_this._listData)
                    _this._listData.source = data.Mails;
                _this.labTipNoMail.visible = false;
                _this.imgNo.visible = false;
            }
            else {
                _this.scrMail.visible = false;
                _this.labTipNoMail.visible = true;
                _this.imgNo.visible = true;
            }
            _this.mailCount.text = data.Mails.length.toString();
            if (data.Mails.length >= 0.8 * MailSceneDialog._mailMaxCount)
                _this.mailCount.textColor = 0xb6281a;
            else if (data.Mails.length >= 0.6 * MailSceneDialog._mailMaxCount)
                _this.mailCount.textColor = 0xedc839;
            else
                _this.mailCount.textColor = 0x34e22c;
            _this.listMail.touchChildren = true;
            _this.btnOneDelete.enabled = true;
            _this.btnOneGet.enabled = true;
        }));
    };
    MailSceneDialog.prototype.onceGet = function (e) {
        this._rewardStr = "";
        var count = 0;
        if (utils.CheckUtil.checkBagSmelting())
            return;
        for (var i = 0; i < this._arrData.Mails.length; i++) {
            if (!this._arrData.Mails[i].IsRead || (this._arrData.Mails[i].Item && !this._arrData.Mails[i].IsAttachment)) {
                this.receiveAllMailReward();
                for (var _i = 0, _a = this._arrData.Mails; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (count < 10 && item.IsAttachment != 1) {
                        if (!this._rewardStr) {
                            this._rewardStr = item.Item;
                        }
                        else {
                            this._rewardStr = this._rewardStr + ";" + item.Item;
                        }
                        count++;
                    }
                }
                if (this._rewardStr) {
                    this.getRewardCallback();
                }
                return;
            }
        }
        mg.alertManager.tip(Language.J_MYJLKL);
    };
    MailSceneDialog.prototype.getRewardCallback = function () {
        var rewards = this._rewardStr.split(";");
        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
    };
    MailSceneDialog.prototype.receiveAllMailReward = function () {
        var _this = this;
        this.listMail.touchChildren = false;
        this.btnOneGet.enabled = false;
        this.btnOneDelete.enabled = false;
        GameModels.mail.regsterMailReceive("", utils.Handler.create(this, function (data) {
            _this.updataData();
        }));
    };
    MailSceneDialog.prototype.onceDelete = function (e) {
        var _this = this;
        for (var i = 0; i < this._arrData.Mails.length; i++) {
            if ((!this._arrData.Mails[i].Item && this._arrData.Mails[i].IsRead) || (this._arrData.Mails[i].Item && this._arrData.Mails[i].IsAttachment)) {
                mg.alertManager.showAlert(PromptAlert, false, true, Language.J_SFSCSYYJ + "\n(" + Language.J_BSCYFJXH + ")", TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                    _this.deleteAllMail();
                }));
                return;
            }
        }
        mg.alertManager.tip(Language.J_DQMYJKSC);
    };
    MailSceneDialog.prototype.deleteAllMail = function () {
        var _this = this;
        var mailRender;
        var deleteMailRenders = [];
        this.btnOneDelete.enabled = false;
        this.btnOneGet.enabled = false;
        this.listMail.touchChildren = false;
        GameModels.mail.regsterMailDelete("", utils.Handler.create(this, function (data) {
            var length = _this.listMail.numChildren;
            for (var i = 0; i < length; i++) {
                mailRender = _this.listMail.getChildAt(i);
                if (mailRender) {
                    if (!mailRender.JudgeIsAttachment() && mailRender.JudgeIsRead())
                        deleteMailRenders.push(mailRender);
                }
            }
            var lastIndex = deleteMailRenders.length - 1;
            if (lastIndex < 0) {
                mg.uiManager.remove(_this);
                return;
            }
            for (var i = 0; i < deleteMailRenders.length; i++) {
                if (i == lastIndex) {
                    deleteMailRenders[i].playDelAnimationAndCall(utils.Handler.create(_this, function () {
                        //this.updataData();
                        mg.uiManager.remove(_this);
                    }));
                }
                else
                    deleteMailRenders[i].playDelAnimationAndCall();
            }
        }));
    };
    MailSceneDialog.prototype.registerAdmisDataIsRead = function () {
        var _this = this;
        this.btnOneDelete.enabled = false;
        this.btnOneGet.enabled = false;
        this.listMail.touchChildren = false;
        GameModels.mail.regsterMailRead(this._targetItem.data.MailId, utils.Handler.create(this, function () {
            _this.updataData();
        }));
    };
    MailSceneDialog.prototype.deleteMail = function () {
        var _this = this;
        this.btnOneDelete.enabled = false;
        this.btnOneGet.enabled = false;
        this.listMail.touchChildren = false;
        this._targetItem.SetCurrentStateTo1();
        this._targetItem.playDelAnimationAndCall(utils.Handler.create(this, function () {
            _this.updataData();
        }));
    };
    MailSceneDialog._mailMaxCount = 50;
    return MailSceneDialog;
}(ui.MailSceneSkin));
__reflect(MailSceneDialog.prototype, "MailSceneDialog", ["IModuleView", "egret.DisplayObject"]);
