var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var weekCard = (function () {
        function weekCard() {
        }
        Object.defineProperty(weekCard.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(weekCard.prototype, "rewards1", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(weekCard.prototype, "rewards2", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(weekCard.prototype, "rewards3", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        weekCard.prototype.decode = function (data) {
            this._data = data;
        };
        return weekCard;
    }());
    templates.weekCard = weekCard;
    __reflect(weekCard.prototype, "templates.weekCard");
})(templates || (templates = {}));
