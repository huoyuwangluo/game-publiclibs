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
        var XingYingDuoBaoTips = (function (_super) {
            __extends(XingYingDuoBaoTips, _super);
            function XingYingDuoBaoTips() {
                return _super.call(this) || this;
            }
            XingYingDuoBaoTips.prototype.show = function (isAuto) {
                // this._isAuto = isAuto;
                // var skill1: templates.skill = Templates.getTemplateById(templates.Map.SKILL, 2701);
                // if (skill1) {
                // 	this.icon1.source = skill1.icon;
                // 	this.labName1.text = skill1.name;
                // 	this.labDes1.textFlow = utils.TextFlowMaker.generateTextFlow(skill1.Desc);
                // }
                if (isAuto === void 0) { isAuto = true; }
                // var skill2: templates.skill = Templates.getTemplateById(templates.Map.SKILL, 6801);
                // if (skill2) {
                // 	this.icon2.source = skill2.icon;
                // 	this.labName2.text = skill2.name;
                // 	this.labDes2.textFlow = utils.TextFlowMaker.generateTextFlow(skill2.Desc);
                // }
                // this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                // this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoClick, this);
                // this.btnShowSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowSkillClick, this);
                // this.addModelEffect();
                // this.tweenBossShadowHandler();
            };
            XingYingDuoBaoTips.prototype.tweenBossShadowHandler = function () {
                this.btnShowSkill0.scaleX = this.btnShowSkill0.scaleY = 1;
                this.btnShowSkill0.alpha = 1;
                egret.Tween.get(this.btnShowSkill0).to({ scaleX: 1.4, scaleY: 1.4, alpha: 0 }, 1000, utils.Ease.circOut).call(this.tweenBossShadowHandler, this);
            };
            XingYingDuoBaoTips.prototype.addModelEffect = function () {
                if (!this._effect) {
                    this._effect = this.fromEffect("2136");
                }
                this._effect.resId = "2136";
                this._effect.x = this.width / 2;
                this._effect.y = this.height / 2 + 50;
                this._effect.frameRate = 6;
                this.addChild(this._effect);
                this._effect.touchEnabled = false;
                this._effect.play();
                this.addChildAt(this.imgbg, this.getChildIndex(this._effect) + 1);
                this.addChildAt(this.imgBg, this.getChildIndex(this._effect) + 1);
            };
            XingYingDuoBaoTips.prototype.onGoClick = function () {
                if (this._isAuto) {
                    GameModels.activitySummer.goGetPetView();
                }
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            XingYingDuoBaoTips.prototype.hide = function () {
                egret.Tween.removeTweens(this.btnShowSkill0);
                if (this._effect)
                    this.removeEffectHandler(this._effect);
                this._effect = null;
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoClick, this);
                this.btnShowSkill.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowSkillClick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            XingYingDuoBaoTips.prototype.onShowSkillClick = function (e) {
                mg.alertManager.showAlert(view.activity.PetShowSkillTips, true, true);
            };
            XingYingDuoBaoTips.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            return XingYingDuoBaoTips;
        }(ui.XingYingDuoBaoTipsSkin));
        activity.XingYingDuoBaoTips = XingYingDuoBaoTips;
        __reflect(XingYingDuoBaoTips.prototype, "view.activity.XingYingDuoBaoTips", ["IAlert", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
