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
    var AchievementShengZhiTip = (function (_super) {
        __extends(AchievementShengZhiTip, _super);
        function AchievementShengZhiTip() {
            return _super.call(this) || this;
        }
        AchievementShengZhiTip.prototype.show = function (temp, isUpgrade) {
            this._temp = temp;
            this.bg.mask = this.imgMask;
            this.imgMask.width = 0;
            this.imgLeft.x = 293;
            this.imgRight.x = 293;
            this._isUpgrade = isUpgrade;
            mg.soundManager.playSoundStopLast("WenGuan_LZ", 1, true);
            this.labStep.text = "";
            this.img_girl.source = "img_stepGril_" + temp.step + "_png"; //"img_wenguan_zhi_" + temp.step + "_png";
            this.img_girl.visible = false;
            this.imgZhang.visible = false;
            this.btnLingqu.visible = false;
            this.img_girl.x = 400;
            egret.Tween.get(this.imgLeft).to({ x: 48 }, 1000);
            egret.Tween.get(this.imgRight).to({ x: 538 }, 1000);
            egret.Tween.get(this.imgMask).to({ width: this.bg.width }, 1000).call(this.updataView, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnLingqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        AchievementShengZhiTip.prototype.updataView = function () {
            this.setContentText(this._temp.name);
            this.imgZhang.visible = true;
            this.imgZhang.scaleX = this.imgZhang.scaleY = 3;
            egret.Tween.removeTweens(this.imgZhang);
            egret.Tween.get(this.imgZhang).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.backOut);
            this.img_girl.visible = true;
            egret.Tween.removeTweens(this.img_girl);
            egret.Tween.get(this.img_girl).to({ x: 300 }, 500, utils.Ease.backOut).call(this.playEffectCall, this);
        };
        AchievementShengZhiTip.prototype.playEffectCall = function () {
            this.btnLingqu.visible = true;
        };
        AchievementShengZhiTip.prototype.setContentText = function (name) {
            this._content = name;
            this._contentLen = name.length;
            this._curLen = 0;
            utils.timer.loop(200, this, this.updataContentText, true);
        };
        AchievementShengZhiTip.prototype.updataContentText = function () {
            this._curLen += 1;
            if (this._curLen >= this._contentLen) {
                this.labStep.text = this._content;
                utils.timer.clear(this, this.updataContentText);
            }
            else {
                this.labStep.text = this._content.substr(0, this._curLen);
            }
        };
        AchievementShengZhiTip.prototype.hide = function () {
            utils.timer.clear(this, this.updataContentText);
            egret.Tween.removeTweens(this.imgZhang);
            egret.Tween.removeTweens(this.imgLeft);
            egret.Tween.removeTweens(this.imgRight);
            egret.Tween.removeTweens(this.imgMask);
            egret.Tween.removeTweens(this.img_girl);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnLingqu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            var currTemps = GameModels.wenguanTask.curWenGuanTemplates;
            if (platform.sdk && platform.sdk.type == "wx") {
                if (currTemps && currTemps.id == 103) {
                    mg.uiManager.show(animal.AnimalShare);
                }
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        AchievementShengZhiTip.prototype.onClose = function () {
            this.dispatchEventWith(egret.Event.CLOSE);
            // mg.uiManager.show(achievement.AchievementWenGuanDialog);
            // if (this._isUpgrade) {
            // 	mg.alertManager.showAlert(achievement.AchievementTeQuan, true, true);
            // }
        };
        return AchievementShengZhiTip;
    }(ui.AchievementShengZhiTipSkin));
    achievement.AchievementShengZhiTip = AchievementShengZhiTip;
    __reflect(AchievementShengZhiTip.prototype, "achievement.AchievementShengZhiTip", ["IAlert", "egret.DisplayObject"]);
})(achievement || (achievement = {}));
