var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var personalGiftCond = (function () {
        function personalGiftCond() {
        }
        Object.defineProperty(personalGiftCond.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(personalGiftCond.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(personalGiftCond.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(personalGiftCond.prototype, "tringgerType", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(personalGiftCond.prototype, "needVip", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(personalGiftCond.prototype, "playerLevel", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(personalGiftCond.prototype, "paraml", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(personalGiftCond.prototype, "giftId", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        personalGiftCond.prototype.decode = function (data) {
            this._data = data;
        };
        return personalGiftCond;
    }());
    templates.personalGiftCond = personalGiftCond;
    __reflect(personalGiftCond.prototype, "templates.personalGiftCond");
})(templates || (templates = {}));
