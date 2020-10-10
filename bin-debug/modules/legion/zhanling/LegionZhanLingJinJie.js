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
var LegionZhanLingJinJie = (function (_super) {
    __extends(LegionZhanLingJinJie, _super);
    function LegionZhanLingJinJie() {
        var _this = _super.call(this) || this;
        _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
        return _this;
    }
    LegionZhanLingJinJie.prototype.show = function () {
        var dataSeting = GameModels.dataSet.getDataSettingValueById(740001);
        var data = dataSeting.split(";");
        for (var i = 0; i < 3; i++) {
            var iconBox = this._rwards[i];
            iconBox.labName.stroke = 1;
            if (i < data.length) {
                iconBox.dataSource = data[i];
                this.boxGroup.addChild(iconBox);
            }
            else {
                if (iconBox.parent) {
                    iconBox.parent.removeChild(iconBox);
                }
            }
        }
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btn98.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        GameModels.zhanling.addEventListener(mo.ModelZhanLing.ZHANLING_CHANGE, this.showView, this);
    };
    LegionZhanLingJinJie.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btn98.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        GameModels.zhanling.removeEventListener(mo.ModelZhanLing.ZHANLING_CHANGE, this.showView, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    LegionZhanLingJinJie.prototype.onBtnClick = function (e) {
        // if (e.currentTarget == this.btn38) {
        // 	var temRecharge: templates.gameRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, 701);
        // 	GameModels.platform.buy(temRecharge.RMB, 1, "" + temRecharge.id, temRecharge.name, temRecharge.des);
        // }
        // else {
        // 	var temRecharge: templates.gameRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, 702);
        // 	GameModels.platform.buy(temRecharge.RMB, 1, "" + temRecharge.id, temRecharge.name, temRecharge.des);
        // }
        var temRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, 703);
        GameModels.platform.buy(temRecharge.RMB, 1, "" + temRecharge.id, temRecharge.name, temRecharge.des);
    };
    LegionZhanLingJinJie.prototype.showView = function () {
        if (GameModels.zhanling.stepOpen > 0) {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    LegionZhanLingJinJie.prototype.btnCloseClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return LegionZhanLingJinJie;
}(ui.LegionZhanLingJinJieSkin));
__reflect(LegionZhanLingJinJie.prototype, "LegionZhanLingJinJie", ["IAlert", "egret.DisplayObject"]);
