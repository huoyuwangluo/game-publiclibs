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
    var JifenShangDianRenderer = (function (_super) {
        __extends(JifenShangDianRenderer, _super);
        function JifenShangDianRenderer() {
            var _this = _super.call(this) || this;
            _this.register();
            return _this;
        }
        JifenShangDianRenderer.prototype.register = function () {
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyClick, this);
            this.iconGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.desClick, this);
        };
        JifenShangDianRenderer.prototype.desClick = function (e) {
            var vo = this.data;
            if (Math.floor(vo.itemID / 100000) == 1) {
                mg.TipManager.instance.showTip(tips.EquipTip, { templateEquip: vo.templateProp });
            }
            else {
                mg.TipManager.instance.showTip(tips.PropTip, vo.templateProp);
            }
        };
        JifenShangDianRenderer.prototype.buyClick = function () {
            if (utils.CheckUtil.checkBagSmelting())
                return;
            var vo = this.data;
            //if (vo.getPrice() <= GameModels.activitySummer.myJifen) {
            GameModels.activitySummer.buyShopDataCall(vo.shopid, 1, game.TypeSummerActivity.JFSC, utils.Handler.create(this, function (data) {
                var img = utils.ObjectPool.from(components.Icon);
                img.initialize(this.imgIcon.texture);
                mg.layerManager.top.addChild(img);
                var point = this.imgIcon.localToGlobal(0, 0);
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
                img.x = point.x + img.width / 2;
                img.y = point.y + img.height / 2;
                var bagPosition = mg.uiManager.getView(main.MainUIView).getBagPostion(true);
                egret.Tween.get(img).to({ x: bagPosition.x, y: bagPosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img]);
            }));
            //}
            // else {
            // 	//弹出积分不足界面
            // 	mg.alertManager.tip(Language.J_JFBZ, 0xFF0000);
            // }
        };
        JifenShangDianRenderer.prototype.flyOverHandler = function (img) {
            if (img) {
                img.alpha = 1;
                img.parent.removeChild(img);
                utils.ObjectPool.to(img, true);
            }
        };
        JifenShangDianRenderer.prototype.dataChanged = function () {
            this.imgXianDing.visible = false;
            if (this.data) {
                var shopVO = this.data;
                // if (shopVO.type == 5 && (shopVO.shopid == 5001)) {
                // 	this.imgXianDing.visible = true;
                // }
                this.imgQuility.source = ResPath.getQuality(shopVO.quality);
                this.lblName.text = shopVO.name;
                this.lblName.textColor = TypeQuality.getQualityColor(shopVO.quality);
                this.lblNum.text = "" + shopVO.count;
                if (shopVO.prompt) {
                    this.labTitle.visible = true;
                    this.labTitle.text = "(" + shopVO.prompt + ")";
                }
                else {
                    this.labTitle.visible = false;
                }
                this.imgIcon.source = ResPath.getItemIconKey(shopVO.icon);
                if (shopVO.buyTotalCount == 0) {
                    this.labCount.text = "";
                }
                else {
                    var str = shopVO.buyCount + "/" + shopVO.buyTotalCount;
                    if (shopVO.shoptemplate.refreshType == 1) {
                        this.labCount.text = Language.C_MRXG + str;
                    }
                    else if (shopVO.shoptemplate.refreshType == 2) {
                        this.labCount.text = Language.C_YJXG + str;
                    }
                    else {
                        this.labCount.text = Language.C_YJXG + str;
                    }
                }
                if (shopVO.buyCount != 0) {
                    this.labCount.textColor = 0x00FF00;
                }
                else {
                    this.labCount.textColor = 0xFF0000;
                }
                this.lblgold.text = Language.getExpression(Language.E_XHJF1, shopVO.getPrice());
            }
        };
        return JifenShangDianRenderer;
    }(ui.JifenShangDianRendererSkin));
    renderer.JifenShangDianRenderer = JifenShangDianRenderer;
    __reflect(JifenShangDianRenderer.prototype, "renderer.JifenShangDianRenderer");
})(renderer || (renderer = {}));
