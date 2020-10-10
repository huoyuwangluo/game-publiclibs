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
var TeamCopyStrategyAlert = (function (_super) {
    __extends(TeamCopyStrategyAlert, _super);
    function TeamCopyStrategyAlert() {
        return _super.call(this) || this;
    }
    TeamCopyStrategyAlert.prototype.show = function (copyVO) {
        this._copyVO = copyVO;
        this.labName.text = this._copyVO.template.name;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        var tmps = Templates.getTemplatesByProperty(templates.Map.OTHERMONSTERHELP, "chapterId", copyVO.template.id);
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(tmps);
        }
        else {
            this._listData.source = tmps;
        }
        this.list.dataProvider = this._listData;
    };
    TeamCopyStrategyAlert.prototype.hide = function () {
        this._copyVO = null;
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    TeamCopyStrategyAlert.prototype.closeHandler = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return TeamCopyStrategyAlert;
}(ui.TeamCopyStrategyAlertSkin));
__reflect(TeamCopyStrategyAlert.prototype, "TeamCopyStrategyAlert", ["IAlert", "egret.DisplayObject"]);
