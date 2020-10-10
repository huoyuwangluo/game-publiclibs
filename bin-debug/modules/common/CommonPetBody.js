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
var components;
(function (components) {
    var CommonPetBody = (function (_super) {
        __extends(CommonPetBody, _super);
        function CommonPetBody() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CommonPetBody.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.touchEnabled = false;
            this.touchChildren = false;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
        };
        CommonPetBody.prototype.setPetBody = function (bodyId, isHiheName, isHideLight, isHideCountry) {
            if (isHiheName === void 0) { isHiheName = false; }
            if (isHideLight === void 0) { isHideLight = true; }
            if (isHideCountry === void 0) { isHideCountry = false; }
            if (bodyId == "1101")
                isHiheName = true;
            if (isHiheName) {
                this.imgName.visible = false;
            }
            else {
                this.imgName.visible = true;
                this.imgName.source = bodyId ? ResPath.getPetName(bodyId) : null;
            }
            var petTmp = Templates.getTemplateByProperty(templates.Map.GENERAL, "model", bodyId);
            if (isHideCountry) {
                this.imgCountry.visible = true;
                this.imgCountry.source = petTmp && petTmp.country ? "smokePet_json.img_smokePet_icon_" + petTmp.country : null;
            }
            else {
                this.imgCountry.visible = false;
            }
            var resPath = bodyId ? ResPath.getShowPetPath(bodyId) : null;
            this.imgBody.source = resPath;
            this.startMovie(false);
            this.imgLight.visible = false;
            if (petTmp && petTmp.godDevil > 0) {
                if (isHideLight) {
                    this.imgLight.visible = true;
                    this.imgLight.source = petTmp.godDevil == 2 ? "img_chapaterMap_light1_png" : "img_chapaterMap_light_png";
                }
            }
        };
        CommonPetBody.prototype.startMovie = function (loop) {
            if (loop === void 0) { loop = false; }
            this.imgBody0.source = this.imgBody.source;
            this.movieHandler(loop);
        };
        CommonPetBody.prototype.movieHandler = function (loop) {
            egret.Tween.removeTweens(this.imgBody0);
            this.imgBody0.alpha = 0.5;
            this.imgBody0.scaleX = this.imgBody0.scaleY = 1.0;
            var scale = 1.25;
            var time = 800;
            if (loop) {
                egret.Tween.get(this.imgBody0).to({ scaleX: scale, scaleY: scale, alpha: 0 }, time, utils.Ease.quadOut).wait(3000).call(this.movieHandler, this, [loop]);
            }
            else {
                egret.Tween.get(this.imgBody0).to({ scaleX: scale, scaleY: scale, alpha: 0 }, time, utils.Ease.quadOut);
            }
        };
        CommonPetBody.prototype.removedFromStage = function (e) {
            egret.Tween.removeTweens(this.imgBody0);
            this.imgBody0.source = null;
        };
        CommonPetBody.prototype.reset = function () {
            egret.Tween.removeTweens(this.imgBody0);
            this.imgName.source = null;
            this.imgBody.source = null;
            this.imgBody0.source = null;
        };
        return CommonPetBody;
    }(ui.CommonPetBodySkin));
    components.CommonPetBody = CommonPetBody;
    __reflect(CommonPetBody.prototype, "components.CommonPetBody");
})(components || (components = {}));
