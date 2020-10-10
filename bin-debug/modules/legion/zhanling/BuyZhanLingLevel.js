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
var BuyZhanLingLevel = (function (_super) {
    __extends(BuyZhanLingLevel, _super);
    function BuyZhanLingLevel() {
        return _super.call(this) || this;
    }
    BuyZhanLingLevel.prototype.show = function () {
        this.textInputNum.text = "1";
        this.lblTatolPrice.text = "" + parseInt(this.textInputNum.text) * (200 * (GameModels.zhanling.pricePer / 100));
        this.labHint.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_GM1JSZ2J, this.textInputNum.text, parseInt(this.textInputNum.text) + GameModels.zhanling.currTemp.id));
        this.labHint0.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SZ1J, parseInt(this.textInputNum.text) + GameModels.zhanling.currTemp.id));
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.textInputNum.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        this.initData();
    };
    BuyZhanLingLevel.prototype.OnCharactorChange = function (event) {
        if (parseInt(this.textInputNum.text) <= 0) {
            this.textInputNum.text = "1";
        }
        if (parseInt(this.textInputNum.text) >= 100 - GameModels.zhanling.currTemp.id) {
            this.textInputNum.text = "" + (100 - GameModels.zhanling.currTemp.id);
        }
        this.lblTatolPrice.text = "" + parseInt(this.textInputNum.text) * (200 * (GameModels.zhanling.pricePer / 100));
        this.labHint.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_GM1JSZ2J, this.textInputNum.text, parseInt(this.textInputNum.text) + GameModels.zhanling.currTemp.id));
        this.labHint0.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SZ1J, parseInt(this.textInputNum.text) + GameModels.zhanling.currTemp.id));
        this.initData();
    };
    BuyZhanLingLevel.prototype.hide = function () {
        this.clearList(this.list);
        this.textInputNum.removeEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    BuyZhanLingLevel.prototype.onClick = function (e) {
        var _this = this;
        var num = parseInt(this.textInputNum.text);
        switch (e.target) {
            case this.btnBuy:
                if (GameModels.user.player.diamonds >= parseInt(this.lblTatolPrice.text)) {
                    GameModels.zhanling.buyBPLevel(parseInt(this.textInputNum.text), utils.Handler.create(this, function (data) {
                        mg.alertManager.tip(Language.J_GMCG);
                        _this.dispatchEventWith(egret.Event.CLOSE);
                    }));
                }
                else {
                    mg.alertManager.tip(Language.J_MSBZ);
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
                return;
        }
        this.textInputNum.text = "" + num;
        if (num <= 0) {
            this.textInputNum.text = "1";
        }
        if (num >= 100 - GameModels.zhanling.currTemp.id) {
            this.textInputNum.text = "" + (100 - GameModels.zhanling.currTemp.id);
        }
        this.labHint.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_GM1JSZ2J, this.textInputNum.text, parseInt(this.textInputNum.text) + GameModels.zhanling.currTemp.id));
        this.labHint0.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_SZ1J, parseInt(this.textInputNum.text) + GameModels.zhanling.currTemp.id));
        this.lblTatolPrice.text = "" + parseInt(this.textInputNum.text) * (200 * (GameModels.zhanling.pricePer / 100));
        this.initData();
    };
    BuyZhanLingLevel.prototype.initData = function () {
        var isBuyJinJieZl = GameModels.zhanling.stepOpen > 0;
        var list = Templates.getList(templates.Map.BATTLEPASS);
        var len = parseInt(this.textInputNum.text) + GameModels.zhanling.currTemp.id;
        var str = "";
        for (var i = GameModels.zhanling.currTemp.id; i < len; i++) {
            if (list[i]) {
                var s = "";
                if (isBuyJinJieZl) {
                    s = list[i].rewards1 + ";" + list[i].rewards2;
                }
                else {
                    s = list[i].rewards1;
                }
                if (str) {
                    str = str + ";" + s;
                }
                else {
                    str = s;
                }
            }
        }
        // logger.log("aaaaaaaaaaaa=",str);
        str = utils.htmlUtil.computeAttribute(str);
        // logger.log("bbbbbbbbbbbb=",str);
        var strArr = str.split(";");
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(strArr);
        }
        else {
            this._listData.source = strArr;
        }
        this.list.dataProvider = this._listData;
    };
    return BuyZhanLingLevel;
}(ui.BuyZhanLingLevelSkin));
__reflect(BuyZhanLingLevel.prototype, "BuyZhanLingLevel", ["IAlert", "egret.DisplayObject"]);
