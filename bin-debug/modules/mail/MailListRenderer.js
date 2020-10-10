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
var MailListRenderer = (function (_super) {
    __extends(MailListRenderer, _super);
    function MailListRenderer() {
        return _super.call(this) || this;
    }
    MailListRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this._myData = this.data;
        this.listGroup.x = 0;
        if (this._myData) {
            this.labelSender.textFlow = utils.TextFlowMaker.generateTextFlow(this._myData.Title);
            this.labelData.text = this._myData.Time;
            this.currentState = this.setCurrenStateNum();
        }
    };
    MailListRenderer.prototype.setCurrenStateNum = function () {
        if (this._myData.IsRead == 0) {
            if (this._myData.Item)
                return "4";
            else
                return "2";
        }
        else {
            if (!this._myData.Item) {
                return "1";
            }
            else {
                this.imgBox.visible = true;
                if (this._myData.IsAttachment == 1) {
                    this.imgBox.visible = false;
                }
                return "3";
            }
        }
    };
    MailListRenderer.prototype.SetCurrentStateTo1 = function () {
        this.currentState = "1";
    };
    MailListRenderer.prototype.playDelAnimationAndCall = function (callBack) {
        if (callBack === void 0) { callBack = null; }
        egret.Tween.get(this.listGroup).to({ x: -620 }, 400).wait(50).call(function () {
            if (callBack)
                callBack.run();
        });
    };
    MailListRenderer.prototype.GetMailId = function () {
        return this._myData.MailId;
    };
    /**判断邮件是否带有物品 */
    MailListRenderer.prototype.JudgeIsAttachment = function () {
        if (this._myData.IsAttachment == 1)
            return true;
        return false;
    };
    MailListRenderer.prototype.JudgeIsRead = function () {
        if (this._myData.IsRead == 1)
            return true;
        return false;
    };
    return MailListRenderer;
}(ui.MailListSkin));
__reflect(MailListRenderer.prototype, "MailListRenderer");
