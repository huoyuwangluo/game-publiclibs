var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var wanted = (function () {
        function wanted() {
        }
        Object.defineProperty(wanted.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wanted.prototype, "triggerChapter", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wanted.prototype, "missionTarget", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wanted.prototype, "rewards", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        wanted.prototype.decode = function (data) {
            this._data = data;
        };
        return wanted;
    }());
    templates.wanted = wanted;
    __reflect(wanted.prototype, "templates.wanted");
})(templates || (templates = {}));
