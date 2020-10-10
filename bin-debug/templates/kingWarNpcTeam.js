var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var kingWarNpcTeam = (function () {
        function kingWarNpcTeam() {
        }
        Object.defineProperty(kingWarNpcTeam.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(kingWarNpcTeam.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(kingWarNpcTeam.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(kingWarNpcTeam.prototype, "monsterID", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(kingWarNpcTeam.prototype, "monsterLevel", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(kingWarNpcTeam.prototype, "gradient", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        kingWarNpcTeam.prototype.decode = function (data) {
            this._data = data;
        };
        return kingWarNpcTeam;
    }());
    templates.kingWarNpcTeam = kingWarNpcTeam;
    __reflect(kingWarNpcTeam.prototype, "templates.kingWarNpcTeam");
})(templates || (templates = {}));
