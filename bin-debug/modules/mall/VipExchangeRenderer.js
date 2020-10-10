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
    var VipExchangeRenderer = (function (_super) {
        __extends(VipExchangeRenderer, _super);
        function VipExchangeRenderer() {
            return _super.call(this) || this;
        }
        VipExchangeRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var changTemp = this.data.temp;
                var isCan = this.data.isCan;
                if (changTemp) {
                    this.reward0.dataSource = changTemp.consume1;
                    this.reward1.dataSource = changTemp.consume2;
                    this.reward2.dataSource = changTemp.id + "_" + 1;
                    this.btnChange.visible = isCan;
                    this.labNo.visible = !isCan;
                    var bagCount = GameModels.bag.getPetSuiCountById(changTemp.consume1.split("_")[0]);
                    var needCount = parseInt(changTemp.consume1.split("_")[1]);
                    this.reward0.labCount.text = bagCount + "/" + needCount;
                    this.reward0.labCount.textColor = bagCount >= needCount ? 0x00ff00 : 0xff0000;
                }
                this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
        };
        VipExchangeRenderer.prototype.onBtnClick = function (e) {
            var _this = this;
            if (e.target instanceof components.SnapButton) {
                var changTemp = this.data.temp;
                if (changTemp) {
                    GameModels.vip.requsetPetChange(changTemp.id, utils.Handler.create(this, function (data) {
                        if (data.Result) {
                            mg.alertManager.tip(Language.C_DHCG);
                            _this.reward2.playFlyItem();
                        }
                    }));
                }
            }
        };
        return VipExchangeRenderer;
    }(ui.VipExchangeRendererSkin));
    renderer.VipExchangeRenderer = VipExchangeRenderer;
    __reflect(VipExchangeRenderer.prototype, "renderer.VipExchangeRenderer");
})(renderer || (renderer = {}));
