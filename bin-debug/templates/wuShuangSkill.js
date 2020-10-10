var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var wuShuangSkill = (function () {
        function wuShuangSkill() {
        }
        Object.defineProperty(wuShuangSkill.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuShuangSkill.prototype, "skillId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuShuangSkill.prototype, "pos", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuShuangSkill.prototype, "lv", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuShuangSkill.prototype, "needLv", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuShuangSkill.prototype, "score", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuShuangSkill.prototype, "consume", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(wuShuangSkill.prototype, "nextId", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        wuShuangSkill.prototype.decode = function (data) {
            this._data = data;
        };
        return wuShuangSkill;
    }());
    templates.wuShuangSkill = wuShuangSkill;
    __reflect(wuShuangSkill.prototype, "templates.wuShuangSkill");
})(templates || (templates = {}));
