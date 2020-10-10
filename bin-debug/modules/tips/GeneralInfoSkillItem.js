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
    var GeneralInfoSkillItem = (function (_super) {
        __extends(GeneralInfoSkillItem, _super);
        function GeneralInfoSkillItem() {
            return _super.call(this) || this;
        }
        GeneralInfoSkillItem.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        GeneralInfoSkillItem.prototype.show = function (type, skillVoArr, bingFaVoArr) {
            if (bingFaVoArr === void 0) { bingFaVoArr = []; }
            this.imgType.source = "pet_json.img_skillType_" + type + "_png";
            this._type = type;
            this.hide();
            if (skillVoArr) {
                for (var i = 0; i < skillVoArr.length; i++) {
                    var skill = new item.PetSKillAndTalent();
                    skill.scaleX = skill.scaleY = 0.8;
                    skill.dataSource = skillVoArr[i];
                    this.skillGroup.addChild(skill);
                    skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
                }
            }
            if (bingFaVoArr) {
                for (var i = 0; i < bingFaVoArr.length; i++) {
                    if (bingFaVoArr[i]) {
                        var bingFa = new item.PetSKillAndTalent();
                        bingFa.dataSource = bingFaVoArr[i];
                        bingFa.scaleX = bingFa.scaleY = 0.8;
                        this.skillGroup.addChild(bingFa);
                        bingFa.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
                    }
                }
            }
        };
        GeneralInfoSkillItem.prototype.onSkillClick = function (evt) {
            var target = evt.currentTarget;
            if (this._type != 3) {
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, target.dataSource);
            }
            else {
                mg.TipUpManager.instance.showTip(tipUps.BingFaAert, target.dataSource);
            }
        };
        GeneralInfoSkillItem.prototype.hide = function () {
            for (var z = this.skillGroup.numChildren; z >= 0; z--) {
                var btns = this.skillGroup.getChildAt(z);
                if (btns) {
                    this.skillGroup.removeChildAt(z);
                }
            }
        };
        return GeneralInfoSkillItem;
    }(ui.GeneralInfoSkillItemSkin));
    item.GeneralInfoSkillItem = GeneralInfoSkillItem;
    __reflect(GeneralInfoSkillItem.prototype, "item.GeneralInfoSkillItem");
})(item || (item = {}));
