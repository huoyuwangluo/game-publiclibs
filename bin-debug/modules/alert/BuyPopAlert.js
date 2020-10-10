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
var BuyPopAlert = (function (_super) {
    __extends(BuyPopAlert, _super);
    function BuyPopAlert() {
        return _super.call(this) || this;
    }
    BuyPopAlert.prototype.show = function (data, shopType, buyFun) {
        if (buyFun === void 0) { buyFun = null; }
        this._tatolPrice = 0;
        this._canBuyCount = 0;
        this._data = data;
        this._type = shopType;
        this._buyHandler = buyFun;
        this.initData();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.textInputNum.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        // this.requestUpdate();
    };
    BuyPopAlert.prototype.OnCharactorChange = function (event) {
        var num = Number(this.textInputNum.text);
        if (this.textInputNum.text == "" || num < 1) {
            this.textInputNum.text = "0";
            num = 0;
        }
        else if (num > 999) {
            this.textInputNum.text = "999";
            num = 999;
        }
        else if (num > this._canBuyCount - this._data.toDayBuyTimes) {
            mg.alertManager.tip(Language.J_QTSVIPZJXGCS);
            num = this._canBuyCount - this._data.toDayBuyTimes;
        }
        this.textInputNum.text = num.toString();
        var price = this.getPriceBuyCount(num);
        this.lblTatolPrice.text = price.toString();
        this._tatolPrice = Number(this.lblTatolPrice.text);
    };
    BuyPopAlert.prototype.getPriceBuyCount = function (count) {
        var index = 0;
        var price = 0;
        var vo = this._data;
        var buyCount = 0;
        if (vo.toDayBuyTimes > 0) {
            buyCount = vo.toDayBuyTimes + 1;
            count += vo.toDayBuyTimes;
        }
        else {
            buyCount = 1;
        }
        for (var z = buyCount; z <= count; z++) {
            var num1 = GameModels.shop.getPriceBuyTodayBuyTimes(vo.itemID, z) * vo.getPrice();
            price += num1;
        }
        return price;
    };
    BuyPopAlert.prototype.hide = function () {
        this.textInputNum.text = "1";
        this.textInputNum.removeEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this._data = null;
        this._tatolPrice = 0;
        if (this._buyHandler) {
            this._buyHandler.recover();
            this._buyHandler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.imgIcon.source = null;
    };
    BuyPopAlert.prototype.onClick = function (e) {
        var num = Number(this.textInputNum.text);
        this._tatolPrice = Number(this.lblTatolPrice.text);
        switch (e.target) {
            case this.btnBuy:
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (this._buyHandler) {
                    this._buyHandler.runWith({ data: this._data, tatolPrice: this._tatolPrice, type: this._type, count: num });
                    this.dispatchEventWith(egret.Event.CLOSE);
                    return;
                }
                break;
            case this.btnJiaTen:
                num = num + 10;
                break;
            case this.btnJianTen:
                num = num - 10;
                break;
            case this.btnJia:
                num = num + 1;
                break;
            case this.btnJian:
                num = num - 1;
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
        if (this.textInputNum.text == "" || num < 1) {
            this.textInputNum.text = "0";
            num = 0;
        }
        else if (num > 999) {
            this.textInputNum.text = "999";
            num = 999;
        }
        else if (num > this._canBuyCount - this._data.toDayBuyTimes) {
            mg.alertManager.tip(Language.J_QTSVIPZJXGCS);
            num = this._canBuyCount - this._data.toDayBuyTimes;
        }
        this.textInputNum.text = String(num);
        var price = this.getPriceBuyCount(num);
        this.lblTatolPrice.text = price.toString();
        this._tatolPrice = Number(this.lblTatolPrice.text);
    };
    BuyPopAlert.prototype.initData = function () {
        var vo = this._data;
        if (vo) {
            this.btnBuy.filters = null;
            this.btnBuy.touchEnabled = true;
            this.labHint.visible = false;
            this.imgSale.visible = false;
            this.imgQuality.source = ResPath.getQuality(vo.quality);
            this.labName.text = vo.name;
            this.lblCount.text = vo.count.toString();
            this.imgIcon.source = ResPath.getItemIconKey(vo.icon);
            this.imgTatolPayType.source = ResPath.getItemIconKey(vo.getPayType());
            var num = 1;
            if (GameModels.user.player.vip > 0) {
                this._canBuyCount = 0;
                this.imgSale.visible = true;
                this.imgSale.source = "vip_json.img_vip_" + GameModels.user.player.vip;
            }
            else {
                this._canBuyCount = 2; //默认两次
            }
            var num = Number(this.textInputNum.text);
            if (num >= (this._canBuyCount - vo.toDayBuyTimes)) {
                this.textInputNum.text = (this._canBuyCount - vo.toDayBuyTimes).toString();
                num = this._canBuyCount - vo.toDayBuyTimes;
            }
            if (num <= 0) {
                this.btnBuy.filters = utils.filterUtil.grayFilters;
                this.btnBuy.touchEnabled = false;
                this.labHint.visible = true;
            }
            this.lblTatolPrice.text = this.getPriceBuyCount(num).toString();
            this.textInputNum.text = num.toString();
            this.labCount.text = "(" + Language.C_SYGMCS + (this._canBuyCount - vo.toDayBuyTimes) + ")";
        }
    };
    return BuyPopAlert;
}(ui.MallBuyPopSkin));
__reflect(BuyPopAlert.prototype, "BuyPopAlert", ["IAlert", "egret.DisplayObject"]);
