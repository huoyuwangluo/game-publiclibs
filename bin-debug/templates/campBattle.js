var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var campBattle = (function () {
        function campBattle() {
        }
        Object.defineProperty(campBattle.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(campBattle.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(campBattle.prototype, "initBelong", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(campBattle.prototype, "isPeace", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        campBattle.prototype.decode = function (data) {
            this._data = data;
        };
        return campBattle;
    }());
    templates.campBattle = campBattle;
    __reflect(campBattle.prototype, "templates.campBattle");
})(templates || (templates = {}));
