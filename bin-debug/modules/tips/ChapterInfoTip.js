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
    var ChapterInfoTip = (function (_super) {
        __extends(ChapterInfoTip, _super);
        function ChapterInfoTip() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ChapterInfoTip, "instance", {
            get: function () {
                if (!ChapterInfoTip._instance) {
                    ChapterInfoTip._instance = new ChapterInfoTip();
                    ChapterInfoTip._instance.touchEnabled = ChapterInfoTip._instance.touchChildren = false;
                }
                return ChapterInfoTip._instance;
            },
            enumerable: true,
            configurable: true
        });
        ChapterInfoTip.prototype.show = function (oldRank, curRank, isLevel) {
            this.labTitle.text = isLevel ? Language.C_DJXZJJ : Language.C_ZLXZJJ;
            this.labOld.text = "" + oldRank;
            this.labNew.text = "" + curRank;
            this.alpha = 0;
            this.x = (mg.stageManager.stageWidth - this.width) * .5;
            this.y = 40;
            mg.layerManager.tip.addChild(this);
            egret.Tween.get(this).to({ alpha: 1 }, 500).wait(3000).call(function () {
                this.moveHandler();
            }, this);
        };
        ChapterInfoTip.prototype.moveHandler = function () {
            egret.Tween.get(this).to({ alpha: 0, y: -200 }, 300, utils.Ease.quartIn).call(function () {
                this.hide();
            }, this);
        };
        ChapterInfoTip.prototype.hide = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return ChapterInfoTip;
    }(ui.ChapterInfoTipSkin));
    tips.ChapterInfoTip = ChapterInfoTip;
    __reflect(ChapterInfoTip.prototype, "tips.ChapterInfoTip");
})(tips || (tips = {}));
