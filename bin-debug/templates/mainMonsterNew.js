var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var mainMonsterNew = (function () {
        function mainMonsterNew() {
        }
        Object.defineProperty(mainMonsterNew.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMonsterNew.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMonsterNew.prototype, "general", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMonsterNew.prototype, "name", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMonsterNew.prototype, "lv", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMonsterNew.prototype, "star", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mainMonsterNew.prototype, "properties", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        mainMonsterNew.prototype.decode = function (data) {
            this._data = data;
        };
        return mainMonsterNew;
    }());
    templates.mainMonsterNew = mainMonsterNew;
    __reflect(mainMonsterNew.prototype, "templates.mainMonsterNew");
})(templates || (templates = {}));
