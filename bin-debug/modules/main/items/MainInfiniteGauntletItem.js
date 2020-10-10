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
var item;
(function (item) {
    var MainInfiniteGauntletItem = (function (_super) {
        __extends(MainInfiniteGauntletItem, _super);
        function MainInfiniteGauntletItem() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            return _this;
        }
        MainInfiniteGauntletItem.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        MainInfiniteGauntletItem.prototype.reset = function () {
            this.lab.textFlow = null;
        };
        Object.defineProperty(MainInfiniteGauntletItem.prototype, "content", {
            set: function (value) {
                this.lab.textFlow = utils.TextFlowMaker.generateTextFlow(value);
            },
            enumerable: true,
            configurable: true
        });
        return MainInfiniteGauntletItem;
    }(ui.MainInfiniteGauntletItemSkin));
    item.MainInfiniteGauntletItem = MainInfiniteGauntletItem;
    __reflect(MainInfiniteGauntletItem.prototype, "item.MainInfiniteGauntletItem", ["utils.IPool"]);
})(item || (item = {}));
