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
var item;
(function (item) {
    var MainPetSupport = (function (_super) {
        __extends(MainPetSupport, _super);
        function MainPetSupport() {
            var _this = _super.call(this) || this;
            _this.defaultY = 0;
            return _this;
        }
        MainPetSupport.prototype.initialize = function () {
            this.visible = false;
            this.y = 350;
            this.defaultY = this.y;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height * 0.75 >> 0;
        };
        MainPetSupport.prototype.showPetId = function (value) {
            var generaltmp = Templates.getTemplateById(templates.Map.GENERAL, value);
            var dataModel = Templates.getTemplateById(templates.Map.DATAMODEL, generaltmp.model);
            this.head.setGeneralHeadInfo(dataModel.resId, 0, true, generaltmp);
            this.petNameImg.source = ResPath.getPetName(dataModel.resId);
            this.visible = true;
            this.y = this.defaultY;
            this.scaleX = 3.0;
            this.scaleY = 3.0;
            this.alpha = 0.3;
            egret.Tween.get(this).wait(100).to({ alpha: 1 }, 200, utils.Ease.linearNone);
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 350, utils.Ease.backInOut);
            utils.timer.once(3000, this, this.hide);
        };
        MainPetSupport.prototype.hide = function () {
            egret.Tween.removeTweens(this);
            this.visible = false;
        };
        return MainPetSupport;
    }(ui.MainPetSupportSkin));
    item.MainPetSupport = MainPetSupport;
    __reflect(MainPetSupport.prototype, "item.MainPetSupport");
})(item || (item = {}));
