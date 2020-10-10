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
var renderer;
(function (renderer) {
    var AnimalListRenderer = (function (_super) {
        __extends(AnimalListRenderer, _super);
        function AnimalListRenderer() {
            return _super.call(this) || this;
        }
        AnimalListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var animal = this.data;
                this.imgStep.visible = false;
                this.labLv.text = "";
                this.imgBg.source = animal.isAct ? "animal_json.img_animalQuality_" + animal.quality : "animal_json.img_animalNoAct";
                this.imgIcon.source = "animalHead_json." + animal.icon.toString();
                this.labName.text = animal.name;
                this.labName.textColor = TypeQuality.getQualityColor(animal.quality);
                if (animal.isAct) {
                    this.labLv.y = 50;
                    if (animal.step >= 2) {
                        this.imgStep.visible = true;
                        this.imgStep.source = "animal_json.img_animalStep_" + animal.step;
                        this.labLv.y = 76;
                    }
                    this.labLv.text = "Lv." + animal.level;
                }
                this.imgRedPoint.visible = animal.hashRedPoint;
            }
        };
        return AnimalListRenderer;
    }(ui.AnimalListRendererSkin));
    renderer.AnimalListRenderer = AnimalListRenderer;
    __reflect(AnimalListRenderer.prototype, "renderer.AnimalListRenderer");
})(renderer || (renderer = {}));
