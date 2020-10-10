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
    var RoleShenBingRenderer = (function (_super) {
        __extends(RoleShenBingRenderer, _super);
        function RoleShenBingRenderer() {
            return _super.call(this) || this;
        }
        RoleShenBingRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.labCiHunName.visible = false;
            if (this.data) {
                var data = this.data;
                if (data instanceof vo.ShenBingVO) {
                    this.lanName.text = data.name;
                    this.img_warn.visible = false;
                    this.img_isAct.source = data.level > 0 ? "godarms_json.img_sbtab_1" : "godarms_json.img_sbtab_2";
                    // this.lanName.textColor = data.star > 0 ? 0xd3d3d3 : 0x5f6064;
                    var consume = "";
                    if (data.level > 0) {
                        var num = data.getGrowBase(data.level);
                        if (num > 0) {
                            var strArr = data.template.baseCon.split("_");
                            consume = strArr[0] + "_" + num * parseInt(strArr[1]);
                        }
                        else {
                            consume = data.getGrowUpConsume(data.level);
                        }
                    }
                    else {
                        consume = data.activateConsume;
                    }
                    var strcount = parseInt(consume.split("_")[1]);
                    var bagcount = GameModels.bag.getItemCountById(consume.split("_")[0]);
                    if (bagcount >= strcount && data.level < 10) {
                        this.img_warn.visible = true;
                    }
                }
                else {
                    this.lanName.text = data.name;
                    this.img_warn.visible = false;
                    this.img_warn.visible = data.isHashRedPoint == 1;
                    this.img_isAct.source = data.level > 0 ? "godarms_json.img_sbtab_1" : "godarms_json.img_sbtab_2";
                    // this.lanName.textColor = data.level > 0 ? 0xd3d3d3 : 0x5f6064;
                    if (data.marryPetId) {
                        this.labCiHunName.visible = true;
                        var petVO = GameModels.pet.getFormatDownAndUpVO(data.marryPetId);
                        this.labCiHunName.text = petVO ? "(" + petVO.name + ")" : "";
                    }
                }
                this.invalidateProperties();
            }
        };
        RoleShenBingRenderer.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.currentState == "up") {
                this.dataChanged();
            }
        };
        return RoleShenBingRenderer;
    }(ui.RoleShenBingRendererSkin));
    renderer.RoleShenBingRenderer = RoleShenBingRenderer;
    __reflect(RoleShenBingRenderer.prototype, "renderer.RoleShenBingRenderer");
})(renderer || (renderer = {}));
