var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var heroPhantomActivation = (function () {
        function heroPhantomActivation() {
        }
        Object.defineProperty(heroPhantomActivation.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomActivation.prototype, "heroPhantomId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomActivation.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomActivation.prototype, "needVIP", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomActivation.prototype, "needDay", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomActivation.prototype, "component", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomActivation.prototype, "partID", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomActivation.prototype, "phantomSkillId", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        heroPhantomActivation.prototype.decode = function (data) {
            this._data = data;
        };
        return heroPhantomActivation;
    }());
    templates.heroPhantomActivation = heroPhantomActivation;
    __reflect(heroPhantomActivation.prototype, "templates.heroPhantomActivation");
})(templates || (templates = {}));
