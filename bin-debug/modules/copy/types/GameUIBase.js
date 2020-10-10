var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var copy;
(function (copy) {
    var GameUIBase = (function () {
        function GameUIBase() {
            this.ui = copy.CopyMainView.instance;
        }
        GameUIBase.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        GameUIBase.prototype.exit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        return GameUIBase;
    }());
    copy.GameUIBase = GameUIBase;
    __reflect(GameUIBase.prototype, "copy.GameUIBase");
})(copy || (copy = {}));
