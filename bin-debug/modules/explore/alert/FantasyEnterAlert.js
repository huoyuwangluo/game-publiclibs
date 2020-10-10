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
var FantasyEnterAlert = (function (_super) {
    __extends(FantasyEnterAlert, _super);
    function FantasyEnterAlert() {
        var _this = _super.call(this) || this;
        _this._props = [_this.box1, _this.box2, _this.box3, _this.box4];
        return _this;
    }
    FantasyEnterAlert.prototype.show = function (copyVO) {
        this._copyVO = copyVO;
        this.labName.text = this._copyVO.template.name;
        var rewards = this._copyVO.template.dropShow.split(";");
        for (var i = 0; i < 4; i++) {
            this._props[i].dataSource = rewards[i] ? rewards[i] : null;
        }
        var data = GameModels.dataSet.getDataSettingById(611001);
        var str = data.value.split("_");
        this.labPrice.text = str[1];
        this.imgItem.source = Templates.getTemplateById(templates.Map.ITEM, ConfigData.ITEM_HUANJIE_JINDI).icon;
        this.labItem.text = GameModels.bag.getItemCountById(ConfigData.ITEM_HUANJIE_JINDI) + "/1";
        this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    FantasyEnterAlert.prototype.hide = function () {
        this._copyVO = null;
        this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    FantasyEnterAlert.prototype.closeHandler = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    FantasyEnterAlert.prototype.onEnterClick = function (e) {
        if (GameModels.copyBoss.dongWuZhengBaBossCount > 0) {
            //app.gameContext.enterBossFantasy(this._copyVO);
            this.dispatchEventWith(egret.Event.CLOSE);
        }
        else {
            mg.alertManager.tip(Language.J_TZCSYDSX, 0xff0000);
        }
    };
    return FantasyEnterAlert;
}(ui.FantasyEnterSkin));
__reflect(FantasyEnterAlert.prototype, "FantasyEnterAlert", ["IAlert", "egret.DisplayObject"]);
