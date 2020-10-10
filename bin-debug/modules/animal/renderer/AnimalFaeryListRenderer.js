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
    var AnimalFaeryListRenderer = (function (_super) {
        __extends(AnimalFaeryListRenderer, _super);
        function AnimalFaeryListRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        AnimalFaeryListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.imgBuyFinsh.visible = false;
                this.btnGet.visible = false;
                var animal = this.data;
                var animalVo = GameModels.animal.getAnimalBuyType(animal.type);
                this.labDesc.text = animal.name + Language.C_MRJL;
                if (animalVo.isAct) {
                    var hashAct = animalVo.step >= animal.step;
                    var hashGetReward = GameModels.animal.hashGetRewardBuyId(animal.id);
                    if (hashAct) {
                        if (hashGetReward) {
                            this.imgBuyFinsh.visible = true;
                        }
                        else {
                            this.btnGet.visible = true;
                            this.btnGet.label = Language.C_LQ;
                            this.btnGet.skinName = "skins.SnapBigButton3Skin";
                        }
                    }
                    else {
                        this.btnGet.visible = true;
                        this.btnGet.label = Language.getExpression(Language.E_1BHJS, animal.step - 1);
                        this.btnGet.skinName = "skins.SnapBigButton2Skin";
                    }
                }
                else {
                    this.btnGet.visible = true;
                    if (animal.step == 1) {
                        this.btnGet.label = Language.C_JHHJS;
                    }
                    else {
                        this.btnGet.label = Language.getExpression(Language.E_1BHJS, animal.step - 1);
                    }
                    this.btnGet.skinName = "skins.SnapBigButton2Skin";
                }
                var rewards = animal.param1.split(";");
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
            }
        };
        return AnimalFaeryListRenderer;
    }(ui.AnimalFaeryListRendererSkin));
    renderer.AnimalFaeryListRenderer = AnimalFaeryListRenderer;
    __reflect(AnimalFaeryListRenderer.prototype, "renderer.AnimalFaeryListRenderer");
})(renderer || (renderer = {}));
