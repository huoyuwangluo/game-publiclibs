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
    var CShunFaResDirect = (function (_super) {
        __extends(CShunFaResDirect, _super);
        function CShunFaResDirect() {
            return _super.call(this, s.TypeSkill.C_ShunFaResDirect) || this;
        }
        CShunFaResDirect.prototype.reset = function () {
            _super.prototype.reset.call(this);
            //utils.timer.clear(this, this.doHurt);
        };
        CShunFaResDirect.prototype.start = function () {
            _super.prototype.start.call(this);
            this.playTargetEffect();
            //utils.timer.once(300, this, this.doHurt);
        };
        CShunFaResDirect.prototype.playTargetEffect = function () {
            var that = this;
            var tX = that._target.x;
            var tY = that._target.y;
            var resIdArr = that._flyEffect.split(";");
            var frameRate = utils.MathUtil.floor(15 * this._body.attackSpeed);
            this.addDirectBoom(resIdArr[0], true, this._body.x, this._body.y, this._body.direct, frameRate);
            if (resIdArr.length > 1) {
                this.addDirectBoom(resIdArr[1], false, this._body.x, this._body.y, this._body.direct, frameRate);
            }
        };
        return CShunFaResDirect;
    }(s.SkillShowBase));
    s.CShunFaResDirect = CShunFaResDirect;
    __reflect(CShunFaResDirect.prototype, "s.CShunFaResDirect");
})(s || (s = {}));
