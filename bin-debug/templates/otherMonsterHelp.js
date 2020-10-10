var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var otherMonsterHelp = (function () {
        function otherMonsterHelp() {
        }
        Object.defineProperty(otherMonsterHelp.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(otherMonsterHelp.prototype, "chapterId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(otherMonsterHelp.prototype, "monsterId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(otherMonsterHelp.prototype, "rank", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(otherMonsterHelp.prototype, "des", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        otherMonsterHelp.prototype.decode = function (data) {
            this._data = data;
        };
        return otherMonsterHelp;
    }());
    templates.otherMonsterHelp = otherMonsterHelp;
    __reflect(otherMonsterHelp.prototype, "templates.otherMonsterHelp");
})(templates || (templates = {}));
