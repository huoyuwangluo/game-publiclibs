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
        /**国战选择部队驻守或者进攻 */
        var kingWarMapChooseArmy = (function (_super) {
            __extends(kingWarMapChooseArmy, _super);
            function kingWarMapChooseArmy() {
                return _super.call(this) || this;
            }
            Object.defineProperty(kingWarMapChooseArmy.prototype, "data", {
                set: function (data) {
                    this.showView();
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    // this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
                    GameModels.kingwar.addEventListener(mo.ModelKingWar.ARMY_CHANGE, this.showView, this);
                    GameModels.kingwar.addEventListener(mo.ModelKingWar.CITY_CHANGE, this.showView, this);
                },
                enumerable: true,
                configurable: true
            });
            kingWarMapChooseArmy.prototype.showView = function () {
                var voList = GameModels.kingwar.kingWarArmyVOArr;
                var data = [null, null, null];
                for (var i = 0; i < 3; i++) {
                    data[i] = voList[i];
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(data);
                }
                else {
                    this._listData.source = data;
                }
                this.list.dataProvider = this._listData;
            };
            kingWarMapChooseArmy.prototype.clickHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnBack:
                        mg.TipUpManager.instance.removeBlack();
                        this.removeSelf();
                        break;
                    case this.btnClose:
                        mg.TipUpManager.instance.removeBlack();
                        this.removeSelf();
                        break;
                }
            };
            kingWarMapChooseArmy.prototype.removeSelf = function () {
                mg.TipManager.instance.setCurrent();
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                // this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
                GameModels.kingwar.removeEventListener(mo.ModelKingWar.ARMY_CHANGE, this.showView, this);
                GameModels.kingwar.addEventListener(mo.ModelKingWar.CITY_CHANGE, this.showView, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return kingWarMapChooseArmy;
        }(ui.kingWarMapChooseArmySkin));
        kingwar.kingWarMapChooseArmy = kingWarMapChooseArmy;
        __reflect(kingWarMapChooseArmy.prototype, "dialog.kingwar.kingWarMapChooseArmy", ["ITipLogic", "egret.DisplayObject"]);
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));
