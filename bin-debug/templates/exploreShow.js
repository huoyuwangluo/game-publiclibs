var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var exploreShow = (function () {
        function exploreShow() {
        }
        Object.defineProperty(exploreShow.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(exploreShow.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(exploreShow.prototype, "showItem", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        exploreShow.prototype.decode = function (data) {
            this._data = data;
        };
        return exploreShow;
    }());
    templates.exploreShow = exploreShow;
    __reflect(exploreShow.prototype, "templates.exploreShow");
})(templates || (templates = {}));
