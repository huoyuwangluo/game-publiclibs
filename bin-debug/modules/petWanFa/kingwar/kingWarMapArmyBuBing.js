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
var dialog;
(function (dialog) {
    var kingwar;
    (function (kingwar) {
        /**国战补兵 */
        var kingWarMapArmyBuBing = (function (_super) {
            __extends(kingWarMapArmyBuBing, _super);
            function kingWarMapArmyBuBing() {
                return _super.call(this) || this;
            }
            Object.defineProperty(kingWarMapArmyBuBing.prototype, "data", {
                //data:vo,index:this.itemIndex+1
                set: function (data) {
                    this._data = data.data;
                    this._count = 1;
                    this.textInputNum.text = "1";
                    this.labBingLi.text = this._data.tameBingLi + "";
                    this.labBingLi0.text = (this._data.tameBingLi + this._count) + "";
                    this.showView();
                    // GameModels.kingwar.addEventListener(mo.ModelKingWar.ARMY_CHANGE, this.showView, this);
                    this.btnBuBing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnJiaTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnJianTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.textInputNum.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
                    this.getData.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                },
                enumerable: true,
                configurable: true
            });
            kingWarMapArmyBuBing.prototype.OnCharactorChange = function (event) {
                this._count = Number(this.textInputNum.text);
                if (this.textInputNum.text == "" || this._count < 1) {
                    this._count = 1;
                }
                else if (this._count > (100 - this._data.tameBingLi)) {
                    this._count = (100 - this._data.tameBingLi);
                }
                this.textInputNum.text = this._count.toString();
                this.labBingLi0.text = (this._data.tameBingLi + this._count) + "";
                this.showView();
            };
            kingWarMapArmyBuBing.prototype.showBuyCount = function () {
                if (this._count < 1) {
                    this._count = 1;
                }
                else if (this._count > (100 - this._data.tameBingLi)) {
                    this._count = (100 - this._data.tameBingLi);
                }
                this.textInputNum.text = this._count.toString();
                this.labBingLi0.text = (this._data.tameBingLi + this._count) + "";
                this.showView();
            };
            kingWarMapArmyBuBing.prototype.showView = function () {
                var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.BUBING_ITEM);
                this.imgXiaoHao.source = item.icon;
                this.labNeedName.text = item.name;
                this.labXiaoHaoCount.text = GameModels.bag.getItemCountById(ConfigData.BUBING_ITEM) + "/" + this._count;
                this.labXiaoHaoCount.textColor = GameModels.bag.getItemCountById(ConfigData.BUBING_ITEM) >= this._count ? 0x00ff00 : 0xff0000;
            };
            kingWarMapArmyBuBing.prototype.clickHandler = function (e) {
                switch (e.currentTarget) {
                    case this.getData:
                        mg.alertManager.tip(Language.J_JGSCHMZTHHD);
                        break;
                    case this.btnJia:
                        this._count++;
                        this.showBuyCount();
                        break;
                    case this.btnJian:
                        this._count--;
                        this.showBuyCount();
                        break;
                    case this.btnJiaTen:
                        this._count = this._count + 10;
                        this.showBuyCount();
                        break;
                    case this.btnJianTen:
                        this._count = this._count - 10;
                        this.showBuyCount();
                        break;
                    case this.btnBuBing:
                        GameModels.kingwar.requestAddBingLi(this._data.armyId, this._count);
                        mg.TipUpManager.instance.removeBlack();
                        this.removeSelf();
                        break;
                }
            };
            kingWarMapArmyBuBing.prototype.removeSelf = function () {
                // GameModels.kingwar.removeEventListener(mo.ModelKingWar.ARMY_CHANGE, this.showView, this);
                this.btnBuBing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnJiaTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnJianTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.textInputNum.removeEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
                this.getData.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                mg.TipUpManager.instance.setCurrent();
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return kingWarMapArmyBuBing;
        }(ui.kingWarMapArmyBuBingSkin));
        kingwar.kingWarMapArmyBuBing = kingWarMapArmyBuBing;
        __reflect(kingWarMapArmyBuBing.prototype, "dialog.kingwar.kingWarMapArmyBuBing", ["ITipLogic", "egret.DisplayObject"]);
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));
