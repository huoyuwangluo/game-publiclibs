var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var utils;
(function (utils) {
    var AnimationPool = (function (_super) {
        __extends(AnimationPool, _super);
        function AnimationPool() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AnimationPool.prototype.to = function (animation, autoReset) {
            animation.reset();
            animation.touchEnabled = false;
            animation.touchChildren = false;
            _super.prototype.to.call(this, animation);
        };
        return AnimationPool;
    }(utils.Pool));
    utils.AnimationPool = AnimationPool;
    __reflect(AnimationPool.prototype, "utils.AnimationPool");
})(utils || (utils = {}));
