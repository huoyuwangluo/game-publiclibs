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
var MallSkillRenderer = (function (_super) {
    __extends(MallSkillRenderer, _super);
    function MallSkillRenderer() {
        var _this = _super.call(this) || this;
        _this.register();
        return _this;
    }
    MallSkillRenderer.prototype.register = function () {
        this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyClick, this);
        this.iconGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.desClick, this);
    };
    MallSkillRenderer.prototype.buyClick = function () {
        var _this = this;
        if (utils.CheckUtil.checkBagSmelting())
            return;
        if (mg.uiManager.getView(MallScene).currentState == "duihuan") {
            var vo_1 = this.data;
            if (vo_1.getPrice() <= GameModels.user.player.getProperty(TypeProperty.GUANXING_JIFEN)) {
                GameModels.changeShop.requestItemBuy(vo_1.shopid.toString(), 1, vo_1.type, utils.Handler.create(this, function (data) {
                    //购买成功
                    this.flyBagItem();
                    this.updateDisplayRongyu();
                }));
            }
            else {
                mg.alertManager.tip(Language.J_JFBZ, 0xFF0000);
            }
        }
        else if (mg.uiManager.getView(MallScene).currentState == "mingjiang") {
            var item_1 = this.data;
            if (item_1.getPrice() <= GameModels.bag.getItemCountById(ConfigData.MINGJIANG_ITEM)) {
                GameModels.changeShop.requestItemBuy(item_1.shopid.toString(), 1, item_1.type, utils.Handler.create(this, function (data) {
                    //购买成功
                    this.flyBagItem();
                    this.updateDisplayRongyu();
                }));
            }
            else {
                mg.alertManager.tip(Language.J_DJBZ, 0xFF0000);
            }
        }
        else if (mg.uiManager.getView(MallScene).currentState == "shenbing") {
            var tempShop = this.data;
            if (parseInt(tempShop.consume.split("_")[1]) <= GameModels.bag.getItemCountById(ConfigData.SHENBING_DUIHUAN)) {
                GameModels.smithy.requestSmithyBuyShenBingItem(tempShop.id, utils.Handler.create(this, function () {
                    //购买成功
                    this.flyBagItem();
                }));
            }
            else {
                mg.alertManager.tip(Language.J_DJBZ, 0xFF0000);
            }
        }
        else if (mg.uiManager.getView(MallScene).currentState == "shenmi") {
            var mysteryVo = this.data;
            GameModels.shop.requestBuyShenMiShop(mysteryVo.index, utils.Handler.create(this, function () {
                //购买成功
                _this.flyBagItem();
            }));
        }
        else {
            var item_2 = this.data;
            GameModels.changeShop.requestItemBuy(item_2.shopid.toString(), 1, item_2.type, utils.Handler.create(this, function (data) {
                //购买成功
                this.flyBagItem();
                this.updateDisplayRongyu();
            }));
        }
    };
    MallSkillRenderer.prototype.flyBagItem = function () {
        var rewardArr = this._str.split(";");
        mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
    };
    MallSkillRenderer.prototype.rigthCallback = function (data) {
        GameModels.recharge.openRechargeDialog();
    };
    MallSkillRenderer.prototype.desClick = function (e) {
        if (this.data instanceof vo.ShopVO) {
            var vo_2 = this.data;
            if (Math.floor(parseInt(this.data.template.id) / 100) == 130) {
                var pet = Templates.getTemplateById(templates.Map.GENERAL, this.data.template.id);
                if (pet)
                    mg.TipManager.instance.showTip(tips.GeneralInfoTip, pet);
            }
            else {
                mg.TipManager.instance.showTip(tips.PropTip, { count: vo_2.count, templateProp: vo_2.templateProp });
            }
        }
        else if (this.data instanceof vo.ShopMysteryVo) {
            var mysteryVo = this.data;
            mg.TipManager.instance.showTip(tips.PropTip, { count: mysteryVo.count, templateProp: mysteryVo.templateProp });
        }
        else {
            var tempShop = this.data;
            mg.TipManager.instance.showTip(tips.PropTip, { count: 1, templateProp: Templates.getTemplateById(templates.Map.ITEM, tempShop.itemId) });
        }
    };
    MallSkillRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.btnBuy.visible = true;
        this.img_buy.visible = false;
        this.imgDiscount.visible = false;
        this.labCount.text = "";
        this.labCount.textColor = null;
        this._canBuyCount = 0;
        this.btnBuy.filters = null;
        this.btnBuy.touchEnabled = true;
        this.img_xianGou.visible = false;
        this.imgXiYou.visible = false;
        this._str = "";
        if (this.data) {
            if (this.data instanceof vo.ShopVO) {
                this.showShop();
            }
            else if (this.data instanceof vo.ShopMysteryVo) {
                this.showMysteryShop();
            }
            else {
                this.showShenBing();
            }
        }
        else {
            this.imgIcon.source = null;
        }
    };
    MallSkillRenderer.prototype.showMysteryShop = function () {
        var shopVO = this.data;
        this.lblName.text = shopVO.shopName;
        if (shopVO.discount < 100) {
            this.imgDiscount.visible = true;
            this.imgDiscount.source = "vip_json.img_zheKou_" + ((shopVO.discount / 10) % 10);
        }
        var tmp = Templates.getTemplateById(templates.Map.ITEM, shopVO.itemID);
        this.imgIcon.source = tmp.icon;
        this.imgQuility.source = ResPath.getQuality(tmp.quality);
        this.lblName.textColor = TypeQuality.getQualityColor(tmp.quality);
        this.lblNum.text = shopVO.count + "";
        this._str = shopVO.itemID + "_" + shopVO.count;
        this.imgPayType.source = ResPath.getItemIconKey(shopVO.getconsumesId());
        this.lblgold.text = convert.formatGold(shopVO.getPrice());
        this.labTitle.text = "";
        this.btnBuy.visible = shopVO.shopValue == 0;
        this.img_buy.visible = shopVO.shopValue == 1;
        this.imgXiYou.visible = shopVO.shopQuality > 5;
    };
    MallSkillRenderer.prototype.showShenBing = function () {
        var tempShop = this.data;
        this.lblgold.text = tempShop.consume.split("_")[1];
        this.lblNum.text = "" + 1;
        this._str = tempShop.itemId + "_" + 1;
        var tmp = Templates.getTemplateById(templates.Map.ITEM, tempShop.itemId);
        this.imgIcon.source = tmp.icon;
        this.imgQuility.source = ResPath.getQuality(tmp.quality);
        this.lblName.text = tmp.name;
        this.lblName.textColor = TypeQuality.getQualityColor(tmp.quality);
        this.imgPayType.source = ResPath.getItemIconKey(tempShop.consume.split("_")[0]);
        this.labTitle.text = "";
    };
    MallSkillRenderer.prototype.showShop = function () {
        var shopVO = this.data;
        this.lblgold.text = String(shopVO.getPrice());
        this.lblNum.text = shopVO.count.toString();
        this._str = shopVO.itemID + "_" + shopVO.count;
        this.imgPayType.source = ResPath.getItemIconKey(shopVO.getPayType());
        this.imgQuility.source = ResPath.getQuality(shopVO.quality);
        this.setLabTitleData(shopVO.prompt);
        if (shopVO.name) {
            this.lblName.text = shopVO.name;
            this.lblName.textColor = TypeQuality.getQualityColor(shopVO.quality);
        }
        if (TypeItem.checkIsPetTypeOrPetSuiTyp(shopVO.template.type)) {
            var tem = Templates.getTemplateById(templates.Map.GENERAL, shopVO.template.type == TypeItem.PET_SUI ? shopVO.template.nextId : shopVO.template.id);
            this.imgQuility.source = ResPath.getPetQualityByStar(tem.star, GameModels.pet.isHashFourSkill(tem.id));
            this.lblName.textColor = TypeQuality.getStarColor(tem.star);
        }
        // if (shopVO.prompt) {
        // 	this.labTitle.text = "(" + shopVO.prompt + ")";
        // } else {
        this.labTitle.text = "";
        // }
        this.imgIcon.source = ResPath.getItemIconKey(shopVO.icon);
        this.updateDisplayRongyu();
        // if (mg.uiManager.getView(MallScene).currentState == "duihuan") {
        // 	this.updateDisplayRongyu();
        // }
        // else if (mg.uiManager.getView(MallScene).currentState == "mingjiang") {
        // 	this.updateDisplayRongyu();
        // }
    };
    MallSkillRenderer.prototype.updateDisplayRongyu = function () {
        var shopVO = this.data;
        if (shopVO.buyTotalCount == 0) {
            this.labCount.text = "";
        }
        else {
            this.labCount.text = Language.C_XG + " : " + shopVO.buyCount + "/" + shopVO.buyTotalCount;
        }
        if (shopVO.buyCount != 0) {
            this.labCount.textColor = 0x00FF00;
        }
        else {
            this.labCount.textColor = 0xFF0000;
        }
    };
    MallSkillRenderer.prototype.setLabTitleData = function (data) {
        // if (data) {
        // 	this.labTitle.text = "(" + data + ")";
        // }
        // else {
        this.labTitle.text = "";
        // }
    };
    return MallSkillRenderer;
}(ui.MallSkillRendererSkin));
__reflect(MallSkillRenderer.prototype, "MallSkillRenderer");
