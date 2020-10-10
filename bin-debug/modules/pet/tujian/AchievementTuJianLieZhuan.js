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
var achievement;
(function (achievement) {
    var AchievementTuJianLieZhuan = (function (_super) {
        __extends(AchievementTuJianLieZhuan, _super);
        function AchievementTuJianLieZhuan() {
            return _super.call(this) || this;
        }
        AchievementTuJianLieZhuan.prototype.show = function (temp) {
            this.group.removeChildren();
            this._temp = temp;
            var general = Templates.getTemplateById(templates.Map.GENERAL, this._temp.templates.general);
            this.labName.text = general.name;
            var handBookBliog = Templates.getTemplateById(templates.Map.HANDBOOKBIOG, this._temp.templates.biogId1);
            this.labDes.text = "    " + handBookBliog.biogDes;
            // var len:number = handBookBliog.biogDes.length/15;
            // for (var i = 0; i < len; i++) {
            // 	var lab:eui.Label = new eui.Label();
            // 	lab.textColor = 0xA49679;
            // 	lab.lineSpacing = 8;
            // 	lab.size = 18;
            // 	lab.width = 18;
            // 	lab.height = 390;
            // 	lab.y = 0;
            // 	lab.x = 0 - i*25;
            // 	lab.text = handBookBliog.biogDes.substr(i*15,15);
            // 	this.group.addChild(lab);
            // 	this.group.horizontalCenter = 0;
            // }
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        AchievementTuJianLieZhuan.prototype.hide = function () {
            this.group.removeChildren();
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        AchievementTuJianLieZhuan.prototype.onClose = function () {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        return AchievementTuJianLieZhuan;
    }(ui.AchievementTuJianLieZhuanSkin));
    achievement.AchievementTuJianLieZhuan = AchievementTuJianLieZhuan;
    __reflect(AchievementTuJianLieZhuan.prototype, "achievement.AchievementTuJianLieZhuan", ["IAlert", "egret.DisplayObject"]);
})(achievement || (achievement = {}));
