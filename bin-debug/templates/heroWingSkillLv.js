var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var heroWingSkillLv = (function () {
        function heroWingSkillLv() {
        }
        Object.defineProperty(heroWingSkillLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "lv", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "nextId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "talent", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "score", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "num", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroWingSkillLv.prototype, "consume", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        heroWingSkillLv.prototype.decode = function (data) {
            this._data = data;
        };
        return heroWingSkillLv;
    }());
    templates.heroWingSkillLv = heroWingSkillLv;
    __reflect(heroWingSkillLv.prototype, "templates.heroWingSkillLv");
})(templates || (templates = {}));
