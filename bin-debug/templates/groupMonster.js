var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var groupMonster = (function () {
        function groupMonster() {
        }
        Object.defineProperty(groupMonster.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(groupMonster.prototype, "groupId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(groupMonster.prototype, "monsterPos", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(groupMonster.prototype, "preHP", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(groupMonster.prototype, "preATT", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(groupMonster.prototype, "preDEF", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        groupMonster.prototype.decode = function (data) {
            this._data = data;
        };
        return groupMonster;
    }());
    templates.groupMonster = groupMonster;
    __reflect(groupMonster.prototype, "templates.groupMonster");
})(templates || (templates = {}));
