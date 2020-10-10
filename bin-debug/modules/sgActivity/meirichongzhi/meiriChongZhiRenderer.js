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
    var meiriChongZhiRenderer = (function (_super) {
        __extends(meiriChongZhiRenderer, _super);
        function meiriChongZhiRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        meiriChongZhiRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.clearEff();
                this.img_needBuy.visible = false;
                var isEffect = this.data.effect;
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                var data = this.data.ActVo;
                this.labDesc.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_CZYB, data.rmb));
                var money = 0;
                var count = 0;
                switch (data.rmb) {
                    case 6:
                        money = 60;
                        count = 640;
                        break;
                    case 38:
                        money = 380;
                        count = 3600;
                        break;
                    case 88:
                        money = 880;
                        count = 7800;
                        break;
                }
                this.labHide.text = Language.getExpression(Language.E_LZ1YB2LB, money, count);
                if (data.rmb == 38) {
                    this.img_needBuy.visible = true;
                }
                var rewards = data.otherRewards.split(";");
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                        if (i == 0) {
                            var img = new eui.Image;
                            img.source = "img_doubleTitle_png";
                            img.x = 19;
                            img.y = 3;
                            img.touchEnabled = false;
                            this.boxGroup.addChild(img);
                        }
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                this.btnPay.visible = false;
                this.btnReward.visible = false;
                this.imgBuyFinsh.visible = false;
                if (vo.hashMyValueStr(data.rewardCfgId.toString())) {
                    if (data.getTimes <= 0) {
                        this.btnReward.visible = true;
                    }
                    else {
                        this.imgBuyFinsh.visible = true;
                    }
                }
                else {
                    if (isEffect)
                        this.creatEff();
                    this.btnPay.visible = true;
                    this.btnPay.source = "btnMoney_json.btn_sg_chongzhi_" + data.rmb;
                }
            }
            else {
                for (var i = 0; i < this._rwards.length; i++) {
                    this._rwards[i].dataSource = null;
                }
            }
        };
        meiriChongZhiRenderer.prototype.creatEff = function () {
            if (!this._effect) {
                this._effect = new s.AnimationSprite();
                this._effect.resId = "6605";
                this._effect.scale(0.5);
                this._effect.play();
                this._effect.x = this.btnPay.x;
                this._effect.y = this.btnPay.y;
                this.addChildAt(this._effect, this.getChildIndex(this.btnPay) + 1);
            }
        };
        meiriChongZhiRenderer.prototype.clearEff = function () {
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
        return meiriChongZhiRenderer;
    }(ui.meiriChongZhiRendererSkin));
    renderer.meiriChongZhiRenderer = meiriChongZhiRenderer;
    __reflect(meiriChongZhiRenderer.prototype, "renderer.meiriChongZhiRenderer");
})(renderer || (renderer = {}));
