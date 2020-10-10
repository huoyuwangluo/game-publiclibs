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
var main;
(function (main) {
    var MainCountryWarAdvanceNotice = (function (_super) {
        __extends(MainCountryWarAdvanceNotice, _super);
        function MainCountryWarAdvanceNotice() {
            return _super.call(this) || this;
        }
        MainCountryWarAdvanceNotice.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
        };
        MainCountryWarAdvanceNotice.prototype.enter = function (data) {
            this.btnHome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
        };
        MainCountryWarAdvanceNotice.prototype.onBtnUpgrade = function (evt) {
            if (evt.currentTarget == this.btnClose) {
                mg.uiManager.remove(this);
            }
            else {
                if (app.gameContext.typeGame == TypeGame.BEGIN) {
                    mg.alertManager.tip(Language.J_QWCXSRW);
                    return;
                }
                app.gameContext.enterCity();
            }
        };
        MainCountryWarAdvanceNotice.prototype.exit = function () {
            this.btnHome.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
        };
        return MainCountryWarAdvanceNotice;
    }(ui.MainCountryWarAdvanceNoticeSkin));
    main.MainCountryWarAdvanceNotice = MainCountryWarAdvanceNotice;
    __reflect(MainCountryWarAdvanceNotice.prototype, "main.MainCountryWarAdvanceNotice");
})(main || (main = {}));
