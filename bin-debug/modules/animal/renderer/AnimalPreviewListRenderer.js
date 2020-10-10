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
    var AnimalPreviewListRenderer = (function (_super) {
        __extends(AnimalPreviewListRenderer, _super);
        function AnimalPreviewListRenderer() {
            var _this = _super.call(this) || this;
            _this._labArr = [_this.labDes1, _this.labDes2, _this.labDes3, _this.labDes4, _this.labDes5, _this.labDes6];
            return _this;
        }
        AnimalPreviewListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var animal = this.data;
                var animalArr = GameModels.animal.getTempArrBuyType(animal.type);
                this.labName.text = animalArr[0].name;
                this.labName.textColor = TypeQuality.getQualityColor(animal.quality);
                var isOpen8Day = GameModels.animal.hashOpen8day;
                if (isOpen8Day) {
                    this.currentState = (animal.quality - 1).toString();
                    for (var i = 0; i < this._labArr.length; i++) {
                        if (animalArr[i]) {
                            var skillType = i == 0 ? Language.C_XTJN : Language.getExpression(Language.E_1BJN, animalArr[i].step - 1);
                            var isAct = animal.isAct ? animal.step >= animalArr[i].step ? true : false : false;
                            this._labArr[i].text = "[" + skillType + "]" + animalArr[i].des;
                            this._labArr[i].textColor = isAct ? TypeColor.GREEN1 : 0xD3D3D3;
                        }
                        else {
                            this._labArr[i].text = "";
                        }
                    }
                }
                else {
                    this.currentState = "1";
                    this.labDes1.text = "[" + Language.C_XTJN + "]" + animalArr[0].des;
                    var isAct = animal.isAct ? animal.step >= animalArr[0].step ? true : false : false;
                    this.labDes1.textColor = isAct ? TypeColor.GREEN1 : 0xD3D3D3;
                }
            }
        };
        return AnimalPreviewListRenderer;
    }(ui.AnimalPreviewListRendererSkin));
    renderer.AnimalPreviewListRenderer = AnimalPreviewListRenderer;
    __reflect(AnimalPreviewListRenderer.prototype, "renderer.AnimalPreviewListRenderer");
})(renderer || (renderer = {}));
