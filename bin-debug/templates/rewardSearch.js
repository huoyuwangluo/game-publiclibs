var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var rewardSearch = (function () {
        function rewardSearch() {
        }
        Object.defineProperty(rewardSearch.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardSearch.prototype, "duration", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardSearch.prototype, "talk", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardSearch.prototype, "rewards", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        rewardSearch.prototype.decode = function (data) {
            this._data = data;
        };
        return rewardSearch;
    }());
    templates.rewardSearch = rewardSearch;
    __reflect(rewardSearch.prototype, "templates.rewardSearch");
})(templates || (templates = {}));
