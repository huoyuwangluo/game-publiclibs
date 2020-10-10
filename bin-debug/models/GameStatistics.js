var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameStatistics = (function () {
    function GameStatistics() {
    }
    GameStatistics.addAnimation = function (animation) {
        if (!game.GameConfig.debug)
            return;
        if (this._animationList.indexOf(animation) < 0) {
            this._animationList.push(animation);
        }
    };
    GameStatistics.removeAnimation = function (animation) {
        if (!game.GameConfig.debug)
            return;
        var index = this._animationList.indexOf(animation);
        if (index >= 0) {
            this._animationList.splice(index, 1);
        }
    };
    GameStatistics.getAnimationStatistics = function () {
        var list = [];
        for (var _i = 0, _a = this._animationList; _i < _a.length; _i++) {
            var animation = _a[_i];
            var className = egret.getQualifiedClassName(animation.parent);
            var parentClassName = '';
            var parentparentClassName = '';
            if (animation.parent) {
                parentClassName = animation.parent.parent ? egret.getQualifiedClassName(animation.parent.parent) : "";
                if (parentClassName) {
                    parentClassName = parentClassName.substring(parentClassName.lastIndexOf('.') + 1, parentClassName.length);
                }
                parentparentClassName = parentClassName ? egret.getQualifiedClassName(animation.parent.parent.parent) : "";
                if (parentparentClassName) {
                    parentparentClassName = parentparentClassName.substring(parentparentClassName.lastIndexOf('.') + 1, parentparentClassName.length);
                }
            }
            list.push({ className: className, resId: animation.resId, playing: animation.playing, touchEnabled: animation.touchEnabled, parent: parentClassName, parentparent: parentparentClassName });
        }
        return list;
    };
    GameStatistics._animationList = [];
    return GameStatistics;
}());
__reflect(GameStatistics.prototype, "GameStatistics");
