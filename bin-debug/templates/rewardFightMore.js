var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var rewardFightMore = (function () {
        function rewardFightMore() {
        }
        Object.defineProperty(rewardFightMore.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardFightMore.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardFightMore.prototype, "boxStep", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardFightMore.prototype, "boxLv", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardFightMore.prototype, "kills", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(rewardFightMore.prototype, "rewards", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        rewardFightMore.prototype.decode = function (data) {
            this._data = data;
        };
        return rewardFightMore;
    }());
    templates.rewardFightMore = rewardFightMore;
    __reflect(rewardFightMore.prototype, "templates.rewardFightMore");
})(templates || (templates = {}));
