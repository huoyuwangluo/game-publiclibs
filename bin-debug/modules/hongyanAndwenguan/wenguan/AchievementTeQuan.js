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
    var AchievementTeQuan = (function (_super) {
        __extends(AchievementTeQuan, _super);
        function AchievementTeQuan() {
            return _super.call(this) || this;
        }
        AchievementTeQuan.prototype.show = function () {
            var currTemp = GameModels.wenguanTask.curWenGuanTemplates;
            if (currTemp) {
                this.labTitle.text = currTemp.name + Language.C_TQ;
                this.labTeQuanDes.textFlow = utils.TextFlowMaker.generateTextFlow(currTemp.des);
            }
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        AchievementTeQuan.prototype.onClose = function (evt) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        AchievementTeQuan.prototype.hide = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AchievementTeQuan;
    }(ui.AchievementTeQuanSkin));
    achievement.AchievementTeQuan = AchievementTeQuan;
    __reflect(AchievementTeQuan.prototype, "achievement.AchievementTeQuan", ["IAlert", "egret.DisplayObject"]);
})(achievement || (achievement = {}));
