var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var vipReward = (function () {
        function vipReward() {
        }
        Object.defineProperty(vipReward.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(vipReward.prototype, "vip", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(vipReward.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(vipReward.prototype, "dailyRewards", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        vipReward.prototype.decode = function (data) {
            this._data = data;
        };
        return vipReward;
    }());
    templates.vipReward = vipReward;
    __reflect(vipReward.prototype, "templates.vipReward");
})(templates || (templates = {}));
