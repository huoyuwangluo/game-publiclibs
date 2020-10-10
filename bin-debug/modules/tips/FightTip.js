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
    var FightTip = (function (_super) {
        __extends(FightTip, _super);
        function FightTip() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.FightTipSkin';
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        FightTip.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.oldFight = -1;
        };
        Object.defineProperty(FightTip, "instance", {
            get: function () {
                if (!FightTip._instance) {
                    FightTip._instance = new FightTip();
                }
                return FightTip._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FightTip.prototype, "fight", {
            get: function () {
                return parseInt(this.blabFight.text);
            },
            set: function (value) {
                if (value != this.fight) {
                    this.blabFight.text = "" + (value >> 0);
                }
            },
            enumerable: true,
            configurable: true
        });
        FightTip.prototype.updateFight = function (value) {
            if (this.oldFight > 0) {
                // if (value > this.oldFight) {
                // 	utils.timer.once(1000, this, this.playChange, true, value);
                // }
                // else {
                // 	this.oldFight = value;
                // }
                if (value - this.oldFight == 0)
                    return;
                utils.timer.once(1000, this, this.playChange, true, value);
            }
            else {
                this.oldFight = value;
            }
        };
        FightTip.prototype.playChange = function (value) {
            this.fight = this.oldFight;
            egret.Tween.get(this).wait(500).to({ fight: value }, 2000, utils.Ease.quartInOut).wait(500).call(function () {
                this.hideFight();
            }, this);
            this.show();
            this.showAddFight(value);
            this.oldFight = value;
        };
        FightTip.prototype.show = function () {
            this.x = (mg.stageManager.stageWidth - this.width) * .5;
            this.y = mg.stageManager.stageHeight - 460;
            mg.layerManager.tip.addChild(this);
        };
        FightTip.prototype.showAddFight = function (value) {
            if (value > this.oldFight) {
                this.blabChange.font = "green_font_fnt";
                this.blabChange.text = "+" + (value - this.oldFight);
            }
            else {
                this.blabChange.font = "red_font_fnt";
                this.blabChange.text = "" + (value - this.oldFight);
            }
            //this.blabChange.x = this.blabFight.x + this.blabFight.textWidth;
            this.blabChange.y = 21;
            this.blabChange.alpha = 0;
            egret.Tween.get(this.blabChange).to({ alpha: 1, y: -15 }, 500, utils.Ease.quadOut).wait(1500).to({ alpha: 0, y: -35 }, 500, utils.Ease.quadIn);
        };
        FightTip.prototype.hideFight = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return FightTip;
    }(eui.Component));
    tips.FightTip = FightTip;
    __reflect(FightTip.prototype, "tips.FightTip");
})(tips || (tips = {}));
