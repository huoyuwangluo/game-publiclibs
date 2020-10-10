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
var RoleZhanQiWishAlert = (function (_super) {
    __extends(RoleZhanQiWishAlert, _super);
    function RoleZhanQiWishAlert() {
        return _super.call(this) || this;
    }
    RoleZhanQiWishAlert.prototype.initialize = function () {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    RoleZhanQiWishAlert.prototype.show = function (okHandler) {
        this._currVo = GameModels.hores.currVo;
        this._okHandler = okHandler;
        this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(Templates.getTemplateById(templates.Map.SYSRULE, 3701).des);
        this.labContent1.textFlow = utils.TextFlowMaker.generateTextFlow(Templates.getTemplateById(templates.Map.SYSRULE, 3702).des);
        if (this._okHandler)
            this._okHandler.once = true;
        if (this._currVo) {
            this.progressStarExp.maximum = this._currVo.templatesHores.wishes;
            this.progressStarExp.value = this._currVo.wishvalue;
            this.lab_zfz.text = this._currVo.wishvalue + "/" + this._currVo.templatesHores.wishes;
            if (this._currVo.wishvalue > 0) {
                utils.timer.clearAll(this);
                this._lefttime = this._currVo.resetime;
                if (this._lefttime > 0) {
                    this.startTime();
                }
                else {
                    this.timeOver();
                }
            }
        }
    };
    /**开始倒计时*/
    RoleZhanQiWishAlert.prototype.startTime = function () {
        this.showTime();
        this.updateTime();
    };
    /**倒计时结束 */
    RoleZhanQiWishAlert.prototype.timeOver = function () {
        utils.timer.clearAll(this);
        //this.lab_tip.text = Language.J_ZHZQL;
    };
    /**进行倒计时 */
    RoleZhanQiWishAlert.prototype.updateTime = function () {
        utils.timer.countdown(this._lefttime, this, this.showTime, this.timeOver);
    };
    /**显示倒计时*/
    RoleZhanQiWishAlert.prototype.showTime = function () {
        //this.lab_tip.text = Language.J_ZHZQLDJS + utils.DateUtil.formatTimeLeft(this._lefttime);
        this._lefttime--;
    };
    RoleZhanQiWishAlert.prototype.hide = function () {
        if (this._okHandler) {
            this._okHandler.recover();
            this._okHandler = null;
        }
        utils.timer.clearAll(this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    RoleZhanQiWishAlert.prototype.onClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return RoleZhanQiWishAlert;
}(ui.RoleZhanQiWishSkin));
__reflect(RoleZhanQiWishAlert.prototype, "RoleZhanQiWishAlert", ["IAlert", "egret.DisplayObject"]);
