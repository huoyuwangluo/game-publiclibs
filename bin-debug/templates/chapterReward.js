var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var chapterReward = (function () {
        function chapterReward() {
        }
        Object.defineProperty(chapterReward.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(chapterReward.prototype, "chapterId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(chapterReward.prototype, "order", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(chapterReward.prototype, "rewards", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        chapterReward.prototype.decode = function (data) {
            this._data = data;
        };
        return chapterReward;
    }());
    templates.chapterReward = chapterReward;
    __reflect(chapterReward.prototype, "templates.chapterReward");
})(templates || (templates = {}));
