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
        /**国战大地图 */
        var kingWarMap = (function (_super) {
            __extends(kingWarMap, _super);
            function kingWarMap() {
                return _super.call(this) || this;
            }
            kingWarMap.prototype.initialize = function () {
                this._itemArr = [];
            };
            kingWarMap.prototype.showView = function () {
                var kingWarCityVo = GameModels.kingwar.kingWarCityVOArr;
                for (var i = 0; i < kingWarCityVo.length; i++) {
                    var item = new kingwar.kingWarMapItem();
                    this.addChild(item);
                    item.anchorOffsetX = 120 / 2 - 10;
                    item.anchorOffsetY = 138 / 2 + 10;
                    item.x = parseInt(kingWarCityVo[i].cityTemp.cityPos.split(";")[0]);
                    item.y = parseInt(kingWarCityVo[i].cityTemp.cityPos.split(";")[1]);
                    item.dataSource = kingWarCityVo[i];
                    item.validateNow();
                    this._itemArr.push(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.validateNow();
            };
            kingWarMap.prototype.updataView = function () {
                var kingWarCityVo = GameModels.kingwar.kingWarCityVOArr;
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].dataSource = kingWarCityVo[i];
                }
            };
            kingWarMap.prototype.cleanView = function () {
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].dataSource = null;
                    this._itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this._itemArr.length = 0;
            };
            Object.defineProperty(kingWarMap.prototype, "currCity", {
                get: function () {
                    for (var i = 0; i < this._itemArr.length; i++) {
                        var kingWarCityVo = this._itemArr[i].dataSource;
                        if (kingWarCityVo.cityTemp.type == 1 && kingWarCityVo.cityTemp.areaCountry == parseInt(GameModels.user.player.legionId)) {
                            return this._itemArr[i];
                        }
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            kingWarMap.prototype.getCurrCityByCityID = function (v) {
                for (var i = 0; i < this._itemArr.length; i++) {
                    var kingWarCityVo = this._itemArr[i].dataSource;
                    if (kingWarCityVo && kingWarCityVo.cityTemp.id == v) {
                        return this._itemArr[i];
                    }
                }
                return null;
            };
            kingWarMap.prototype.onBtnClick = function (e) {
                for (var i = 0; i < this._itemArr.length; i++) {
                    if (e.currentTarget == this._itemArr[i]) {
                        var vo = this._itemArr[i].dataSource;
                        mg.alertManager.showAlert(dialog.kingwar.kingWarMapAtt, true, true, vo);
                    }
                }
            };
            return kingWarMap;
        }(ui.kingWarMapSkin));
        kingwar.kingWarMap = kingWarMap;
        __reflect(kingWarMap.prototype, "dialog.kingwar.kingWarMap");
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));
