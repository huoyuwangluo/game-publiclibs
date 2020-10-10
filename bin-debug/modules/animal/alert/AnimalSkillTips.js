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
var tipUps;
(function (tipUps) {
    var AnimalSkillTips = (function (_super) {
        __extends(AnimalSkillTips, _super);
        function AnimalSkillTips() {
            return _super.call(this) || this;
        }
        Object.defineProperty(AnimalSkillTips.prototype, "data", {
            set: function (data) {
                this.show(data);
            },
            enumerable: true,
            configurable: true
        });
        AnimalSkillTips.prototype.show = function (data) {
            var animal = data;
            this.labTitle.text = animal.name;
            var isAct = GameModels.animal.getAnimalIsActBuyTypeAndStep(animal.type, animal.step);
            this.imgQuality.source = "animal_json.img_animal_" + animal.step;
            this.imgIcon.source = animal.skillIcon.toString();
            this.labContent.text = animal.des;
            if (!isAct) {
                this.labAct.visible = true;
                if (animal.step == 1) {
                    this.labAct.text = Language.getExpression(Language.E_1JHHJHCJN, animal.name);
                }
                else {
                    this.labAct.text = Language.getExpression(Language.E_1BHJH, animal.name);
                }
            }
            else {
                this.labAct.visible = false;
            }
        };
        AnimalSkillTips.prototype.removeSelf = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AnimalSkillTips;
    }(ui.AnimalSkillTipsSkin));
    tipUps.AnimalSkillTips = AnimalSkillTips;
    __reflect(AnimalSkillTips.prototype, "tipUps.AnimalSkillTips", ["ITipLogic", "egret.DisplayObject"]);
})(tipUps || (tipUps = {}));
