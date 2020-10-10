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
    var MallTeQuanRenderer = (function (_super) {
        __extends(MallTeQuanRenderer, _super);
        function MallTeQuanRenderer() {
            var _this = _super.call(this) || this;
            _this._tempId = [660001, 670003, 680003, 690003, 780001];
            _this._iconArr1 = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        MallTeQuanRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var cardVo = this.data.cardVo;
                var isEffect = this.data.effect;
                this.imgType.source = "shop_json.img_tequantype" + cardVo.type + "_png";
                this.imgTitle.source = "shop_json.img_tequanTitleIcon" + cardVo.type + "_png";
                this.lab1.visible = false;
                this.moneyGroup.visible = false;
                this.clearEff();
                var money = "";
                switch (cardVo.type) {
                    case 3:
                        this.imgXianGouType.source = "shop_json.img_monthXianGou_png";
                        this.labDay1.text = Language.J_ZCSB;
                        this.lab1.visible = true;
                        this.lab1.text = Language.J_ZCSB1;
                        this.lab2.text = Language.J_ZCSB2;
                        this.lab3.text = Language.J_ZCSB3;
                        money = "sg_chongzhi_28";
                        break;
                    case 4:
                        this.imgXianGouType.source = "shop_json.img_zhongshen_png";
                        this.labDay1.text = Language.J_ZSSD;
                        this.lab2.text = Language.J_KSZZ1;
                        this.lab3.text = Language.J_KSZZ2;
                        this.moneyGroup.visible = cardVo.cardStatus == 1 ? false : true;
                        this.labDiamonds.text = "480";
                        money = "buy";
                        break;
                    case 5:
                        this.imgXianGouType.source = "shop_json.img_weekXianGou_png";
                        this.labDay1.text = Language.J_KSSB;
                        this.lab2.text = Language.J_ZSTQ1;
                        this.lab3.text = Language.J_ZSTQ2;
                        money = "sg_chongzhi_18";
                        break;
                    case 6:
                        this.imgXianGouType.source = "shop_json.img_zhongshen_png";
                        this.labDay1.text = Language.J_ZSSD;
                        this.lab1.visible = true;
                        this.lab1.text = Language.J_ZSSD1;
                        this.lab2.text = Language.J_ZSSD2;
                        this.lab3.text = Language.J_ZSSD3;
                        money = "sg_chongzhi_98";
                        break;
                    case 7:
                        this.imgXianGouType.source = "shop_json.img_zhongshen_png";
                        this.labDay1.text = Language.J_ZSSD;
                        this.lab2.text = Language.J_SZTQ1;
                        this.lab3.text = Language.J_SZTQ2;
                        this.moneyGroup.visible = cardVo.cardStatus == 1 ? false : true;
                        this.labDiamonds.text = "198";
                        money = "buy";
                        break;
                }
                this.imgTypeIcon.source = "shop_json.img_tequantypeIcon" + cardVo.type + "_png";
                if (cardVo.cardStatus == 1) {
                    if (cardVo.doneGotReward == 1) {
                        if (cardVo.type != 6 && cardVo.type != 7 && cardVo.type != 4) {
                            this.labDay1.text = Language.getExpression(Language.E_SY1T, cardVo.leftDays);
                        }
                        else {
                            this.labDay1.text = Language.J_SYYJ;
                        }
                        this.Btnbuy.source = "vip_json.img_get_vipBox";
                    }
                    else {
                        this.Btnbuy.source = "btnMoney_json.btn_get";
                    }
                }
                else {
                    if (isEffect)
                        this.creatEff();
                    this.Btnbuy.source = "btnMoney_json.btn_" + money; // "shop_json.btn_tequan" + cardVo.type + "_png";
                }
                var str1 = GameModels.dataSet.getDataSettingValueById(this._tempId[cardVo.type - 3]);
                var reward1 = str1.split(";");
                for (var i = 0; i < 3; i++) {
                    var iconBox = this._iconArr1[i];
                    iconBox.labName.stroke = 1;
                    if (i < reward1.length) {
                        iconBox.dataSource = reward1[i];
                        iconBox.labName.text = "";
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
        MallTeQuanRenderer.prototype.creatEff = function () {
            if (!this._effect) {
                this._effect = new s.AnimationSprite();
                this._effect.resId = "6605";
                this._effect.scale(0.5);
                this._effect.play();
                this._effect.x = this.Btnbuy.x;
                this._effect.y = this.Btnbuy.y;
                this.addChildAt(this._effect, this.getChildIndex(this.Btnbuy) + 1);
            }
        };
        MallTeQuanRenderer.prototype.clearEff = function () {
            utils.timer.clear(this);
            if (this._effect) {
                this._effect.scale(0.5);
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                this._effect.stop();
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        return MallTeQuanRenderer;
    }(ui.MallTeQuanRendererSkin));
    renderer.MallTeQuanRenderer = MallTeQuanRenderer;
    __reflect(MallTeQuanRenderer.prototype, "renderer.MallTeQuanRenderer");
})(renderer || (renderer = {}));
