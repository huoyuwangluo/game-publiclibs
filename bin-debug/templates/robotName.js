var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var robotName = (function () {
        function robotName() {
        }
        Object.defineProperty(robotName.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(robotName.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        robotName.prototype.decode = function (data) {
            this._data = data;
        };
        return robotName;
    }());
    templates.robotName = robotName;
    __reflect(robotName.prototype, "templates.robotName");
})(templates || (templates = {}));
