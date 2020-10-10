var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var battlePass = (function () {
        function battlePass() {
        }
        Object.defineProperty(battlePass.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(battlePass.prototype, "level", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(battlePass.prototype, "nextLevle", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(battlePass.prototype, "needExp", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(battlePass.prototype, "season", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(battlePass.prototype, "rewards1", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(battlePass.prototype, "rewards2", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        battlePass.prototype.decode = function (data) {
            this._data = data;
        };
        return battlePass;
    }());
    templates.battlePass = battlePass;
    __reflect(battlePass.prototype, "templates.battlePass");
})(templates || (templates = {}));
