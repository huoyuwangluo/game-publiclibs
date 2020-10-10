var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tips;
(function (tips) {
    var NotifyAnimalSkillTips = (function () {
        function NotifyAnimalSkillTips() {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._back = new eui.Image();
            this._back.source = 'img_tips_textbg_png';
            this._back.scale9Grid = new egret.Rectangle(64, 9, 19, 12);
            this._back.width = 400;
            this._back.height = 100;
            this._back.touchEnabled = false;
            this._quality = new components.Icon();
            this._icon = new components.Icon();
            this._quality.source = 'qualityBg_json.img_qlt_1_png';
            this._icon.source = null;
            this._quality.width = this._icon.width = 80;
            this._quality.height = this._icon.height = 80;
            this._quality.x = this._icon.x = 14;
            this._quality.y = this._icon.y = 10;
            this._quality.touchEnabled = this._icon.touchEnabled = false;
            this._labName = new eui.Label();
            this._labName.size = 18;
            this._labName.textAlign = 'center';
            this._labName.touchEnabled = false;
            this._labName.textColor = 0xd3d3d3;
            this._labName.y = 12;
            this._labName.x = 203;
            this._labName.touchEnabled = false;
            this._labContent = new eui.Label();
            this._labContent.size = 18;
            this._labContent.textAlign = 'left';
            this._labContent.touchEnabled = false;
            this._labContent.width = 275;
            this._labContent.textColor = 0xd3d3d3;
            this._labContent.x = 107;
            this._labContent.y = 36;
        }
        Object.defineProperty(NotifyAnimalSkillTips.prototype, "x", {
            get: function () {
                return this._back.x;
            },
            set: function (v) {
                this._back.x = v;
                this._labContent.x = v + 107;
                this._labName.x = v + 203;
                this._icon.x = v + 14;
                this._quality.x = v + 14;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyAnimalSkillTips.prototype, "y", {
            get: function () {
                return this._back.y;
            },
            set: function (v) {
                this._back.y = v;
                this._labContent.y = v + 36;
                this._labName.y = v + 12;
                this._icon.y = v + 10;
                this._quality.y = v + 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyAnimalSkillTips.prototype, "width", {
            get: function () {
                return this._back.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyAnimalSkillTips.prototype, "height", {
            get: function () {
                return 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotifyAnimalSkillTips.prototype, "alpha", {
            set: function (v) {
                this._back.alpha = this._labContent.alpha = v;
            },
            enumerable: true,
            configurable: true
        });
        NotifyAnimalSkillTips.prototype.add = function (box) {
            box.back.addChild(this._back);
            box.front.addChild(this._labContent);
            box.front.addChild(this._labName);
            box.front.addChild(this._icon);
            box.front.addChild(this._quality);
        };
        NotifyAnimalSkillTips.prototype.remove = function () {
            if (this._back.parent) {
                this._back.parent.removeChild(this._back);
            }
            if (this._labContent.parent) {
                this._labContent.parent.removeChild(this._labContent);
            }
            if (this._labName.parent) {
                this._labName.parent.removeChild(this._labName);
            }
            if (this._icon.parent) {
                this._icon.parent.removeChild(this._icon);
            }
            if (this._quality.parent) {
                this._quality.parent.removeChild(this._quality);
            }
        };
        NotifyAnimalSkillTips.prototype.destory = function () {
            this.reset();
            this._back = null;
            this._labContent = null;
        };
        NotifyAnimalSkillTips.prototype.initialize = function (temp) {
            this._labName.text = temp.name;
            this._labContent.text = temp.des;
            this._quality.source = "animal_json.img_animal_" + temp.step;
            this._icon.source = temp.skillIcon.toString();
            this.alpha = 1;
            this.x = -this.width * .5;
        };
        NotifyAnimalSkillTips.prototype.reset = function () {
            utils.timer.clearAll(this);
        };
        NotifyAnimalSkillTips.prototype.start = function (caller, method) {
            utils.timer.once(3000, this, this.startOverHandler, true, caller, method);
        };
        NotifyAnimalSkillTips.prototype.startOverHandler = function (caller, method) {
            method.call(caller, this);
        };
        return NotifyAnimalSkillTips;
    }());
    tips.NotifyAnimalSkillTips = NotifyAnimalSkillTips;
    __reflect(NotifyAnimalSkillTips.prototype, "tips.NotifyAnimalSkillTips", ["IMessageBoxItem", "utils.IPool"]);
})(tips || (tips = {}));
