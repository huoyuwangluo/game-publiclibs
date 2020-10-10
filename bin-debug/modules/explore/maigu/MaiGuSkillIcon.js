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
var item;
(function (item) {
    var MaiGuSkillIcon = (function (_super) {
        __extends(MaiGuSkillIcon, _super);
        function MaiGuSkillIcon() {
            return _super.call(this) || this;
        }
        Object.defineProperty(MaiGuSkillIcon.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
                this.setIcon();
                this.setTempDataSetting(this._type);
                this.cost = this._cost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaiGuSkillIcon.prototype, "labTimeShow", {
            set: function (value) {
                this.labTime.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaiGuSkillIcon.prototype, "cost", {
            set: function (value) {
                this.labCost.text = value + "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaiGuSkillIcon.prototype, "cdBoo", {
            get: function () {
                return this._cdBoo;
            },
            set: function (value) {
                this._cdBoo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaiGuSkillIcon.prototype, "word", {
            get: function () {
                return this._word;
            },
            enumerable: true,
            configurable: true
        });
        MaiGuSkillIcon.prototype.cdStart = function () {
            this._cdBoo = true;
            this.iconFilter(false);
            this.labTime.visible = true;
            this.setTempValue();
            this.startTime();
        };
        MaiGuSkillIcon.prototype.cdEnd = function () {
            this._cdBoo = false;
            this.iconFilter(true);
            this.labTime.visible = false;
            utils.timer.clearAll(this);
        };
        MaiGuSkillIcon.prototype.reset = function () {
            if (this._cdBoo)
                this._cdBoo = false;
            if (this._leftTime)
                this._leftTime = 0;
            this.labCost.text = "";
            this.labTime.visible = false;
            utils.timer.clearAll(this);
        };
        /**开始倒计时*/
        MaiGuSkillIcon.prototype.startTime = function () {
            this.showTime();
            this.updateTime();
        };
        /**倒计时结束 */
        MaiGuSkillIcon.prototype.timeOver = function () {
            utils.timer.clearAll(this);
            this.cdEnd();
        };
        /**进行倒计时 */
        MaiGuSkillIcon.prototype.updateTime = function () {
            utils.timer.countdown(this._leftTime, this, this.showTime, this.timeOver);
        };
        /**显示倒计时*/
        MaiGuSkillIcon.prototype.showTime = function () {
            this._leftTime--;
            this.labTime.text = this._leftTime + "s";
        };
        MaiGuSkillIcon.prototype.iconFilter = function (boo) {
            if (boo) {
                this.btnIcon.touchEnabled = true;
                this.btnIcon.filters = null;
            }
            else {
                this.btnIcon.touchEnabled = false;
                this.btnIcon.filters = utils.filterUtil.grayFilters;
            }
        };
        MaiGuSkillIcon.prototype.setIcon = function () {
            if (this._type) {
                switch (this._type) {
                    case 1:
                        this.btnIcon.source = "copy_json.material_maigu_hp";
                        break;
                    case 2:
                        this.btnIcon.source = "copy_json.material_maigu_att";
                        break;
                    case 3:
                        this.btnIcon.source = "copy_json.material_maigu_xp";
                        break;
                }
            }
        };
        MaiGuSkillIcon.prototype.setTempDataSetting = function (type) {
            var id = type + 852000;
            this._temp = GameModels.dataSet.getDataSettingById(id);
            this.setTempValue();
        };
        MaiGuSkillIcon.prototype.setTempValue = function () {
            if (this._temp) {
                this._leftTime = parseInt(this._temp.value.split(";")[1]) / 1000;
                this._cost = parseInt(this._temp.value.split(";")[0].split("_")[1]);
                var num = parseInt(this._temp.value.split(";")[2]) / 100;
                switch (this._type) {
                    case 1:
                        this._word = Language.getExpression(Language.E_SMHF1, num);
                        break;
                    case 2:
                        this._word = Language.getExpression(Language.E_SHZJ1, num);
                        break;
                    case 3:
                        this._word = Language.getExpression(Language.E_NLHF1, num);
                        break;
                }
            }
            else {
                this._leftTime = 60;
                this._cost = 200;
                this._word = Language.J_JNSYCG;
            }
        };
        return MaiGuSkillIcon;
    }(ui.MaiGuSkillIconSkin));
    item.MaiGuSkillIcon = MaiGuSkillIcon;
    __reflect(MaiGuSkillIcon.prototype, "item.MaiGuSkillIcon");
})(item || (item = {}));
