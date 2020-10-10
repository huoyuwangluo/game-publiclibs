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
var LegionChangeName = (function (_super) {
    __extends(LegionChangeName, _super);
    function LegionChangeName() {
        return _super.call(this) || this;
    }
    LegionChangeName.prototype.show = function () {
        this.input.text = GameModels.legion.unionName;
        var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.ITEM_LEGION_CHANGE_NAME);
        this.imgItem.source = item.icon;
        this.labItemCount.text = GameModels.bag.getItemCountById(ConfigData.ITEM_LEGION_CHANGE_NAME) + "/" + 1;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
        this.input.addEventListener(egret.FocusEvent.FOCUS_IN, this.OnCharactorFocusIn, this);
    };
    LegionChangeName.prototype.OnCharactorFocusIn = function (event) {
        this.input.text = "";
    };
    LegionChangeName.prototype.onCloseClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    LegionChangeName.prototype.onSureClick = function (e) {
        if (this.input.text == GameModels.legion.unionName) {
            mg.alertManager.tip(Language.J_QGHMZ, 0xff0000);
            return;
        }
        if (this.input.text == "") {
            mg.alertManager.tip(Language.J_SRNRBNWK, 0xff0000);
            return;
        }
        if (GameModels.login.hasSensitives(this.input.text)) {
            mg.alertManager.tip(Language.J_MCHYFFZF, 0xff0000);
            return;
        }
    };
    LegionChangeName.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
        this.input.removeEventListener(egret.FocusEvent.FOCUS_IN, this.OnCharactorFocusIn, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return LegionChangeName;
}(ui.LegionChangeNameSkin));
__reflect(LegionChangeName.prototype, "LegionChangeName", ["IAlert", "egret.DisplayObject"]);
