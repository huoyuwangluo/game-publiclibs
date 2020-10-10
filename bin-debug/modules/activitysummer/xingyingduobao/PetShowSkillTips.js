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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var PetShowSkillTips = (function (_super) {
            __extends(PetShowSkillTips, _super);
            function PetShowSkillTips() {
                return _super.call(this) || this;
            }
            PetShowSkillTips.prototype.show = function () {
                if (!this._animationPet) {
                    this._animationPet = new s.ActorAnimationGroup();
                    this.addChild(this._animationPet);
                }
                this._animationPet.direct = TypeDirection.DOWN;
                this._animationPet.addPart(TypePart.BODY);
                this._animationPet.setBodyResKey("2136" + "_" + "0300");
                this._animationPet.frameRate = 6;
                this._animationPet.x = 200;
                this._animationPet.y = 200;
                this._animationPet.play();
                this.createBossAnimation();
                this.createPetSkillEffect();
                if (this._effect) {
                    this._effect.stop();
                    this._effect.resId = "4056";
                    this._effect.play();
                }
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            PetShowSkillTips.prototype.createBossAnimation = function () {
                if (!this._animationBoss) {
                    this._animationBoss = new s.ActorAnimationGroup();
                    this.addChild(this._animationBoss);
                }
                this._animationBoss.direct = TypeDirection.LEFT_UP;
                this._animationBoss.addPart(TypePart.BODY);
                this._animationBoss.setBodyResKey("2011" + "_" + "0000");
                this._animationBoss.frameRate = 6;
                this._animationBoss.play();
                this._animationBoss.x = 400;
                this._animationBoss.y = 300;
            };
            PetShowSkillTips.prototype.createPetSkillEffect = function () {
                if (!this._effect) {
                    this._effect = utils.ObjectPool.from(s.AnimationSprite);
                    this._effect.y = 250;
                    this._effect.x = this.width * .5 + 100;
                    this._effect.frameRate = 6;
                    this._effect.scaleX = this._effect.scaleX = 0.8;
                    this.addChild(this._effect);
                }
            };
            PetShowSkillTips.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                if (this._animationPet) {
                    this._animationPet.removePart(TypePart.BODY);
                    this._animationPet = null;
                }
                if (this._animationBoss) {
                    this._animationBoss.removePart(TypePart.BODY);
                    this._animationBoss = null;
                }
                if (this._effect) {
                    this.removeEffectHandler(this._effect);
                    this._effect.scaleX = this._effect.scaleX = 1;
                    this._effect = null;
                }
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                // mg.alertManager.showAlert(view.activity.XingYingDuoBaoTips, true, true);
            };
            PetShowSkillTips.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
                // mg.alertManager.showAlert(view.activity.XingYingDuoBaoTips, true, true);
            };
            return PetShowSkillTips;
        }(ui.PetShowSkillTipsSkin));
        activity.PetShowSkillTips = PetShowSkillTips;
        __reflect(PetShowSkillTips.prototype, "view.activity.PetShowSkillTips", ["IAlert", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
