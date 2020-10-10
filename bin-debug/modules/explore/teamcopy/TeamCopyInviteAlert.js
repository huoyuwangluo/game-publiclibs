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
var TeamCopyInviteAlert = (function (_super) {
    __extends(TeamCopyInviteAlert, _super);
    function TeamCopyInviteAlert() {
        return _super.call(this) || this;
    }
    TeamCopyInviteAlert.prototype.show = function (copyVO) {
        this._copyVO = copyVO;
        this.labContent.text = Language.getExpression(Language.E_WKQL1FB, this._copyVO.template.name);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnLegion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnWorld.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    TeamCopyInviteAlert.prototype.hide = function () {
        this._copyVO = null;
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnLegion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnWorld.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    TeamCopyInviteAlert.prototype.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btnBack:
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnLegion:
                GameModels.copyMaterial.sendTeamInvite(2, utils.Handler.create(this, this.endView));
                break;
            case this.btnWorld:
                GameModels.copyMaterial.sendTeamInvite(1, utils.Handler.create(this, this.endView));
                break;
        }
    };
    TeamCopyInviteAlert.prototype.endView = function () {
        mg.alertManager.tip(Language.J_FSCG);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return TeamCopyInviteAlert;
}(ui.TeamCopyInviteAlertSkin));
__reflect(TeamCopyInviteAlert.prototype, "TeamCopyInviteAlert", ["IAlert", "egret.DisplayObject"]);
