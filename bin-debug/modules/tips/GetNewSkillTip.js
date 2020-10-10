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
var tips;
(function (tips) {
    var GetNewSkillAlert = (function (_super) {
        __extends(GetNewSkillAlert, _super);
        function GetNewSkillAlert() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GetNewSkillAlert, "instance", {
            get: function () {
                if (!GetNewSkillAlert._instance) {
                    GetNewSkillAlert._instance = new GetNewSkillAlert();
                    GetNewSkillAlert._instance.touchEnabled = GetNewSkillAlert._instance.touchChildren = false;
                    GetNewSkillAlert._instance.flyImg = new eui.Image();
                }
                return GetNewSkillAlert._instance;
            },
            enumerable: true,
            configurable: true
        });
        GetNewSkillAlert.prototype.show = function (skill) {
            this.anchorOffsetX = 255;
            this.anchorOffsetY = 84;
            this.labName.text = skill.template.name;
            this.imgSkill.source = skill.template.icon;
            mg.layerManager.tip.addChild(this);
            this.x = mg.stageManager.stageWidth * .5;
            this.y = mg.stageManager.stageHeight - 400;
            this.scaleX = this.scaleY = 1.4;
            this.alpha = .5;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, utils.Ease.quadInOut).wait(1000).call(function () {
                this.hide();
            }, this);
        };
        GetNewSkillAlert.prototype.hide = function () {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ alpha: 0, }, 300, utils.Ease.cubicIn).call(function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            });
            var img = this.flyImg;
            img.source = this.imgSkill.source;
            mg.layerManager.top.addChild(this.flyImg);
            var point = this.imgSkill.localToGlobal(0, 0);
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            img.x = point.x + img.width / 2;
            img.y = point.y + img.height / 2;
            var rolePosition = mg.uiManager.getView(main.MainUIView).getRolePostion(true);
            egret.Tween.get(img).to({ x: rolePosition.x, y: rolePosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img]);
        };
        GetNewSkillAlert.prototype.flyOverHandler = function (img) {
            if (img.parent) {
                img.parent.removeChild(img);
                img.scaleX = img.scaleY = 1;
            }
            this.imgSkill.source = null;
        };
        return GetNewSkillAlert;
    }(ui.GetNewSkillTipSkin));
    tips.GetNewSkillAlert = GetNewSkillAlert;
    __reflect(GetNewSkillAlert.prototype, "tips.GetNewSkillAlert");
})(tips || (tips = {}));
