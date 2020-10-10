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
    var RechargeItem = (function (_super) {
        __extends(RechargeItem, _super);
        function RechargeItem() {
            return _super.call(this) || this;
        }
        RechargeItem.prototype.dataChanged = function () {
            var dataVO = this.data;
            if (dataVO) {
                this.imgPrice.source = "recharge_json.img_recharge_¥" + dataVO.template.RMB;
                this.imgIcon.source = "img_recharge_ms" + dataVO.template.RMB + "_png";
                this.imgWenZi.source = "img_recharge_wz" + dataVO.template.RMB + "_png";
                this.imgSongPrice.source = "img_recharge_s" + dataVO.template.RMB + "_png";
                if (dataVO.template.RMB == 2000 || dataVO.template.RMB == 3000 || dataVO.template.RMB == 5000) {
                    this.imgDoubleCoumt.visible = true;
                    this.imgDoubleCoumt.source = "img_shop_first1_png";
                    this.imgSong.visible = true;
                    this.imgSongBg.visible = true;
                    this.imgSongPrice.visible = true;
                }
                else {
                    this.imgDoubleCoumt.source = "img_shop_first_png";
                    this.imgDoubleCoumt.visible = !dataVO.buyState;
                    this.imgSong.visible = !dataVO.buyState;
                    this.imgSongBg.visible = !dataVO.buyState;
                    this.imgSongPrice.visible = !dataVO.buyState;
                }
                var yaoHuanimal = GameModels.animal.getAnimalBuyType(19); //妖虎
                if (yaoHuanimal && yaoHuanimal.isAct && yaoHuanimal.step >= 3) {
                    this.imgDoubleCoumt.source = "img_shop_first2_png";
                    this.imgDoubleCoumt.visible = true;
                }
            }
        };
        return RechargeItem;
    }(ui.RechargeItemSkin));
    renderer.RechargeItem = RechargeItem;
    __reflect(RechargeItem.prototype, "renderer.RechargeItem");
})(renderer || (renderer = {}));
