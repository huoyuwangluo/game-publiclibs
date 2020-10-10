var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var KFTianTi = (function () {
        function KFTianTi() {
        }
        Object.defineProperty(KFTianTi.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "rank", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "resId", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "model", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "weaponId", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "score", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "rewards1", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(KFTianTi.prototype, "rewards2", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        KFTianTi.prototype.decode = function (data) {
            this._data = data;
        };
        return KFTianTi;
    }());
    templates.KFTianTi = KFTianTi;
    __reflect(KFTianTi.prototype, "templates.KFTianTi");
})(templates || (templates = {}));
