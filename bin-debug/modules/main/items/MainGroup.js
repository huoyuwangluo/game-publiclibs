var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var main;
(function (main) {
    var MainGroup = (function () {
        function MainGroup(view, group) {
            if (group === void 0) { group = null; }
            this._view = view;
            this._group = group;
        }
        MainGroup.prototype.addChild = function (object) {
            if (this._group)
                this._group.addChild(object);
        };
        MainGroup.prototype.removeChild = function (object) {
            if (this._group)
                this._group.removeChild(object);
        };
        Object.defineProperty(MainGroup.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });
        MainGroup.prototype.add = function () {
            if (this._group && !this._group.parent) {
                this._view.addChild(this._group);
            }
        };
        MainGroup.prototype.remove = function () {
            if (this._group && this._group.parent) {
                this._view.removeChild(this._group);
            }
        };
        return MainGroup;
    }());
    main.MainGroup = MainGroup;
    __reflect(MainGroup.prototype, "main.MainGroup");
})(main || (main = {}));
