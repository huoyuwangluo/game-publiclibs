var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalSkillLv = (function () {
        function generalSkillLv() {
        }
        Object.defineProperty(generalSkillLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalSkillLv.prototype, "skillId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalSkillLv.prototype, "lv", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalSkillLv.prototype, "score", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalSkillLv.prototype, "consume", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalSkillLv.prototype, "nextId", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalSkillLv.prototype.decode = function (data) {
            this._data = data;
        };
        return generalSkillLv;
    }());
    templates.generalSkillLv = generalSkillLv;
    __reflect(generalSkillLv.prototype, "templates.generalSkillLv");
})(templates || (templates = {}));
