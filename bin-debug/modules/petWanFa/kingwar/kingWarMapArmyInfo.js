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
        /**国战部队信息 */
        var kingWarMapArmyInfo = (function (_super) {
            __extends(kingWarMapArmyInfo, _super);
            function kingWarMapArmyInfo() {
                return _super.call(this) || this;
            }
            kingWarMapArmyInfo.prototype.show = function () {
                this.showView();
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.kingwar.addEventListener(mo.ModelKingWar.ARMY_CHANGE, this.showView, this);
            };
            kingWarMapArmyInfo.prototype.showView = function () {
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
            kingWarMapArmyInfo.prototype.clickHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnBack:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                    case this.btnClose:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                }
            };
            kingWarMapArmyInfo.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                GameModels.kingwar.removeEventListener(mo.ModelKingWar.ARMY_CHANGE, this.showView, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return kingWarMapArmyInfo;
        }(ui.kingWarMapArmyInfoSkin));
        kingwar.kingWarMapArmyInfo = kingWarMapArmyInfo;
        __reflect(kingWarMapArmyInfo.prototype, "dialog.kingwar.kingWarMapArmyInfo", ["IAlert", "egret.DisplayObject"]);
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));
