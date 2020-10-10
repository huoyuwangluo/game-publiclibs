var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var mergeGodBox = (function () {
        function mergeGodBox() {
        }
        Object.defineProperty(mergeGodBox.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeGodBox.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeGodBox.prototype, "itemId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeGodBox.prototype, "itemCount", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeGodBox.prototype, "minLv", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeGodBox.prototype, "maxLv", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeGodBox.prototype, "weight", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeGodBox.prototype, "isShow", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        mergeGodBox.prototype.decode = function (data) {
            this._data = data;
        };
        return mergeGodBox;
    }());
    templates.mergeGodBox = mergeGodBox;
    __reflect(mergeGodBox.prototype, "templates.mergeGodBox");
})(templates || (templates = {}));
