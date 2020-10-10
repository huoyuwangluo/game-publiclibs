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
var GetTitle = (function (_super) {
    __extends(GetTitle, _super);
    function GetTitle() {
        return _super.call(this) || this;
    }
    GetTitle.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    GetTitle.prototype.enter = function (titleId) {
        var _this = this;
        this._titleId = titleId;
        this.showViewTitle();
        utils.timer.once(500, this, function () {
            _this.btnUpZhen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.btnToTitleView, _this);
        });
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.gpTitle.scaleX = this.gpTitle.scaleY = this.gpTitle.alpha = 0;
        egret.Tween.get(this.gpTitle).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut);
    };
    GetTitle.prototype.exit = function () {
        utils.timer.clearAll(this);
        egret.Tween.removeTweens(this.gpTitle);
        this.btnUpZhen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnToTitleView, this);
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.imgTitle.source = null;
    };
    GetTitle.prototype.showViewTitle = function () {
        var temp = Templates.getTemplateById(templates.Map.GAMEFASHION, this._titleId);
        this._typeFashion = temp.type;
        this._modelId = temp.modelId;
        var propertyData = {};
        var args = temp.properties.split(";");
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var str = args_1[_i];
            var p = str.split("_");
            propertyData[p[0]] = p[1];
        }
        this.labValue.textFlow = utils.htmlUtil.getBashProperty(propertyData);
        this.imgTitle.source = ResPath.getShowTitlePath(this._modelId);
    };
    GetTitle.prototype.btnToTitleView = function (e) {
        // GameModels.fashion.isGuide = true;
        // GameModels.fashion.guideId = this._modelId;
        // mg.uiManager.show(dialog.fashion.FashionMainDialog);
        GameModels.fashion.net_requestTitleDress(parseInt(this._titleId));
        mg.uiManager.remove(this);
    };
    GetTitle.prototype.onClose = function (e) {
        mg.uiManager.remove(this);
    };
    return GetTitle;
}(ui.GetTitleSkin));
__reflect(GetTitle.prototype, "GetTitle");
