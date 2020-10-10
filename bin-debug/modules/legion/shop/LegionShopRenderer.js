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
var LegionShopRenderer = (function (_super) {
    __extends(LegionShopRenderer, _super);
    function LegionShopRenderer() {
        return _super.call(this) || this;
        //this.register();
    }
    // private register(): void {
    // 	this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyClick, this);
    // 	this.iconGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.desClick, this);
    // }
    // private desClick(e: egret.TouchEvent): void {
    // 	if (mg.uiManager.getView(LegionShop).currentState == "daoju") {
    // 		let vo: vo.ShopVO = this.data;
    // 		if (Math.floor(vo.itemID / 100000) == 1) {
    // 			mg.TipManager.instance.showTip(tips.EquipTip, { templateEquip: vo.templateProp });
    // 		}
    // 		else {
    // 			mg.TipManager.instance.showTip(tips.PropTip, vo);
    // 		}
    // 	}
    // }
    // private buyClick(): void {
    // 	if (mg.uiManager.getView(LegionShop).currentState == "daoju") {
    // 		let vo: vo.ShopVO = this.data;
    // 		if (vo.getPrice() <= GameModels.legion.gongXian) {
    // 			GameModels.shop.buyUnionShop(vo.shopid.toString(), 1, vo.type, utils.Handler.create(this, function (data: n.G2C_Store_BuyItemResp) {
    // 				let img: components.Icon = utils.ObjectPool.from(components.Icon) as components.Icon;
    // 				img.initialize(this.imgIcon.texture);
    // 				mg.layerManager.top.addChild(img);
    // 				var point: egret.Point = this.imgIcon.localToGlobal(0, 0);
    // 				img.anchorOffsetX = img.width / 2;
    // 				img.anchorOffsetY = img.height / 2;
    // 				img.x = point.x + img.width / 2;
    // 				img.y = point.y + img.height / 2;
    // 				var bagPosition: egret.Point = (mg.uiManager.getView(main.MainUIView) as main.MainUIView).getBagPostion(true);
    // 				egret.Tween.get(img).to({ x: bagPosition.x, y: bagPosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img])
    // 			}));
    // 		}
    // 		else {
    // 			//弹出银两不足界面
    // 			mg.alertManager.tip(Language.J_GXBZ1, 0xFF0000);
    // 		}
    // 	}
    // }
    // private flyOverHandler(img: components.Icon) {
    // 	if (img) {
    // 		img.alpha = 1;
    // 		img.parent.removeChild(img);
    // 		utils.ObjectPool.to(img, true);
    // 	}
    // }
    // private rigthCallback(data: any): void {
    // 	// logger.log("22222222222222");
    // }
    LegionShopRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        // this.btnBuy.visible = true;
        // this.imgFinshBuy.visible = false;
        // if (this.data) {
        // 	if (mg.uiManager.getView(LegionShop).currentState == "daoju") {
        // 		let vo: vo.ShopVO = this.data;
        // 		this.lblgold.text = Language.J_XHGXZ + ":" + String(vo.getPrice())
        // 		// this.lblNum.text = "";
        // 		this.lblNum.text = vo.count.toString();
        // 		this.imgDiscount.visible = false
        // 		this.imgQuility.source = ResPath.getQuality(vo.quality)
        // 		this.imgIcon.source = ResPath.getItemIconKey(vo.icon);
        // 		if (vo.prompt) {
        // 			var str: string = "(" + vo.prompt + ")";
        // 			this.lblName.textFlow = (new egret.HtmlTextParser).parser(`<font color=${TypeQuality.getQualityColor(vo.quality)}>${vo.name}</font><font color=${0XC6B59E}>${str}</font>`);
        // 		}
        // 		else {
        // 			this.lblName.text = vo.name;
        // 			this.lblName.textColor = TypeQuality.getQualityColor(vo.quality);
        // 		}
        // 		if (vo.buyTotalCount == 0) {
        // 			this.labCount.text = "";
        // 		} else {
        // 			this.labCount.text = Language.C_XG + ":" + vo.buyCount + "/" + vo.buyTotalCount;
        // 		}
        // 		if (vo.buyCount != 0) {
        // 			this.labCount.textColor = 0x00FF00;
        // 		}
        // 		else {
        // 			this.labCount.textColor = 0xFF0000;
        // 		}
        // 	}
        // }
        // else {
        // 	this.imgIcon.source = null;
        // }
    };
    return LegionShopRenderer;
}(ui.LegionShopRendererSkin));
__reflect(LegionShopRenderer.prototype, "LegionShopRenderer");
