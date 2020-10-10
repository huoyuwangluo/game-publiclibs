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
var s;
(function (s) {
    var CShunFaDirect = (function (_super) {
        __extends(CShunFaDirect, _super);
        function CShunFaDirect() {
            var _this = _super.call(this) || this;
            _this._effectType = s.TypeSkill.C_ShunFaDirect;
            return _this;
        }
        /**通用-瞬发带方向*/
        CShunFaDirect.prototype.playTargetEffect = function () {
            var that = this;
            var tX = that._target.x;
            var tY = that._target.y;
            var angle = TypeDirection.getDirectionAngle(that._body.direct);
            var resIdArr = that._flyEffect.split(";");
            var frameRate = utils.MathUtil.floor(12 * this._body.attackSpeed);
            this.addBoom(resIdArr[0], true, tX, tY, frameRate, angle);
            this.addBoom(resIdArr[1], true, tX, tY, frameRate, angle);
        };
        return CShunFaDirect;
    }(s.CShunFa));
    s.CShunFaDirect = CShunFaDirect;
    __reflect(CShunFaDirect.prototype, "s.CShunFaDirect");
})(s || (s = {}));
