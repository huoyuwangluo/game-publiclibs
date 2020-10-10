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
    var ShenMiShangDianRenderer = (function (_super) {
        __extends(ShenMiShangDianRenderer, _super);
        function ShenMiShangDianRenderer() {
            return _super.call(this) || this;
        }
        ShenMiShangDianRenderer.prototype.desClick = function (e) {
            var vo = this.data;
            if (vo) {
                var item = Templates.getTemplateById(templates.Map.ITEM, vo.template.itemId);
                mg.TipManager.instance.showTip(tips.PropTip, item);
            }
        };
        ShenMiShangDianRenderer.prototype.buyClick = function (e) {
            if (utils.CheckUtil.checkBagSmelting())
                return;
            var vo = this.data;
            if (GameModels.activitySummer.freeTimes <= 0) {
                var itemVo = Templates.getTemplateById(templates.Map.ITEM, vo.template.itemId);
                mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SFXH1MSGM3DJ, vo.template.price, itemVo.name), TypeBtnLabel.OK, TypeCheck.HOLIDAY_BUG, null, utils.Handler.create(this, function () {
                    GameModels.activitySummer.requestbuyMysteryShop(vo.shopid, 0, utils.Handler.create(this, function (data) {
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
                }));
            }
            else {
                mg.alertManager.showAlert(view.activity.CheckShenMiShopAlert, true, true, vo, utils.Handler.create(this, function (type) {
                    GameModels.activitySummer.requestbuyMysteryShop(vo.shopid, type, utils.Handler.create(this, function (data) {
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
                }));
            }
        };
        ShenMiShangDianRenderer.prototype.flyOverHandler = function (img) {
            if (img) {
                img.alpha = 1;
                img.parent.removeChild(img);
                utils.ObjectPool.to(img, true);
            }
        };
        ShenMiShangDianRenderer.prototype.checkShopId = function (id) {
            var data = GameModels.activitySummer.mysteryShopLimitDataId;
            if (data.indexOf(id) != -1) {
                return true;
            }
            return false;
        };
        ShenMiShangDianRenderer.prototype.getLimitDataNum = function (id) {
            var data = GameModels.activitySummer.mysteryShopLimitData;
            for (var i = 0; i < data.length; i++) {
                if (data[i].shopid == id) {
                    return data[i].shopBuyCount;
                }
            }
            return 0;
        };
        ShenMiShangDianRenderer.prototype.dataChanged = function () {
            this.btnBuy.filters = null;
            this.btnBuy.touchEnabled = true;
            this.imgbg.visible = false;
            this.labCount.text = "";
            if (this.data) {
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyClick, this);
                this.iconGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.desClick, this);
                var item = this.data;
                var itemVo = Templates.getTemplateById(templates.Map.ITEM, item.template.itemId);
                if (itemVo) {
                    this.imgQuility.source = ResPath.getQuality(itemVo.quality);
                    this.lblName.text = itemVo.name;
                    this.lblName.textColor = TypeQuality.getQualityColor(itemVo.quality);
                    this.imgIcon.source = itemVo.icon;
                }
                this.lblNum.text = "" + item.template.itemCount;
                this.imgZheKouBg.visible = true;
                this.labZheKou.text = "" + (item.template.discount / 10);
                if (item.template.discount >= 100) {
                    this.labZheKou.text = "";
                    this.imgZheKouBg.visible = false;
                }
                this.lblgold.text = "" + item.template.price;
                if (item.template.limitTimes > 0) {
                    this.imgbg.visible = true;
                    if (this.checkShopId(item.shopid)) {
                        this.labCount.text = "" + (item.template.limitTimes - this.getLimitDataNum(item.shopid));
                    }
                    else {
                        this.labCount.text = "" + item.template.limitTimes;
                    }
                }
                if (item.shopBuyCount > 0) {
                    this.btnBuy.filters = utils.filterUtil.grayFilters;
                    this.btnBuy.touchEnabled = false;
                }
            }
            else {
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyClick, this);
                this.iconGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.desClick, this);
            }
        };
        return ShenMiShangDianRenderer;
    }(ui.ShenMiShangDianRendererSkin));
    renderer.ShenMiShangDianRenderer = ShenMiShangDianRenderer;
    __reflect(ShenMiShangDianRenderer.prototype, "renderer.ShenMiShangDianRenderer");
})(renderer || (renderer = {}));
