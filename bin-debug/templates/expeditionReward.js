var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var expeditionReward = (function () {
        function expeditionReward() {
        }
        Object.defineProperty(expeditionReward.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(expeditionReward.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(expeditionReward.prototype, "round", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(expeditionReward.prototype, "order", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(expeditionReward.prototype, "rewards", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        expeditionReward.prototype.decode = function (data) {
            this._data = data;
        };
        return expeditionReward;
    }());
    templates.expeditionReward = expeditionReward;
    __reflect(expeditionReward.prototype, "templates.expeditionReward");
})(templates || (templates = {}));
