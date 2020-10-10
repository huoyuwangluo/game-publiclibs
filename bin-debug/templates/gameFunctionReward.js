var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var gameFunctionReward = (function () {
        function gameFunctionReward() {
        }
        Object.defineProperty(gameFunctionReward.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(gameFunctionReward.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(gameFunctionReward.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(gameFunctionReward.prototype, "time", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(gameFunctionReward.prototype, "functionId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(gameFunctionReward.prototype, "order", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(gameFunctionReward.prototype, "value", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(gameFunctionReward.prototype, "rewards", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        gameFunctionReward.prototype.decode = function (data) {
            this._data = data;
        };
        return gameFunctionReward;
    }());
    templates.gameFunctionReward = gameFunctionReward;
    __reflect(gameFunctionReward.prototype, "templates.gameFunctionReward");
})(templates || (templates = {}));
