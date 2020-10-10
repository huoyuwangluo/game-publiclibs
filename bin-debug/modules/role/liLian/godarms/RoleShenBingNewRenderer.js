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
    var RoleShenBingNewRenderer = (function (_super) {
        __extends(RoleShenBingNewRenderer, _super);
        function RoleShenBingNewRenderer() {
            return _super.call(this) || this;
        }
        RoleShenBingNewRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                if (data instanceof vo.ShenBingVO) {
                    this.labName.text = data.name;
                    this.img_warn.visible = false;
                    var consume = "";
                    if (data.level > 0) {
                        this.img_down.source = "godarms_json.btn_selected_up2";
                        this.labName.textColor = 0xc3cacd;
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
                        this.img_down.source = "godarms_json.btn_selected_up1";
                        this.labName.textColor = 0x6f6f6f;
                        consume = data.activateConsume;
                    }
                    var strcount = parseInt(consume.split("_")[1]);
                    var bagcount = GameModels.bag.getItemCountById(consume.split("_")[0]);
                    if (bagcount >= strcount && data.level < 10) {
                        this.img_warn.visible = true;
                    }
                    this.imgCountry.source = "smokePet_json.img_smokePet_icon_" + data.country;
                }
                this.invalidateProperties();
            }
        };
        RoleShenBingNewRenderer.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.currentState == "up") {
                this.dataChanged();
            }
        };
        return RoleShenBingNewRenderer;
    }(ui.RoleShenBingNewRendererSkin));
    renderer.RoleShenBingNewRenderer = RoleShenBingNewRenderer;
    __reflect(RoleShenBingNewRenderer.prototype, "renderer.RoleShenBingNewRenderer");
})(renderer || (renderer = {}));
